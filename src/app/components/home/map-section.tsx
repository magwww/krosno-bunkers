'use client'

import GoogleMaps from '@/app/components/home/google-maps'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { type Bunker } from '@/types'
import { ButtonBorderedAnimated } from '@/app/components/common/button-bordered-animated'
import toast from 'react-hot-toast'

type Props = {
  bunkers: Bunker[]
}

export default function MapSection({ bunkers }: Props) {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 400)
  }, [])

  useEffect(() => {
    setTimeout(() => toast('Hurry up, spots are selling like hot cakes!'), 5000)
  }, [])

  return (
    <div className="h-screen transition-blur duration-1000">
      {!process.env.NEXT_PUBLIC_MAPS_API_KEY ? (
        <div data-testid="no-google-map" className="flex flex-col items-center gap-4">
          <p className="bg-background/50 p-2 rounded-md text-lg">Oops! Looks like sth&apos;s wrong...</p>
          <ButtonBorderedAnimated
            onClick={() => window.location.reload()}
            className="dark:bg-black/50 transition-all duration-700"
          >
            Refresh page
          </ButtonBorderedAnimated>
        </div>
      ) : (
        <GoogleMaps
          {...{ bunkers }}
          className={cn('transition-all rounded-md duration-700 opacity-0 h-0', isMounted && 'h-full opacity-100')}
        />
      )}
    </div>
  )
}
