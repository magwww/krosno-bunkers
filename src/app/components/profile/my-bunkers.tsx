import { Bunker } from '@/types'

export default function MyBunkers({ bunkers }: { bunkers: Bunker[] }) {
  return (
    <div className="flex flex-col w-full justify-center dark:text-white items-center">
      <p>Your bunkers:</p>
      <div>{bunkers?.map((bunker) => bunker.address)}</div>
    </div>
  )
}
