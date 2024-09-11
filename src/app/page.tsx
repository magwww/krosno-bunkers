'use client'

import { ButtonLinkBorderedAnimated } from '@/app/components/common/button-bordered-animated'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function Home() {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 400)
  }, [])

  return (
    <main className="before:block relative z-10 before:z-[-5] before:absolute before:inset-0 before:content-[''] bg-home-hero before:bg-gradient-to-t before:from-black before:to-transparent bg-cover bg-no-repeat bg-center before:opacity-70 w-full min-h-[calc(100vh-64px)]">
      <div
        className={cn(
          'w-full p-10 lg:p-24 justify-center flex flex-col items-center min-h-[calc(100vh-64px)] transition-blur duration-1000',
          !isMounted && 'blur-sm',
        )}
      >
        <h1
          className={cn(
            'text-white mb-16 text-5xl text-center transition-text duration-1000 p-2 rounded-md',
            !isMounted && 'text-4xl',
          )}
          data-testid="home-header"
        >
          Welcome to Krosno Bunkers!
        </h1>{' '}
        <ButtonLinkBorderedAnimated
          href="/bunkers"
          className="bg-black/10 text-white transition-all duration-700"
          data-testid="home-button"
        >
          Select your bunker
        </ButtonLinkBorderedAnimated>
      </div>
    </main>
  )
}
