import type React from "react"
import type { Metadata } from "next"
import { Inter, STIX_Two_Text } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"

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

export const metadata: Metadata = {
  title: "Jordan Witbeck Designs | UI/UX Design Studio",
  description: "UI/UX Design Studio for Digital Products. We craft digital experiences that inspire.",
  openGraph: {
    title: "Jordan Witbeck Designs | UI/UX Design Studio",
    description:
      "I design intuitive interfaces and seamless user experiences that elevate your brand and delight your users.",
    images: [
      {
        url: "/website-cover-jwd.png",
        width: 1200,
        height: 630,
        alt: "Jordan Witbeck Designs - Thoughtful Design Tailored To You",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jordan Witbeck Designs | UI/UX Design Studio",
    description:
      "I design intuitive interfaces and seamless user experiences that elevate your brand and delight your users.",
    images: ["/website-cover-jwd.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
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
