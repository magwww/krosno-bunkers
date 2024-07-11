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
      <p className="text-lg mb-16 flex flex-col items-center text-center">
        Od zostania szczęśliwym posiadaczem miejsca w Twoim wybranym bunkrze:{' '}
        <span className="font-bold my-4 text-xl">{bunker.metadata.address}</span> dzieli Cie tylko jedno kliknięcie!
      </p>
      <form>
        <button
          type="submit"
          role="link"
          className="group relative inline-block overflow-hidden transition-all duration-500 hover:bg-black bg-white/10 rounded px-12 py-3 text-sm font-medium text-white focus:outline-none active:text-white"
          onClick={handleSubscription}
        >
          <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-white transition-all duration-300 group-hover:w-full"></span>
          <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-white transition-all duration-300 group-hover:h-full"></span>
          <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white transition-all duration-300 group-hover:w-full"></span>
          <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-white transition-all duration-300 group-hover:h-full"></span>
          Przejdź do płatności
        </button>
      </form>
    </div>
  )
}
