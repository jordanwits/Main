import type React from "react"

interface LogoProps {
  className?: string
  color?: string
}

export const LogoModern: React.FC<LogoProps> = ({ className = "h-10 w-10", color = "#FFD166" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Modern minimalist design */}
      <g>
        {/* Main shape - stylized "JW" */}
        <path
          d="M20,20 L50,20 L50,50 L80,20 L80,80 L50,80 L50,50 L20,80 Z"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Accent elements */}
        <circle cx="20" cy="20" r="5" fill={color} />
        <circle cx="80" cy="20" r="5" fill={color} />
        <circle cx="20" cy="80" r="5" fill={color} />
        <circle cx="80" cy="80" r="5" fill={color} />

        {/* Center dot */}
        <circle cx="50" cy="50" r="8" fill={color} fillOpacity="0.7" />
      </g>
    </svg>
  )
}
