import MyBunkers from '@/app/components/profile/my-bunkers'
import { render, screen } from '@testing-library/react'

it('renders no bunker spots purchased message when no bunkers are passed', async () => {
  render(<MyBunkers isLoading={false} bunkers={[]} />)

  const message = await screen.findByText(/You don't own any bunker spots yet/)
  expect(message).toBeInTheDocument()
})
