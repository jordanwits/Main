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

export default function FindersKeepersCase() {
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

    return () => clearTimeout(timer)
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
        <section
          className="w-full py-24 md:py-32 lg:py-40 overflow-hidden relative"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(27, 27, 27, 0.9), rgba(27, 27, 27, 0.7)), url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%20350-fvYAuNVRGpad9LT56C8UCYhDa18bM4.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
            <div className="max-w-2xl">
              <div className="mb-4 text-sm text-[#FFD166] font-medium">CASE STUDY</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-normal mb-6">
                Finders Keepers Development
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Finders keepers aims to bring light to garage sales that go unnoticed everyday. Before me, there were no
                high quality apps that provided this service.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="px-3 py-1 rounded-full text-sm bg-[#FFD166]/10 text-[#FFD166]">Brand Identity</span>
                <span className="px-3 py-1 rounded-full text-sm bg-[#FFD166]/10 text-[#FFD166]">UI/UX Design</span>
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
                Finders Keepers is an innovative mobile app designed to connect people with local garage sales, estate
                sales, and hidden gems that often go unnoticed. The app aims to create a community of treasure hunters
                and sellers who appreciate sustainable shopping and one-of-a-kind finds.
              </p>
              <p className="text-lg text-muted-foreground">
                As the first high-quality app in this niche, Finders Keepers required a complete design from the ground
                up, including branding, user experience design, and interface development. The goal was to create an
                intuitive platform that would make discovering local sales easy while building a dedicated community of
                users.
              </p>
            </div>
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-sm font-medium uppercase tracking-wider text-[#FFD166]">Project</h3>
                <p className="text-lg">Finders Keepers</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium uppercase tracking-wider text-[#FFD166]">Date</h3>
                <p className="text-lg">Nov-Dec 2024</p>
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
              Creating Finders Keepers from scratch presented several unique challenges:
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
              <h3 className="text-xl font-bold mb-2">Creating from Scratch</h3>
              <p className="text-muted-foreground">
                With no existing products in this niche, we needed to establish a completely new brand identity and user
                experience without precedent to guide us.
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
              <h3 className="text-xl font-bold mb-2">User Discovery Issues</h3>
              <p className="text-muted-foreground">
                Finding an intuitive way for users to discover and track local garage sales required innovative mapping
                solutions and location-based notifications.
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
              <h3 className="text-xl font-bold mb-2">Building a Community</h3>
              <p className="text-muted-foreground">
                Attracting both sellers and buyers to a brand new platform required thoughtful onboarding and features
                that would encourage users to list their sales and engage with the app.
              </p>
            </div>
          </div>
        </Section>

        {/* Color Palette Showcase */}
        <Section className="bg-[#1E1E1E]">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-normal mb-6">Brand Identity</h2>
            <p className="text-xl text-muted-foreground max-w-3xl">
              I developed a fresh, modern brand identity from scratch that captures the essence of treasure hunting
              while appealing to the target demographic of style-conscious, environmentally aware consumers.
            </p>
          </div>

          <ImageShowcase
            src="/finders-colors-palette.png"
            alt="Finders Keepers color palette"
            caption="The color palette combines earthy tones with vibrant accents, reflecting both sustainability and uniqueness."
          />

          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div>
              <h3 className="text-2xl font-bold mb-4">Typography</h3>
              <p className="text-muted-foreground mb-6">
                I selected Source Serif Pro as the single typeface for the entire application. This versatile serif font
                provides both functionality and personality, creating a perfect balance between modern usability and
                vintage charm that aligns with the treasure-hunting essence of the brand.
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-border/30 bg-card/50">
                  <p className="text-sm text-[#FFD166] mb-2">PRIMARY FONT</p>
                  <p className="text-3xl font-serif">Source Serif Pro</p>
                  <p className="text-muted-foreground mt-2">Used for all text elements throughout the application</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Logo Design</h3>
              <p className="text-muted-foreground mb-6">
                The logo combines a distinctive wordmark with visual elements that represent the treasure-hunting spirit
                of the brand. The design is versatile, working well across digital and physical applications while
                maintaining legibility at various sizes.
              </p>
              <div className="p-6 rounded-lg border border-border/30 bg-card/50 flex justify-center">
                <Image
                  src="/fk-hero-display.png"
                  alt="Finders Keepers logo"
                  width={400}
                  height={300}
                  className="h-auto max-w-full"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Process Section */}
        <Section id="process">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-normal mb-6">Design Process</h2>
            <p className="text-xl text-muted-foreground">
              I followed a comprehensive design process to create Finders Keepers from the ground up, ensuring it would
              resonate with the target audience and deliver an exceptional user experience.
            </p>
          </div>

          <div className="space-y-12">
            <ProcessStep
              number={1}
              title="Research & Discovery"
              description="I conducted extensive research including market analysis, user interviews, and competitive landscape studies to understand the opportunity for a garage sale discovery app and identify key user needs."
            />
            <ProcessStep
              number={2}
              title="Brand Development"
              description="Based on research insights, I created a brand strategy and visual identity for Finders Keepers that embodied the thrill of discovering hidden treasures and the community aspect of local sales."
            />
            <ProcessStep
              number={3}
              title="UX/UI Conceptualization"
              description="I created multiple concepts for the app's interface, focusing on map-based discovery, intuitive listing creation, and community features, refining them based on user feedback."
            />
            <ProcessStep
              number={4}
              title="UI/UX Design"
              description="I designed the complete mobile app interface with a focus on intuitive navigation, clear visual hierarchy, and location-based features that make finding and posting sales seamless."
            />
            <ProcessStep
              number={5}
              title="Implementation & Launch Strategy"
              description="I developed comprehensive design specifications and worked closely with the development team to ensure the app was implemented correctly for both iOS and Android platforms."
            />
          </div>
        </Section>

        {/* UI Design Showcase */}
        <Section className="bg-[#1E1E1E]">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-normal mb-6">UI/UX Design</h2>
            <p className="text-xl text-muted-foreground max-w-3xl">
              The mobile app design focused on creating an intuitive, visually appealing interface that makes
              discovering local sales easy while building a community of treasure hunters and sellers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <ImageShowcase
              src="/images/finders-keepers/login-feed-screens.png"
              alt="Finders Keepers mobile app interface showing login and feed screens"
            />
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Mobile App</h3>
              <p className="text-muted-foreground mb-6">
                The mobile app was designed with a focus on discovery and community building. Key features include:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold mt-0.5"
                    style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
                  >
                    ✓
                  </div>
                  <p>Map-based garage sale discovery with item category filters</p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold mt-0.5"
                    style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
                  >
                    ✓
                  </div>
                  <p>Easy sale listing creation with photo uploads and categorization</p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold mt-0.5"
                    style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
                  >
                    ✓
                  </div>
                  <p>Location-based notifications for sales in your area</p>
                </li>
                <li className="flex items-start gap-3">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold mt-0.5"
                    style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
                  >
                    ✓
                  </div>
                  <p>In-app messaging between buyers and sellers</p>
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
              The final design for Finders Keepers includes a comprehensive set of screens that create a seamless user
              experience for discovering and engaging with local garage sales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <AppScreenMockup
              src="/images/finders-keepers/feed-mock.png"
              alt="Finders Keepers feed screen showing garage sale listings"
              title="Feed & Discovery"
              description="A social feed showing nearby garage sales with user profiles, location details, and preview images of available items."
            />

            <AppScreenMockup
              src="/images/finders-keepers/listing-mock.png"
              alt="Finders Keepers detailed listing view"
              title="Item Listing View"
              description="Detailed view of vintage items with high-quality images, comprehensive descriptions, and easy actions like saving or contacting the seller."
            />

            <AppScreenMockup
              src="/images/finders-keepers/map-mock.png"
              alt="Finders Keepers map interface"
              title="Interactive Map"
              description="Location-based discovery with interactive pins showing nearby garage sales, allowing users to easily find sales in their area."
            />

            <AppScreenMockup
              src="/images/finders-keepers/profile-mock.png"
              alt="Finders Keepers user profile"
              title="User Profiles"
              description="Comprehensive profiles that build trust in the community by showcasing a user's active sales, liked items, and reviews from previous transactions."
            />

            <AppScreenMockup
              src="/images/finders-keepers/messages-mock.png"
              alt="Finders Keepers messaging interface"
              title="Messaging System"
              description="In-app messaging that connects buyers and sellers, showing conversation history and making it easy to track multiple discussions."
            />

            <AppScreenMockup
              src="/images/finders-keepers/conversation-mock.png"
              alt="Finders Keepers conversation interface"
              title="Direct Conversations"
              description="Real-time chat interface that makes negotiating and arranging pickups simple and intuitive, enhancing the social aspect of the garage sale experience."
            />
          </div>
        </Section>

        {/* Interactive Prototype Section */}
        <Section className="bg-background">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-normal mb-6">INTERACTIVE PROTOTYPE</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              Experience the Finders Keepers app firsthand with this interactive prototype. Click through the screens to
              see how users would discover and engage with local garage sales.
            </p>
          </div>

          <FigmaPrototype
            embedUrl="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FG9nAH5bItZlcMhttps://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FG9nAH5bItZlcMlarSyWMU9%2FUntitled%3Fpage-embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FG9nAH5bItZlcMlarSyWMU9%2FUntitled%3Fpage-id%3D0%253A1%26node-id%3D2-1270%26viewport%3D254%252C87%252C0.24%26t%3DWYp91JKK6qeuOknx-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26starting-point-node-id%3D2%253A1270"
            title="Finders Keepers App Interactive Prototype"
            height="700px"
            fallbackImageUrl="https://sjc.microlink.io/x-QKhUyZkaFQgAGfDabZyQFJsNI6NxsAfTJx75oLKik-gMmB8AT_UKVmtg-Az0jvYYIjRKMeSf9WPZ02ztl6lA.jpeg"
          />

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              <span className="text-[#FFD166] font-medium">Pro tip:</span> Click through the prototype to explore the
              full user journey from login to browsing listings and messaging sellers.
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
                  src="/greyhound-cover.png"
                  alt="Greyhound Mobile App design showcase"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <div className="mb-4 text-sm text-[#FFD166] font-medium">CASE STUDY</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Greyhound Mobile App</h3>
                <p className="text-muted-foreground mb-6">
                  A comprehensive mobile app redesign for Greyhound bus services, improving the booking experience with
                  an intuitive interface that improved checkout efficiency by 20% and enhanced the overall user
                  experience.
                </p>
                <Button asChild className="button-primary" style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}>
                  <Link href="/case-studies/greyhound" scroll={false}>
                    View Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Updated to match landing page */}
        <section
          id="contact"
          ref={contactRef}
          className="w-full py-24 md:py-32 contact-gradient overflow-visible relative"
        >
          <div className="container max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
            <div
              className={`grid gap-8 lg:grid-cols-[0.8fr_1.2fr] transition-all duration-1000 ease-in-out overflow-visible fade-in-up ${shouldAnimate(isContactInView) ? "visible" : ""}`}
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
