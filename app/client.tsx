"use client"

import type React from "react"
import { Inter, STIX_Two_Text } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// Add this to the RootLayout component to ensure all pages scroll to top on navigation

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const stixTwoText = STIX_Two_Text({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable} ${stixTwoText.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ScrollToTop />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

// Add this component to handle scroll restoration
function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
