import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

// We need the service role key to bypass RLS for webhook operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (error: any) {
    console.error(`Webhook signature verification failed: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        
        // This is a new subscription created via checkout
        if (session.mode === 'subscription' && session.client_reference_id) {
          const userId = session.client_reference_id;
          const subscriptionId = session.subscription;
          const customerId = session.customer;

          // We'll get more details from the subscription object via the API or wait for customer.subscription.created
          // Let's rely on customer.subscription.created / updated for the actual db sync
        }
        break;
      }
      
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as any;
        const customerId = subscription.customer;
        
        // We need to find the user by customerId, but on first creation, the user might not have customerId set.
        // So we should fetch the customer object to get the email, or get the checkout session metadata.
        // Wait, the checkout session sets client_reference_id which is the user ID. 
        // When customer.subscription.created fires, we can fetch the customer from Stripe to see metadata, or we can just rely on the checkout.session.completed to link customerId to userId first.

        // To make it robust, let's fetch the customer from Stripe
        const customer = await stripe.customers.retrieve(customerId as string) as any;
        
        let userId = customer.metadata?.userId;
        
        // If not in customer metadata, maybe try to find existing subscription with this customer ID
        if (!userId) {
          const { data: existingSub } = await supabaseAdmin
            .from('subscriptions')
            .select('user_id')
            .eq('stripe_customer_id', customerId)
            .maybeSingle();
            
          if (existingSub) {
            userId = existingSub.user_id;
          }
        }

        if (userId) {
          // Sync subscription data
          const planType = subscription.items.data[0].price.recurring.interval === 'month' ? 'monthly' : 'yearly';
          
          await supabaseAdmin.from('subscriptions').upsert({
            user_id: userId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscription.id,
            plan_type: planType,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          }, { onConflict: 'user_id, stripe_subscription_id' });
        }
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;
        
        await supabaseAdmin
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', subscription.id);
        break;
      }
    }

    return new NextResponse('Webhook processed successfully', { status: 200 });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Webhook handler failed', { status: 500 });
  }
}
