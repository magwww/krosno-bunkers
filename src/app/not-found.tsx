import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex flex-col justify-center items-center px-4 w-full min-h-screen text-center">
      <h1 className="text-4xl">Not Found</h1>
      <Image src="/404-image.png" alt="404" className="my-10 rounded-3xl w-60 h-60" width={240} height={240} />
      <p className="mb-5">Nothing to see here</p>
      <Link href="/">Return Home</Link>
    </main>
  )
}
