'use client'

import * as React from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu'
import { ModeToggle } from '@/components/ui/mode-toggle'
import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignedOut, SignUpButton, SignInButton, UserButton } from '@clerk/nextjs'

export default function Navigation() {
  return (
    <div className="z-30 fixed flex bg-white/30 shadow-lg backdrop-blur-sm px-2 lg:px-8 py-1 w-full max-w-full shrink-0">
      <NavigationMenu className="max-w-full [&>div]:w-full">
        <NavigationMenuList className="flex justify-between w-full max-w-full">
          <NavigationMenuItem className="shrink-0">
            <Link href="/" className="underline-none">
              <Image src="/bunker.png" width={56} height={56} alt="" className="size-14" />
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
                      userButtonOuterIdentifier: 'dark:text-white/80 order-last pl-0',
                      userButtonTrigger: 'focus:shadow-none',
                    },
                  }}
                />
              </SignedIn>
              <SignedOut>
                <div className="flex [&_button]:flex [&_button]:items-center gap-3 [&_button]:border-white/40 [&_button]:bg-black/20 [&_button]:px-4 [&_button]:py-2 [&_button]:border [&_button]:rounded">
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
