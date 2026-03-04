interface ProgressBarProps {
  value: number
  max?: number
  showLabel?: boolean
  className?: string
  color?: 'cyan' | 'green' | 'purple' | 'red' | 'orange' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

export function ProgressBar({
  value,
  max = 100,
  showLabel,
  className = '',
  color = 'cyan',
  size = 'md',
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const colors: Record<string, string> = {
    cyan: 'bg-brand shadow-[0_0_10px_rgba(0,230,118,0.4)]',
    green: 'bg-brand shadow-[0_0_10px_rgba(0,230,118,0.4)]',
    purple: 'bg-neon-purple shadow-[0_0_10px_rgba(168,85,247,0.4)]',
    red: 'bg-neon-red shadow-[0_0_10px_rgba(239,68,68,0.4)]',
    orange: 'bg-neon-orange shadow-[0_0_10px_rgba(249,115,22,0.4)]',
    gradient: 'bg-gradient-to-r from-brand via-brand-light to-brand-dark shadow-[0_0_10px_rgba(0,230,118,0.3)]',
  }

  const sizes: Record<string, string> = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  return (
    <div className={className}>
      <div className={`w-full bg-white/5 rounded-full ${sizes[size]} overflow-hidden`}>
        <div
          className={`${colors[color]} ${sizes[size]} rounded-full ${animated ? 'transition-all duration-1000 ease-out' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1.5">
          <span className="text-xs font-mono text-white/40">{percentage.toFixed(1)}%</span>
          <span className="text-xs font-mono text-white/30">{value.toLocaleString()} / {max.toLocaleString()}</span>
        </div>
      )}
    </div>
  )
}
