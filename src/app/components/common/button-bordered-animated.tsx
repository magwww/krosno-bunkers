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
        'group relative inline-block overflow-hidden transition-all bg-black/10 duration-500 dark:hover:bg-black dark:bg-white/10 rounded px-12 py-3 text-sm font-medium dark:text-white focus:outline-none dark:active:text-white',
        className,
      )}
    >
      <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 dark:border-white border-black/70 transition-all duration-300 group-hover:w-full"></span>
      <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 dark:border-white border-black/70 transition-all duration-300 group-hover:h-full"></span>
      <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 dark:border-white border-black/70 transition-all duration-300 group-hover:w-full"></span>
      <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 dark:border-white border-black/70 transition-all duration-300 group-hover:h-full"></span>
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
        'group relative inline-block overflow-hidden transition-all bg-black/10 duration-500 dark:hover:bg-black dark:bg-white/10 rounded px-12 py-3 text-sm font-medium dark:text-white focus:outline-none dark:active:text-white',
        className,
      )}
    >
      <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 dark:border-white border-black/70 transition-all duration-300 group-hover:w-full"></span>
      <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 dark:border-white border-black/70 transition-all duration-300 group-hover:h-full"></span>
      <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 dark:border-white border-black/70 transition-all duration-300 group-hover:w-full"></span>
      <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 dark:border-white border-black/70 transition-all duration-300 group-hover:h-full"></span>
      {children}
    </Link>
  )
}
