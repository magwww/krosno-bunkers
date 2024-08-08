import MapSection from '@/app/components/home/map-section'

import { render, screen } from '@testing-library/react'

jest.mock('next/navigation', () => {
  return {
    __esModule: true,
    usePathname: () => ({
      pathname: '',
    }),
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
      get: () => {},
    }),
  }
})

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

test('given correct API KEY is passed from ENV, it renders google map', () => {
  process.env.NEXT_PUBLIC_MAPS_API_KEY = 'correct api key'
  render(<MapSection {...{ bunkers }} />)

  expect(screen.getByTestId('google-map')).toBeInTheDocument()
})

test('given no API KEY, it does not render google map', () => {
  process.env.NEXT_PUBLIC_MAPS_API_KEY = ''
  render(<MapSection {...{ bunkers }} />)

  expect(screen.getByTestId('no-google-map')).toBeInTheDocument()
  expect(screen.queryByTestId('google-map')).not.toBeInTheDocument()
})
