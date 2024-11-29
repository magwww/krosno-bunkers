import { BunkerWithUsers } from '@/types'
import { apiClient } from '../../api/client'
import { notFound } from 'next/navigation'
import { clerkClient } from '@clerk/express'
import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/24/solid'

async function getBunker(id: string) {
  const res = await apiClient.get(`/bunker/${id}`)

  if (!res.data) {
    throw new Error('Failed to fetch bunker')
  }

  return res.data
}

export default async function MyBunker({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

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
          <li key={user.id} className="flex items-center gap-2">
            {user.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt={`Avatar of user ${user.username}`}
                width={24}
                height={24}
                className="rounded-full"
              />
            ) : (
              <UserCircleIcon className="size-7 text-stone-500" />
            )}
            <span>
              {user.username?.[0].toUpperCase()}
              {user.username?.slice(1)}
            </span>
          </li>
        ))}
      </ul>
    </main>
  )
}
