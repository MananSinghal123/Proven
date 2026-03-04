interface ProvenLogoProps {
  size?: number
  className?: string
}

export function ProvenLogo({ size = 32, className = '' }: ProvenLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* ═══ OUTER CUBE ═══ */}
      {/* Left face — darkest */}
      <path d="M6 17 L32 32 L32 62 L6 47 Z" fill="#072E18" />
      {/* Right face — medium green */}
      <path d="M58 17 L58 47 L32 62 L32 32 Z" fill="#00A844" />
      {/* Top face — lightest green */}
      <path d="M6 17 L32 2 L58 17 L32 32 Z" fill="#69F0AE" />

      {/* ═══ OPENING (void visible through top) ═══ */}
      <path d="M18 19 L32 10 L46 19 L32 27 Z" fill="#030B06" />

      {/* ═══ INTERIOR WALLS (depth through opening) ═══ */}
      {/* Left interior wall */}
      <path d="M18 19 L32 27 L32 42 L18 34 Z" fill="#0d3d22" />
      {/* Right interior wall */}
      <path d="M46 19 L46 34 L32 42 L32 27 Z" fill="#00C853" />

      {/* ═══ INNER CUBE (nested inside) ═══ */}
      {/* Left face */}
      <path d="M24 27 L32 31 L32 39 L24 35 Z" fill="#0A2818" />
      {/* Right face — brand green */}
      <path d="M40 27 L40 35 L32 39 L32 31 Z" fill="#00E676" />
      {/* Top face — lightest */}
      <path d="M24 27 L32 23 L40 27 L32 31 Z" fill="#B9F6CA" />

      {/* ═══ SUBTLE EDGE HIGHLIGHTS ═══ */}
      <path
        d="M6 17 L32 2 L58 17 M6 17 L6 47 M58 17 L58 47 M32 32 L32 62 M6 47 L32 62 L58 47"
        stroke="rgba(105,240,174,0.12)"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <path
        d="M18 19 L32 10 L46 19 M24 27 L32 23 L40 27"
        stroke="rgba(185,246,202,0.2)"
        strokeWidth="0.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}
