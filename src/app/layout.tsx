import type { Metadata } from 'next'
import { Anek_Latin } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import { ThemeProvider } from '@/components/common/theme-provider'
import Navigation from '@/components/common/navigation'
import { ClerkProvider } from '@clerk/nextjs'

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={anek.className}>
        <head />
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navigation />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
