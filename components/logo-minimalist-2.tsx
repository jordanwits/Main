import type React from "react"

interface LogoProps {
  className?: string
  color?: string
}

export const LogoMinimalist2: React.FC<LogoProps> = ({ className = "h-10 w-10", color = "#FFD166" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Negative space design */}
      <g>
        {/* Outer circle */}
        <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="2" />

        {/* Minimalist design element */}
        <path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke={color} strokeWidth="2" />

        {/* Diagonal line creating the W */}
        <path d="M30,30 L50,70 L70,30" fill="none" stroke={color} strokeWidth="2" />

        {/* Horizontal line creating the J */}
        <path d="M40,50 L60,50" fill="none" stroke={color} strokeWidth="2" />
      </g>
    </svg>
  )
}
