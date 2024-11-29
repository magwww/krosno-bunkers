import PreviewContent from '@/app/components/preview/preview-content'
import { notFound } from 'next/navigation'
import { redirect } from 'next/navigation'
import { apiClient } from '../api/client'

async function getData(id: string) {
  const res = await apiClient.get(`/bunker/${id}`)

  if (!res.data) {
    throw new Error('Failed to fetch bunker')
  }

  return res.data
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export default async function PreviewPage({ searchParams }: Props) {
  const currSearchParams = await searchParams
  const id = Array.isArray(currSearchParams.id) ? currSearchParams.id[0] : currSearchParams.id

  // TODO: handle it better
  if (!id) {
    return notFound()
  }

  const bunker = await getData(id)

  if (bunker.capacity < 1) {
    redirect('/')
  }

  return <PreviewContent {...{ bunker }} />
}
