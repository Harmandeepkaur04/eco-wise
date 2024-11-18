import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2022-11-15' as any,
});

export async function POST(req: NextRequest) {
console.log('Received request for creating a Stripe session');
  try {
    const body = await req.json();

    // Create a Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: 'Pickup Appointment',
              description: 'Book your waste pickup appointment.',
            },
            unit_amount: 2500, // $25.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/booking`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error('Error creating Stripe Checkout session:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
