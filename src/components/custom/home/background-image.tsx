import Image from 'next/image'

export default function BackgroundImage() {
  return (
    <>
      <Image src="/hero-image.jpg" alt="" fill priority className="object-cover -z-10" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
    </>
  )
}
