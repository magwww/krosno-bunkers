import { Bunker, GroupedBunker } from '@/types'
import Loader from '@/app/components/common/loader'

type Props = {
  isLoading: boolean
  bunkers: Bunker[] | undefined
}

export default function MyBunkers({ bunkers, isLoading }: Props) {
  const groupedBunkers: GroupedBunker[] | undefined = bunkers?.reduce<GroupedBunker[]>((acc, current) => {
    const { id } = current
    const existing = acc.find((item) => item.id === id)

    if (existing) {
      existing.count++
    } else {
      acc.push({
        id,
        address: current.address,
        count: 1,
      })
    }

    return acc
  }, [])

  return (
    <div className="flex flex-col justify-center w-full">
      <h1 className="border-[#292524] pb-4 border-b font-bold text-[17px] dark:text-white">Your bunkers</h1>
      <div className="py-4 text-[13px] dark:text-white/70">
        {isLoading ? (
          <Loader className="size-6" />
        ) : bunkers && !bunkers.length ? (
          <p>You don&apos;t own any bunker spots yet</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {groupedBunkers?.map((bunker, index) => (
              <li key={`${index}-${bunker.id}`}>
                {bunker.address} - {bunker.count} {bunker.count > 1 ? 'spots' : 'spot'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
