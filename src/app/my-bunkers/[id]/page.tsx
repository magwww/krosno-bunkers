import { apiClient } from '../../api/client'
import { notFound } from 'next/navigation'

async function getBunker(id: string) {
  const res = await apiClient.get(`/bunker/${id}`)

  if (!res.data) {
    throw new Error('Failed to fetch bunker')
  }

  return res.data
}

export default async function MyBunker({ params }: { params: { id: string } }) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  if (!id) {
    return notFound()
  }

  const bunker = await getBunker(id)

  return (
    <main className="flex flex-col justify-center items-center px-4 w-full min-h-screen text-center">
      My bunker: {bunker.address}
    </main>
  )
}
