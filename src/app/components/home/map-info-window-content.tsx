import { type Bunker } from '@/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const InfoWindowContent = ({ bunker }: { bunker: Bunker }) => {
  const spotsAvailable = bunker.capacity && bunker.capacity > 0

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p className="font-bold text-black text-lg">{bunker.address}</p>
      {bunker.capacity && <p className="mb-2 text-black text-xs">Free spots: {bunker.capacity}</p>}
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

export default InfoWindowContent
