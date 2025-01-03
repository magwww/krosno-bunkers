import { RefObject, useEffect, useRef, FC } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { type MapElement } from '@/types'
import { createRoot, Root } from 'react-dom/client'
import { useSearchParams } from 'next/navigation'
import { routes } from '@/costs/routes'

const useMap = (
  elements: MapElement[],
  mapRef: RefObject<HTMLDivElement>,
  mapApiKey: string,
  Component: FC<{ element: MapElement }>,
  markerImgSrc: string,
) => {
  const mapInstance = useRef<google.maps.Map | null>(null)
  const router = useRouter()
  const { theme } = useTheme()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const createInfoWindowContent = (element: MapElement, Component: FC<{ element: MapElement }>) => {
    const div = document.createElement('div')
    div.setAttribute('data-testid', 'google-map-info-window')
    const root = createRoot(div)
    root.render(<Component element={element} />)
    return { div, root }
  }

  const createMarkerIcon = (markerImgSrc: string) => {
    const iconImg = document.createElement('img')
    iconImg.setAttribute('data-testid', 'google-map-marker')
    iconImg.src = markerImgSrc || ''
    iconImg.style.width = '2em'
    return new google.maps.marker.PinElement({
      scale: 1.2,
      background: '#F7D32F',
      glyph: iconImg,
    })
  }

  const createMarker = (
    element: MapElement,
    map: google.maps.Map,
    infoWindow: google.maps.InfoWindow,
    isQueryMarker = false,
  ) => {
    const pin = createMarkerIcon(markerImgSrc)
    const { div, root } = createInfoWindowContent(element, Component)

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat: +element.latitude, lng: +element.longitude },
      content: pin.element,
    })

    const handleMarkerClick = (
      marker: google.maps.marker.AdvancedMarkerElement,
      element: MapElement,
      infoWindow: google.maps.InfoWindow,
      map: google.maps.Map,
      root: Root,
      div: HTMLDivElement,
    ) => {
      root.render(<Component element={element} />)
      infoWindow.setContent(div)
      infoWindow.setPosition(marker.position)
      infoWindow.open(map, marker)
      router.push(`${routes.bunkers}?id=${element.id}`)
    }

    marker.addListener('click', () => {
      handleMarkerClick(marker, element, infoWindow, map, root, div)
    })
    if (isQueryMarker) {
      infoWindow.setContent(div)
      infoWindow.setPosition(marker.position)
      infoWindow.open(map, marker)
    }
    return marker
  }

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
    const infoWindow = new google.maps.InfoWindow()

    elements.forEach((element) => {
      createMarker(element, mapInstance.current as google.maps.Map, infoWindow)
    })
    const elementFromQuery = elements.find((element) => element.id === id)
    if (elementFromQuery) {
      createMarker(elementFromQuery, mapInstance.current as google.maps.Map, infoWindow, true)
    }
  }

  useEffect(() => {
    initializeMap()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])
}

export default useMap
