import { ScoreEntry } from './mcp'

export type CrimeLevel =
  | 'low'
  | 'below_average'
  | 'above_average'
  | 'high'
  | 'very_high'
  | 'extreme'

export function getCrimeLevel(percentile: number): CrimeLevel {
  if (percentile < 25) return 'low'
  if (percentile < 50) return 'below_average'
  if (percentile < 75) return 'above_average'
  if (percentile < 90) return 'high'
  if (percentile < 99) return 'very_high'
  return 'extreme'
}

export function getCrimeLevelLabel(level: CrimeLevel): string {
  const labels: Record<CrimeLevel, string> = {
    low: 'Low Crime',
    below_average: 'Below Average',
    above_average: 'Above Average',
    high: 'High Crime',
    very_high: 'Very High Crime',
    extreme: 'Extreme Crime',
  }
  return labels[level]
}

export function getCrimeLevelColor(level: CrimeLevel): string {
  const colors: Record<CrimeLevel, string> = {
    low: 'text-green-400 bg-green-400/10 border-green-400/30',
    below_average: 'text-lime-400 bg-lime-400/10 border-lime-400/30',
    above_average: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    high: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
    very_high: 'text-red-400 bg-red-400/10 border-red-400/30',
    extreme: 'text-red-600 bg-red-600/10 border-red-600/30',
  }
  return colors[level]
}

export function getCrimeLevelBgColor(level: CrimeLevel): string {
  const colors: Record<CrimeLevel, string> = {
    low: '#22c55e',
    below_average: '#84cc16',
    above_average: '#eab308',
    high: '#f97316',
    very_high: '#ef4444',
    extreme: '#b91c1c',
  }
  return colors[level]
}

export function formatMonth(monthStr: string): string {
  const d = new Date(monthStr + 'T00:00:00Z')
  return d.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function getLatest(entries: ScoreEntry[]): ScoreEntry {
  return [...entries].sort((a, b) => b.month.localeCompare(a.month))[0]
}

export function formatPercentile(p: number): string {
  return p.toFixed(2)
}

export function formatNationalRank(rank: number): string {
  return `#${rank.toLocaleString()}`
}
