import { Prisma } from '@prisma/client'

export type Bunker = {
  id: string
  longitude: number
  latitude: number
  capacity: number
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

export type MapElement = {
  id: string
  longitude: number
  latitude: number
  [key: string]: string | number | null | undefined
}

export type UserBunker = {
  bunker: Bunker
  bunkerId: string
  count: number
  createdAt: string
  id: string
  userId: string
}
