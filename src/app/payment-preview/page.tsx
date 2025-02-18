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
  searchParams: Promise<{ [key: string]: string }>
}

export default async function PreviewPage(props: Props) {
  const searchParams = await props.searchParams
  const { id, count } = searchParams

  // TODO: handle it better
  if (!id) {
    return notFound()
  }

  const bunker = await getData(id)

  if (bunker.capacity < 1) {
    redirect('/')
  }

  return <PreviewContent {...{ bunker }} count={Number(count)} />
}
