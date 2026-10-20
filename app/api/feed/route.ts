import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import { fetchWithTimeout } from '@/lib/fetchWithTimeout'

export const runtime = 'nodejs'
export const revalidate = 3600

const ECH0_BASE_URL = 'https://memo.xiaobaozi.cn'
const REVALIDATE_SECONDS = 3600
const UPSTREAM_TIMEOUT_MS = 15_000

interface Ech0File {
  id: string
  url: string
  name?: string
  content_type?: string
  width?: number
  height?: number
}

interface Ech0EchoFile {
  id: string
  echo_id: string
  file_id: string
  file: Ech0File
  sort_order: number
}

interface Ech0Tag {
  id: string
  name: string
  usage_count: number
  created_at: number
}

interface Ech0Echo {
  id: string
  content: string
  username: string
  echo_files?: Ech0EchoFile[]
  tags?: Ech0Tag[]
  extension?: string
  extension_type?: string
  fav_count?: number
  created_at: number | string
}

export interface ServerInfo {
  server_name: string
  server_url: string
  logo: string
  total_echos: number
  today_echos: number
  sys_username: string
}

export interface FeedImage {
  url: string
  width?: number
  height?: number
}

export interface FeedItem {
  id: string
  content: string
  username: string
  images: FeedImage[]
  tags: string[]
  extension: string
  extension_type: string
  fav_count: number
  created_at: string
  server_name: string
  server_url: string
  logo: string
}

export interface FeedResponse {
  items: FeedItem[]
  hasMore: boolean
  server: ServerInfo | null
}

const DEFAULT_PAGE_SIZE = 5

/**
 * The Ech0 backend lives next to the user while this app runs on a Vercel
 * region overseas, so every uncached call is a cross-ocean round trip that
 * added several seconds to the page load. The upstream responses are wrapped
 * in `unstable_cache` so the origin is only hit once per hour instead of on
 * every request. The upstream call is a POST, which the Next.js data cache
 * does not cover on its own — caching the resolved function result does.
 */
const getCachedServerInfo = unstable_cache(
  async (): Promise<ServerInfo | null> => {
    const res = await fetchWithTimeout(
      `${ECH0_BASE_URL}/api/connect`,
      {
        headers: { 'User-Agent': 'xiaobaozi-homepage' },
        next: { revalidate: REVALIDATE_SECONDS },
      },
      UPSTREAM_TIMEOUT_MS,
    )

    if (!res.ok) {
      throw new Error(`Ech0 server info failed: ${res.status}`)
    }

    const json = await res.json()
    if (json.code !== 1) {
      throw new Error(`Ech0 server info error: ${json.msg}`)
    }

    return json.data as ServerInfo
  },
  ['feed-server-info'],
  { revalidate: REVALIDATE_SECONDS },
)

const getCachedEchoes = unstable_cache(
  async (
    page: number,
    pageSize: number,
  ): Promise<{ items: Ech0Echo[]; total: number }> => {
    const res = await fetchWithTimeout(
      `${ECH0_BASE_URL}/api/echo/page`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'xiaobaozi-homepage',
        },
        body: JSON.stringify({ page, pageSize }),
      },
      UPSTREAM_TIMEOUT_MS,
    )

    if (!res.ok) {
      throw new Error(`Ech0 API request failed: ${res.status}`)
    }

    const json = await res.json()
    if (json.code !== 1) {
      throw new Error(`Ech0 API error: ${json.msg}`)
    }

    return {
      items: json.data?.items ?? [],
      total: json.data?.total ?? 0,
    }
  },
  ['feed-echoes'],
  { revalidate: REVALIDATE_SECONDS },
)

export async function GET(request: Request) {
  try {
    const { pageSize, page } = getParams(request.url)

    const [serverInfo, echoResult] = await Promise.all([
      // A failure here degrades to "no server info" instead of failing the
      // whole feed, and it must not be cached as a permanent empty value.
      getCachedServerInfo().catch(() => null),
      getCachedEchoes(page, pageSize),
    ])

    const echoes = echoResult.items

    const items: FeedItem[] = echoes.map((echo) => ({
      id: echo.id,
      content: echo.content ?? '',
      username: echo.username ?? serverInfo?.sys_username ?? '',
      images: (echo.echo_files ?? [])
        .map(
          (ef): FeedImage => ({
            url: ef.file?.url ?? '',
            width: ef.file?.width,
            height: ef.file?.height,
          }),
        )
        .filter((image) => Boolean(image.url)),
      tags: (echo.tags ?? []).map((t) => t.name),
      extension: echo.extension ?? '',
      extension_type: echo.extension_type ?? '',
      fav_count: echo.fav_count ?? 0,
      created_at:
        typeof echo.created_at === 'number'
          ? new Date(echo.created_at * 1000).toISOString()
          : echo.created_at,
      server_name: serverInfo?.server_name ?? 'Ech0',
      server_url: ECH0_BASE_URL,
      logo: serverInfo?.logo ?? '',
    }))

    return NextResponse.json(
      {
        items,
        hasMore: page * pageSize < echoResult.total,
        server: serverInfo,
      },
      {
        headers: {
          // `s-maxage` must not be combined with `stale-while-revalidate`:
          // s-maxage implies proxy-revalidate, and Cloudflare refuses to
          // cache that combination.
          'Cache-Control': `public, max-age=300, s-maxage=${REVALIDATE_SECONDS}`,
        },
      },
    )
  } catch {
    return NextResponse.json({ items: [], hasMore: false, server: null })
  }
}

function getParams(url: string): { pageSize: number; page: number } {
  const parsedUrl = new URL(url)
  const limitValue = Number(
    parsedUrl.searchParams.get('limit') ?? DEFAULT_PAGE_SIZE,
  )
  const pageValue = Number(parsedUrl.searchParams.get('page') ?? 1)

  const pageSize =
    Number.isFinite(limitValue) && limitValue > 0
      ? Math.min(Math.floor(limitValue), 50)
      : DEFAULT_PAGE_SIZE

  const page =
    Number.isFinite(pageValue) && pageValue > 0 ? Math.floor(pageValue) : 1

  return { pageSize, page }
}
