'use client'
import MyBunkers from '@/app/components/profile/my-bunkers'
import { UserProfile } from '@clerk/nextjs'
import { Warehouse } from 'lucide-react'
import { useEffect } from 'react'

const UserProfilePage = () => {
  useEffect(() => {
    fetch('/api/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
  }, [])

  return (
    <main>
      <UserProfile
        path="/user-profile"
        routing="path"
        appearance={{
          elements: {
            rootBox: 'w-screen dark:bg-black',
            cardBox: 'shadow-none',
            navbar: 'dark:bg-none dark:[&_p]:text-white/70 dark:[&_h1]:text-white dark:[&_button]:text-white',
            scrollBox:
              'dark:border-l rounded-none dark:border-white/20 dark:bg-black dark:[&_h1]:text-white dark:[&_p]:text-white/70 dark:[&_span]:text-white dark:[&_button]:text-white',
            profileSection: 'dark:border-white/20',
          },
        }}
      >
        <UserProfile.Page label="My bunkers" labelIcon={<Warehouse className="w-4 h-4" />} url="/my-bunkers">
          <MyBunkers />
        </UserProfile.Page>
      </UserProfile>
    </main>
  )
}

export default UserProfilePage
