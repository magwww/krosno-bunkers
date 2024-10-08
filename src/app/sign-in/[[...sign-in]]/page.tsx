'use client'
import { useSearchParams } from 'next/navigation'
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url')

  return (
    <main className="min-h-screen w-full flex flex-col gap-7 items-center justify-center pt-24 pb-8">
      {redirectUrl?.includes('payment-preview') && (
        <p className="text-xl">You need to log in to buy spot in this bunker.</p>
      )}
      <SignIn />
    </main>
  )
}
