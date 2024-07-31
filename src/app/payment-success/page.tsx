import { ButtonLinkBorderedAnimated } from '@/app/components/common/button-bordered-animated'

export default function PaymentSuccess() {
  return (
    <main className="min-h-screen w-full px-4 text-center flex flex-col items-center justify-center">
      <span className="text-xl">Congrats!</span>
      <span className="mt-4 mb-10">You&apos;ve secured yourself a brand new spot in a bunker.</span>
      <ButtonLinkBorderedAnimated href="/user-profile/my-bunkers">Go see it</ButtonLinkBorderedAnimated>
    </main>
  )
}
