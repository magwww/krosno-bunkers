'use client'
import MyBunkers from '@/app/components/profile/my-bunkers'
import { UserProfile } from '@clerk/nextjs'
import { Warehouse } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { UserBunker } from '@/types'
import { apiClient } from '../../api/client'
import { routes } from '@/costs/routes'
import { createUser } from '@/app/actions'

const UserProfilePage = () => {
  const [userBunkers, setUserBunkers] = useState<UserBunker[] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { user, isSignedIn } = useUser()

  useEffect(() => {
    const initUser = async () => {
      try {
        await createUser()
      } catch (error) {
        console.error('Error creating user:', error)
      }
    }

    initUser()
  }, [])

  useEffect(() => {
    if (isSignedIn) {
      const fetchBunkers = async () => {
        setIsLoading(true)

        try {
          const { data } = await apiClient.get(`/get-user-bunkers?userId=${user?.id}`)

          if (!data.data) {
            throw new Error('Network response was not ok')
          }

          setUserBunkers(data.data.map((userBunker: UserBunker) => userBunker))
        } catch (error) {
          console.error('Error fetching user bunkers:', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchBunkers()
    }
  }, [user, isSignedIn])

  if (!isSignedIn) return null

  return (
    <main>
      <UserProfile
        path={routes.userProfile}
        routing="path"
        appearance={{
          elements: {
            rootBox: 'w-screen dark:bg-black',
            cardBox: 'shadow-none w-full max-w-full overflow-visible h-[calc(100vh-64px)]',
            navbar:
              'lg:dark:bg-none lg:dark:[&_p]:text-white/70 lg:dark:[&_h1]:text-white lg:dark:[&_button]:text-white',
            navbarButton: 'text-neutral-900',
            scrollBox:
              'dark:border-l rounded-none dark:border-white/20 dark:bg-black dark:[&_h1]:text-white dark:[&_p]:text-white/70 dark:[&_span]:text-white',
            profileSection:
              'rounded-none dark:border-white/20 dark:bg-black dark:[&_h1]:text-white dark:[&_p]:text-white/70 dark:[&_span]:text-white',
            actionCard:
              'dark:bg-black dark:[&_button]:border dark:[&_button]:border-white/20 dark:[&_label]:text-white',
            profileSectionContent__profile: '[&_.cl-formButtonPrimary]:hidden',
            formButtonReset: 'dark:text-white',
            profileSectionPrimaryButton: 'dark:text-white',
            avatarImageActionsUpload: 'dark:text-white',
          },
        }}
      >
        <UserProfile.Page label="My bunkers" labelIcon={<Warehouse className="size-4" />} url="/my-bunkers">
          <MyBunkers {...{ userBunkers, isLoading }} />
        </UserProfile.Page>
      </UserProfile>
    </main>
  )
}

export default UserProfilePage
