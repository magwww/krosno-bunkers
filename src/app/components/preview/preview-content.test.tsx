import { render, screen, waitFor } from "@testing-library/react"
import PreviewContent from "./preview-content"
import { setupServer } from 'msw/node'
import { successPaymentIntent } from "./mock"

/* @TODO: Extract to Jest Setup to reuse between test
There is an issue with jest and TextEncoder.
Needs more investigation from that link:
https://mswjs.io/docs/faq/#requestresponsetextencoder-is-not-defined-jest
*/
export const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('PreviewContent', () => {
    describe('when bunker is passed', () => {
        it('it display bunker name in confirmation message', () => {
            server.use(successPaymentIntent)

            render(<PreviewContent bunker={{
                id: '5',
                longitude: 21.7680694093419,
                latitude: 49.690988867662234,
                capacity: 1,
                address: 'Naftowa 9',
                price: 200,
            }} />)

            expect(screen.getByText("You're just one click away from becoming the lucky owner of a spot in your chosen bunker:")).toBeInTheDocument()
            expect(screen.getByText('Naftowa 9')).toBeInTheDocument()
        })

        it('it shows checkout form', async () => {
            server.use(successPaymentIntent)

            render(<PreviewContent bunker={{
                id: '5',
                longitude: 21.7680694093419,
                latitude: 49.690988867662234,
                capacity: 1,
                address: 'Naftowa 9',
                price: 200,
            }} />)

            await waitFor(() => {
                /* @TODO: Assert Stripe Element existance aliging to testing-library convention.
                
                This might be helpful. Didn't check it yet:
                https://docs.stripe.com/stripe-apps/ui-testing
                */
                expect(document.querySelector('#payment-form')).toBeInTheDocument()
            })
        })
    })
})