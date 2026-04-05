import { NextResponse } from 'next/server'

export const runtime = 'edge'

interface FeedItem {
  title: string
  pubDate: string
  content: string
  link: string
}

export async function GET() {
  try {
    const res = await fetch('https://memo.xiaobaozi.cn/api/rss', {
      headers: { 'User-Agent': 'xiaobaozi-homepage' }
    })
    const text = await res.text()

    const items: FeedItem[] = []
    const itemMatches = text.matchAll(/<item>([\s\S]*?)<\/item>/g)

    for (const match of itemMatches) {
      const item = match[1]
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
                     item.match(/<title>(.*?)<\/title>/)?.[1] || ''
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || ''
      const link = item.match(/<link>(.*?)<\/link>/)?.[1] || ''
      const content = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] ||
                      item.match(/<description>(.*?)<\/description>/)?.[1] || ''

      if (title) {
        items.push({ title, pubDate, content, link })
      }

      if (items.length >= 5) break
    }

    return NextResponse.json({ items })
  } catch (error) {
    return NextResponse.json({ items: [] })
  }
}
