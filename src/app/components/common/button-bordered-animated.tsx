'use client'

import { PropsWithChildren, type HTMLAttributes, type ButtonHTMLAttributes } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren
type LinkProps = HTMLAttributes<HTMLAnchorElement> & PropsWithChildren & { href: string }

export function ButtonBorderedAnimated({ children, onClick, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      onClick={onClick}
      className={cn(
        'group relative inline-block overflow-hidden transition-all bg-black/70 duration-500 hover:bg-black dark:bg-white/10 rounded flex justify-center items-center px-4 lg:px-12 py-3 text-sm font-medium text-white focus:outline-none active:text-white',
        className,
      )}
    >
      <span className="group-hover:w-full top-0 left-0 absolute dark:border-white border-t-2 border-black/70 transition-all duration-300 ease size-0"></span>
      <span className="group-hover:h-full top-0 right-0 absolute dark:border-white border-r-2 border-black/70 transition-all duration-300 ease size-0"></span>
      <span className="group-hover:w-full right-0 bottom-0 absolute dark:border-white border-b-2 border-black/70 transition-all duration-300 ease size-0"></span>
      <span className="group-hover:h-full bottom-0 left-0 absolute dark:border-white border-black/70 border-l-2 transition-all duration-300 ease size-0"></span>
      {children}
    </button>
  )
}

export function ButtonLinkBorderedAnimated({ children, href, className, ...props }: LinkProps) {
  return (
    <Link
      {...props}
      href={href}
      className={cn(
        'group relative inline-block overflow-hidden transition-all bg-black/70 duration-500 hover:bg-black dark:bg-white/10 rounded px-4 lg:px-12 py-3 flex justify-center items-center text-sm font-medium text-white focus:outline-none active:text-white',
        className,
      )}
    >
      <span className="group-hover:w-full top-0 left-0 absolute dark:border-white border-t-2 border-black/70 transition-all duration-300 ease size-0"></span>
      <span className="group-hover:h-full top-0 right-0 absolute dark:border-white border-r-2 border-black/70 transition-all duration-300 ease size-0"></span>
      <span className="group-hover:w-full right-0 bottom-0 absolute dark:border-white border-b-2 border-black/70 transition-all duration-300 ease size-0"></span>
      <span className="group-hover:h-full bottom-0 left-0 absolute dark:border-white border-black/70 border-l-2 transition-all duration-300 ease size-0"></span>
      {children}
    </Link>
  )
}
