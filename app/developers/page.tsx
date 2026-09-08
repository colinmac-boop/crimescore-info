import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Developer Docs | CrimeScore',
  description:
    'Add crime intelligence to any MCP-compatible AI assistant. One tool, one endpoint, deterministic results.',
}

function CodeBlock({ children, language = 'bash' }: { children: string; language?: string }) {
  return (
    <div className="bg-[#07070f] border border-[#1c1c35] rounded-xl overflow-x-auto">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1c1c35]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="text-xs text-[#7070a0] ml-2">{language}</span>
      </div>
      <pre className="p-4 text-sm text-green-400 font-mono whitespace-pre overflow-x-auto">
        {children}
      </pre>
    </div>
  )
}

function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="mb-16">
      {children}
    </section>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-[#e2e2f0] mb-6 pb-3 border-b border-[#1c1c35]">
      {children}
    </h2>
  )
}

export default function DevelopersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Hero */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm mb-6">
          MCP · Model Context Protocol
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#e2e2f0] mb-6 leading-tight">
          Add crime intelligence to your AI assistant.
        </h1>
        <p className="text-xl text-[#7070a0] leading-relaxed max-w-2xl">
          CrimeScore connects to any MCP-compatible AI via a single HTTP endpoint.
          No RAG pipeline. No retrieval layer. One tool. Deterministic results.
        </p>
      </div>

      {/* Hero code */}
      <div className="mb-16">
        <CodeBlock language="bash">{`claude mcp add --transport http crimescore \\
  https://mcp.crimescore.info/mcp \\
  --header "Authorization: Bearer YOUR_TOKEN"`}</CodeBlock>
      </div>

      {/* What you get */}
      <Section id="tool">
        <H2>What you get</H2>
        <div className="bg-[#0e0e1c] border border-[#1c1c35] rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded text-indigo-300 font-mono text-sm">
              published_score
            </div>
            <div>
              <p className="text-[#e2e2f0] font-medium">The one tool</p>
              <p className="text-[#7070a0] text-sm mt-1">
                Query crime scores for any US ZIP code or county FIPS code.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-[#07070f] rounded-lg p-4">
              <p className="text-xs text-[#7070a0] uppercase tracking-wider mb-2">Input</p>
              <p className="font-mono text-[#e2e2f0]">region_code</p>
              <p className="text-[#7070a0] text-xs mt-1">ZIP or county FIPS</p>
            </div>
            <div className="bg-[#07070f] rounded-lg p-4">
              <p className="text-xs text-[#7070a0] uppercase tracking-wider mb-2">Output</p>
              <p className="font-mono text-[#e2e2f0]">percentile</p>
              <p className="font-mono text-[#e2e2f0]">national_rank</p>
              <p className="font-mono text-[#e2e2f0]">state_rank</p>
            </div>
            <div className="bg-[#07070f] rounded-lg p-4">
              <p className="text-xs text-[#7070a0] uppercase tracking-wider mb-2">Coverage</p>
              <p className="text-[#e2e2f0]">41,700+ ZIPs</p>
              <p className="text-[#7070a0] text-xs mt-1">Monthly snapshots</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Setup */}
      <Section id="setup">
        <H2>Setup in 60 seconds</H2>

        <div className="space-y-8">
          <div>
            <h3 className="text-base font-semibold text-[#e2e2f0] mb-3">Claude Code (CLI)</h3>
            <CodeBlock language="bash">{`claude mcp add --transport http crimescore \\
  https://mcp.crimescore.info/mcp \\
  --header "Authorization: Bearer YOUR_TOKEN"`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e2e2f0] mb-3">Claude Desktop</h3>
            <p className="text-sm text-[#7070a0] mb-3">
              Add to your <code className="font-mono text-indigo-300 text-xs">claude_desktop_config.json</code>:
            </p>
            <CodeBlock language="json">{`{
  "mcpServers": {
    "crimescore": {
      "type": "http",
      "url": "https://mcp.crimescore.info/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_TOKEN"
      }
    }
  }
}`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e2e2f0] mb-3">Direct API (curl)</h3>
            <CodeBlock language="bash">{`curl -X POST https://mcp.crimescore.info/mcp \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "published_score",
      "arguments": { "region_code": "10001" }
    }
  }'`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e2e2f0] mb-3">JavaScript / Node.js</h3>
            <CodeBlock language="javascript">{`const res = await fetch('https://mcp.crimescore.info/mcp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN',
  },
  body: JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
      name: 'published_score',
      arguments: { region_code: '10001' },
    },
  }),
})

const { result } = await res.json()
const scores = JSON.parse(result.content[0].text)
console.log(scores[0].percentile) // e.g. 62.4`}</CodeBlock>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#e2e2f0] mb-3">Python</h3>
            <CodeBlock language="python">{`import requests, json

resp = requests.post(
    "https://mcp.crimescore.info/mcp",
    headers={
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_TOKEN",
    },
    json={
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/call",
        "params": {
            "name": "published_score",
            "arguments": {"region_code": "10001"},
        },
    },
)

scores = json.loads(resp.json()["result"]["content"][0]["text"])
print(scores[0]["percentile"])  # e.g. 62.4`}</CodeBlock>
          </div>
        </div>
      </Section>

      {/* Sample queries */}
      <Section id="examples">
        <H2>Sample Queries</H2>
        <p className="text-[#7070a0] mb-6">
          Once connected to Claude or another MCP-compatible AI, ask naturally:
        </p>
        <div className="space-y-3">
          {[
            'What\'s the crime score for ZIP 21201?',
            'Compare crime levels in 90210 and 10001.',
            'What is the crime percentile for county FIPS 24510?',
            'How dangerous is the neighborhood around ZIP 60601?',
            'Rank these ZIPs by crime: 21201, 21215, 21210.',
          ].map((q) => (
            <div
              key={q}
              className="flex items-start gap-3 bg-[#0e0e1c] border border-[#1c1c35] rounded-lg px-4 py-3"
            >
              <span className="text-indigo-400 mt-0.5 shrink-0">›</span>
              <p className="text-[#e2e2f0] text-sm italic">&ldquo;{q}&rdquo;</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Coverage */}
      <Section id="coverage">
        <H2>Coverage</H2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { value: '~41,700', label: 'US ZIP codes (ZCTAs)' },
            { value: '60M+', label: 'Crime incidents in dataset' },
            { value: 'Monthly', label: 'Score update cadence' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-[#0e0e1c] border border-[#1c1c35] rounded-xl p-5 text-center">
              <p className="text-2xl font-bold text-[#e2e2f0]">{value}</p>
              <p className="text-sm text-[#7070a0] mt-1">{label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Get token */}
      <Section id="token">
        <H2>Get a Token</H2>
        <div className="bg-[#0e0e1c] border border-[#1c1c35] rounded-xl p-8">
          <p className="text-[#7070a0] mb-4 leading-relaxed">
            Demo tokens are available for testing with ZIP codes 21201–21231.
            Production tokens provide access to all ~41,700 ZIP codes.
          </p>
          <a
            href="mailto:ian@crimescore.io"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-lg transition-colors"
          >
            Request a token → ian@crimescore.io
          </a>
        </div>
      </Section>

      {/* Console link */}
      <div className="border-t border-[#1c1c35] pt-8 flex items-center justify-between">
        <p className="text-[#7070a0] text-sm">
          Interactive test console available at mcp.crimescore.info
        </p>
        <a
          href="https://mcp.crimescore.info/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-indigo-400 hover:underline"
        >
          Open console →
        </a>
      </div>
    </div>
  )
}
