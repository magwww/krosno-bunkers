import MyBunkers from '@/app/components/profile/my-bunkers'
import { render, screen, within } from '@testing-library/react'
import { userBunkers } from '@/mocks/user-bunkers'

it('renders no bunker spots purchased message when no bunkers are passed and data is not loading', async () => {
  render(<MyBunkers isLoading={false} userBunkers={[]} />)

  const message = await screen.findByText(/You don't own any bunker spots yet/)
  expect(message).toBeInTheDocument()
})

it('renders list of 10 bunkers when 10 bunkers are passed and data is not loading', async () => {
  render(<MyBunkers isLoading={false} userBunkers={userBunkers} />)

  const firstBunker = await screen.findByText(/Staszica 12/)
  const secondBunker = await screen.findByText(/Kolejowa 8/)

  expect(firstBunker).toBeInTheDocument()
  expect(secondBunker).toBeInTheDocument()

  const list = screen.getByRole('list')
  const listItems = within(list).getAllByRole('listitem')

  expect(listItems).toHaveLength(10)
})
