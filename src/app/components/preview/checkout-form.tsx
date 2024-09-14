import { useEffect, FormEvent, useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { ButtonBorderedAnimated } from '@/app/components/common/button-bordered-animated'
import Loader from '@/app/components/common/loader'

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent) {
        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Payment succeeded!')
            break
          case 'processing':
            setMessage('Your payment is processing.')
            break
          case 'requires_payment_method':
            setMessage('Your payment was not successful, please try again.')
            break
          default:
            setMessage('Something went wrong.')
            break
        }
      }
    })
  }, [stripe])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success`,
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'An error occurred')
      } else {
        setMessage('An unexpected error occurred.')
      }
    }
    setIsLoading(false)
  }

  return (
    <form data-testid="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      <ButtonBorderedAnimated className="my-3 h-11" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">{isLoading ? <Loader className="mx-auto my-auto size-5" /> : 'Pay now'}</span>
      </ButtonBorderedAnimated>
      {message && (
        <div className="text-[#df1b41]" id="payment-message">
          {message}
        </div>
      )}
    </form>
  )
}
