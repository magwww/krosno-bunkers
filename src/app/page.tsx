'use client'

import { ButtonLinkBorderedAnimated } from '@/app/components/common/button-bordered-animated'
import { routes } from '@/costs/routes'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Loader from '@/app/components/common/loader'
import BackgroundImage from './components/home/background-image'
import BunkerTierCard from '@/app/components/home/bunker-tier-card'
import { bunkerTiers } from '@/data/bunker-tiers'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.5,
      ease: 'easeInOut',
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: 'easeOut',
    },
  },
}

export default function Home() {
  const [loaderVisible, setLoaderVisible] = useState<boolean>(false)

  return (
    <main className="relative w-full h-[calc(100vh-64px)]">
      <BackgroundImage />
      <div className="relative flex flex-col justify-center items-center p-6 lg:p-24 w-full h-[calc(100vh-64px)]">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 1 }}
          data-testid="home-header"
          className="max-w-screen-sm"
        >
          <h1 className="mb-10 p-2 rounded-md text-5xl text-center text-white/80 lg:text-6xl">Secure Your Future.</h1>
        </motion.div>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-screen-sm"
        >
          <h1 className="mb-10 p-2 rounded-md text-5xl text-center text-white/80 lg:text-6xl">Underground.</h1>
        </motion.div>
      </div>
      <div className="flex flex-col justify-center items-center p-10 lg:p-24 lg:pt-0">
        <p className="lg:mt-24 text-lg lg:text-xl text-center lg:max-w-xl lg:leading-10">
          Discover your personal bunker – tailored for safety, comfort, and peace of mind. Whether you&apos;re preparing
          for tomorrow or investing in today, your haven awaits beneath the surface.
        </p>

        <motion.div
          className="lg:my-24 grid grid-cols-1 md:grid-cols-3 gap-6 my-14 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {bunkerTiers.map((tier) => (
            <motion.div key={tier.title} variants={cardVariants}>
              <BunkerTierCard {...tier} />
            </motion.div>
          ))}
        </motion.div>

        <p className="mb-10 text-3xl text-center lg:text-left">Which one will you choose?</p>
        <ButtonLinkBorderedAnimated
          onClick={() => setLoaderVisible(true)}
          href={routes.bunkers}
          className="justify-self-center bg-black/10 text-white/80 lg:text-md transition-all duration-700"
          data-testid="home-button"
        >
          {loaderVisible ? <Loader className="mx-auto my-auto size-5" /> : 'Browse Bunkers'}
        </ButtonLinkBorderedAnimated>
      </div>
    </main>
  )
}
