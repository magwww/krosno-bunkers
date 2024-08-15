import Home from '@/app/page'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

test('renders welcome heading and select bunker button', () => {
  render(<Home />)

  const button = screen.getByRole('link', { name: 'Select your bunker' })

  expect(screen.getByText('Welcome to Krosno Bunkers!')).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(button).toHaveAttribute('href', '/bunkers')
})
