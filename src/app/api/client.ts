import axios, { type AxiosRequestConfig } from 'axios'

const baseConfig = (override?: AxiosRequestConfig): AxiosRequestConfig => ({
  baseURL: override?.baseURL || `${process.env.NEXT_PUBLIC_APP_URL}/api`,
  headers: override?.headers || { Accept: 'application/json' },
})

const apiClient = axios.create(baseConfig())

export { apiClient }
