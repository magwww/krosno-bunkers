import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')
    const prices = await stripe.prices.list()

    return NextResponse.json(prices.data, { status: 200 })
  } catch (error) {
    console.error('Error fetching prices:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
