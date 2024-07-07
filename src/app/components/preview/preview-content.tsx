'use client'
import { type Bunker } from '@/types'

export default function PreviewContent({ bunker }: { bunker: Bunker }) {
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
