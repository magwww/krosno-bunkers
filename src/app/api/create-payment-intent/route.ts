import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { type Bunker } from '@/types'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'

//TODO: enable multiple products purchase
const calculateOrderAmount = (items: Bunker[]) => {
  return items.reduce((accumulator, item) => accumulator + item.price, 0)
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { items } = await req.json()
  const { userId } = auth()

  if (!userId || !items.length) {
    return NextResponse.json({ error: 'Invalid request - no user or products selected' }, { status: 400 })
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'PLN',
      // metadata: {
      //   order_id: 'test',
      //   bunkerId: items[0].id,
      //   userId: 'test',
      // },
    })

    //TODO: enable multiple products purchase
    //TODO: get dynamic userId after syncing clerk with db

    const order = await db.order.create({
      data: {
        price: items[0].price,
        userId: '2',
        bunkers: {
          connect: [items[0].id],
        },
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      order,
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
