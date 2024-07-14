import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Create Checkout Sessions from body params.
    const protocol = req.nextUrl.protocol
    const host = req.headers.get('host')
    const origin = `${protocol}//${host}`

    const data = await req.json()
    const priceId = data.priceId

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/payment-success`,
      cancel_url: `${origin}/payment-canceled`,
    })
    return NextResponse.json({ url: session.url || '/' }, { status: 303 })
  } catch (err: unknown) {
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 })
    } else if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
    }
  }
}
