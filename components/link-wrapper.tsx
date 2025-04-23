"use client"

import Link from "next/link"
import type { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import type React from "react"

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
}

export function LinkWrapper({ href, children, className, ...props }: CustomLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // Navigate to the new page
    router.push(href.toString())

    // The browser will automatically position the new page at the top
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      scroll={true} // Ensure scroll behavior is enabled
      {...props}
    >
      {children}
    </Link>
  )
}
