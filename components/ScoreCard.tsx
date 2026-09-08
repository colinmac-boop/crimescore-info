import Link from 'next/link'
import { ScoreEntry } from '@/lib/mcp'
import {
  getCrimeLevel,
  getCrimeLevelLabel,
  getCrimeLevelColor,
  formatMonth,
} from '@/lib/score'
import CrimeLevelBadge from './CrimeLevel'

interface ScoreCardProps {
  entry: ScoreEntry
  showLink?: boolean
}

export default function ScoreCard({ entry, showLink = false }: ScoreCardProps) {
  const level = getCrimeLevel(entry.percentile)
  const month = formatMonth(entry.month)
  const higherThan = entry.percentile > 50
  const pctDisplay = entry.percentile.toFixed(2)

  return (
    <div className="bg-[#0e0e1c] border border-[#1c1c35] rounded-xl p-6 flex flex-col gap-4">
      {/* ZIP + badge */}
      <div className="flex items-start justify-between gap-3">
        <div>
          {showLink ? (
            <Link
              href={`/zip/${entry.region_code}`}
              className="text-2xl font-bold text-[#e2e2f0] hover:text-white transition-colors"
            >
              {entry.display_name}
            </Link>
          ) : (
            <p className="text-2xl font-bold text-[#e2e2f0]">{entry.display_name}</p>
          )}
          <p className="text-xs text-[#7070a0] mt-0.5 uppercase tracking-wider">
            {entry.region_type === 'zcta' ? 'ZIP Code · ZCTA' : 'County · FIPS'}
          </p>
        </div>
        <CrimeLevelBadge level={level} size="sm" />
      </div>

      {/* Percentile */}
      <div>
        <p className="text-4xl font-bold text-[#e2e2f0]">{pctDisplay}th</p>
        <p className="text-sm text-[#7070a0] mt-1">
          {higherThan
            ? `Higher crime than ${pctDisplay}% of US ZIP codes`
            : `Lower crime than ${(100 - entry.percentile).toFixed(2)}% of US ZIP codes`}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#07070f] rounded-lg p-3">
          <p className="text-xs text-[#7070a0] uppercase tracking-wider mb-1">National Rank</p>
          <p className="text-xl font-bold text-[#e2e2f0]">#{entry.national_rank.toLocaleString()}</p>
          <p className="text-xs text-[#7070a0]">of ~41,700 ZIPs</p>
        </div>
        <div className="bg-[#07070f] rounded-lg p-3">
          <p className="text-xs text-[#7070a0] uppercase tracking-wider mb-1">State Rank</p>
          <p className="text-xl font-bold text-[#e2e2f0]">#{entry.state_rank.toLocaleString()}</p>
          <p className="text-xs text-[#7070a0]">in state</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-[#7070a0] pt-1 border-t border-[#1c1c35]">
        <span>Snapshot: {month}</span>
        <span className="font-mono">v{entry.model_hash.slice(-8)}</span>
      </div>
    </div>
  )
}
