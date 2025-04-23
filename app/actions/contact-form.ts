"use server"

import nodemailer from "nodemailer"

// Form input type
type ContactFormInput = {
  firstName: string
  lastName: string
  email: string
  company: string
  message: string
}

export async function submitContactForm(formData: FormData) {
  try {
    // Extract form data
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const company = formData.get("company") as string
    const message = formData.get("message") as string

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return {
        success: false,
        message: "Please fill out all required fields",
      }
    }

    // Check if we're in a preview environment (Vercel preview or local development)
    const isPreview = process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development"

    if (isPreview) {
      // In preview mode, just log the form data and return success
      console.log("Form submission in preview mode:", {
        firstName,
        lastName,
        email,
        company,
        message,
      })

      return {
        success: true,
        message: "Your message has been received! (Preview Mode - Email not actually sent)",
      }
    } else {
      // In production, use nodemailer to send the actual email
      const transporter = nodemailer.createTransport({
        service: "gmail", // Using the service option instead of host/port
        auth: {
          user: process.env.EMAIL_USER || "your-email@gmail.com",
          pass: process.env.EMAIL_PASS || "your-app-password",
        },
      })

      // Create email content
      const mailOptions = {
        from: `"${firstName} ${lastName}" <${email}>`,
        to: "jordanwitbeck17@gmail.com",
        subject: `New Contact Form Submission from ${firstName} ${lastName}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "Not provided"}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }

      // Send email
      await transporter.sendMail(mailOptions)
    }

    return {
      success: true,
      message: "Your message has been sent successfully!",
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    }
  }
}
