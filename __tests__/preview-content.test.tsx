import { render, screen } from '@testing-library/react'
import PreviewContent from '@/app/components/preview/preview-content'
import { mockBunker } from '@/mocks/bunker'

jest.mock('@/app/actions', () => ({
  createPaymentIntent: jest.fn().mockResolvedValue({
    clientSecret: 'qwerty-123',
    order: {
      id: '132a7c1a-c0d7-4de4-a5a1-fe5af966abe9',
      createdAt: '2024-08-09T09:56:10.597Z',
      updatedAt: '2024-08-09T09:56:10.597Z',
      price: 200,
      userId: 'b13b311c-a0dd-4704-8882-37bcc6518f88',
      bunkerId: '6d9caa03-1048-4fec-b906-7f8bef4d3c23',
      paid: false,
      count: 1,
    },
  }),
}))

describe('PreviewContent', () => {
  it('displays bunker name in confirmation message', async () => {
    render(<PreviewContent bunker={mockBunker} count={1} />)

    const confirmationMessage = await screen.findByText(
      /You're just one click away from becoming the lucky owner of a spot in your chosen bunker:/,
    )
    expect(confirmationMessage).toBeInTheDocument()

    const bunkerName = await screen.findByText(/Naftowa 9/)
    expect(bunkerName).toBeInTheDocument()
  })

  it('shows checkout form', async () => {
    render(<PreviewContent bunker={mockBunker} count={1} />)

    const paymentForm = await screen.findByTestId('payment-form')
    expect(paymentForm).toBeInTheDocument()
  })
})
