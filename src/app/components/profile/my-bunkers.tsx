import { Bunker, GroupedBunker } from '@/types'

export default function MyBunkers({ bunkers }: { bunkers: Bunker[] }) {
  const groupedBunkers: GroupedBunker[] = bunkers.reduce<GroupedBunker[]>((acc, current) => {
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
    <div className="flex flex-col w-full justify-center dark:text-white items-center">
      <p>Your bunkers:</p>
      {groupedBunkers.length ? (
        <ul>
          {groupedBunkers.map((bunker, index) => (
            <li key={`${index}-${bunker.id}`}>
              {bunker.address} - {bunker.count}
            </li>
          ))}
        </ul>
      ) : (
        <p>You don&apos;t own aby bunker spots yet</p>
      )}
    </div>
  )
}
