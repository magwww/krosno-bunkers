'use client'
import MyBunkers from '@/app/components/profile/my-bunkers'
import { UserProfile } from '@clerk/nextjs'
import { Warehouse } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Bunker } from '@/types'

const UserProfilePage = () => {
  const [bunkers, setBunkers] = useState<Bunker[] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { user, isSignedIn } = useUser()

  useEffect(() => {
    fetch('/api/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
  }, [])

  useEffect(() => {
    const fetchBunkers = async () => {
      setIsLoading(true)

      try {
        const response = await fetch(`/api/get-user-bunkers?userId=${user?.id}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const { data } = await response.json()

        // TODO: type data from response
        setBunkers(data.map((el: any) => el.bunker))
      } catch (error) {
        console.error('Error fetching bunkers:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBunkers()
  }, [user])

  if (!isSignedIn) return null

  return (
    <main>
      <UserProfile
        path="/user-profile"
        routing="path"
        appearance={{
          elements: {
            rootBox: 'w-screen dark:bg-black',
            cardBox: 'shadow-none w-full max-w-full overflow-visible h-[calc(100vh-64px)]',
            navbar:
              'lg:dark:bg-none lg:dark:[&_p]:text-white/70 lg:dark:[&_h1]:text-white lg:dark:[&_button]:text-white',
            navbarButton: 'text-neutral-900',
            scrollBox:
              'dark:border-l rounded-none dark:border-white/20 dark:bg-black dark:[&_h1]:text-white dark:[&_p]:text-white/70 dark:[&_span]:text-white dark:[&_button]:text-white',
            profileSection: 'dark:border-white/20',
          },
        }}
      >
        <UserProfile.Page label="My bunkers" labelIcon={<Warehouse className="size-4" />} url="/my-bunkers">
          <MyBunkers {...{ bunkers, isLoading }} />
        </UserProfile.Page>
      </UserProfile>
    </main>
  )
}

export default UserProfilePage
