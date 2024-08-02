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

  console.log('bunkers', bunkers)

  return (
    <main className="w-full bg-home-hero bg-cover bg-center bg-no-repeat min-h-[calc(100vh-64px)]">
      <div className="w-full p-24 justify-center flex flex-col items-center min-h-[calc(100vh-64px)]">
        <MapSection {...{ bunkers }} />
      </div>
    </main>
  )
}
