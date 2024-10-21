import { type MapElement } from '@/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const BunkerMapMarkerContent = ({ bunker }: { bunker: MapElement }) => {
  const spotsAvailable = bunker.capacity && bunker.capacity > 0

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p className="font-bold text-black text-lg">{bunker.address}</p>
      {bunker.capacity && (
        <div className="flex flex-col items-center gap-1 mb-2 text-black text-xs">
          <p>Free spots: {bunker.capacity}</p>
          <p className="text-black text-xs">Spots taken: {bunker.initialCapacity - bunker.capacity}</p>
        </div>
      )}
      {spotsAvailable ? (
        <Link
          href={`/payment-preview?id=${bunker.id}`}
          className="bg-black px-2 py-3 rounded font-semibold text-center text-white"
        >
          Buy spot in this bunker
        </Link>
      ) : (
        <Button disabled>There are no spots available in this bunker</Button>
      )}
    </div>
  )
}

export default BunkerMapMarkerContent
