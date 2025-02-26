import MapSection from '@/app/components/home/map-section'
import { bunkers } from '@/mocks/bunkers'

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
