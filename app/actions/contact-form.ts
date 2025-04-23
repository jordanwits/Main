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
      // Check if environment variables are set
      const emailUser = process.env.EMAIL_USER
      const emailPass = process.env.EMAIL_PASS

      if (!emailUser || !emailPass) {
        console.error("Missing email credentials. EMAIL_USER or EMAIL_PASS environment variables are not set.")
        return {
          success: false,
          message: "Server configuration error. Please contact the administrator.",
        }
      }

      // Create a test account if needed (for development)
      let testAccount
      let transporter

      try {
        // Configure nodemailer with Gmail
        transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: emailUser,
            pass: emailPass,
          },
          // Add debug option to see detailed logs
          debug: true,
          // Increase timeout
          connectionTimeout: 10000,
        })

        // Verify the connection
        await transporter.verify()
        console.log("SMTP connection verified successfully")
      } catch (smtpError) {
        console.error("SMTP connection error:", smtpError)
        return {
          success: false,
          message:
            "Failed to connect to email server. Please try again later or contact me directly at jordanwitbeck17@gmail.com",
        }
      }

      // Create email content
      const mailOptions = {
        from: `"Contact Form" <${emailUser}>`, // Use your own email as the sender
        replyTo: `"${firstName} ${lastName}" <${email}>`, // Set reply-to as the form submitter
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

      try {
        // Send email
        const info = await transporter.sendMail(mailOptions)
        console.log("Message sent successfully:", info.messageId)

        return {
          success: true,
          message: "Your message has been sent successfully!",
        }
      } catch (sendError) {
        console.error("Error sending email:", sendError)
        return {
          success: false,
          message: "Failed to send message. Please try again later or contact me directly at jordanwitbeck17@gmail.com",
        }
      }
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      message: "Failed to send message. Please try again later or contact me directly at jordanwitbeck17@gmail.com",
    }
  }
}
