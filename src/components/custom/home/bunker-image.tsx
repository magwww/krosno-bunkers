import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import useParallax from '@/hooks/useParallax'
import Image from 'next/image'
import Link from 'next/link'
import { routes } from '@/costs/routes'

type BunkerImage = {
  name: string
  url: string
  alt: string
  description: string
  id: string
}

const BunkerImage = ({ image }: { image: BunkerImage }) => {
  const { name, url, alt, description, id } = image
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 300)

  return (
    <section className="relative flex flex-col justify-center items-center snap-center h-screen perspective-normal">
      <p className="mb-5 font-bold text-2xl text-center text-white">{name}</p>
      <Link
        href={`${routes.paymentPreview}?id=${id}&count=1`}
        ref={ref}
        className="relative m-5 w-[300px] h-[400px] max-h-[90vh] overflow-hidden"
      >
        <Image
          src={`/${url}.png`}
          alt={alt}
          width={300}
          height={400}
          className="top-0 right-0 bottom-0 left-0 absolute w-full h-full"
        />
      </Link>
      <motion.h2
        style={{ y }}
        className="bottom-[105px] lg:bottom-auto lg:left-[calc(50%+200px)] absolute max-w-[200px] text-center lg:text-left"
      >
        {description}
      </motion.h2>
    </section>
  )
}

export default BunkerImage
