'use client'
import { useState, useEffect } from 'react'
import { type Bunker } from '@/types'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../preview/checkout-form'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PreviewContent({ bunker }: { bunker: Bunker }) {
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [bunker] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [])

  const options = {
    clientSecret,
  }

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <p className="text-lg mb-16 flex flex-col items-center text-center max-w-md">
        You are just one click away from becoming the lucky owner of a spot in your chosen bunker:{' '}
        <span className="font-bold my-4 text-xl">{bunker.address}</span>
      </p>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
