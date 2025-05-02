"use server"

// This is a server action that handles the contact form submission
// It will send an email to the website owner when someone submits the form

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

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
      }
    }

    // Prepare the form data for submission
    const formDataToSubmit = {
      firstName,
      lastName,
      email,
      company: company || "Not provided",
      message,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
    }

    // Send the form data to the email service
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
      return {
        success: true,
        message: "Your message has been sent successfully!",
      }
    } else {
      console.error("Error submitting form:", result)
      return {
        success: false,
        message: "Failed to send message. Please try again later or contact me directly at jordanwitbeck17@gmail.com",
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
