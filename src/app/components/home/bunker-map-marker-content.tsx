'use client'

import { type MapElement } from '@/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Counter from '@/app/components/common/counter'
import { useState } from 'react'
import { routes } from '@/costs/routes'

const BunkerMapMarkerContent = ({ bunker }: { bunker: MapElement }) => {
  const [count, setCount] = useState<number>(1)

  const spotsAvailable = bunker.capacity && bunker.capacity > 0

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p className="font-bold text-black text-lg">{bunker.address}</p>
      {bunker.capacity && (
        <div className="flex flex-col items-center gap-1 mb-2 text-black text-xs">
          <p className="mb-1 text-base underline">{bunker.price / 100} PLN</p>
          <p>Free spots: {bunker.capacity}</p>
          <p>Spots taken: {bunker.initialCapacity - bunker.capacity}</p>
        </div>
      )}
      {spotsAvailable ? (
        <>
          <Counter maxValue={bunker.capacity} {...{ count, setCount }} />
          <Link
            href={`${routes.paymentPreview}?id=${bunker.id}&count=${count}`}
            className="bg-black px-2 py-3 rounded font-semibold text-center text-white"
          >
            Buy spot in this bunker
          </Link>
        </>
      ) : (
        <Button disabled>There are no spots available in this bunker</Button>
      )}
    </div>
  )
}

export default BunkerMapMarkerContent
