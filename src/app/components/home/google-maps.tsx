'use client'
import { Loader } from '@googlemaps/js-api-loader'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'
import { createRoot } from 'react-dom/client'
import { type Bunker } from '@/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

type Props = HTMLAttributes<HTMLDivElement> & {
  bunkers: Bunker[]
}

const InfoWindowContent = ({ bunker }: { bunker: Bunker }) => {
  const spotsAvailable = bunker.capacity > 0

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="text-black font-bold text-lg">{bunker.address}</p>
      {bunker.capacity && <p className="text-black text-xs mb-2">Free spots: {bunker.capacity}</p>}
      {spotsAvailable ? (
        <Link
          href={`/payment-preview?id=${bunker.id}`}
          className="bg-black rounded py-3 px-2 text-center font-semibold text-white"
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
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

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

      const createMarker = (
        bunker: Bunker,
        map: google.maps.Map,
        InfoWindow: google.maps.InfoWindow,
        isQueryMarker = false,
      ) => {
        let iconImg = document.createElement('img')
        iconImg.setAttribute('data-testid', 'google-map-marker')
        iconImg.src = '/bunker.png'
        iconImg.style.width = '2em'

        let pin = new google.maps.marker.PinElement({
          scale: 1.2,
          background: '#F7D32F',
          glyph: iconImg,
        })

        const div = document.createElement('div')
        div.setAttribute('data-testid', 'google-map-info-window')
        const root = createRoot(div)
        root.render(<InfoWindowContent bunker={bunker} />)

        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: +bunker.latitude, lng: +bunker.longitude },
          content: pin.element,
        })

        marker.addListener('click', () => {
          root.render(<InfoWindowContent bunker={bunker} />)
          InfoWindow.setContent(div)
          InfoWindow.setPosition(marker.position)
          InfoWindow.open(map, marker)
          router.push(`/bunkers?id=${bunker.id}`)
        })

        if (isQueryMarker) {
          InfoWindow.setContent(div)
          InfoWindow.setPosition(marker.position)
          InfoWindow.open(map, marker)
        }

        return marker
      }

      bunkers.forEach((bunker) => {
        createMarker(bunker, map, InfoWindow)
      })

      const bunkerFromQuery = bunkers.find((bunker) => bunker.id === id)

      if (bunkerFromQuery) {
        createMarker(bunkerFromQuery, map, InfoWindow, true)
      }
    }

    initializeMap()
  }, [])

  return (
    <div
      data-testid="google-map"
      className={cn(
        'lg:w-[600px] w-[300px] border border-2 [&_div.gm-style-iw-ch]:text-center [&_div.gm-style-iw-ch]:p-0 [&_div.gm-style-iw-chr]:text-black [&_div.gm-style-iw-chr]:font-bold [&_div.gm-style-iw-chr]:text-lg',
        className,
      )}
      ref={mapRef}
    />
  )
}
