import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { type Bunker } from '@/types'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'

export async function POST(req: NextRequest) {
  const { price, bunkers, count }: { price: number; bunkers: Bunker[]; count: number } = await req.json()

  const clerkUser = await currentUser()

  if (!clerkUser || !clerkUser.id) {
    return NextResponse.json({ error: 'No clerk user found' }, { status: 400 })
  }

  try {
    const user = await db.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 })
    }

    if (!bunkers.length) {
      return NextResponse.json({ error: 'No products selected' }, { status: 400 })
    }

    const calculateOrderAmount = (items: Bunker[]) => {
      return items.reduce((accumulator, item) => accumulator + item.price * count, 0)
    }

    const order = await db.order.create({
      data: {
        price: price * count,
        userId: user.id,
        bunkerId: bunkers[0].id,
        paid: false,
        count,
      },
    })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(bunkers),
      currency: 'PLN',
      payment_method_types: ['card', 'blik'],
      metadata: {
        orderId: order.id,
        bunkerId: bunkers[0].id,
        userId: user.id!,
        userName: clerkUser.firstName,
        count: order.count,
      },
      receipt_email: user?.email,
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
