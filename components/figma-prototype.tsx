"use client"

import { useState, useEffect, useRef } from "react"

interface FigmaPrototypeProps {
  embedUrl: string
  title: string
  height?: string
  fallbackImageUrl?: string
}

export function FigmaPrototype({ embedUrl, title, height = "700px", fallbackImageUrl }: FigmaPrototypeProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 2

  // Function to handle iframe load success
  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  // Function to handle iframe load error
  const handleError = () => {
    setIsLoading(false)
    setHasError(true)

    // Retry loading if we haven't exceeded max retries
    if (retryCount < maxRetries) {
      setRetryCount((prev) => prev + 1)
      setIsLoading(true)

      // Small delay before retry
      setTimeout(() => {
        if (iframeRef.current) {
          // Force reload by updating the src
          const currentSrc = iframeRef.current.src
          iframeRef.current.src = ""
          setTimeout(() => {
            if (iframeRef.current) {
              iframeRef.current.src = currentSrc
            }
          }, 100)
        }
      }, 1000)
    }
  }

  // Effect to monitor iframe loading status
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // If still loading after 10 seconds, consider it failed
      if (isLoading) {
        setIsLoading(false)
        setHasError(true)
      }
    }, 10000)

    // Add mobile-specific adjustments
    const handleResize = () => {
      if (iframeRef.current) {
        // On mobile devices, add extra height to account for Figma UI elements
        if (window.innerWidth < 768) {
          iframeRef.current.style.height = `calc(${height} + 80px)`
        } else {
          iframeRef.current.style.height = height
        }
      }
    }

    // Initial call and event listener
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
    }
  }, [isLoading, height])

  return (
    <div className="w-full rounded-lg overflow-hidden border border-border/30 bg-card/50 relative">
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FFD166] border-t-transparent"></div>
            <p className="text-muted-foreground">Loading prototype...</p>
          </div>
        </div>
      )}

      {/* Error state with fallback image */}
      {hasError && fallbackImageUrl && (
        <div className="w-full">
          <img src={fallbackImageUrl || "/placeholder.svg"} alt={title} className="w-full h-auto rounded-lg" />
          <div className="p-4 text-center">
            <p className="text-muted-foreground">
              Interactive prototype couldn't be loaded. Showing preview image instead.
            </p>
          </div>
        </div>
      )}

      {/* Error state without fallback image */}
      {hasError && !fallbackImageUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-card">
          <div className="flex flex-col items-center gap-4 p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 text-[#FFD166]"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3 className="text-xl font-bold">Prototype Unavailable</h3>
            <p className="text-muted-foreground">
              The interactive prototype couldn't be loaded. Please check back later or contact the designer for access.
            </p>
          </div>
        </div>
      )}

      {/* The iframe - always render it but hide if there's an error */}
      <iframe
        ref={iframeRef}
        src={embedUrl}
        title={title}
        className={`w-full ${hasError ? "hidden" : ""}`}
        style={{ border: "none", overflow: "hidden" }}
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}
