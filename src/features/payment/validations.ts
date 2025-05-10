import { z } from 'zod'

export const createPaymentIntentSchema = z.object({
  price: z.number(),
  bunkers: z.array(
    z.object({
      id: z.string(),
      price: z.number(),
      longitude: z.number(),
      latitude: z.number(),
      capacity: z.number(),
      initialCapacity: z.number(),
      address: z.string(),
    }),
  ),
  count: z.number().positive(),
})

export const paymentIntentResponseSchema = z.object({
  clientSecret: z.string(),
  order: z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    price: z.number(),
    userId: z.string(),
    bunkerId: z.string(),
    paid: z.boolean(),
    count: z.number(),
  }),
})

export type PaymentIntentResponse = z.infer<typeof paymentIntentResponseSchema>
