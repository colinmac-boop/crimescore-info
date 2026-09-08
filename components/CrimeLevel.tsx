import { CrimeLevel, getCrimeLevelColor, getCrimeLevelLabel } from '@/lib/score'

interface CrimeLevelBadgeProps {
  level: CrimeLevel
  size?: 'sm' | 'md' | 'lg'
}

export default function CrimeLevelBadge({ level, size = 'md' }: CrimeLevelBadgeProps) {
  const colorClasses = getCrimeLevelColor(level)
  const label = getCrimeLevelLabel(level)

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5 font-semibold tracking-wide',
  }[size]

  return (
    <span
      className={`inline-flex items-center rounded border font-medium uppercase tracking-wider ${colorClasses} ${sizeClasses}`}
    >
      {label}
    </span>
  )
}
