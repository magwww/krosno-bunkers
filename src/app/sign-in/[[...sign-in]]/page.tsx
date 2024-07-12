'use client'
import { useSearchParams } from 'next/navigation'
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect_url')

  return (
    <div className="min-h-screen w-full flex flex-col gap-7 items-center justify-center">
      {redirectUrl?.includes('payment-preview') && (
        <p className="text-xl">Aby kupić miejsce w bunkrze musisz się zalogować</p>
      )}
      <SignIn />
    </div>
  )
}
