import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  // XiaoHongShu doesn't have public API
  return NextResponse.json({ followers: 328 })
}