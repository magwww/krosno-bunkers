import { cn } from '@/lib/utils'
import { type BunkerTierCard } from '@/types'

export default function BunkerTierCard({ title, description, features, isPopular = false }: BunkerTierCard) {
  return (
    <div
      className={cn(
        'bg-black text-white rounded-xl h-full shadow-sm shadow-white p-6 flex flex-col gap-4 relative justify-between transition-transform hover:scale-[1.02]',
        isPopular && 'ring-2 ring-yellow-400',
      )}
    >
      {isPopular && (
        <span className="absolute -top-4 lg:top-4 right-4 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>

      <ul className="list-disc pl-5 text-sm space-y-1">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <p className="font-semibold text-lg mt-4">From 2PLN</p>
    </div>
  )
}
