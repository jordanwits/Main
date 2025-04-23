import type React from "react"

interface LogoProps {
  className?: string
  color?: string
}

export const LogoAlt: React.FC<LogoProps> = ({ className = "h-10 w-10", color = "#FFD166" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Abstract geometric design */}
      <g>
        {/* Base circle */}
        <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="2" />

        {/* Triangular elements */}
        <path d="M50,10 L80,65 L20,65 Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />

        <path d="M50,90 L80,35 L20,35 Z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />

        {/* Central design element */}
        <path d="M35,50 L50,30 L65,50 L50,70 Z" fill={color} fillOpacity="0.7" stroke={color} strokeWidth="1" />

        {/* Connecting lines */}
        <line x1="20" y1="50" x2="35" y2="50" stroke={color} strokeWidth="2" />
        <line x1="65" y1="50" x2="80" y2="50" stroke={color} strokeWidth="2" />
        <line x1="50" y1="20" x2="50" y2="30" stroke={color} strokeWidth="2" />
        <line x1="50" y1="70" x2="50" y2="80" stroke={color} strokeWidth="2" />

        {/* Accent dots */}
        <circle cx="20" cy="50" r="3" fill={color} />
        <circle cx="80" cy="50" r="3" fill={color} />
        <circle cx="50" cy="20" r="3" fill={color} />
        <circle cx="50" cy="80" r="3" fill={color} />
      </g>
    </svg>
  )
}
