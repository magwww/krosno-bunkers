'use client'
import { useState, useEffect } from 'react'
import { type Bunker } from '@/types'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '@/components/custom/preview/checkout-form'
import { loadStripe, StripeElementLocale } from '@stripe/stripe-js'
import toast from 'react-hot-toast'
import { createPaymentIntent } from '@/features/payment/create-payment-intent'
import Loader from '@/components/custom/common/loader'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PreviewContent({ bunker, count }: { bunker: Bunker; count: number }) {
  const [clientSecret, setClientSecret] = useState<string>('')

  const options = {
    clientSecret,
    locale: 'en' as StripeElementLocale,
  }

  //create payment intent when user visits page
  useEffect(() => {
    createPaymentIntent(bunker.price, [bunker], count)
      .then(({ clientSecret }) => {
        setClientSecret(clientSecret)
      })
      .catch((error) => {
        console.error('error: ', error)
        toast('Ooops! Something went wrong while creating your order. Please try again.')
      })
  }, [bunker, count])

  return (
    <main className="flex flex-col justify-center items-center px-4 pb-8 w-full lg:h-screen">
      <p className="flex flex-col items-center lg:my-0 mt-8 mb-16 max-w-md text-center text-lg">
        You&apos;re just one click away from becoming the lucky owner of a spot in your chosen bunker:{' '}
        <span className="my-4 font-bold text-xl">{bunker.address}</span>
      </p>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <Loader />
      )}
    </main>
  )
}
