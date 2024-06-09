'use client'
import { type Bunker } from '@/types'
import { Loader } from '@googlemaps/js-api-loader'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  bunkers: Bunker[]
}

export default function GoogleMaps({ bunkers, className }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: 'quartely',
      })

      const { Map } = await loader.importLibrary('maps')
      const { Marker } = (await loader.importLibrary('marker')) as google.maps.MarkerLibrary

      const mapOptions = {
        center: {
          lat: 49.69539181051453,
          lng: 21.754001577384994,
        },
        zoom: 13,
        mapId: 'NEXT_MAPS',
      }

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions)

      bunkers.forEach((bunker) => {
        const marker = new Marker({
          map,
          position: { lat: bunker.latitude, lng: bunker.longitude },
        })

        const markerInfoContent = `<div class="flex flex-col items-center justify-center gap-2"><p class="text-black font-bold text-lg">${bunker.address}</p> <p class="text-black text-xs">Wolne miejsca: ${bunker.capacity}</p><button class="bg-black rounded-lg py-3 px-2 font-semibold text-white">Kup miejsce w tym bunkrze</button></div>`

        const infowindow = new google.maps.InfoWindow({
          content: markerInfoContent,
        })

        marker.addListener('click', function () {
          infowindow.open(map, marker)
        })
      })
    }

    initializeMap()
  }, [])

  return (
    <div
      className={cn(
        'w-[600px] border border-2 [&_div.gm-style-iw-ch]:text-center [&_div.gm-style-iw-ch]:p-0 [&_div.gm-style-iw-chr]:text-black [&_div.gm-style-iw-chr]:font-bold [&_div.gm-style-iw-chr]:text-lg',
        className,
      )}
      ref={mapRef}
    />
  )
}
