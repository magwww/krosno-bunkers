'use client'

import GoogleMaps from '@/components/custom/home/google-maps'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { type Bunker } from '@/types'
import { ButtonBorderedAnimated } from '@/components/custom/common/button-bordered-animated'
import toast from 'react-hot-toast'
import { usePathname } from 'next/navigation'

type Props = {
  bunkers: Bunker[]
}

export default function MapSection({ bunkers }: Props) {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const pathname = usePathname()
  const mapToastIdRef = useRef<string | null>(null)

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 400)
  }, [])

  useEffect(() => {
    const toastTimeout = setTimeout(
      () => (mapToastIdRef.current = toast('Hurry up, spots are selling like hot cakes!')),
      5000,
    )

    return () => {
      clearTimeout(toastTimeout)
      if (mapToastIdRef.current) {
        toast.dismiss(mapToastIdRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (mapToastIdRef.current) {
      toast.dismiss(mapToastIdRef.current)
      mapToastIdRef.current = null
    }
  }, [pathname])

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
