'use client'

import { createContext, useContext, ReactNode } from 'react'
import { api, ApiClient } from '@/app/api/client'

const ApiClientContext = createContext<ApiClient | null>(null)

export const ApiClientProvider = ({ children }: { children: ReactNode }) => (
  <ApiClientContext.Provider value={api}>{children}</ApiClientContext.Provider>
)

export const useApiClient = (): ApiClient => {
  const context = useContext(ApiClientContext)
  if (!context) {
    throw new Error('useApiClient must be used within an ApiClientProvider')
  }
  return context
}
