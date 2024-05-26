'use client'
import { type Bunker } from '@/types'
import { Loader } from '@googlemaps/js-api-loader'
import { useEffect, useRef } from 'react'

type Props = {
  bunkers: Bunker[]
}

export default function GoogleMaps({ bunkers }: Props) {
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

      bunkers.forEach((bunker: { latitude: number; longitude: number }) => {
        new Marker({
          map,
          position: { lat: bunker.latitude, lng: bunker.longitude },
        })
      })
    }

    initializeMap()
  }, [])

  return <div className="h-[600px] w-[600px] border border-2" ref={mapRef} />
}
