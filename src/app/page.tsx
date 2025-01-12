'use client'

import { ButtonLinkBorderedAnimated } from '@/app/components/common/button-bordered-animated'
import { routes } from '@/costs/routes'
import { motion, useScroll, useSpring } from 'framer-motion'
import BunkerImage from './components/home/bunker-image'
import { homeBunkers } from '@/data/home-bunkers'

export default function Home() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <main className="before:block relative z-10 before:z-[-5] before:absolute before:inset-0 before:content-[''] bg-home-hero before:bg-gradient-to-t before:from-black before:to-transparent bg-cover bg-no-repeat bg-center before:opacity-70 w-full h-[calc(100vh-64px)]">
      <div className="flex flex-col justify-center items-center p-10 lg:p-24 w-full h-[calc(100vh-64px)]">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 1 }}
          data-testid="home-header"
        >
          <h1 className="mb-16 p-2 rounded-md text-5xl text-center text-white/80 lg:text-6xl">
            Welcome to Krosno Bunkers
          </h1>
        </motion.div>
      </div>
      <div className="flex flex-col justify-center items-center p-10 lg:p-24 lg:pt-0">
        <p className="lg:my-14 mb-14 text-4xl text-center">Step into one of the bunkers</p>
        <p className="text-center text-xl">You&apos;ve got some to choose from. Let&apos;s see...</p>
        <div className="w-full">
          {homeBunkers.map((image) => (
            <BunkerImage key={image.name} {...{ image }} />
          ))}
          <motion.div className="progress" style={{ scaleX }} />
        </div>
        <div className="flex flex-col justify-center items-center my-10 text-center text-lg lg:text-left">
          <span>Many more bunkers are awaiting you.</span>
          <span>And those are all real life images from Krosno. Can you imagine?</span>
          <span>But more important question is...</span>
        </div>
        <p className="mb-10 text-3xl text-center lg:text-left">Which one will you choose?</p>
        <ButtonLinkBorderedAnimated
          href={routes.bunkers}
          className="justify-self-center bg-black/10 text-white/80 lg:text-md transition-all duration-700"
          data-testid="home-button"
        >
          Select your bunker
        </ButtonLinkBorderedAnimated>
      </div>
    </main>
  )
}
