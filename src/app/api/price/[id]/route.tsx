import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')
    const price = await stripe.prices.retrieve(id)

    return NextResponse.json(price, { status: 200 })
  } catch (error) {
    console.error('Error fetching price:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
