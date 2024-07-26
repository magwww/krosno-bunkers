'use client'
import { Loader } from '@googlemaps/js-api-loader'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'
import { createRoot } from 'react-dom/client'
import { type Bunker } from '@/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = HTMLAttributes<HTMLDivElement> & {
  bunkers: Bunker[]
}

const InfoWindowContent = ({ bunker }: { bunker: Bunker }) => {
  const spotsAvailable = bunker.capacity > 0

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="text-black font-bold text-lg">{bunker.address}</p>
      {bunker.capacity && <p className="text-black text-xs">Free spots: {bunker.capacity}</p>}
      {spotsAvailable ? (
        <Link
          href={`/payment-preview?id=${bunker.id}`}
          className="bg-black rounded-lg py-3 px-2 font-semibold text-white"
        >
          Buy spot in this bunker
        </Link>
      ) : (
        <Button disabled>There are no spots available in this bunker</Button>
      )}
    </div>
  )
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
      ;(await loader.importLibrary('marker')) as google.maps.MarkerLibrary

      const mapOptions = {
        center: {
          lat: 49.69539181051453,
          lng: 21.754001577384994,
        },
        zoom: 13,
        mapId: 'NEXT_MAPS',
      }

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions)

      let InfoWindow = new google.maps.InfoWindow()

      bunkers.forEach((bunker) => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: +bunker.latitude, lng: +bunker.longitude },
        })

        const div = document.createElement('div')
        const root = createRoot(div)
        root.render(<InfoWindowContent bunker={bunker} />)

        marker.addListener('click', function () {
          InfoWindow.setContent(div)
          InfoWindow.setPosition(marker.position)
          InfoWindow.open(map, marker)
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
