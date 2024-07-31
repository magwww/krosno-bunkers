'use client'

import { ButtonLinkBorderedAnimated } from '@/components/common/button-bordered-animated'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function Home() {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 400)
  }, [])

  return (
    <main className="w-full bg-home-hero bg-cover bg-center bg-no-repeat min-h-[calc(100vh-64px)]">
      <div
        className={cn(
          'w-full p-24 justify-center flex flex-col items-center min-h-[calc(100vh-64px)] transition-blur duration-1000',
          !isMounted && 'blur-sm',
        )}
      >
        <p
          className={cn(
            'mb-16 text-5xl transition-text duration-1000 bg-background/50 p-2 rounded-md',
            !isMounted && 'text-4xl',
          )}
        >
          Welcome to Krosno Bunkers!
        </p>{' '}
        <ButtonLinkBorderedAnimated href="/bunkers" className="dark:bg-black/50 transition-all duration-700">
          Select your bunker
        </ButtonLinkBorderedAnimated>
      </div>
    </main>
  )
}
