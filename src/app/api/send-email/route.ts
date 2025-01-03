import BunkerPurchaseConfirmation from '@/emails/bunker-purchase-confirmation'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { email, firstName } = await req.json()
    const { data, error } = await resend.emails.send({
      from: 'Krosno Bunkers <hello@krosno-bunkers.pl>',
      to: email,
      subject: 'Bunker order confirmation',
      react: BunkerPurchaseConfirmation({ firstName }),
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json({ message: 'Email sent successfully', data })
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
