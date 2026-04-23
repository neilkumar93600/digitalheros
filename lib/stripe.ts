import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-03-25.dahlia' as any,
  appInfo: {
    name: 'Digital Heroes',
    version: '0.1.0',
  },
});
