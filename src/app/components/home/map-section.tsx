'use client'

import GoogleMaps from '@/app/components/home/google-maps'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { type Bunker } from '@/types'

type Props = {
  bunkers: Bunker[]
}

export default function MapSection({ bunkers }: Props) {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 400)
  }, [])

  return (
    <div className="flex flex-col items-center transition-blur duration-1000">
      <GoogleMaps
        {...{ bunkers }}
        className={cn('transition-all rounded-md duration-700 opacity-0 h-0', isMounted && 'h-[500px] opacity-100')}
      />
    </div>
  )
}
