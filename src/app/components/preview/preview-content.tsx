'use client'
import { useEffect } from 'react'
import { type Bunker } from '@/types'

export default function PreviewContent({ bunker }: { bunker: Bunker }) {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.')
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.')
    }
  }, [])

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <p className="text-lg mb-10">Wybrany bunkier: {bunker.address}</p>
      <form action="/api/checkout_sessions" method="POST">
        <button type="submit" role="link" className="border border-white px-3 py-2 rounded">
          Checkout
        </button>
      </form>
    </div>
  )
}
