"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useInView } from "framer-motion"
import { LogoModern } from "@/components/logo-modern"
import { useIsMobile } from "@/hooks/use-mobile"
import { FigmaPrototype } from "@/components/figma-prototype"
import { ContactForm } from "@/components/contact-form"

// Reusable section component with fade-in animation
const Section = ({
  id,
  className = "",
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) => {
  const isMobile = useIsMobile()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, {
    amount: isMobile ? 0.05 : 0.2, // Lower threshold for mobile devices
    once: false,
  })

  return (
    <section id={id} ref={sectionRef} className={`w-full py-16 md:py-24 ${className}`}>
      <div
        className={`container max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 fade-in-up ${isInView ? "visible" : ""}`}
      >
        {children}
      </div>
    </section>
  )
}

// Image showcase component
const ImageShowcase = ({
  src,
  alt,
  caption,
  priority = false,
  className = "",
}: {
  src: string
  alt: string
  caption?: string
  priority?: boolean
  className?: string
}) => {
  const imageRef = useRef(null)
  const isInView = useInView(imageRef, {
    amount: 0.1,
    once: false,
  })

  return (
    <div ref={imageRef} className={`fade-in-up ${isInView ? "visible" : ""} ${className}`}>
      <div className="overflow-hidden rounded-lg border border-border/30 bg-card/50">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={1200}
          height={800}
          className="w-full h-auto object-cover"
          priority={priority}
        />
      </div>
      {caption && <p className="text-sm text-muted-foreground mt-3 text-center">{caption}</p>}
    </div>
  )
}

// Process step component
const ProcessStep = ({ number, title, description }: { number: number; title: string; description: string }) => {
  const stepRef = useRef(null)
  const isInView = useInView(stepRef, {
    amount: 0.3,
    once: false,
  })

  return (
    <div ref={stepRef} className={`fade-in-up ${isInView ? "visible" : ""} `}>
      <div className="flex items-start gap-6">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold"
          style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
        >
          {number}
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  )
}

// Stat component
const Stat = ({ value, label }: { value: string; label: string }) => {
  const statRef = useRef(null)
  const isInView = useInView(statRef, {
    amount: 0.3,
    once: false,
  })

  return (
    <div ref={statRef} className={`fade-in-up ${isInView ? "visible" : ""} `}>
      <div className="text-center p-6 rounded-lg border border-border/30 bg-card/50">
        <div className="text-4xl font-bold mb-2" style={{ color: "#FFD166" }}>
          {value}
        </div>
        <div className="text-sm text-muted-foreground uppercase tracking-wider">{label}</div>
      </div>
    </div>
  )
}

// Figma Logo component
const FigmaLogo = ({ className = "h-6 w-6" }: { className?: string }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 38 57" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z"
        fill="#1ABCFE"
      />
      <path
        d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z"
        fill="#0ACF83"
      />
      <path
        d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z"
        fill="#FF7262"
      />
      <path
        d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z"
        fill="#F24E1E"
      />
      <path
        d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z"
        fill="#A259FF"
      />
    </svg>
  )
}

// App screen mockup component
const AppScreenMockup = ({
  src,
  alt,
  title,
  description,
}: { src: string; alt: string; title: string; description: string }) => {
  const isMobile = useIsMobile()
  const mockupRef = useRef(null)
  const isInView = useInView(mockupRef, {
    amount: isMobile ? 0.05 : 0.2, // Lower threshold for mobile devices
    once: false,
  })

  return (
    <div ref={mockupRef} className={`fade-in-up ${isInView ? "visible" : ""}`}>
      <div className="flex flex-col h-full">
        <div className="mb-4 flex justify-center">
          <div className="relative w-64 overflow-hidden rounded-3xl border-4 border-[#1b1b1b] shadow-lg">
            <Image src={src || "/placeholder.svg"} alt={alt} width={400} height={800} className="w-full h-auto" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
        <p className="text-muted-foreground text-center text-sm">{description}</p>
      </div>
    </div>
  )
}

// Video player component that plays once when in view
const VideoPlayer = ({ src, className = "" }: { src: string; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, {
    amount: 0.3,
    once: false,
  })

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }, [isInView])

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-black">
      <video ref={videoRef} src={src} className={className} playsInline muted loop={false} controls={false} />
    </div>
  )
}

export default function GreyhoundCase() {
  const isMobile = useIsMobile()
  const [animationsEnabled, setAnimationsEnabled] = useState(false)
  const contactRef = useRef(null)
  const isContactInView = useInView(contactRef, {
    amount: 0.1,
    once: false,
  })

  // Anti-flicker effect for animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationsEnabled(true)
    }, 800)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Function to render the logo
  const renderLogo = (className = "h-10 w-10") => {
    return <LogoModern className={className} color="#FFD166" />
  }

  // Function to determine if animations should be shown
  const shouldAnimate = (isVisible: boolean) => {
    return animationsEnabled && isVisible
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="fixed top-0 z-40 w-full border-b border-border/10">
        {/* Blur effect overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(27, 27, 27, 0.5)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        ></div>

        {/* Header content */}
        <div className="container relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-3 group" scroll={false}>
              <div className="transition-transform duration-500 ease-in-out transform group-hover:rotate-180">
                {renderLogo("h-10 w-10")}
              </div>
              <span className="text-xl font-bold tracking-tight" style={{ color: "#f2f2f2" }}>
                Jordan Witbeck Designs
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="border-[#FFD166] text-[#FFD166] outline-button">
              <Link href="/" scroll={false}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-40 overflow-hidden relative">
          {/* Hero background image preloaded with Next.js Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/greyhound-hero.png"
              alt="Greyhound hero background"
              fill
              priority
              className="object-cover"
              style={{ opacity: 0.4 }}
            />
            <div className="absolute inset-0 bg-[#1b1b1b]/40" />
          </div>
          {/* Rest of the content */}
          <div className="container max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 relative z-10">
            <div className="max-w-2xl">
              <div className="mb-4 text-sm text-[#FFD166] font-medium">CASE STUDY</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-normal mb-6">
                Greyhound Mobile App Redesign
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                A comprehensive mobile app redesign for Greyhound bus services, improving the booking experience with an
                intuitive interface that increased conversion rates by 32%.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="px-3 py-1 rounded-full text-sm bg-[#FFD166]/10 text-[#FFD166]">UX Research</span>
                <span className="px-3 py-1 rounded-full text-sm bg-[#FFD166]/10 text-[#FFD166]">UI Design</span>
                <span className="px-3 py-1 rounded-full text-sm bg-[#FFD166]/10 text-[#FFD166]">Mobile App</span>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <Section id="overview" className="bg-[#1E1E1E]">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-normal mb-6">Project Overview</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Greyhound, America's iconic intercity bus service, faced challenges with their outdated mobile app that
                was causing frustration for users and resulting in lost bookings. The company needed a comprehensive
                redesign to improve the user experience, increase conversion rates, and modernize their digital
                presence.
              </p>
              <p className="text-lg text-muted-foreground">
                I was tasked with completely reimagining the Greyhound mobile app experience, focusing on simplifying
                the booking process, improving navigation, and creating a visually appealing interface that aligned with
                Greyhound's brand identity while meeting modern design standards. (not affiliated with Greyhound)
              </p>
            </div>
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-sm font-medium uppercase tracking-wider text-[#FFD166]">Project</h3>
                <p className="text-lg">Greyhound Redesign</p>
                <p className="text-lg text-muted-foreground text-sm">(not affiliated with Greyhound)</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium uppercase tracking-wider text-[#FFD166]">Date</h3>
                <p className="text-lg">Sep-Oct 2024</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium uppercase tracking-wider text-[#FFD166]">Scope of Work</h3>
                <p className="text-lg">User Research</p>
                <p className="text-lg">Research Synthesis</p>
                <p className="text-lg">Product Design</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium uppercase tracking-wider text-[#FFD166]">Tools Used</h3>
                <div className="flex items-center">
                  <FigmaLogo className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Challenge Section */}
        <Section id="challenge">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-normal mb-6">The Challenge</h2>
            <p className="text-xl text-muted-foreground">
              The Greyhound mobile app redesign presented several significant challenges:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-border/30 bg-card/50">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg mb-4"
                style={{ backgroundColor: "rgba(255, 209, 102, 0.1)", color: "#FFD166" }}
              >
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
                  className="h-6 w-6"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Complex Booking Process</h3>
              <p className="text-muted-foreground">
                The existing app had a convoluted booking flow with too many steps, causing users to abandon their
                bookings before completion.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border/30 bg-card/50">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg mb-4"
                style={{ backgroundColor: "rgba(255, 209, 102, 0.1)", color: "#FFD166" }}
              >
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
                  className="h-6 w-6"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8v4"></path>
                  <path d="M12 16h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Outdated Interface</h3>
              <p className="text-muted-foreground">
                The app's visual design was outdated and inconsistent, creating a poor impression and lacking the modern
                features users expect from travel apps.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border/30 bg-card/50">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg mb-4"
                style={{ backgroundColor: "rgba(255, 209, 102, 0.1)", color: "#FFD166" }}
              >
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
                  className="h-6 w-6"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">User Frustration</h3>
              <p className="text-muted-foreground">
                Customer feedback indicated high frustration with ticket management, trip tracking, and the overall user
                experience, leading to poor app store ratings.
              </p>
            </div>
          </div>
        </Section>

        {/* Color Palette Showcase */}
        <Section className="bg-[#1E1E1E]">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-normal mb-6">Brand Implementation</h2>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Working within Greyhound's established brand guidelines, I created a refreshed visual identity for the
              mobile app that maintained brand recognition while introducing a more modern, user-friendly aesthetic.
            </p>
          </div>

          <ImageShowcase
            src="/greyhound-colors-palette.png"
            alt="Greyhound color palette"
            caption="The color palette maintains Greyhound's iconic blue while introducing complementary colors for a more modern, accessible interface."
          />

          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div>
              <h3 className="text-2xl font-bold mb-4">Typography</h3>
              <p className="text-muted-foreground mb-6">
                I selected IBM Plex Sans as the single typeface for the entire application. This clean, highly legible
                sans-serif font works well across different screen sizes and maintains readability in various contexts,
                from booking forms to ticket information.
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-border/30 bg-card/50">
                  <p className="text-sm text-[#FFD166] mb-2">FONT FAMILY</p>
                  <p className="text-3xl">IBM Plex Sans</p>
                  <p className="text-muted-foreground mt-2">Used throughout the application for all text elements</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Design System</h3>
              <p className="text-muted-foreground mb-6">
                I created a comprehensive design system with reusable components that ensured consistency across the app
                while allowing for flexibility in different contexts. This system included buttons, form elements,
                cards, and navigation components.
              </p>
              <div className="p-6 rounded-lg border border-border/30 bg-card/50">
                <h4 className="text-lg font-bold mb-3">Key Components</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#FFD166]"></div>
                    <span>Standardized button styles with clear states</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#FFD166]"></div>
                    <span>Consistent form inputs optimized for mobile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#FFD166]"></div>
                    <span>Card components for tickets and trip information</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#FFD166]"></div>
                    <span>Accessible color system with proper contrast</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Process Section */}
        <Section id="process">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-normal mb-6">Design Process</h2>
            <p className="text-xl text-muted-foreground">
              I followed a comprehensive user-centered design process to ensure the redesigned app would meet both user
              needs and business objectives.
            </p>
          </div>

          <div className="space-y-12">
            <ProcessStep
              number={1}
              title="Research & Discovery"
              description="I began with extensive research, including analyzing app store reviews, conducting user interviews with frequent Greyhound travelers, and performing a competitive analysis of other transportation apps to identify best practices and opportunities."
            />
            <ProcessStep
              number={2}
              title="User Journey Mapping"
              description="I created detailed user journey maps to understand the complete experience of booking and managing a Greyhound trip, identifying pain points and opportunities for improvement at each stage."
            />
            <ProcessStep
              number={3}
              title="Information Architecture"
              description="I restructured the app's information architecture to create a more intuitive navigation system, reducing the number of steps required to complete key tasks like booking a trip or managing tickets."
            />
            <ProcessStep
              number={4}
              title="Wireframing & Prototyping"
              description="I developed low and high-fidelity wireframes for key screens, focusing on simplifying the booking process and improving ticket management. These wireframes were then turned into interactive prototypes for testing."
            />
            <ProcessStep
              number={5}
              title="Usability Testing"
              description="I conducted multiple rounds of usability testing with diverse participants to validate design decisions and identify areas for improvement, iterating on the designs based on user feedback."
            />
            <ProcessStep
              number={6}
              title="Visual Design & Refinement"
              description="I applied Greyhound's brand guidelines to create a visually appealing interface that balanced brand recognition with modern design principles, ensuring accessibility and usability throughout."
            />
          </div>
        </Section>

        {/* UI Design Showcase */}
        <Section className="bg-[#1E1E1E]">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-normal mb-6">UI/UX Design</h2>
            <p className="text-xl text-muted-foreground max-w-3xl">
              The redesigned Greyhound app features a clean, intuitive interface that simplifies the booking process and
              improves the overall user experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="overflow-hidden rounded-lg border border-border/30 bg-card/50">
              <VideoPlayer src="/videos/Phone-screens-remix-copy.mp4" className="w-full h-auto" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Key Features</h3>
              <p className="text-muted-foreground mb-6">
                The redesigned app includes several key features that significantly improve the user experience:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold mt-0.5"
                    style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
                  >
                    ✓
                  </div>
                  <p>Streamlined booking process reduced from 7 to 4 steps</p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold mt-0.5"
                    style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
                  >
                    ✓
                  </div>
                  <p>Intuitive trip management with digital tickets and real-time updates</p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold mt-0.5"
                    style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
                  >
                    ✓
                  </div>
                  <p>Interactive route map with station information and amenities</p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold mt-0.5"
                    style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
                  >
                    ✓
                  </div>
                  <p>Personalized user profiles with saved trips and payment methods</p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold mt-0.5"
                    style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
                  >
                    ✓
                  </div>
                  <p>Accessibility features including screen reader support and high contrast mode</p>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Results Section */}
        <Section id="results">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-normal mb-6">Results</h2>
            <p className="text-xl text-muted-foreground">
              The final design for Greyhound includes a comprehensive set of screens that create a seamless user
              experience for booking and managing bus trips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AppScreenMockup
              src="/images/greyhound/booking-display.png"
              alt="Greyhound booking screen"
              title="Simplified Booking"
              description="Streamlined booking process with an intuitive form and map-based interface that makes finding routes easy and efficient."
            />

            <AppScreenMockup
              src="/images/greyhound/results-display.png"
              alt="Greyhound search results screen"
              title="Clear Search Results"
              description="Organized trip options with transparent pricing, departure/arrival times, and bus quality ratings to help users make informed decisions."
            />

            <AppScreenMockup
              src="/images/greyhound/results-next-display.png"
              alt="Greyhound trip details screen"
              title="Detailed Trip View"
              description="Comprehensive trip information including station addresses and amenities, with a prominent call-to-action for seamless booking."
            />

            <AppScreenMockup
              src="/images/greyhound/checkout-display.png"
              alt="Greyhound checkout screen"
              title="Streamlined Checkout"
              description="Simplified payment process with multiple payment options and a clear order summary to reduce abandonment and increase conversions."
            />

            <AppScreenMockup
              src="/images/greyhound/tickets-display.png"
              alt="Greyhound digital tickets screen"
              title="Digital Tickets"
              description="Mobile-friendly digital tickets with QR codes for easy boarding and a convenient overview of past and upcoming trips."
            />

            <AppScreenMockup
              src="/images/greyhound/reviews-display.png"
              alt="Greyhound reviews screen"
              title="User Reviews"
              description="Transparent rating system that builds trust and helps users make informed decisions based on other travelers' experiences."
            />
          </div>
        </Section>

        {/* Interactive Prototype Section */}
        <Section className="bg-background">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-normal mb-6">INTERACTIVE PROTOTYPE</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              Experience the redesigned Greyhound app firsthand with this interactive prototype. Click through the
              screens to see how users would book tickets, manage trips, and track buses.
            </p>
          </div>

          <FigmaPrototype
            embedUrl="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FG9mEroZfwmVHpqGSJpAu4H%2FGreyhound-Redesign%3Fpage-id%3D95%253A2%26node-id%3D558-877%26viewport%3D494%252C310%252C0.29%26t%3D67hcGVmhm1E6Pde5-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26starting-point-node-id%3D558%253A877"
            title="Greyhound App Redesign Interactive Prototype"
            height="700px"
          />

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              <span className="text-[#FFD166] font-medium">Pro tip:</span> Click through the prototype to explore the
              full user journey. Use the navigation buttons to move between screens.
            </p>
          </div>
        </Section>

        {/* Next Project Section */}
        <section className="w-full py-24 md:py-32 bg-[#1E1E1E]">
          <div className="container max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-normal mb-6">Next Case Study</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore more of my work and see how I help clients achieve their business goals through thoughtful
                design.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="overflow-hidden rounded-lg border border-border/30">
                <Image
                  src="/case-study-1.png"
                  alt="Finders Keepers design showcase"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <div className="mb-4 text-sm text-[#FFD166] font-medium">CASE STUDY</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Finders Keepers Development</h3>
                <p className="text-muted-foreground mb-6">
                  A complete mobile app development project that brings light to garage sales that go unnoticed
                  everyday. The first high-quality app in this niche, creating an intuitive platform for treasure
                  hunters and sellers.
                </p>
                <Button asChild className="button-primary" style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}>
                  <Link href="/case-studies/finders-keepers" scroll={false}>
                    View Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Same as landing page */}
        <section
          id="contact"
          ref={contactRef}
          className="w-full py-24 md:py-32 contact-gradient overflow-visible relative"
        >
          <div className="container max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
            <div
              className={`grid gap-16 lg:grid-cols-[1.2fr_0.8fr] transition-all duration-1000 ease-in-out overflow-visible fade-in-up ${shouldAnimate(isContactInView) ? "visible" : ""}`}
            >
              <div className="pr-0 md:pr-12">
                <h2
                  className="text-4xl md:text-5xl font-semibold tracking-normal mb-8"
                  style={{ letterSpacing: "0.01em" }}
                >
                  LET'S CREATE SOMETHING AMAZING TOGETHER
                </h2>
                <p className="text-xl text-muted-foreground mb-12 max-w-xl">
                  Ready to elevate your digital presence? Contact me to discuss your project and how I can help you
                  achieve your goals.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
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
                      className="h-6 w-6"
                      style={{ color: "#FFD166" }}
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-foreground">Phone</h3>
                      <p className="text-muted-foreground">(217)-369-8224</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
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
                      className="h-6 w-6"
                      style={{ color: "#FFD166" }}
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-foreground">Email</h3>
                      <p className="text-muted-foreground">jordanwitbeck17@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
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
                      className="h-6 w-6"
                      style={{ color: "#FFD166" }}
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-foreground">LinkedIn</h3>
                      <a
                        href="https://www.linkedin.com/in/jordan-witbeck17"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-[#FFD166] transition-colors"
                      >
                        www.linkedin.com/in/jordan-witbeck17
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-border/20 bg-background py-12">
        <div className="container max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div className="flex items-center space-x-3">
              {renderLogo("h-8 w-8")}
              <span className="text-lg font-bold" style={{ color: "#f2f2f2" }}>
                Jordan Witbeck Designs
              </span>
            </div>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Jordan Witbeck Designs. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">{/* Social media links removed */}</div>
        </div>
      </footer>
    </div>
  )
}
