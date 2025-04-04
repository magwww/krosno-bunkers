import axios, { type AxiosResponse, type AxiosRequestConfig } from 'axios'
import { type UserBunker, type Bunker, BunkerWithUsers } from '@/types'

const baseConfig = (override?: AxiosRequestConfig): AxiosRequestConfig => ({
  baseURL: override?.baseURL || `${process.env.NEXT_PUBLIC_APP_URL}/api`,
  headers: override?.headers || { Accept: 'application/json' },
})

const httpClient = axios.create(baseConfig())

export const createApi = (client = httpClient) => ({
  bunkers: {
    getAll: async (override?: AxiosRequestConfig): Promise<AxiosResponse<Bunker[]>> => {
      const { data } = await client.get('/bunkers', override)
      return data
    },
    getById: async (id: string, override?: AxiosRequestConfig): Promise<AxiosResponse<BunkerWithUsers>> => {
      const { data } = await client.get(`/bunker/${id}`, override)
      return data
    },
    getUserBunkersById: async (id: string, override?: AxiosRequestConfig): Promise<AxiosResponse<UserBunker[]>> => {
      const { data } = await client.get(`/get-user-bunkers?userId=${id}`, override)
      return data
    },
  },
})

export const api = createApi(httpClient)

export type ApiClient = ReturnType<typeof createApi>
