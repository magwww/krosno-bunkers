'use client'

// TODO: any
export default function PreviewContent({ bunker }: { bunker: any }) {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <p className="text-lg mb-10">Wybrany bunkier: {bunker.metadata.address}</p>
      <form action="/api/checkout_sessions" method="POST">
        <button type="submit" role="link" className="border border-white px-3 py-2 rounded">
          Checkout
        </button>
      </form>
    </div>
  )
}
