import { http, HttpResponse } from 'msw'

const apiBaseURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const successPaymentIntent = http.post(`${apiBaseURL}/api/create-payment-intent`, () => {
  return HttpResponse.json({
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
  })
})
