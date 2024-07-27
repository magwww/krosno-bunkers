'use client'

import * as React from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu'
import { ModeToggle } from '@/components/ui/mode-toggle'
import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignedOut, SignUpButton, SignInButton, UserButton } from '@clerk/nextjs'

export default function Navigation() {
  return (
    <div className="w-full flex fixed backdrop-blur-sm bg-white/30 max-w-full shrink-0 py-1 px-2 lg:px-8 shadow-lg z-30">
      <NavigationMenu className="max-w-full [&>div]:w-full">
        <NavigationMenuList className="w-full max-w-full flex justify-between">
          <NavigationMenuItem className="shrink-0">
            <Link href="/" className="underline-none">
              <Image src="/bunker.png" width={56} height={56} alt="" className="h-14 w-14" />
            </Link>
          </NavigationMenuItem>
          <div className="flex items-stretch gap-3">
            <NavigationMenuItem className="flex items-center px-4">
              <SignedIn>
                <UserButton
                  showName
                  userProfileUrl="/user-profile"
                  userProfileMode="navigation"
                  appearance={{
                    elements: {
                      userButtonOuterIdentifier: 'dark:text-white order-last pl-0',
                      userButtonTrigger: 'focus:shadow-none',
                    },
                  }}
                />
              </SignedIn>
              <SignedOut>
                <div className="flex gap-3 [&_button]:py-2 [&_button]:px-4 [&_button]:rounded [&_button]:flex [&_button]:items-center [&_button]:bg-black/20 [&_button]:border [&_button]:border-white/40">
                  <SignInButton />
                  <SignUpButton />
                </div>
              </SignedOut>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex items-center">
              <ModeToggle />
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
