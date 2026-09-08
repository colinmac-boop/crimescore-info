import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { fetchScore } from '@/lib/mcp'
import {
  getLatest,
  getCrimeLevel,
  getCrimeLevelLabel,
  getCrimeLevelColor,
  formatMonth,
} from '@/lib/score'
import ScoreGauge from '@/components/ScoreGauge'
import ZipSearch from '@/components/ZipSearch'
import CrimeLevelBadge from '@/components/CrimeLevel'

interface Props {
  params: Promise<{ zip: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zip } = await params
  return {
    title: `ZIP ${zip} Crime Score | CrimeScore`,
    description: `Crime score and safety ranking for ZIP code ${zip}. Powered by SpotCrime's 60M crime incident dataset.`,
  }
}

export default async function ZipPage({ params }: Props) {
  const { zip } = await params

  if (!/^\d{5}$/.test(zip)) notFound()

  let entries: Awaited<ReturnType<typeof fetchScore>> | null = null
  let errorMsg: string | null = null

  try {
    entries = await fetchScore(zip)
  } catch (e: unknown) {
    errorMsg = e instanceof Error ? e.message : 'Unknown error'
  }

  if (errorMsg || !entries || entries.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-6xl mb-6">🔍</p>
        <h1 className="text-3xl font-bold text-[#e2e2f0] mb-4">
          No data for ZIP {zip}
        </h1>
        <p className="text-[#7070a0] mb-8">
          {errorMsg?.includes('not found') || errorMsg?.includes('No data')
            ? "This ZIP code isn\u2019t covered yet \u2014 not that it\u2019s safe."
            : 'Could not retrieve score data. The area may not be covered yet.'}
        </p>
        <ZipSearch size="large" />
      </div>
    )
  }

  const sorted = [...entries].sort((a, b) => b.month.localeCompare(a.month))
  const latest = sorted[0]
  const level = getCrimeLevel(latest.percentile)
  const levelLabel = getCrimeLevelLabel(level)
  const higherThan = latest.percentile > 50

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#7070a0] mb-8">
        <Link href="/" className="hover:text-[#e2e2f0] transition-colors">Home</Link>
        <span>/</span>
        <span className="hover:text-[#e2e2f0]">ZIP Codes</span>
        <span>/</span>
        <span className="text-[#e2e2f0]">{zip}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-5xl font-bold text-[#e2e2f0]">{zip}</h1>
          <span className="text-xs text-[#7070a0] uppercase tracking-widest border border-[#1c1c35] rounded px-2 py-1">
            {latest.region_type === 'zcta' ? 'ZIP Code · ZCTA' : 'County · FIPS'}
          </span>
        </div>
        <p className="text-[#7070a0]">
          Crime intelligence powered by SpotCrime · {formatMonth(latest.month)} snapshot
        </p>
      </div>

      {/* Gauge + level */}
      <div className="bg-[#0e0e1c] border border-[#1c1c35] rounded-2xl p-8 mb-6 flex flex-col items-center">
        <ScoreGauge percentile={latest.percentile} size={300} />
        <div className="mt-4 flex flex-col items-center gap-3">
          <CrimeLevelBadge level={level} size="lg" />
          <p className="text-lg text-[#7070a0] text-center">
            {higherThan
              ? `Higher crime than ${latest.percentile.toFixed(2)}% of US ZIP codes`
              : `Lower crime than ${(100 - latest.percentile).toFixed(2)}% of US ZIP codes`}
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#0e0e1c] border border-[#1c1c35] rounded-xl p-5 text-center">
          <p className="text-xs text-[#7070a0] uppercase tracking-wider mb-2">National Rank</p>
          <p className="text-3xl font-bold text-[#e2e2f0]">
            #{latest.national_rank.toLocaleString()}
          </p>
          <p className="text-xs text-[#7070a0] mt-1">of ~41,700 ZIPs</p>
        </div>
        <div className="bg-[#0e0e1c] border border-[#1c1c35] rounded-xl p-5 text-center">
          <p className="text-xs text-[#7070a0] uppercase tracking-wider mb-2">State Rank</p>
          <p className="text-3xl font-bold text-[#e2e2f0]">
            #{latest.state_rank.toLocaleString()}
          </p>
          <p className="text-xs text-[#7070a0] mt-1">in state</p>
        </div>
        <div className="bg-[#0e0e1c] border border-[#1c1c35] rounded-xl p-5 text-center">
          <p className="text-xs text-[#7070a0] uppercase tracking-wider mb-2">Snapshot</p>
          <p className="text-xl font-bold text-[#e2e2f0]">{formatMonth(latest.month)}</p>
          <p className="text-xs text-[#7070a0] mt-1">latest</p>
        </div>
      </div>

      {/* Historical table */}
      {sorted.length > 1 && (
        <div className="bg-[#0e0e1c] border border-[#1c1c35] rounded-xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-[#e2e2f0] uppercase tracking-wider mb-4">
            Historical Trend
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-[#7070a0] uppercase tracking-wider border-b border-[#1c1c35]">
                <th className="text-left pb-3">Month</th>
                <th className="text-right pb-3">Percentile</th>
                <th className="text-right pb-3">National Rank</th>
                <th className="text-right pb-3">State Rank</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry, i) => (
                <tr
                  key={entry.month}
                  className={`border-b border-[#1c1c35]/50 ${i === 0 ? 'text-[#e2e2f0]' : 'text-[#7070a0]'}`}
                >
                  <td className="py-3">
                    {formatMonth(entry.month)}
                    {i === 0 && (
                      <span className="ml-2 text-xs text-indigo-400">(latest)</span>
                    )}
                  </td>
                  <td className="py-3 text-right">{entry.percentile.toFixed(2)}</td>
                  <td className="py-3 text-right">#{entry.national_rank.toLocaleString()}</td>
                  <td className="py-3 text-right">#{entry.state_rank.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Model hash */}
      <div className="bg-[#0e0e1c] border border-[#1c1c35] rounded-xl p-4 mb-6 flex items-center justify-between">
        <span className="text-xs text-[#7070a0]">Model version (hash)</span>
        <span className="font-mono text-xs text-[#7070a0]">{latest.model_hash}</span>
      </div>

      {/* Search another */}
      <div className="bg-[#0e0e1c] border border-[#1c1c35] rounded-xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-[#e2e2f0] mb-4">Search Another ZIP Code</h2>
        <ZipSearch />
      </div>

      {/* Developer CTA */}
      <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-6 flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-[#e2e2f0]">Integrate CrimeScore into your app</p>
          <p className="text-sm text-[#7070a0] mt-1">
            One MCP tool. Any AI assistant. Deterministic results.
          </p>
        </div>
        <Link
          href="/developers"
          className="shrink-0 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Developer Docs →
        </Link>
      </div>

      {/* Data note */}
      <p className="text-xs text-[#7070a0] mt-6 text-center">
        Data source: CrimeScore composite index powered by SpotCrime. Updated monthly.{' '}
        Demo token covers ZIP codes 21201–21231.
      </p>
    </div>
  )
}
