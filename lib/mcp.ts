export interface ScoreEntry {
  region_code: string
  region_type: 'zcta' | 'county'
  display_name: string
  month: string
  score: number
  score_index: number
  percentile: number
  national_rank: number
  state_rank: number
  model_hash: string
}

export async function fetchScore(regionCode: string): Promise<ScoreEntry[]> {
  const token = process.env.CRIMESCORE_API_TOKEN
  if (!token) throw new Error('CRIMESCORE_API_TOKEN not set')

  const res = await fetch('https://mcp.crimescore.info/mcp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'published_score',
        arguments: { region_code: regionCode },
      },
    }),
    next: { revalidate: 3600 }, // cache 1hr
  })

  if (!res.ok) {
    throw new Error(`MCP HTTP error: ${res.status}`)
  }

  const json = await res.json()

  if (json.result?.isError) {
    throw new Error(json.result.content?.[0]?.text || 'MCP error')
  }

  const text = json.result?.content?.[0]?.text
  if (!text) throw new Error('Empty MCP response')

  return JSON.parse(text) as ScoreEntry[]
}
