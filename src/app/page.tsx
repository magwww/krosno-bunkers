import { type Bunker } from '@/types'
import GoogleMaps from '@/app/components/google-maps'

async function getBunkers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/bunkers`)

  if (!res.ok) {
    throw new Error('Failed to fetch bunkers')
  }

  return res.json()
}

export default async function Home() {
  const { data: bunkers } = await getBunkers()

  return (
    <main className="w-full text-white bg-home-hero bg-cover bg-center bg-no-repeat justify-center flex min-h-screen flex-col items-center p-24">
      <p className="mb-20 text-5xl">Hello from Krosno Bunkers!</p>
      <ul className="mb-16">
        {bunkers.map(({ id, longitude, latitude, capacity, address }: Bunker) => (
          <li key={id}>
            {longitude}, {latitude}, {capacity}, {address}
          </li>
        ))}
      </ul>
      <GoogleMaps />
    </main>
  )
}
