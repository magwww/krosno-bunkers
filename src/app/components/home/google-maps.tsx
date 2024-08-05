'use client'
import { Loader } from '@googlemaps/js-api-loader'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'
import { createRoot } from 'react-dom/client'
import { type Bunker } from '@/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ButtonBorderedAnimated } from '@/app/components/common/button-bordered-animated'
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

      bunkers.forEach((bunker) => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: +bunker.latitude, lng: +bunker.longitude },
        })

        const div = document.createElement('div')
        const root = createRoot(div)

        const bunkerFromQuery = bunkers.find((bunker) => bunker.id === id)

        if (bunkerFromQuery) {
          const bunkerFromQueryMarker = new google.maps.marker.AdvancedMarkerElement({
            map,
            position: { lat: +bunkerFromQuery.latitude, lng: +bunkerFromQuery.longitude },
          })

          InfoWindow.setContent(div)
          InfoWindow.setPosition(bunkerFromQueryMarker.position)
          InfoWindow.open(map, bunkerFromQueryMarker)
        }

        root.render(<InfoWindowContent bunker={bunkerFromQuery || bunker} />)

        marker.addListener('click', function () {
          root.render(<InfoWindowContent bunker={bunker} />)

          InfoWindow.setContent(div)
          InfoWindow.setPosition(marker.position)
          InfoWindow.open(map, marker)
          router.push(`/bunkers?id=${bunker.id}`)
        })
      })
    }

    initializeMap()
  }, [])

  return (
    <>
      {process.env.NEXT_PUBLIC_MAPS_API_KEY ? (
        <div
          data-testid="google-map"
          className={cn(
            'lg:w-[600px] w-[300px] border border-2 [&_div.gm-style-iw-ch]:text-center [&_div.gm-style-iw-ch]:p-0 [&_div.gm-style-iw-chr]:text-black [&_div.gm-style-iw-chr]:font-bold [&_div.gm-style-iw-chr]:text-lg',
            className,
          )}
          ref={mapRef}
        />
      ) : (
        <div data-testid="no-google-map" className="flex flex-col items-center gap-4">
          <p className="text-lg bg-background/50 p-2 rounded-md">Oops! Looks like sth&apos;s wrong...</p>
          <ButtonBorderedAnimated
            onClick={() => window.location.reload()}
            className="dark:bg-black/50 transition-all duration-700"
          >
            Refresh page
          </ButtonBorderedAnimated>
        </div>
      )}
    </>
  )
}
