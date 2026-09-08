import Link from 'next/link'
import ZipSearch from '@/components/ZipSearch'
import ScoreCard from '@/components/ScoreCard'
import { fetchScore } from '@/lib/mcp'
import { getLatest } from '@/lib/score'

// Static demo data fallback (in case fetch fails or for ISR)
const DEMO_ZIPS = ['21201', '21215', '21224']

async function getDemoScores() {
  const results = await Promise.allSettled(
    DEMO_ZIPS.map((zip) => fetchScore(zip).then(getLatest))
  )
  return results
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof getLatest>>> => r.status === 'fulfilled')
    .map((r) => r.value)
}

export default async function HomePage() {
  const demoScores = await getDemoScores()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.12),transparent)]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Powered by SpotCrime · 60M crime incidents
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e2e2f0] leading-tight mb-6">
            Crime intelligence for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              every US ZIP code.
            </span>
          </h1>

          <p className="text-xl text-[#7070a0] mb-10 max-w-2xl mx-auto leading-relaxed">
            Real scores. Real data. No estimates.
            <br />
            CrimeScore ranks 41,700+ ZIP codes by crime intensity —{' '}
            updated monthly from police incident reports.
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto mb-6">
            <ZipSearch size="large" placeholder="Enter any US ZIP code..." />
          </div>

          <p className="text-sm text-[#7070a0]">
            Try:{' '}
            <Link href="/zip/21201" className="text-indigo-400 hover:underline">21201</Link>
            {' (Baltimore) · '}
            <Link href="/zip/10001" className="text-indigo-400 hover:underline">10001</Link>
            {' (NYC) · '}
            <Link href="/zip/90210" className="text-indigo-400 hover:underline">90210</Link>
            {' (Beverly Hills)'}
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[#1c1c35] bg-[#0e0e1c]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: '41,700+', label: 'ZIP codes' },
            { value: '60M+', label: 'Crime incidents' },
            { value: 'Monthly', label: 'Updates' },
            { value: 'Zero', label: 'Hallucinations' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl sm:text-3xl font-bold text-[#e2e2f0]">{value}</p>
              <p className="text-sm text-[#7070a0] mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live score examples */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#e2e2f0] mb-3">Live Score Examples</h2>
          <p className="text-[#7070a0]">
            Real scores, fetched live. Data from the SpotCrime dataset.
          </p>
        </div>

        {demoScores.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoScores.map((entry) => (
              <ScoreCard key={entry.region_code} entry={entry} showLink />
            ))}
          </div>
        ) : (
          <div className="text-center text-[#7070a0] py-12 border border-[#1c1c35] rounded-xl">
            <p>Score examples unavailable — enter a ZIP code above to look one up.</p>
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-sm text-[#7070a0]">
            Search any of ~41,700 US ZIP codes above.{' '}
            <span className="text-[#e2e2f0]/40">
              Demo token covers ZIPs 21201–21231.
            </span>
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-[#1c1c35]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#e2e2f0] mb-3">How It Works</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Enter a ZIP or FIPS',
                desc: 'Search by US ZIP code (ZCTA) or county FIPS code.',
              },
              {
                step: '02',
                title: 'Get crime percentile + ranks',
                desc: 'See the crime percentile, national rank, and state rank — updated monthly.',
              },
              {
                step: '03',
                title: 'Embed or integrate via MCP',
                desc: 'Use the API directly, or connect any MCP-compatible AI assistant in seconds.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col gap-3">
                <span className="text-indigo-500 font-mono text-sm font-bold">{step}</span>
                <h3 className="text-lg font-semibold text-[#e2e2f0]">{title}</h3>
                <p className="text-[#7070a0] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-[#0e0e1c] border border-[#1c1c35] rounded-2xl p-8 sm:p-12">
          <div className="max-w-3xl">
            <p className="text-xs text-indigo-400 uppercase tracking-widest mb-3 font-semibold">
              MCP Integration
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#e2e2f0] mb-4">
              Add CrimeScore to Claude in one command.
            </h2>
            <p className="text-[#7070a0] mb-8">
              No RAG pipeline. No retrieval layer. One tool. Deterministic results.
            </p>

            <div className="bg-[#07070f] border border-[#1c1c35] rounded-xl p-4 mb-6 overflow-x-auto">
              <pre className="text-sm text-green-400 font-mono whitespace-pre">
{`claude mcp add --transport http crimescore \\
  https://mcp.crimescore.info/mcp \\
  --header "Authorization: Bearer YOUR_TOKEN"`}
              </pre>
            </div>

            <Link
              href="/developers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-lg transition-colors"
            >
              Get started for developers
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
