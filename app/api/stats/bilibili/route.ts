import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  try {
    const res = await fetch('https://api.bilibili.com/x/relation/stat?vmid=397711814')
    const data = await res.json()
    return NextResponse.json({ followers: data.data?.follower ?? 0 })
  } catch {
    return NextResponse.json({ followers: 0 })
  }
}