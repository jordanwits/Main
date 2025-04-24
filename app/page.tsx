"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Menu, X } from "lucide-react"
import { useScroll, useTransform, useInView } from "framer-motion"
import { LogoModern } from "@/components/logo-modern"
import { useIsMobile } from "@/hooks/use-mobile"
import { ContactForm } from "@/components/contact-form"

// Stable animation component for case studies with longer visibility
const CaseStudy = ({
  item,
  isLast,
}: {
  item: number
  isLast: boolean
}) => {
  const caseStudyRef = useRef(null)
  // Update these values to make animations trigger sooner
  const isInView = useInView(caseStudyRef, {
    amount: 0.1, // Lower threshold to detect the element earlier (changed from 0.2)
    margin: "-50px 0px -200px 0px", // Reduced negative bottom margin (changed from -400px)
    once: false, // Important: don't trigger only once
  })

  // Determine which image to use based on the item number
  const getImageSrc = (itemNumber: number) => {
    if (itemNumber === 2) {
      return "/case-study-1.png" // Finders Keepers is now case study 2
    } else if (itemNumber === 3) {
      return "/greyhound-cover.png" // Updated to use the new Greyhound image
    }
    return `/placeholder.svg?height=600&width=800`
  }

  // Get case study title based on item number
  const getCaseStudyTitle = (itemNumber: number) => {
    if (itemNumber === 2) {
      return "Finders Keepers Development"
    } else if (itemNumber === 3) {
      return "Greyhound Mobile App"
    }
    return `Project Title ${itemNumber}`
  }

  // Get case study description based on item number
  const getCaseStudyDescription = (itemNumber: number) => {
    if (itemNumber === 2) {
      return "A complete mobile app development project that brings light to garage sales that go unnoticed everyday. The first high-quality app in this niche, creating an intuitive platform for treasure hunters and sellers."
    } else if (itemNumber === 3) {
      return "A comprehensive mobile app redesign for Greyhound bus services, improving the booking experience with an intuitive interface that improved checkout efficiency by 20% and enhanced the overall user experience."
    }
    return "A comprehensive redesign that improved user engagement by 45% and conversion rates by 23%. The project involved deep user research, iterative prototyping, and close collaboration with the development team."
  }

  return (
    <div ref={caseStudyRef} className="group">
      <div className={`fade-in-up ${isInView ? "visible" : ""}`}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-1 md:order-1 pr-0 md:pr-8">
            <div className="mb-4 text-sm text-[#FFD166] font-medium">CASE STUDY {item === 2 ? 1 : 2}</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{getCaseStudyTitle(item)}</h3>
            <p className="text-muted-foreground mb-6">{getCaseStudyDescription(item)}</p>
            <Button asChild className="button-primary" style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}>
              <Link
                href={item === 2 ? "/case-studies/finders-keepers" : item === 3 ? "/case-studies/greyhound" : "#"}
                scroll={false}
              >
                View Case Study
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="order-2 md:order-2 overflow-hidden rounded-lg border border-border/30">
            <Image
              src={getImageSrc(item) || "/placeholder.svg"}
              alt={`${getCaseStudyTitle(item)} design showcase`}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              style={{
                objectPosition: item === 2 ? "center 40%" : "center center",
                aspectRatio: "4/3",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Stable animation component for services with subtle lift effect (disabled on mobile)
const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const serviceRef = useRef(null)
  const isInView = useInView(serviceRef, {
    amount: 0.3, // Lower threshold for better mobile visibility
    once: false, // Important: don't trigger only once
  })
  const isMobile = useIsMobile()

  // Add lift effect state
  const [lift, setLift] = useState(false)

  // Trigger lift effect after the card becomes visible
  useEffect(() => {
    if (isInView && !isMobile) {
      const timer = setTimeout(
        () => {
          setLift(true)
          // Reset lift after animation completes
          const resetTimer = setTimeout(() => {
            setLift(false)
          }, 800)
          return () => clearTimeout(resetTimer)
        },
        index * 200 + 500,
      )
      return () => clearTimeout(timer)
    }
  }, [isInView, index, isMobile])

  return (
    <div
      ref={serviceRef}
      className={`flex flex-col space-y-4 p-6 rounded-lg border border-border/30 hover:border-[#FFD166]/30 transition-all duration-300 fade-in-up ${isInView ? "visible" : ""} ${lift ? "animate-card-lift" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-lg mx-auto"
        style={{ backgroundColor: "rgba(255, 209, 102, 0.1)", color: "#FFD166" }}
      >
        {service.icon}
      </div>
      <h3 className="text-xl font-bold">{service.title}</h3>
      <p className="text-muted-foreground">{service.description}</p>
    </div>
  )
}

// Create a new ProcessStep component with sequential animation but no ripple
const ProcessStep = ({ step, index }: { step: any; index: number }) => {
  const stepRef = useRef(null)
  const isInView = useInView(stepRef, {
    amount: 0.3, // Lower threshold for better mobile visibility
    once: false, // Important: don't trigger only once
  })

  return (
    <div
      ref={stepRef}
      className={`flex items-start gap-6 fade-in-up ${isInView ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold"
        style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
      >
        {index + 1}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
        <p className="text-muted-foreground">{step.description}</p>
      </div>
    </div>
  )
}

// Simplified carousel item component
const CarouselItem = ({ src, alt, width, height, index }) => {
  return (
    <div className="carousel-item">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className="rounded-md"
        priority={true}
        style={{
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          willChange: "transform",
        }}
      />
    </div>
  )
}

export default function LandingPage() {
  // Use modern logo as the default
  const selectedLogo = "modern"
  const isMobile = useIsMobile()

  // Add this useEffect at the top of the LandingPage component, right after the isMobile declaration

  // Track which sections have been clicked
  const [clickedSections, setClickedSections] = useState<Record<string, boolean>>({})

  // Smooth scroll function with first-click detection
  const scrollToSection = (elementId: string) => {
    setIsMenuOpen(false) // Close mobile menu if open
    const element = document.getElementById(elementId)
    if (element) {
      // Get the header height (80px based on h-20 class)
      const headerHeight = 80

      // Check if this is the first click for this section
      const isFirstClick = !clickedSections[elementId]

      // Update clicked sections
      if (isFirstClick) {
        setClickedSections((prev) => ({
          ...prev,
          [elementId]: true,
        }))
      }

      // Add a larger offset for the first click, especially for the process section
      const firstClickOffset = elementId === "process" ? 100 : 50
      const regularOffset = elementId === "process" ? 30 : 10

      // Use the appropriate offset based on whether it's the first click
      const additionalOffset = isFirstClick ? firstClickOffset : regularOffset

      // Use a longer delay for the first click to ensure everything is loaded
      const delay = isFirstClick ? 150 : 50

      // Use setTimeout to ensure the calculation happens after any layout shifts
      setTimeout(() => {
        // Calculate the element's position relative to the document
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset

        // Calculate the position with offsets
        const offsetPosition = elementPosition - headerHeight - additionalOffset

        // Scroll to the adjusted position
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })

        // For the first click on process, do a second scroll after a delay to ensure proper positioning
        if (isFirstClick && elementId === "process") {
          setTimeout(() => {
            const updatedPosition = element.getBoundingClientRect().top + window.pageYOffset
            const updatedOffset = updatedPosition - headerHeight - regularOffset
            window.scrollTo({
              top: updatedOffset,
              behavior: "smooth",
            })
          }, 500)
        }
      }, delay)
    }
  }

  // Function to render the logo
  const renderLogo = (className = "h-10 w-10") => {
    return <LogoModern className={className} color="#FFD166" />
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const servicesHeaderRef = useRef(null) // New ref specifically for services header
  const workRef = useRef(null)
  const workHeaderRef = useRef(null) // Separate ref for work header
  const processRef = useRef(null)
  const contactRef = useRef(null)
  const missionRef = useRef(null)

  // Use more mobile-friendly settings with lower thresholds
  const isHeroInView = useInView(heroRef, {
    amount: 0.2, // Lower threshold for better mobile visibility
    once: false, // Important: don't trigger only once
  })

  const isServicesInView = useInView(servicesRef, {
    amount: 0.2, // Lower threshold for better mobile visibility
    once: false, // Important: don't trigger only once
  })

  // More generous threshold for services header visibility
  const isServicesHeaderInView = useInView(servicesHeaderRef, {
    amount: 0.1, // Lower threshold to detect earlier on mobile
    once: false, // Important: don't trigger only once
  })

  const isWorkInView = useInView(workRef, {
    amount: 0.2, // Lower threshold for better mobile visibility
    once: false, // Important: don't trigger only once
  })

  // Separate inView for work header with higher threshold
  const isWorkHeaderInView = useInView(workHeaderRef, {
    amount: 0.2, // Lower threshold for better mobile visibility
    once: false, // Important: don't trigger only once
  })

  // Make process section animate sooner
  const isProcessInView = useInView(processRef, {
    amount: 0.2, // Lower threshold for better mobile visibility
    once: false, // Important: don't trigger only once
  })

  const isContactInView = useInView(contactRef, {
    amount: 0.1, // Lower threshold for better mobile visibility
    once: false, // Important: don't trigger only once
  })

  const isMissionInView = useInView(missionRef, {
    amount: 0.2,
    once: false,
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95])

  // Anti-flicker effect - this helps stabilize animations
  const [animationsEnabled, setAnimationsEnabled] = useState(false)

  useEffect(() => {
    // Longer delay for more stability
    const timer = setTimeout(() => {
      setAnimationsEnabled(true)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Disable body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  // Carousel image data - memoized to prevent re-renders
  const leftCarouselImages = [
    {
      src: "/hero-display.png",
      height: 600,
      width: 400,
      alt: "Greyhound mobile app booking interface",
    },
    {
      src: "/fk-hero-display.png",
      height: 480,
      width: 400,
      alt: "Finders Keepers brand display",
    },
    {
      src: "/finders-colors-palette.png",
      height: 400,
      width: 400,
      alt: "Finders Keepers color palette",
    },
  ]

  const rightCarouselImages = [
    {
      src: "/pilgrim-communications.png",
      height: 600,
      width: 400,
      alt: "Pilgrim Communications website design",
    },
    {
      src: "/pilgrim-contact.png",
      height: 600,
      width: 400,
      alt: "Pilgrim Communications contact page",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/map%20display%20finders-mMgDODlY9fOe470jTdZwpsHvElBUCj.png",
      height: 600,
      width: 400,
      alt: "Finders Keepers map interface showing garage sale locations",
    },
    {
      src: "/greyhound-logo-blue.png",
      height: 600,
      width: 400,
      alt: "Greyhound logo on blue background",
    },
  ]

  // Add this useEffect hook to handle animation performance
  useEffect(() => {
    // Pause animations when tab is not visible to save resources
    const handleVisibilityChange = () => {
      const leftTrack = document.querySelector(".carousel-track-left")
      const rightTrack = document.querySelector(".carousel-track-right")

      if (document.hidden) {
        // Pause animations when tab is not visible
        if (leftTrack) leftTrack.style.animationPlayState = "paused"
        if (rightTrack) rightTrack.style.animationPlayState = "paused"
        if (rightTrack) rightTrack.style.animationPlayState = "paused"
      } else {
        // Resume animations when tab becomes visible
        if (leftTrack) leftTrack.style.animationPlayState = "running"
        if (rightTrack) rightTrack.style.animationPlayState = "running"
      }
    }

    // Optimize animation performance
    const optimizeCarouselPerformance = () => {
      const carouselItems = document.querySelectorAll(".carousel-item img")
      carouselItems.forEach((item) => {
        // Force hardware acceleration
        ;(item as HTMLElement).style.transform = "translate3d(0, 0, 0)"
        ;(item as HTMLElement).style.willChange = "transform"
      })
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Run optimization after images have loaded
    window.addEventListener("load", optimizeCarouselPerformance)

    // Also run it after a short delay to catch dynamically loaded content
    const optimizationTimer = setTimeout(optimizeCarouselPerformance, 1000)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("load", optimizeCarouselPerformance)
      clearTimeout(optimizationTimer)
    }
  }, [])

  const navItems = [
    { name: "Mission", href: "#mission", ref: missionRef },
    { name: "Services", href: "#services", ref: servicesRef },
    { name: "Work", href: "#work", ref: workRef },
    { name: "Process", href: "#process", ref: processRef },
    { name: "Contact", href: "#contact", ref: contactRef },
  ]

  // Services data
  const services = [
    {
      title: "UI Design",
      description: "Beautiful, intuitive interfaces that align with your brand and enhance user engagement.",
      icon: (
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
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M7 7h10" />
          <path d="M7 12h10" />
          <path d="M7 17h10" />
        </svg>
      ),
    },
    {
      title: "UX Research",
      description: "Data-driven insights that inform design decisions and optimize user journeys.",
      icon: (
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
          <path d="M17 14a5 5 0 0 0-10 0" />
          <line x1="12" x2="12" y1="9" y2="14" />
          <circle cx="12" cy="18" r="1" />
          <path d="M3 3v18h18" />
        </svg>
      ),
    },
    {
      title: "Brand Identity",
      description: "Cohesive visual systems that communicate your brand's unique story and values.",
      icon: (
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
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
    },
  ]

  // Only animate if animations are enabled
  const shouldAnimate = (isVisible: boolean) => {
    return animationsEnabled && isVisible
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="fixed top-0 z-40 w-full border-b border-border/10">
        {/* Blur effect overlay - this will create the blur effect for content behind the navbar */}
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
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center space-x-3 bg-transparent border-none cursor-pointer group"
            >
              <div className="transition-transform duration-500 ease-in-out transform group-hover:rotate-180">
                {renderLogo("h-10 w-10")}
              </div>
              <span className="text-xl font-bold tracking-tight" style={{ color: "#f2f2f2" }}>
                Jordan Witbeck Designs
              </span>
            </button>
          </div>
          <nav className="hidden lg:flex gap-10">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href.substring(1))}
                className="text-sm font-medium uppercase tracking-wider transition-colors hover:text-[#FFD166] bg-transparent border-none cursor-pointer nav-link"
              >
                {item.name}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Button
              className="hidden lg:flex button-primary"
              style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
              onClick={() => scrollToSection("contact")}
            >
              Work with me →
            </Button>
            <button
              className="lg:hidden bg-transparent border-none cursor-pointer p-2"
              onClick={() => setIsMenuOpen(true)}
              style={{ color: "#FFD166" }}
            >
              <Menu className="h-7 w-7" style={{ color: "#FFD166", fill: "none" }} />
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="transition-transform duration-500 ease-in-out transform hover:rotate-180">
                {renderLogo("h-10 w-10")}
              </div>
              <span className="text-xl font-bold tracking-tight" style={{ color: "#f2f2f2" }}>
                Jordan Witbeck Designs
              </span>
            </div>
            <button
              className="bg-transparent border-none cursor-pointer p-2"
              onClick={() => setIsMenuOpen(false)}
              style={{ color: "#FFD166" }}
            >
              <X className="h-6 w-6" style={{ color: "#FFD166", fill: "none" }} />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href.substring(1))}
                className="text-2xl font-bold tracking-tight transition-colors hover:text-[#FFD166] text-left bg-transparent border-none cursor-pointer nav-link"
              >
                {item.name}
              </button>
            ))}
            <Button
              className="mt-8 button-primary w-full"
              style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
              onClick={() => scrollToSection("contact")}
            >
              Work with me →
            </Button>
          </nav>
        </div>
      )}

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section
          id="hero"
          ref={heroRef}
          className="w-full flex items-center min-h-[90vh] py-16 md:py-20 lg:py-24 bg-background overflow-hidden"
        >
          <div
            className={`container max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 fade-in-up ${shouldAnimate(isHeroInView) ? "visible" : ""}`}
          >
            <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
              <div className="max-w-3xl">
                <h1
                  className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-normal mb-8"
                  style={{ letterSpacing: "0.01em" }}
                >
                  <span className="block">THOUGHTFUL</span>
                  <span className="block">DESIGN TAILORED</span>
                  <span className="block" style={{ color: "#FFD166" }}>
                    TO YOU.
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12">
                  I design intuitive interfaces and seamless user experiences that elevate your brand and delight your
                  users.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="button-primary text-lg px-8 py-6"
                    style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
                    onClick={() => scrollToSection("contact")}
                  >
                    GET IN TOUCH
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6 border-[#FFD166] text-[#FFD166] outline-button"
                    onClick={() => scrollToSection("work")}
                  >
                    CASE STUDIES
                  </Button>
                </div>
              </div>

              {/* Two-Column Vertical Image Carousel */}
              <div className="carousel-wrapper hidden lg:flex relative h-[500px] gap-4 overflow-hidden">
                {/* Left Column - Moving Up */}
                <div className="flex-1 relative overflow-hidden rounded-lg">
                  <div className="vertical-carousel-container">
                    {/* First set of images */}
                    <div className="carousel-track carousel-track-left">
                      {/* First set of images */}
                      {leftCarouselImages.map((img, index) => (
                        <div key={`left-${index}`} className="carousel-item">
                          <Image
                            src={img.src || "/placeholder.svg"}
                            alt={img.alt}
                            width={img.width}
                            height={img.height}
                            className="rounded-md"
                            priority={true}
                            style={{
                              transform: "translate3d(0, 0, 0)",
                              backfaceVisibility: "hidden",
                              WebkitBackfaceVisibility: "hidden",
                              willChange: "transform",
                            }}
                          />
                        </div>
                      ))}
                      {/* Duplicate for seamless looping */}
                      {leftCarouselImages.map((img, index) => (
                        <div key={`left-dup-${index}`} className="carousel-item">
                          <Image
                            src={img.src || "/placeholder.svg"}
                            alt={img.alt}
                            width={img.width}
                            height={img.height}
                            className="rounded-md"
                            priority={true}
                            style={{
                              transform: "translate3d(0, 0, 0)",
                              backfaceVisibility: "hidden",
                              WebkitBackfaceVisibility: "hidden",
                              willChange: "transform",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Moving Down */}
                <div className="flex-1 relative overflow-hidden rounded-lg">
                  <div className="vertical-carousel-container">
                    <div className="carousel-track carousel-track-right">
                      {/* First set of images - different from left column */}
                      {rightCarouselImages.map((img, index) => (
                        <div key={`right-${index}`} className="carousel-item">
                          <Image
                            src={img.src || "/placeholder.svg"}
                            alt={img.alt}
                            width={img.width}
                            height={img.height}
                            className="rounded-md"
                            priority={true}
                            style={{
                              transform: "translate3d(0, 0, 0)",
                              backfaceVisibility: "hidden",
                              WebkitBackfaceVisibility: "hidden",
                              willChange: "transform",
                            }}
                          />
                        </div>
                      ))}
                      {/* Duplicate for seamless looping */}
                      {rightCarouselImages.map((img, index) => (
                        <div key={`right-dup-${index}`} className="carousel-item">
                          <Image
                            src={img.src || "/placeholder.svg"}
                            alt={img.alt}
                            width={img.width}
                            height={img.height}
                            className="rounded-md"
                            priority={true}
                            style={{
                              transform: "translate3d(0, 0, 0)",
                              backfaceVisibility: "hidden",
                              WebkitBackfaceVisibility: "hidden",
                              willChange: "transform",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement Section */}
        <section id="mission" ref={missionRef} className="w-full py-24 md:py-32 bg-background">
          <div className="container max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
            <div
              className={`grid md:grid-cols-2 gap-16 items-center fade-in-up ${shouldAnimate(isMissionInView) ? "visible" : ""}`}
            >
              <div className="order-1 md:order-1">
                <h2
                  className="text-3xl md:text-4xl font-semibold tracking-normal mb-6"
                  style={{ letterSpacing: "0.01em" }}
                >
                  MY MISSION
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Designing with purpose—more than aesthetics, my work is about creating tailored, one-of-a-kind
                  solutions. I take pride in delivering fully custom experiences that drive meaningful results.
                </p>
                <p className="text-xl font-bold mb-8" style={{ color: "#FFD166" }}>
                  When my clients succeed, I succeed.
                </p>
                <div className="flex items-center">
                  <div className="h-1 w-12 bg-[#FFD166] mr-4"></div>
                  <p className="text-lg font-serif italic">
                    "Some people think design means how it looks. But of course, if you dig deeper, it's really how it
                    works." — Steve Jobs
                  </p>
                </div>
              </div>
              <div className="order-2 md:order-2 relative">
                <div className="aspect-square w-full max-w-[500px] mx-auto overflow-hidden rounded-lg">
                  <Image
                    src="/mission-image.png"
                    alt="Person exploring a natural environment, representing thoughtful design exploration"
                    width={800}
                    height={800}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" ref={servicesRef} className="w-full py-24 md:py-32 bg-[#1E1E1E]">
          <div className="container max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
            <div
              ref={servicesHeaderRef}
              className={`max-w-4xl mx-auto text-center mb-12 fade-in-up ${shouldAnimate(isServicesHeaderInView) ? "visible" : ""}`}
            >
              <h2
                className="text-4xl md:text-5xl font-semibold tracking-normal mb-12"
                style={{ letterSpacing: "0.01em" }}
              >
                END-TO-END DESIGN SERVICES
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" ref={workRef} className="w-full py-24 md:py-32 bg-background">
          <div className="container max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
            {/* Work header with its own ref and animation */}
            <div
              ref={workHeaderRef}
              className={`max-w-3xl mb-16 fade-in-up ${shouldAnimate(isWorkHeaderInView) ? "visible" : ""}`}
            >
              <h2
                className="text-4xl md:text-5xl font-semibold tracking-normal mb-6"
                style={{ letterSpacing: "0.01em" }}
              >
                FEATURED PROJECTS
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Explore my portfolio of award-winning designs that have helped businesses achieve their goals.
              </p>
            </div>

            <div className="grid gap-12 md:gap-16">
              {/* Use the CaseStudy component for each case study */}
              {[2, 3].map((item, index) => (
                <CaseStudy key={item} item={item} isLast={item === 3} />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" ref={processRef} className="w-full py-24 md:py-32 bg-[#1E1E1E]">
          <div className="container max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
            <div className={`fade-in-up ${shouldAnimate(isProcessInView) ? "visible" : ""}`}>
              <div className="max-w-2xl mx-auto">
                <h2
                  className="text-4xl md:text-5xl font-semibold tracking-normal mb-8 text-center"
                  style={{ letterSpacing: "0.01em" }}
                >
                  MY DESIGN PROCESS
                </h2>
                <p className="text-xl text-muted-foreground mb-12 text-center">
                  My collaborative design process ensures I deliver solutions that meet your business goals and user
                  needs.
                </p>

                <div className="space-y-12">
                  {[
                    {
                      title: "Discovery",
                      description:
                        "I start by understanding your business, users, and goals through in-depth research and stakeholder interviews.",
                    },
                    {
                      title: "Strategy",
                      description:
                        "Based on my findings, I develop a comprehensive design strategy that aligns with your business objectives.",
                    },
                    {
                      title: "Design",
                      description:
                        "I create intuitive interfaces and seamless experiences that bring your vision to life.",
                    },
                    {
                      title: "Testing",
                      description:
                        "I validate my designs through user testing to ensure they meet user needs and expectations.",
                    },
                    {
                      title: "Implementation",
                      description:
                        "I work closely with developers to ensure the design is implemented correctly and functions as intended.",
                    },
                  ].map((step, index) => (
                    <div
                      key={index}
                      className={`fade-in-up ${shouldAnimate(isProcessInView) ? "visible" : ""}`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      <div className="flex flex-row items-start gap-6 max-w-xl mx-auto text-left">
                        <div className="flex-shrink-0">
                          <div
                            className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold"
                            style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
                          >
                            {index + 1}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
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

          {/* Added navigation to footer */}
          <nav className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0">
            {navItems.map((item) => (
              <button
                key={`footer-${item.name}`}
                onClick={() => scrollToSection(item.href.substring(1))}
                className="text-sm font-medium uppercase tracking-wider transition-colors hover:text-[#FFD166] bg-transparent border-none cursor-pointer nav-link"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
