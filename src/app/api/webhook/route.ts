import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { sendConfirmationEmail } from '@/features/email/send-email'

const sendEmail = async (intent: Stripe.PaymentIntent) => {
  const email = ''
  if (email) {
    const result = await sendConfirmationEmail({
      email,
      firstName: intent.metadata.userName,
    })

    if (result.success) {
      console.log('Email sent:', result.data)
    } else {
      console.error('Error sending email:', result.error)
    }
  } else console.error('Error: No email provided')
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error) {
    return NextResponse.json({ error: `Invalid signature: ${error}` }, { status: 400 })
  }

  let intent = null
  switch (event['type']) {
    case 'payment_intent.succeeded':
      intent = event.data.object
      await sendEmail(intent)

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
            decrement: Number(intent.metadata.count),
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
        const userBunkerFound = await db.userBunker.findUnique({
          where: {
            bunkerId: intent.metadata.bunkerId,
          },
        })

        if (!userBunkerFound) {
          await db.userBunker.create({
            data: {
              userId: dbUser?.id,
              bunkerId: intent.metadata.bunkerId,
              count: Number(intent.metadata.count),
            },
          })
        } else {
          await db.userBunker.update({
            where: {
              bunkerId: intent.metadata.bunkerId,
            },
            data: {
              count: {
                increment: Number(intent.metadata.count),
              },
            },
          })
        }
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
