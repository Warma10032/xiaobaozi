import { NextResponse } from 'next/server'
import { fetchWithTimeout } from '@/lib/fetchWithTimeout'

export const runtime = 'nodejs'
export const revalidate = 3600

const ECH0_BASE_URL = 'https://memo.xiaobaozi.cn'

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

export interface FeedItem {
  id: string
  content: string
  username: string
  images: string[]
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

export async function GET(request: Request) {
  try {
    const { pageSize, page } = getParams(request.url)

    const [serverInfo, echoResult] = await Promise.all([
      fetchServerInfo(),
      fetchEchoes(page, pageSize),
    ])

    const echoes = echoResult.items

    const items: FeedItem[] = echoes.map((echo) => ({
      id: echo.id,
      content: echo.content ?? '',
      username: echo.username ?? serverInfo?.sys_username ?? '',
      images: (echo.echo_files ?? [])
        .map((ef) => ef.file?.url)
        .filter((url): url is string => Boolean(url)),
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

    return NextResponse.json({
      items,
      hasMore: page * pageSize < echoResult.total,
      server: serverInfo,
    })
  } catch {
    return NextResponse.json({ items: [], hasMore: false, server: null })
  }
}

async function fetchServerInfo(): Promise<ServerInfo | null> {
  try {
    const res = await fetchWithTimeout(`${ECH0_BASE_URL}/api/connect`, {
      headers: { 'User-Agent': 'xiaobaozi-homepage' },
    })
    if (!res.ok) return null
    const json = await res.json()
    if (json.code !== 1) return null
    return json.data as ServerInfo
  } catch {
    return null
  }
}

async function fetchEchoes(
  page: number,
  pageSize: number,
): Promise<{ items: Ech0Echo[]; total: number }> {
  const res = await fetchWithTimeout(`${ECH0_BASE_URL}/api/echo/page`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'xiaobaozi-homepage',
    },
    body: JSON.stringify({ page, pageSize }),
  })

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

