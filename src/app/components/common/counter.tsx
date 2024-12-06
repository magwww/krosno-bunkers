'use client'
import { useState, type ChangeEvent } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  const ensurePositiveIntegerCount = (value: number | ((prevCount: number) => number)) => {
    setCount((prevCount) => {
      const calculatedValue = typeof value === 'function' ? value(prevCount) : value
      return Math.max(0, Math.floor(calculatedValue))
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
      setCount(0)
    }
  }

  return (
    <div className="flex">
      <input
        type="text"
        value={count}
        onChange={handleInputChange}
        aria-label="Counter value"
        className="max-w-20 bg-white px-2 py-1 outline-none rounded font-semibold text-center text-black border"
      />
      <button onClick={increment} className="bg-black px-2 py-1 rounded font-semibold text-center text-white">
        {' '}
        +{' '}
      </button>
      <button
        onClick={decrement}
        disabled={count === 0}
        className="bg-black px-2 py-1 rounded font-semibold text-center text-white"
      >
        {' '}
        -{' '}
      </button>
    </div>
  )
}
