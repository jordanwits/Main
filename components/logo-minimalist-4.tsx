import type React from "react"

interface LogoProps {
  className?: string
  color?: string
}

export const LogoMinimalist4: React.FC<LogoProps> = ({ className = "h-10 w-10", color = "#FFD166" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Single line continuous design */}
      <path
        d="M20,50 C20,30 30,20 50,20 C70,20 80,30 80,50 C80,70 70,80 50,80 C30,80 20,70 20,50 Z"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Interior design element */}
      <path d="M35,35 L65,35 L65,65 L35,65 Z" fill="none" stroke={color} strokeWidth="2" strokeDasharray="2 4" />

      {/* Center dot */}
      <circle cx="50" cy="50" r="5" fill={color} />
    </svg>
  )
}
