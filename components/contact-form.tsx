"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { submitContactForm } from "@/app/actions/contact-form"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setFormStatus({})

    try {
      const result = await submitContactForm(formData)
      setFormStatus(result)

      // If successful, reset the form
      if (result.success) {
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setFormStatus({
        success: false,
        message: "An unexpected error occurred. Please try again or contact me directly at jordanwitbeck17@gmail.com",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-lg border border-border/30 bg-card/50 p-8 shadow-md backdrop-blur-sm">
      <form id="contact-form" action={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium uppercase tracking-wider text-foreground">
              First name*
            </label>
            <input
              id="firstName"
              name="firstName"
              required
              className="flex h-12 w-full rounded-md border border-input bg-background/70 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD166] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ borderColor: "rgba(255, 209, 102, 0.3)" }}
              placeholder="First name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium uppercase tracking-wider text-foreground">
              Last name*
            </label>
            <input
              id="lastName"
              name="lastName"
              required
              className="flex h-12 w-full rounded-md border border-input bg-background/70 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD166] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ borderColor: "rgba(255, 209, 102, 0.3)" }}
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium uppercase tracking-wider text-foreground">
            Email*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="flex h-12 w-full rounded-md border border-input bg-background/70 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD166] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ borderColor: "rgba(255, 209, 102, 0.3)" }}
            placeholder="Email"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium uppercase tracking-wider text-foreground">
            Company
          </label>
          <input
            id="company"
            name="company"
            className="flex h-12 w-full rounded-md border border-input bg-background/70 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD166] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ borderColor: "rgba(255, 209, 102, 0.3)" }}
            placeholder="Company name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium uppercase tracking-wider text-foreground">
            Message*
          </label>
          <textarea
            id="message"
            name="message"
            required
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background/70 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD166] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ borderColor: "rgba(255, 209, 102, 0.3)" }}
            placeholder="Tell me about your project"
          />
        </div>

        {formStatus.message && (
          <div
            className={`p-4 rounded-md ${
              formStatus.success ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
            }`}
          >
            {formStatus.message}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 button-primary text-lg font-medium"
          style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
        >
          {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
        </Button>
      </form>
    </div>
  )
}
