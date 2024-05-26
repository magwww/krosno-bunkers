'use client'

import { Loader } from '@googlemaps/js-api-loader'
import { useEffect, useRef } from 'react'

export default function GoogleMaps() {
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
        zoom: 4,
        mapId: 'NEXT_MAPS',
      }

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions)
      const marker = new Marker({
        map,
        position: { lat: 49.69539181051453, lng: 21.754001577384994 },
      })
    }

    initializeMap()
  }, [])

  return <div className="h-[600px] w-[600px] border border-2" ref={mapRef} />
}
