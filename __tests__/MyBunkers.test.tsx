import MyBunkers from '@/app/components/profile/my-bunkers'
import { render, screen, within } from '@testing-library/react'
import { userBunkers } from '@/mocks/user-bunkers'
import { useUser } from '@clerk/clerk-react'
import { apiClient } from '@/app/api/client'

jest.mock('@clerk/clerk-react', () => ({
  useUser: jest.fn(),
}))

jest.mock('@/app/api/client', () => ({
  apiClient: {
    get: jest.fn(),
  },
}))

describe('MyBunkers', () => {
  beforeEach(() => {
    ;(useUser as jest.Mock).mockReturnValue({
      isSignedIn: true,
      user: { id: 'test-user-id' },
    })
  })

  it('renders no bunker spots purchased message when no bunkers are available', async () => {
    // Mock odpowiedzi API zwracającej pustą tablicę
    ;(apiClient.get as jest.Mock).mockResolvedValueOnce({
      data: { data: [] },
    })

    render(<MyBunkers />)

    const message = await screen.findByText(/You don't own any bunker spots yet/)
    expect(message).toBeInTheDocument()
  })

  it('renders list of 10 bunkers when bunkers are available', async () => {
    // Mock odpowiedzi API zwracającej przykładowe bunkry
    ;(apiClient.get as jest.Mock).mockResolvedValueOnce({
      data: { data: userBunkers },
    })

    render(<MyBunkers />)

    const firstBunker = await screen.findByText(/Staszica 12/)
    const secondBunker = await screen.findByText(/Kolejowa 8/)

    expect(firstBunker).toBeInTheDocument()
    expect(secondBunker).toBeInTheDocument()

    const list = screen.getByRole('list')
    const listItems = within(list).getAllByRole('listitem')

    expect(listItems).toHaveLength(10)
  })

  it('shows loader while fetching data', async () => {
    ;(apiClient.get as jest.Mock).mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 500)))

    render(<MyBunkers />)
    const loader = await screen.findByTestId('bunkers-list-loader')

    expect(loader).toBeInTheDocument()
  })
})
