import type React from "react"

interface LogoProps {
  className?: string
  color?: string
}

export const LogoMinimalist1: React.FC<LogoProps> = ({ className = "h-10 w-10", color = "#FFD166" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Ultra minimalist design - simple J and W */}
      <g>
        {/* Stylized J */}
        <path
          d="M30,20 L30,60 Q30,80 50,80"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Stylized W */}
        <path
          d="M50,20 L60,80 L70,40 L80,80 L90,20"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
