import { type Dispatch, type SetStateAction } from 'react'
import useCounter from '@/hooks/useCounter'

type Props = {
  maxValue: number
  count: number
  setCount: Dispatch<SetStateAction<number>>
}

export default function Counter({ count, setCount, maxValue }: Props) {
  const { increment, decrement, handleInputChange } = useCounter({ maxValue, setCount })

  return (
    <div className="flex">
      <input
        inputMode="numeric"
        value={count}
        onChange={handleInputChange}
        aria-label="Counter value"
        className="bg-white px-2 py-1 border rounded max-w-20 font-semibold text-black text-center outline-none"
      />
      <button
        onClick={decrement}
        disabled={count == 1}
        className="bg-black px-2 py-1 rounded font-semibold text-center text-white/80"
      >
        {' '}
        -{' '}
      </button>
      <button
        onClick={increment}
        disabled={count == maxValue}
        className="bg-black px-2 py-1 rounded font-semibold text-center text-white/80"
      >
        {' '}
        +{' '}
      </button>
    </div>
  )
}
