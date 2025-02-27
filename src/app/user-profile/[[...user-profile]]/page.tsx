'use client'
import MyBunkers from '@/app/components/profile/my-bunkers'
import { UserProfile } from '@clerk/nextjs'
import { Warehouse } from 'lucide-react'
import { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { routes } from '@/costs/routes'
import { createUser } from '@/user/create-user'

const UserProfilePage = () => {
  const { isSignedIn } = useUser()

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
          <MyBunkers />
        </UserProfile.Page>
      </UserProfile>
    </main>
  )
}

export default UserProfilePage
