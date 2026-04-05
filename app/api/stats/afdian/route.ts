import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  // Afdian doesn't have a public API, return a placeholder
  // In production, you would scrape or use their API
  return NextResponse.json({ count: 128 })
}