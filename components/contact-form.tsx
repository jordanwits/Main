"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export function ContactForm() {
  const [copied, setCopied] = useState(false)
  const emailAddress = "jordanwitbeck17@gmail.com"
  const emailSubject = "Project Inquiry"
  const emailBody = "Hi Jordan,\n\nI'm interested in working with you on a project. Here are some details:\n\n"

  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg border border-border/30 bg-card/50 p-8 shadow-md backdrop-blur-sm">
      <div className="text-center mb-6">
        <Mail className="h-12 w-12 mx-auto mb-4" style={{ color: "#FFD166" }} />
        <h3 className="text-xl font-bold mb-2">Get in Touch</h3>
        <p className="text-muted-foreground mb-6">
          I'd love to hear about your project. Send me an email and I'll get back to you as soon as possible.
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        <Button
          as="a"
          href={mailtoLink}
          className="w-full h-14 button-primary text-lg font-medium flex items-center justify-center"
          style={{ backgroundColor: "#FFD166", color: "#1b1b1b" }}
        >
          SEND EMAIL
          <Mail className="ml-2 h-5 w-5" />
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/30"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card/50 px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-md bg-background/70 border border-border/30">
          <span className="text-sm font-medium">{emailAddress}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={copyEmail}
            className="border-[#FFD166] text-[#FFD166] outline-button"
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>
    </div>
  )
}
