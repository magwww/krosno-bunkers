import { BunkerWithUsers } from '@/types'
import { apiClient } from '../../api/client'
import { notFound } from 'next/navigation'
import { clerkClient } from '@clerk/express'

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

  const bunker: BunkerWithUsers = await getBunker(id)

  const bunkerUsers = bunker.users.map((user) => user.user.email)
  const uniqueUsers = bunkerUsers.filter((item, index) => bunkerUsers.indexOf(item) === index)

  const { data } = await clerkClient.users.getUserList({ emailAddress: uniqueUsers })

  return (
    <main className="flex flex-col items-center px-4 w-full min-h-screen text-center">
      <h1 className="pt-40 pb-16 text-xl font-bold">Bunker: {bunker.address}</h1>
      <p className="py-3">In this bunker you can meet:</p>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.username?.[0].toUpperCase()}
            {user.username?.slice(1)}
          </li>
        ))}
      </ul>
    </main>
  )
}
