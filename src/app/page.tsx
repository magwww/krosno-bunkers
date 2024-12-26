'use client'

import { ButtonLinkBorderedAnimated } from '@/app/components/common/button-bordered-animated'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export default function Home() {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 400)
  }, [])

  return (
    <main className="before:block relative z-10 before:z-[-5] before:absolute before:inset-0 before:content-[''] bg-home-hero before:bg-gradient-to-t before:from-black before:to-transparent bg-cover bg-no-repeat bg-center before:opacity-70 w-full min-h-[calc(100vh-64px)]">
      <div className="flex flex-col justify-center items-center p-10 lg:p-24 w-full min-h-[calc(100vh-64px)]">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.5 }}
          data-testid="home-header"
        >
          <h1 className="mb-16 p-2 rounded-md text-5xl text-center text-white/80 lg:text-6xl">
            Welcome to Krosno Bunkers
          </h1>
          <ButtonLinkBorderedAnimated
            href="/bunkers"
            className="justify-self-center bg-black/10 text-white/80 lg:text-md transition-all duration-700"
            data-testid="home-button"
          >
            Select your bunker
          </ButtonLinkBorderedAnimated>
        </motion.div>
      </div>
    </main>
  )
}
