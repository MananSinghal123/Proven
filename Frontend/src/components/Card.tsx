interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glow' | 'glass' | 'danger'
  animate?: boolean
  style?: React.CSSProperties
}

export function Card({ children, className = '', variant = 'default', animate = false, style }: CardProps) {
  const variants: Record<string, string> = {
    default: 'glow-card',
    glow: 'glow-card animate-border-glow',
    glass: 'glass rounded-2xl',
    danger: 'bg-red-500/5 border border-red-500/20 rounded-2xl',
  }

  return (
    <div className={`p-6 ${variants[variant]} ${animate ? 'animate-fade-up opacity-0' : ''} ${className}`} style={style}>
      {children}
    </div>
  )
}
