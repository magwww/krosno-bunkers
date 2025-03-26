import type { Metadata } from 'next'
import { Anek_Latin } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { ThemeProvider } from '@/app/components/common/theme-provider'
import Navigation from '@/app/components/common/navigation'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactQueryProvider from './react-query-provider'
import { cn } from '@/lib/utils'
import { ApiClientProvider } from '@/context/api-client-context'

const anek = Anek_Latin({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Know your Krosno Bunkers',
  description: 'Check greatest Krosno Bunkers near you',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn('snap-y', anek.className)}>
      <head />
      <body>
        <ApiClientProvider>
          <ReactQueryProvider>
            <ReactQueryDevtools />
            <ClerkProvider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    duration: 5000,
                    style: {
                      background: 'black',
                      color: '#fff',
                    },
                  }}
                />
                <Navigation />
                {children}
              </ThemeProvider>
            </ClerkProvider>
          </ReactQueryProvider>
        </ApiClientProvider>
      </body>
    </html>
  )
}
