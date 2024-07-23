import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  let intent = null
  switch (event['type']) {
    case 'payment_intent.succeeded':
      intent = event.data.object
      console.log('Succeeded:', intent.id)
      break
    case 'payment_intent.payment_failed':
      intent = event.data.object
      const message = intent.last_payment_error && intent.last_payment_error.message
      console.log('Failed:', intent.id, message)
      break
  }

  console.log('intent', intent)
  return NextResponse.json('ok', { status: 200 })
}