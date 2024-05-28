'use client'

import GoogleMaps from '@/app/components/home/google-maps'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Bunker } from '@/types'
import { cn } from '@/lib/utils'

type Props = {
  bunkers: Bunker[]
}

export default function MapSection({ bunkers }: Props) {
  const [mapVisible, setMapVisible] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    mapVisible && setTimeout(() => setShow(true), 400)
  }, [mapVisible])

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 400)
  }, [])

  return (
    <div className={cn('flex flex-col items-center transition-blur duration-1000', !isMounted && 'blur-sm')}>
      <p
        className={cn(
          'mb-16 text-5xl transition-text duration-1000 bg-background/50 p-2 rounded-md',
          !isMounted && 'text-4xl',
        )}
      >
        Welcome to Krosno Bunkers!
      </p>
      {mapVisible ? (
        <div>
          <GoogleMaps
            {...{ bunkers }}
            className={cn('transition-all rounded-md duration-700 opacity-0 h-0', show && 'h-[500px] opacity-100')}
          />
        </div>
      ) : (
        <Button
          onClick={() => setMapVisible(true)}
          variant="secondary"
          className={cn('transition-all duration-700 opacity-100', show && 'h-0 opacity-0')}
        >
          Select your bunker
        </Button>
      )}
    </div>
  )
}
