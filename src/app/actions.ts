'use server'

import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { type Bunker } from '@/types'
import { createPaymentIntentSchema, type PaymentIntentResponse } from '@/lib/validations'

export async function createPaymentIntent(
  price: number,
  bunkers: Bunker[],
  count: number,
): Promise<PaymentIntentResponse> {
  const validatedData = createPaymentIntentSchema.safeParse({ price, bunkers, count })

  if (!validatedData.success) {
    throw new Error('Invalid input data')
  }

  const clerkUser = await currentUser()

  if (!clerkUser?.id) {
    throw new Error('No clerk user found')
  }

  const user = await db.user.findUnique({
    where: { clerkId: clerkUser.id },
  })

  if (!user) {
    throw new Error('User not found in database')
  }

  if (!bunkers.length) {
    throw new Error('No products selected')
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
    amount: bunkers.reduce((acc, item) => acc + item.price * count, 0),
    currency: 'PLN',
    payment_method_types: ['card', 'blik'],
    metadata: {
      orderId: order.id,
      bunkerId: bunkers[0].id,
      userId: user.id,
      userName: clerkUser.firstName,
      count: order.count,
    },
    receipt_email: user.email,
  })

  if (!paymentIntent.client_secret) {
    throw new Error('No client secret returned from Stripe')
  }

  return {
    clientSecret: paymentIntent.client_secret,
    order: {
      ...order,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    },
  }
}
