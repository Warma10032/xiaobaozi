import { NextResponse } from 'next/server'
import { fetchWithTimeout } from '@/lib/fetchWithTimeout'

export const runtime = 'nodejs'
export const revalidate = 3600

const PROFILE_URL = 'https://www.xiaohongshu.com/user/profile/5d4f274d0000000016026472'

export async function GET() {
  try {
    const configuredFollowers = process.env.XIAOHONGSHU_FOLLOWERS

    if (configuredFollowers) {
      return NextResponse.json({ followers: parseFollowerCount(configuredFollowers) })
    }

    const response = await fetchWithTimeout(PROFILE_URL, {
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`Xiaohongshu request failed: ${response.status}`)
    }

    const html = await response.text()
    const followers = parseFollowersFromHtml(html)

    return NextResponse.json({ followers })
  } catch {
    return NextResponse.json({ followers: null })
  }
}

function parseFollowersFromHtml(html: string): number | string | null {
  const fansMatch = html.match(/"type":"fans"[^}]*"count":"([^"]+)"/)
  const countBeforeTypeMatch = html.match(/"count":"([^"]+)"[^}]*"type":"fans"/)
  const rawCount = fansMatch?.[1] ?? countBeforeTypeMatch?.[1]

  if (!rawCount) {
    return null
  }

  return parseFollowerCount(rawCount)
}

function parseFollowerCount(rawCount: string): number | string | null {
  const count = rawCount.trim()

  if (!count) {
    return null
  }

  if (/^\d+$/.test(count)) {
    return Number(count)
  }

  return count
}

