'use client'

import * as React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { ModeToggle } from '@/components/ui/mode-toggle'

export default function Navigation() {
  return (
    <div className="w-full flex justify-end fixed backdrop-blur-sm bg-white/30 max-w-full shrink-0 py-4 px-8 shadow-lg">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-foreground">Your profile</NavigationMenuTrigger>
            <NavigationMenuContent className="left-0">
              <NavigationMenuLink asChild>
                <a
                  className="whitespace-nowrap flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href="/"
                >
                  Log in
                </a>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <a
                  className="whitespace-nowrap flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href="/"
                >
                  Sign in
                </a>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
