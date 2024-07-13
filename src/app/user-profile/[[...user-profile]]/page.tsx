import { UserProfile } from '@clerk/nextjs'

const UserProfilePage = () => (
  <main>
    <UserProfile
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
      path="/user-profile"
    />
  </main>
)

export default UserProfilePage
