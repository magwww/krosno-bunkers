import { Prisma } from '@prisma/client'

export type Bunker = {
  id: string
  longitude: number
  latitude: number
  capacity: number | null
  initialCapacity: number
  address: string
  price: number
}

export type BunkerWithUsers = Prisma.BunkerGetPayload<{
  include: {
    users: {
      include: {
        user: true
      }
    }
  }
}>

export type GroupedBunker = Pick<Bunker, 'id' | 'address'> & {
  count: number
}

export type MapElement = {
  id: string
  longitude: number
  latitude: number
  [key: string]: any
}
