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
    <div className="flex flex-col w-full justify-center">
      <h1 className="dark:text-white text-[17px] font-bold pb-4 border-b border-[#292524]">Your bunkers</h1>
      <div className="py-4 text-[13px] dark:text-white/70">
        {groupedBunkers.length ? (
          <ul className="flex flex-col gap-2">
            {groupedBunkers.map((bunker, index) => (
              <li key={`${index}-${bunker.id}`}>
                {bunker.address} - {bunker.count} spot(s)
              </li>
            ))}
          </ul>
        ) : (
          <p>You don&apos;t own aby bunker spots yet</p>
        )}
      </div>
    </div>
  )
}
