import type React from "react"

interface LogoProps {
  className?: string
  color?: string
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-10", color = "#FFD166" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Base diamond shape */}
      <g transform="rotate(45, 50, 50)">
        {/* Outer square */}
        <rect x="10" y="10" width="80" height="80" fill={color} fillOpacity="0.2" />

        {/* Middle square */}
        <rect x="20" y="20" width="60" height="60" fill={color} fillOpacity="0.4" />

        {/* Inner square */}
        <rect x="30" y="30" width="40" height="40" fill={color} fillOpacity="0.6" />

        {/* Center square */}
        <rect x="40" y="40" width="20" height="20" fill={color} fillOpacity="0.8" />

        {/* Maze-like lines */}
        <path d="M10,50 L40,50 L40,40 L60,40 L60,60 L40,60 L40,50" stroke={color} strokeWidth="2" fill="none" />

        <path
          d="M50,10 L50,30 L60,30 L60,20 L70,20 L70,70 L20,70 L20,30 L30,30 L30,50"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />

        {/* Additional geometric details */}
        <rect x="25" y="25" width="50" height="50" stroke={color} strokeWidth="1" fill="none" />
        <rect x="35" y="35" width="30" height="30" stroke={color} strokeWidth="1" fill="none" />
      </g>
    </svg>
  )
}
