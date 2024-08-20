import { z } from 'zod'

export const paymentIntentSchema = z.object({
  clientSecret: z.string(),
  order: z.object({
    id: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    price: z.number().positive(),
    userId: z.string(),
    bunkerId: z.string(),
    paid: z.boolean(),
  }),
})
