"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle, AlertCircle } from "lucide-react"
import { submitContactForm } from "@/app/actions/contact-form"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setFormStatus(null)

    try {
      const result = await submitContactForm(formData)
      setFormStatus(result)
    } catch (error) {
      setFormStatus({
        success: false,
        message: "Something went wrong. Please try again or email me directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset form when submission is successful
  const resetForm = () => {
    setFormStatus(null)
    // Reset form fields by targeting the form and resetting it
    document.getElementById("contactForm")?.reset()
  }

  return (
    <div className="rounded-lg border border-[#FFD166]/40 bg-card/50 p-6 shadow-md backdrop-blur-sm w-full h-full flex flex-col">
      <div className="text-center mb-4">
        <Mail className="h-10 w-10 mx-auto mb-2" style={{ color: "#FFD166" }} />
        <h3 className="text-xl font-bold mb-2">Get in Touch</h3>
        <p className="text-muted-foreground text-sm mb-4 max-w-2xl mx-auto">
          I'd love to hear about your project. Fill out the form below and I'll get back to you as soon as possible.
        </p>
      </div>

      {formStatus?.success ? (
        <div className="text-center py-6 flex-1 flex flex-col justify-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
          <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
          <p className="text-muted-foreground mb-6">{formStatus.message}</p>
          <Button
            onClick={resetForm}
            className="button-primary mx-auto"
            style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form id="contactForm" action={handleSubmit} className="space-y-4 flex-1 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="firstName" className="text-sm font-medium">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="w-full p-2.5 px-4 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-[#FFD166]/50 text-base"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="w-full p-2.5 px-4 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-[#FFD166]/50 text-base"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full p-2.5 px-4 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-[#FFD166]/50 text-base"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="company" className="text-sm font-medium">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              className="w-full p-2.5 px-4 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-[#FFD166]/50 text-base"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="text-sm font-medium">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              className="w-full p-2.5 px-4 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-[#FFD166]/50 text-base min-h-[100px]"
            ></textarea>
          </div>

          {formStatus?.success === false && (
            <div className="p-3 rounded-md bg-red-500/10 border border-red-500/30 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-500">{formStatus.message}</p>
            </div>
          )}

          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 h-10 button-primary text-base font-medium"
              style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
