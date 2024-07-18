'use client'

import { MouseEvent } from 'react'
import { ButtonBorderedAnimated } from '../common/button-bordered-animated'
import { type Bunker } from '@/types'

export default function PreviewContent({ bunker }: { bunker: Bunker }) {
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
      <p className="text-lg mb-16 flex flex-col items-center text-center max-w-md">
        You are just one click away from becoming the lucky owner of a spot in your chosen bunker:{' '}
        <span className="font-bold my-4 text-xl">{bunker.address}</span>
      </p>
      <form>
        <ButtonBorderedAnimated type="submit" onClick={handleSubscription}>
          Go to checkout
        </ButtonBorderedAnimated>
      </form>
    </div>
  )
}
