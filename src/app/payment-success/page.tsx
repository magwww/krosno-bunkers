import { ButtonLinkBorderedAnimated } from '@/app/components/common/button-bordered-animated'
import { routes } from '@/costs/routes'

export default function PaymentSuccess() {
  return (
    <main className="flex flex-col justify-center items-center px-4 w-full min-h-screen text-center">
      <span className="text-xl">Congrats!</span>
      <span className="mt-4 mb-10">You&apos;ve secured yourself a brand new spot(s) in a bunker.</span>
      <ButtonLinkBorderedAnimated href={routes.myBunkers}>Go see it</ButtonLinkBorderedAnimated>
    </main>
  )
}
