import { api } from '@/app/api/client'
import { notFound } from 'next/navigation'
import { clerkClient } from '@clerk/express'
import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/24/solid'

export default async function MyBunker(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  if (!id) {
    return notFound()
  }

  // eslint-disable-next-line testing-library/no-await-sync-queries
  const { data: bunker } = await api.bunkers.getById(id)

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
