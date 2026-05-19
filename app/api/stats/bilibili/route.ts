import { NextResponse } from 'next/server'
import { fetchWithTimeout } from '@/lib/fetchWithTimeout'

export const runtime = 'nodejs'
export const revalidate = 3600

interface BilibiliResponse {
  code?: number
  data?: {
    follower?: number
  }
}

export async function GET() {
  try {
    const response = await fetchWithTimeout('https://api.bilibili.com/x/relation/stat?vmid=397711814', {
      headers: {
        'User-Agent': 'xiaobaozi-homepage',
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`Bilibili request failed: ${response.status}`)
    }

    const data = await response.json() as BilibiliResponse

    if (data.code !== 0 || typeof data.data?.follower !== 'number') {
      throw new Error('Bilibili response is invalid')
    }

    return NextResponse.json({ followers: data.data.follower })
  } catch {
    return NextResponse.json({ followers: null })
  }
}

