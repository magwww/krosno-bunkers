import { loadStripe } from '@stripe/stripe-js'
import PreviewContent from '@/app/components/preview/preview-content'
import { notFound } from 'next/navigation'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

async function getData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/bunker/${id}`)

  if (!res.ok) {
    throw new Error('Failed to fetch bunker')
  }

  return res.json()
}

type Props = {
  searchParams: { [key: string]: string | string[] }
}

export default async function PreviewPage({ searchParams }: Props) {
  const id = Array.isArray(searchParams.id) ? searchParams.id[0] : searchParams.id

  // TODO: handle it better
  if (!id) {
    return notFound()
  }

  const bunker = await getData(id)

  return <PreviewContent {...{ bunker }} />
}
