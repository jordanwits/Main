import type React from "react"

interface LogoProps {
  className?: string
  color?: string
}

export const LogoMinimalist3: React.FC<LogoProps> = ({ className = "h-10 w-10", color = "#FFD166" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Abstract line design */}
      <g>
        {/* Horizontal lines */}
        <line x1="20" y1="30" x2="80" y2="30" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="50" x2="80" y2="50" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="70" x2="80" y2="70" stroke={color} strokeWidth="3" strokeLinecap="round" />

        {/* Vertical connecting line */}
        <line x1="50" y1="30" x2="50" y2="70" stroke={color} strokeWidth="3" strokeLinecap="round" />

        {/* Accent dots */}
        <circle cx="20" cy="30" r="4" fill={color} />
        <circle cx="80" cy="30" r="4" fill={color} />
        <circle cx="20" cy="70" r="4" fill={color} />
        <circle cx="80" cy="70" r="4" fill={color} />
      </g>
    </svg>
  )
}
