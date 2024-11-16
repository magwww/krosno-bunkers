import { Bunker, GroupedBunker } from '@/types'
import Loader from '@/app/components/common/loader'
import { ButtonLinkBorderedAnimated } from '@/app/components/common/button-bordered-animated'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  isLoading: boolean
  bunkers: Bunker[] | undefined
}

export default function MyBunkers({ bunkers, isLoading }: Props) {
  const initialButtonText = 'Get yourself a bunker spot'
  const [buttonText, setButtonText] = useState(initialButtonText)

  const groupedBunkers: GroupedBunker[] | undefined = bunkers?.reduce<GroupedBunker[]>((acc, current) => {
    const { id } = current
    const existing = acc.find((item) => item.id === id)

    if (existing) {
      existing.count++
    } else {
      acc.push({
        id,
        address: current.address,
        count: 1,
      })
    }

    return acc
  }, [])

  return (
    <div className="flex flex-col justify-center w-full">
      <h1 className="border-[#292524] pb-4 border-b font-bold text-[17px] dark:text-white">Your bunkers</h1>
      <div className="flex lg:flex-row flex-col items-start">
        <div className="py-4 lg:w-1/2 text-[13px] dark:text-white/70">
          {isLoading ? (
            <Loader className="size-6" />
          ) : bunkers && !bunkers.length ? (
            <p>You don&apos;t own any bunker spots yet</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {groupedBunkers?.map((bunker, index) => (
                <li key={`${index}-${bunker.id}`}>
                  <Link className="text-lg flex items-center gap-1" href={`/my-bunkers/${bunker.id}`}>
                    <Image src="/bunker-icon.png" width={20} height={20} alt="" className="size-8" />
                    <span>{bunker.address}</span>
                  </Link>
                  {bunker.count} {bunker.count > 1 ? 'spots' : 'spot'}
                </li>
              ))}
            </ul>
          )}
        </div>
        <ButtonLinkBorderedAnimated
          href="/bunkers"
          className="bg-black/10 mt-4 mr-auto ml-0 min-w-[250px] text-white transition-all duration-700"
          onMouseEnter={() => setButtonText('You know you want it')}
          onMouseLeave={() => setButtonText(initialButtonText)}
        >
          {isLoading && !bunkers ? <Loader className="size-6" /> : buttonText}
        </ButtonLinkBorderedAnimated>
      </div>
    </div>
  )
}
