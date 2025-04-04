export const dynamic = 'force-dynamic'

import MapSection from '@/app/components/home/map-section'
import { api } from '@/app/api/client'

async function getBunkers() {
  const { data } = await api.bunkers.getAll({
    headers: {
      'Cache-Control': 'no-store',
    },
  })

  if (!data) {
    throw new Error('Failed to fetch bunkers')
  }

  return data
}

export default async function Bunkers() {
  const bunkers = await getBunkers()

  return (
    <main className="flex flex-col justify-center items-center w-full h-screen">
      <MapSection {...{ bunkers }} />
    </main>
  )
}
