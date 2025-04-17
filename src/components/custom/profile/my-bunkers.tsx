import { UserBunker } from '@/types'
import Loader from '@/components/custom/common/loader'
import { ButtonLinkBorderedAnimated } from '@/components/custom/common/button-bordered-animated'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { routes } from '@/costs/routes'
import { useUser } from '@clerk/clerk-react'
import { api } from '@/app/api/client'

const initialButtonText = 'Get yourself a bunker spot'

export default function MyBunkers() {
  const [buttonText, setButtonText] = useState(initialButtonText)
  const [userBunkers, setUserBunkers] = useState<UserBunker[] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { user, isSignedIn } = useUser()

  useEffect(() => {
    if (isSignedIn) {
      const fetchBunkers = async () => {
        setIsLoading(true)

        try {
          const { data: userBunkers } = await api.bunkers.getUserBunkersById(user?.id)

          if (!userBunkers) {
            throw new Error('Network response was not ok')
          }
          setUserBunkers(userBunkers.map((userBunker) => userBunker))
        } catch (error) {
          console.error('Error fetching user bunkers:', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchBunkers()
    }
  }, [user, isSignedIn])

  return (
    <div className="flex flex-col justify-center w-full">
      <h1 className="border-[#292524] pb-4 border-b font-bold text-[17px] dark:text-white">Your bunkers</h1>
      <div className="flex lg:flex-row flex-col items-start">
        <div className="py-4 lg:w-1/2 text-[13px] dark:text-white/70">
          {isLoading ? (
            <Loader className="size-6" testId="bunkers-list-loader" />
          ) : !userBunkers?.length ? (
            <p>You don&apos;t own any bunker spots yet</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {userBunkers?.map((el, index) => (
                <li key={`${index}-${el.id}`}>
                  <Link className="flex items-center gap-1 text-lg" href={routes.bunker(el.bunker.id)}>
                    <Image src="/bunker-icon.png" width={20} height={20} alt="" className="size-8" />
                    <span>{el.bunker.address}</span>
                  </Link>
                  {el.count} {el.count > 1 ? 'spots' : 'spot'}
                </li>
              ))}
            </ul>
          )}
        </div>
        <ButtonLinkBorderedAnimated
          href={routes.bunkers}
          className="bg-black/10 mt-4 mr-auto ml-0 min-w-[250px] text-white/80 transition-all duration-700"
          onMouseEnter={() => setButtonText('You know you want it')}
          onMouseLeave={() => setButtonText(initialButtonText)}
        >
          {isLoading && !userBunkers ? <Loader className="size-6" /> : buttonText}
        </ButtonLinkBorderedAnimated>
      </div>
    </div>
  )
}
