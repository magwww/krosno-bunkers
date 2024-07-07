import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

export async function POST(req, res) {
  try {
    // Create Checkout Sessions from body params.
    const headers = req.headers
    const origin = headers.get('origin')

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1PZvFSIusbD23PUGu81xv6Yq',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
    })
    return NextResponse.redirect(session.url || '/', 303)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 })
  }
}
