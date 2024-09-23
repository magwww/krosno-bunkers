export const dynamic = 'force-dynamic'

import MapSection from '@/app/components/home/map-section'

async function getBunkers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/bunkers`, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to fetch bunkers')
  }

  return res.json()
}

export default async function Bunkers() {
  const { data: bunkers } = await getBunkers()

  return (
    <main className="flex flex-col justify-center items-center w-full h-screen">
      <MapSection {...{ bunkers }} />
    </main>
  )
}
