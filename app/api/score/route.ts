import { NextRequest, NextResponse } from 'next/server'
import { fetchScore } from '@/lib/mcp'

export async function GET(req: NextRequest) {
  const zip = req.nextUrl.searchParams.get('zip')

  if (!zip || !/^\d{5}$/.test(zip)) {
    return NextResponse.json({ error: 'Invalid ZIP code' }, { status: 400 })
  }

  try {
    const data = await fetchScore(zip)
    return NextResponse.json(data)
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
