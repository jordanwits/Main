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

    // Configure nodemailer transporter
    // Note: For production, you should use a proper email service
    // This is a simple configuration for demonstration
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || "your-email@gmail.com", // Replace with your email or use env variable
        pass: process.env.EMAIL_PASS || "your-app-password", // Use app password for Gmail
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
