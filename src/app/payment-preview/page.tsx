import PreviewContent from '@/app/components/preview/preview-content'
import { notFound } from 'next/navigation'
import { redirect } from 'next/navigation'
import { api } from '@/app/api/client'

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

  // eslint-disable-next-line testing-library/no-await-sync-queries
  const { data: bunker } = await api.bunkers.getById(id)

  if (bunker.capacity < 1) {
    redirect('/')
  }

  return <PreviewContent {...{ bunker }} count={Number(count)} />
}
