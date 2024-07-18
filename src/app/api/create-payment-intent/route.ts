import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { type Bunker } from '@/types'

const calculateOrderAmount = (items: Bunker[]) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { items } = await req.json()

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'PLN',
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
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
