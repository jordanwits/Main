"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useRef, Suspense } from "react"

// Create a component that uses useSearchParams inside
function ScrollToTopWithSearchParams() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Keep track of the previous path
  const prevPathRef = useRef<string | null>(null)

  useEffect(() => {
    // Create the full URL path including search params
    const url = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}`

    // Only scroll to top if the path has changed
    if (prevPathRef.current !== url) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // Use 'instant' to avoid visible scrolling
      })

      // Update the previous path
      prevPathRef.current = url
    }
  }, [pathname, searchParams])

  return null
}

// Create a fallback component for when the search params are loading
function ScrollToTopFallback() {
  return null // No visual fallback needed for this component
}

// Main component that wraps the search params component in Suspense
export function ScrollToTop() {
  return (
    <Suspense fallback={<ScrollToTopFallback />}>
      <ScrollToTopWithSearchParams />
    </Suspense>
  )
}
