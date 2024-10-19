export type Bunker = {
  id: string
  longitude: number
  latitude: number
  capacity: number | null
  address: string
  price: number
}

export type GroupedBunker = Pick<Bunker, 'id' | 'address'> & {
  count: number
}

export type MapElement = {
  id: string
  longitude: number
  latitude: number
  [key: string]: any
}
