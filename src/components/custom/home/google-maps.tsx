'use client'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'
import { type Bunker } from '@/types'
import useMap from '@/hooks/useMap'
import BunkerMapMarkerContent from './bunker-map-marker-content'

type Props = HTMLAttributes<HTMLDivElement> & {
  bunkers: Bunker[]
}

export default function GoogleMaps({ bunkers, className }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)

  useMap(bunkers, mapRef, process.env.NEXT_PUBLIC_MAPS_API_KEY || '', BunkerMapMarkerContent, '/bunker.png')

  return (
    <div
      data-testid="google-map"
      className={cn(
        'w-screen h-screen border border-2 [&_div.gm-style-iw-ch]:text-center [&_div.gm-style-iw-ch]:p-0 [&_div.gm-style-iw-chr]:text-black [&_div.gm-style-iw-chr]:font-bold [&_div.gm-style-iw-chr]:text-lg',
        className,
      )}
      ref={mapRef}
    />
  )
}
