import Home from '../src/app/page'
import { render, screen } from '@testing-library/react'

test('renders welcome heading and select bunker button', () => {
  render(<Home />)

  expect(screen.getByText('Welcome to Krosno Bunkers!')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Select your bunker' })).toBeInTheDocument()
})
