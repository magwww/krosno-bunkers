export const dynamic = 'force-dynamic'

import MapSection from '@/app/components/home/map-section'
import { apiClient } from '../api/client'

async function getBunkers() {
  const res = await apiClient.get('/bunkers', {
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-store',
    },
  })

  if (!res.data) {
    throw new Error('Failed to fetch bunkers')
  }

  return res.data
}

export default async function Bunkers() {
  const { data: bunkers } = await getBunkers()

  return (
    <main className="flex flex-col justify-center items-center w-full h-screen">
      <MapSection {...{ bunkers }} />
    </main>
  )
}
