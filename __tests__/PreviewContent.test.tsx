import { render, screen } from '@testing-library/react'
import PreviewContent from '@/app/components/preview/preview-content'
import { successPaymentIntent } from '@/mocks/success-payment-intent'
import { server } from '@/mocks/node'

describe('PreviewContent', () => {
  beforeEach(() => server.use(successPaymentIntent))

  describe('when bunker is passed', () => {
    it('displays bunker name in confirmation message', async () => {
      render(
        <PreviewContent
          bunker={{
            id: '5',
            longitude: 21.7680694093419,
            latitude: 49.690988867662234,
            capacity: 1,
            address: 'Naftowa 9',
            price: 200,
          }}
        />,
      )

      const confirmationMessage = await screen.findByText(
        /You're just one click away from becoming the lucky owner of a spot in your chosen bunker:/,
      )
      expect(confirmationMessage).toBeInTheDocument()

      const bunkerName = await screen.findByText(/Naftowa 9/)
      expect(bunkerName).toBeInTheDocument()
    })

    it('shows checkout form', async () => {
      render(
        <PreviewContent
          bunker={{
            id: '5',
            longitude: 21.7680694093419,
            latitude: 49.690988867662234,
            capacity: 1,
            address: 'Naftowa 9',
            price: 200,
          }}
        />,
      )

      /* @TODO: Assert Stripe Element existance aliging to testing-library convention.
                
        This might be helpful. Didn't check it yet:
        https://docs.stripe.com/stripe-apps/ui-testing
        */

      const paymentForm = await screen.findByTestId('payment-form')
      expect(paymentForm).toBeInTheDocument()
    })
  })
})
