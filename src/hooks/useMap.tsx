import { RefObject, useEffect, useRef, FC } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { type MapElement } from '@/types'
import { createRoot } from 'react-dom/client'
import { useSearchParams } from 'next/navigation'

const useMap = (
  elements: MapElement[],
  mapRef: RefObject<HTMLDivElement>,
  mapApiKey: string,
  Component: FC<{ bunker: MapElement }>,
  markerImgSrc: string,
) => {
  const mapInstance = useRef<google.maps.Map | null>(null)
  const router = useRouter()
  const { theme } = useTheme()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    const initializeMap = async () => {
      if (mapInstance.current) {
        mapInstance.current.setOptions({
          mapId: theme === 'light' ? '8ac85bf8cff53d33' : 'c55128c183c09ce2',
        })
      }
      const loader = new Loader({
        apiKey: mapApiKey as string,
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
        mapId: theme === 'light' ? '8ac85bf8cff53d33' : 'c55128c183c09ce2',
      }
      mapInstance.current = new Map(mapRef.current as HTMLDivElement, mapOptions)
      let InfoWindow = new google.maps.InfoWindow()

      const createMarker = (
        element: MapElement,
        map: google.maps.Map,
        InfoWindow: google.maps.InfoWindow,
        isQueryMarker = false,
      ) => {
        let iconImg = document.createElement('img')
        iconImg.setAttribute('data-testid', 'google-map-marker')
        iconImg.src = markerImgSrc || ''
        iconImg.style.width = '2em'
        let pin = new google.maps.marker.PinElement({
          scale: 1.2,
          background: '#F7D32F',
          glyph: iconImg,
        })
        const div = document.createElement('div')
        div.setAttribute('data-testid', 'google-map-info-window')
        const root = createRoot(div)
        root.render(<Component bunker={element} />)

        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: +element.latitude, lng: +element.longitude },
          content: pin.element,
        })
        marker.addListener('click', () => {
          root.render(<Component bunker={element} />)

          InfoWindow.setContent(div)
          InfoWindow.setPosition(marker.position)
          InfoWindow.open(map, marker)
          router.push(`/bunkers?id=${element.id}`)
        })
        if (isQueryMarker) {
          InfoWindow.setContent(div)
          InfoWindow.setPosition(marker.position)
          InfoWindow.open(map, marker)
        }
        return marker
      }
      elements.forEach((element) => {
        createMarker(element, mapInstance.current as google.maps.Map, InfoWindow)
      })
      const elementFromQuery = elements.find((element) => element.id === id)
      if (elementFromQuery) {
        createMarker(elementFromQuery, mapInstance.current as google.maps.Map, InfoWindow, true)
      }
    }

    initializeMap()
  }, [theme])
}

export default useMap
