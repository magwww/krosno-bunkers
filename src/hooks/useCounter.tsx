import { type ChangeEvent, type Dispatch, type SetStateAction } from 'react'

type Props = {
  maxValue: number
  setCount: Dispatch<SetStateAction<number>>
}

export default function useCounter({ maxValue, setCount }: Props) {
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

  return {
    increment,
    decrement,
    handleInputChange,
  }
}
