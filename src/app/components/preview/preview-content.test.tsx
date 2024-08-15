import { render, screen, waitFor } from '@testing-library/react'
import PreviewContent from './preview-content'
import { successPaymentIntent } from './mock'
import { server } from '@/mocks/node'
import { act } from 'react'

describe('PreviewContent', () => {
  describe('when bunker is passed', () => {
    it('it display bunker name in confirmation message', async () => {
      server.use(successPaymentIntent)

      await act(() =>
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
        ),
      )

      expect(
        screen.getByText("You're just one click away from becoming the lucky owner of a spot in your chosen bunker:"),
      ).toBeInTheDocument()
      expect(screen.getByText('Naftowa 9')).toBeInTheDocument()
    })

    it('it shows checkout form', async () => {
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
