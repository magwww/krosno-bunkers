import MapSection from '@/app/components/home/map-section'

import { render, screen } from '@testing-library/react'

//TODO: mock data fetching
const bunkers = [
  {
    id: '1',
    longitude: 21.7680694093419,
    latitude: 49.690988867662234,
    capacity: 1,
    address: 'Staszica 12',
    price: 200,
  },
  {
    id: '2',
    longitude: 21.7680694093419,
    latitude: 49.690988867662234,
    capacity: 1,
    address: 'Kolejowa 8',
    price: 200,
  },
  {
    id: '3',
    longitude: 21.7680694093419,
    latitude: 49.690988867662234,
    capacity: 1,
    address: 'Kolejowa 10',
    price: 200,
  },
  {
    id: '4',
    longitude: 21.7680694093419,
    latitude: 49.690988867662234,
    capacity: 1,
    address: 'Kolejowa 14',
    price: 200,
  },
  {
    id: '5',
    longitude: 21.7680694093419,
    latitude: 49.690988867662234,
    capacity: 1,
    address: 'Naftowa 9',
    price: 200,
  },
  {
    id: '6',
    longitude: 21.7680694093419,
    latitude: 49.690988867662234,
    capacity: 1,
    address: 'Naftowa 17/3',
    price: 200,
  },
  {
    id: '7',
    longitude: 21.7680694093419,
    latitude: 49.690988867662234,
    capacity: 1,
    address: 'Naftowa 17/5',
    price: 200,
  },
  {
    id: '8',
    longitude: 21.7680694093419,
    latitude: 49.690988867662234,
    capacity: 1,
    address: 'Wolności 3',
    price: 200,
  },
  {
    id: '9',
    longitude: 21.7680694093419,
    latitude: 49.690988867662234,
    capacity: 1,
    address: 'Kletówki 27a',
    price: 200,
  },
  {
    id: '10',
    longitude: 21.7680694093419,
    latitude: 49.690988867662234,
    capacity: 1,
    address: 'Naftowa 8',
    price: 200,
  },
]

test('renders google map', () => {
  render(<MapSection {...{ bunkers }} />)

  expect(screen.getByTestId('google-map')).toBeInTheDocument()
})

test('does not render google map without API key', () => {
  render(<MapSection {...{ bunkers }} />)

  expect(screen.queryByTestId('no-google-map')).not.toBeInTheDocument()
  expect(screen.getByTestId('google-map')).toBeInTheDocument()
})

test('enders 10 google maps markers', async () => {
  render(<MapSection {...{ bunkers }} />)

  const mapContainer = document.querySelector('div[data-testid="google-map"]')

  mapContainer?.querySelectorAll('div[role=button]').forEach((marker) => {
    expect(marker).toHaveLength(bunkers.length)
  })
})
