'use client'
import { useState, useEffect } from 'react'
import { type Bunker } from '@/types'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '@/components/preview/checkout-form'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PreviewContent({ bunker }: { bunker: Bunker }) {
  const [clientSecret, setClientSecret] = useState('')

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
      .then((data) => setClientSecret(data.clientSecret))
  }, [])

  const options = {
    clientSecret,
  }

  return (
    <main className="flex flex-col w-full lg:h-screen justify-center items-center px-4 pb-8">
      <p className="text-lg mb-16 flex flex-col items-center text-center max-w-md mt-8 lg:my-0">
        You&apos;re just one click away from becoming the lucky owner of a spot in your chosen bunker:{' '}
        <span className="font-bold my-4 text-xl">{bunker.address}</span>
      </p>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </main>
  )
}
