interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  glow?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading,
  glow = true,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base = 'relative font-semibold rounded-xl transition-all duration-300 cursor-pointer overflow-hidden inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none'

  const variants: Record<string, string> = {
    primary: 'btn-glow',
    secondary: 'btn-glow-purple',
    danger: 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:shadow-neon-red',
    ghost: 'bg-transparent border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5',
  }

  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-xs tracking-wide',
    md: 'px-6 py-3 text-sm tracking-wide',
    lg: 'px-8 py-4 text-base tracking-wide',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
