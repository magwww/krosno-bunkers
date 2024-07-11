'use client'
import Stripe from 'stripe'
import { MouseEvent } from 'react'

export default function PreviewContent({ bunker }: { bunker: Stripe.Price }) {
  const handleSubscription = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/checkout_sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: bunker.id }),
    })

    const body = await res.json()
    window.location.assign(body.url)
  }

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <p className="text-lg mb-10">Wybrany bunkier: {bunker.metadata.address}</p>
      <form>
        <button
          type="submit"
          role="link"
          className="border border-white px-3 py-2 rounded"
          onClick={handleSubscription}
        >
          Checkout
        </button>
      </form>
    </div>
  )
}
