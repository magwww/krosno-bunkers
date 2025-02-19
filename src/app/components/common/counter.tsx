'use client'

import { type ChangeEvent, type Dispatch, type SetStateAction } from 'react'

type Props = {
  maxValue: number
  count: number
  setCount: Dispatch<SetStateAction<number>>
}

export default function Counter({ maxValue, count, setCount }: Props) {
  const ensurePositiveIntegerCount = (value: number | ((prevCount: number) => number)) => {
    setCount((prevCount) => {
      const calculatedValue = typeof value == 'function' ? value(prevCount) : value
      return Math.min(maxValue, Math.max(1, Math.floor(calculatedValue)))
    })
  }

  const increment = () => {
    ensurePositiveIntegerCount((prevCount) => prevCount + 1)
  }

  const decrement = () => {
    ensurePositiveIntegerCount((prevCount) => prevCount - 1)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const parsedValue = parseInt(value)
    if (!isNaN(parsedValue)) {
      ensurePositiveIntegerCount(parsedValue)
    } else if (value === '') {
      setCount(1)
    }
  }

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
