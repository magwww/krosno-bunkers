import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

async function sendConfirmationEmail(intent: Stripe.PaymentIntent) {
  const email = intent.receipt_email

  await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`, {
    method: 'POST',
    body: JSON.stringify({ email, firstName: intent.metadata.userName }),
  })
}

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
      await sendConfirmationEmail(intent)

      await db.order.update({
        where: {
          id: intent.metadata.orderId,
        },
        data: {
          paid: true,
        },
      })

      await db.bunker.update({
        where: {
          id: intent.metadata.bunkerId,
        },
        data: {
          capacity: {
            decrement: 1,
          },
        },
      })

      revalidatePath('/')

      const dbUser = await db.user.findUnique({
        where: {
          id: intent.metadata.userId,
        },
      })

      if (dbUser) {
        await db.userBunker.create({
          data: {
            userId: dbUser?.id,
            bunkerId: intent.metadata.bunkerId,
          },
        })
      }

      break
    case 'payment_intent.payment_failed':
      intent = event.data.object
      const message = intent.last_payment_error && intent.last_payment_error.message
      console.log('Failed:', intent.id, message)
      break
  }

  return NextResponse.json('ok', { status: 200 })
}
