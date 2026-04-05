import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  try {
    // User's received stars from their repos
    const stars = 726 + 395 + 147 + 47 + 10 // approximately 1325
    return NextResponse.json({ stars })
  } catch {
    return NextResponse.json({ stars: 0 })
  }
}