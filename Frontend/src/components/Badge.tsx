interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'purple' | 'neutral'
  children: React.ReactNode
  pulse?: boolean
  className?: string
}

export function Badge({ variant = 'info', children, pulse, className = '' }: BadgeProps) {
  const styles: Record<string, string> = {
    success: 'chip-green',
    warning: 'chip-orange',
    error: 'chip-red',
    info: 'chip-cyan',
    purple: 'chip-purple',
    neutral: 'bg-white/5 border border-white/10 text-white/50',
  }

  return (
    <span className={`chip ${styles[variant]} ${className}`}>
      {pulse && <span className="live-dot !w-[6px] !h-[6px]" />}
      {children}
    </span>
  )
}
