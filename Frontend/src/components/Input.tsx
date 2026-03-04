interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
}

export function Input({ label, error, helperText, icon, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
            {icon}
          </span>
        )}
        <input
          className={`input-glow w-full ${icon ? 'pl-10' : ''} ${
            error ? '!border-red-500/50 focus:!border-red-500 focus:!shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-red-400 text-xs mt-1.5 font-mono">{error}</p>}
      {helperText && !error && <p className="text-white/30 text-xs mt-1.5">{helperText}</p>}
    </div>
  )
}
