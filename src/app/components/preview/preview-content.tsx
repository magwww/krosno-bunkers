'use client'
import { useState, useEffect } from 'react'
import { type Bunker } from '@/types'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '@/app/components/preview/checkout-form'
import { loadStripe } from '@stripe/stripe-js'
import { paymentIntentSchema } from '@/lib/validations'
import toast from 'react-hot-toast'
import { StripeElementLocale } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PreviewContent({ bunker }: { bunker: Bunker }) {
  const [clientSecret, setClientSecret] = useState<string>('')

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        price: bunker.price,
        bunkers: [bunker],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const validatedData = paymentIntentSchema.safeParse(data)

        if (!validatedData.success) {
          console.error('error: ', validatedData.error)
          toast('Ooops! Something went wrong while creating your order. Please try again.')
          return
        }

        setClientSecret(data.clientSecret)
      })
  }, [])

  const options = {
    clientSecret,
    locale: 'en' as StripeElementLocale,
  }

  return (
    <main className="flex flex-col justify-center items-center px-4 pb-8 w-full lg:h-screen">
      <p className="flex flex-col items-center lg:my-0 mt-8 mb-16 max-w-md text-center text-lg">
        You&apos;re just one click away from becoming the lucky owner of a spot in your chosen bunker:{' '}
        <span className="my-4 font-bold text-xl">{bunker.address}</span>
      </p>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </main>
  )
}
