import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About & Methodology | CrimeScore',
  description:
    "How CrimeScore works — the composite crime intensity index powered by SpotCrime's 60M crime incident dataset.",
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-[#e2e2f0] mb-4">{title}</h2>
      <div className="text-[#7070a0] leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="mb-14">
        <p className="text-xs text-indigo-400 uppercase tracking-widest mb-3 font-semibold">
          Methodology
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#e2e2f0] mb-6 leading-tight">
          What is CrimeScore?
        </h1>
        <p className="text-xl text-[#7070a0] leading-relaxed">
          CrimeScore is a crime intelligence product built on SpotCrime's 60 million crime incident
          dataset. It produces monthly crime scores for 41,700+ US ZIP codes and counties.
        </p>
      </div>

      <Section title="The Score">
        <p>
          The CrimeScore is a composite crime intensity index. A higher score means more crime
          relative to other ZIP codes in the dataset. The raw score is normalized into a percentile —
          so a ZIP in the 99th percentile has more crime than 99% of all US ZIP codes.
        </p>
        <p>
          Percentile ranges and their labels:
        </p>
        <div className="mt-4 border border-[#1c1c35] rounded-xl overflow-hidden">
          {[
            { range: '0 – 25th', label: 'Low Crime', color: 'text-green-400' },
            { range: '25 – 50th', label: 'Below Average', color: 'text-lime-400' },
            { range: '50 – 75th', label: 'Above Average', color: 'text-yellow-400' },
            { range: '75 – 90th', label: 'High Crime', color: 'text-orange-400' },
            { range: '90 – 99th', label: 'Very High Crime', color: 'text-red-400' },
            { range: '99th+', label: 'Extreme Crime', color: 'text-red-600' },
          ].map(({ range, label, color }, i) => (
            <div
              key={range}
              className={`flex items-center justify-between px-5 py-3 ${
                i > 0 ? 'border-t border-[#1c1c35]' : ''
              } bg-[#0e0e1c]`}
            >
              <span className="font-mono text-sm text-[#7070a0]">{range}</span>
              <span className={`text-sm font-medium ${color}`}>{label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="What It's Not">
        <p>
          CrimeScore is not a prediction. It reflects reported crime incidents from police
          departments, aggregated by SpotCrime. Areas with less police reporting may appear
          safer in the data — this is a known limitation of any crime data product.
        </p>
        <p>
          CrimeScore does not model future crime, predict individual risk, or account for
          unreported incidents. It is a structured representation of available incident data.
        </p>
      </Section>

      <Section title="Data Source">
        <p>
          All crime data comes from{' '}
          <a
            href="https://spotcrime.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline"
          >
            SpotCrime.com
          </a>
          , which aggregates police incident reports across the US. SpotCrime has been collecting
          crime data since 2008 and covers hundreds of millions of reported incidents from hundreds
          of jurisdictions.
        </p>
      </Section>

      <Section title="Update Cadence">
        <p>
          Scores are updated monthly. The "snapshot month" shown on each score represents the month
          the model was run, incorporating all available data through that period. Historical
          snapshots are retained so you can observe trends over time.
        </p>
      </Section>

      <Section title="Coverage">
        <p>
          Approximately 41,700 US ZIP codes (ZCTAs) are currently scored. County-level FIPS scores
          are also available. If a region shows "not found," it means that area isn't covered yet —
          not that it's safe.
        </p>
      </Section>

      <Section title="Methodology Transparency">
        <p>
          Each score includes a{' '}
          <code className="font-mono text-indigo-300 text-xs bg-indigo-500/10 px-1.5 py-0.5 rounded">
            model_hash
          </code>{' '}
          — a cryptographic identifier of the exact model version used to generate it. This
          ensures scores are reproducible and auditable. If the methodology changes, the hash
          changes, making it clear which version produced a given score.
        </p>
      </Section>

      <Section title="About SpotCrime">
        <p>
          SpotCrime.com is the leading public crime mapping platform, with data going back to 2008
          and covering hundreds of millions of reported incidents. CrimeScore is SpotCrime's
          structured intelligence layer — built for developers, AI assistants, and data products.
        </p>
      </Section>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-[#1c1c35]">
        <a
          href="https://spotcrime.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 border border-[#1c1c35] hover:border-indigo-500/50 rounded-lg text-[#e2e2f0] text-sm font-medium transition-colors"
        >
          Visit SpotCrime.com →
        </a>
        <Link
          href="/developers"
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-indigo-500 hover:bg-indigo-400 rounded-lg text-white text-sm font-semibold transition-colors"
        >
          Explore the MCP connector →
        </Link>
      </div>
    </div>
  )
}
