import { render, screen, waitFor } from '@testing-library/react'
import PreviewContent from '@/app/components/preview/preview-content'
import { successPaymentIntent } from '@/mocks/success-payment-intent'
import { server } from '@/mocks/node'

describe('PreviewContent', () => {
  describe('when bunker is passed', () => {
    it('displays bunker name in confirmation message', async () => {
      server.use(successPaymentIntent)

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

      await waitFor(() => {
        expect(
          screen.getByText("You're just one click away from becoming the lucky owner of a spot in your chosen bunker:"),
        ).toBeInTheDocument()
      })
      await waitFor(() => {
        expect(screen.getByText('Naftowa 9')).toBeInTheDocument()
      })
    })

    it('shows checkout form', async () => {
      server.use(successPaymentIntent)

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

      await waitFor(() => {
        /* @TODO: Assert Stripe Element existance aliging to testing-library convention.
                
                This might be helpful. Didn't check it yet:
                https://docs.stripe.com/stripe-apps/ui-testing
                */
        expect(screen.getByTestId('payment-form')).toBeInTheDocument()
      })
    })
  })
})
