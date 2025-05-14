'use server'

import BunkerPurchaseConfirmation from '@/emails/bunker-purchase-confirmation'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type Params = {
  email: string
  firstName: string
}

export async function sendConfirmationEmail({ email, firstName }: Params) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Krosno Bunkers <hello@krosno-bunkers.pl>',
      to: email,
      subject: 'Bunker order confirmation',
      react: BunkerPurchaseConfirmation({ firstName }),
    })

    if (error) {
      throw new Error(error.message)
    }

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
