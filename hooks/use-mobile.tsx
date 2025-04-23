"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = window.innerWidth < 768
      setIsMobile(isMobileDevice)

      // Add or remove a class on the body element
      if (isMobileDevice || "ontouchstart" in window) {
        document.body.classList.add("touch-device")

        // Force disable hover by adding a style tag
        if (!document.getElementById("disable-hover-style")) {
          const style = document.createElement("style")
          style.id = "disable-hover-style"
          style.innerHTML = `
            .touch-device button:hover, 
            .touch-device a:hover, 
            .touch-device [class*="button"]:hover {
              background-color: inherit !important;
              color: inherit !important;
              transform: none !important;
              box-shadow: none !important;
              border-color: inherit !important;
            }
            .touch-device .button-primary:hover {
              background-color: #FFD166 !important;
              color: #1b1b1b !important;
            }
            .touch-device .border-\\[\\#FFD166\\].text-\\[\\#FFD166\\]:hover {
              border-color: #FFD166 !important;
              color: #FFD166 !important;
              background-color: transparent !important;
            }
          `
          document.head.appendChild(style)
        }
      } else {
        document.body.classList.remove("touch-device")
        const style = document.getElementById("disable-hover-style")
        if (style) {
          style.remove()
        }
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    // Initial check for touch device
    if ("ontouchstart" in window) {
      document.body.classList.add("touch-device")
    }

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return isMobile
}
