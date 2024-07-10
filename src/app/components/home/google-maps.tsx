'use client'
import Stripe from 'stripe'
import { Loader } from '@googlemaps/js-api-loader'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'
import { createRoot } from 'react-dom/client'

type Props = HTMLAttributes<HTMLDivElement> & {
  bunkers: Stripe.Price[]
}

const InfoWindowContent = ({ bunker }: { bunker: Stripe.Price }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <p className="text-black font-bold text-lg">{bunker.metadata.address}</p>
    <p className="text-black text-xs">Wolne miejsca: {bunker.metadata.capacity}</p>
    <a href={`/preview?id=${bunker.id}`} className="bg-black rounded-lg py-3 px-2 font-semibold text-white">
      Kup miejsce w tym bunkrze
    </a>
  </div>
)

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
          position: { lat: +bunker.metadata.latitude, lng: +bunker.metadata.longitude },
        })

        const div = document.createElement('div')
        const root = createRoot(div)
        root.render(<InfoWindowContent bunker={bunker} />)

        const InfoWindow = new google.maps.InfoWindow({
          content: div,
        })

        marker.addListener('click', function () {
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
