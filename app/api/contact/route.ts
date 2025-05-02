import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Extract form data
    const { firstName, lastName, email, company, message } = data

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ success: false, message: "Please fill out all required fields" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Please enter a valid email address" }, { status: 400 })
    }

    // Send the form data to a reliable email service (Web3Forms)
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY!, // Using the environment variable
        from_name: `${firstName} ${lastName}`,
        subject: `New Contact Form Submission from ${firstName} ${lastName}`,
        reply_to: email,
        name: `${firstName} ${lastName}`,
        email: email,
        company: company || "Not provided",
        message: message,
      }),
    })

    const result = await response.json()

    if (result.success) {
      return NextResponse.json({ success: true, message: "Your message has been sent successfully!" })
    } else {
      console.error("Error submitting form:", result)
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send message. Please try again later or contact me directly at jordanwitbeck17@gmail.com",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error in contact API route:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later or contact me directly at jordanwitbeck17@gmail.com",
      },
      { status: 500 },
    )
  }
}
