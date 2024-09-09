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
    <main className="relative z-10 before:z-[-5] before:absolute before:inset-0 before:content-[''] bg-home-hero before:bg-gradient-to-t before:from-black before:to-transparent bg-cover bg-no-repeat bg-center before:opacity-70 w-full min-h-[calc(100vh-64px)]">
      <div className="flex flex-col justify-center items-center p-24 w-full min-h-[calc(100vh-64px)]">
        <MapSection {...{ bunkers }} />
      </div>
    </main>
  )
}
