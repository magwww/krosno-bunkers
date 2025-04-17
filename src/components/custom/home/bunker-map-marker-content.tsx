'use client'

import { type MapElement } from '@/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Counter from '@/components/custom/common/counter'
import { useState } from 'react'
import { routes } from '@/costs/routes'

const BunkerMapMarkerContent = ({ element }: { element: MapElement }) => {
  const [count, setCount] = useState<number>(1)

  const spotsAvailable = element.capacity && Number(element.capacity) > 0

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p className="font-bold text-black text-lg">{element.address}</p>
      {element.capacity && element.price && element.initialCapacity && (
        <div className="flex flex-col items-center gap-1 mb-2 text-black text-xs">
          <p className="mb-1 text-base underline">{Number(element.price) / 100} PLN</p>
          <p>Free spots: {element.capacity}</p>
          <p>Spots taken: {Number(element.initialCapacity) - Number(element.capacity)}</p>
        </div>
      )}
      {spotsAvailable ? (
        <>
          <Counter maxValue={Number(element.capacity)} {...{ count, setCount }} />
          <Link
            href={`${routes.paymentPreview}?id=${element.id}&count=${count}`}
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
