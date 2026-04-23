import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getSupabaseClient } from '@/lib/supabase/client';

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return new NextResponse('Missing userId', { status: 400 });
    }

    const supabase = getSupabaseClient();
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (!subscription?.stripe_customer_id) {
      return new NextResponse('No active subscription found', { status: 404 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating billing portal session:', error);
    return new NextResponse(error.message, { status: 500 });
  }
}
