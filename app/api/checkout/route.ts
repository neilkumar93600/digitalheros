import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getSupabaseClient } from '@/lib/supabase/client';

export async function POST(req: Request) {
  try {
    const { priceId, userId, successUrl, cancelUrl } = await req.json();

    if (!priceId || !userId) {
      return new NextResponse('Missing required parameters', { status: 400 });
    }

    // Find existing customer id
    const supabaseAdmin = getSupabaseClient(); // Actually need admin client here if we want to bypass RLS, but for now let's just query with the user's token or try to find their subscription
    
    let customerId;
    const { data: sub } = await supabaseAdmin
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .maybeSingle();
      
    if (sub?.stripe_customer_id) {
      customerId = sub.stripe_customer_id;
    } else {
      // Create a new customer
      // Ideally we would get their email, but we'll use a placeholder or let Stripe collect it during checkout if we don't have it
      const customer = await stripe.customers.create({
        metadata: { userId },
      });
      customerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      client_reference_id: userId,
      metadata: {
        userId,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return new NextResponse(error.message, { status: 500 });
  }
}
