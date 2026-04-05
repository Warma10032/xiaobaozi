import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  try {
    const res = await fetch('https://api.github.com/users/Warma10032', {
      headers: { 'User-Agent': 'xiaobaozi-homepage' }
    })
    const data = await res.json()

    // Calculate total stars from user's starred repos
    const starredRes = await fetch('https://api.github.com/users/Warma10032/starred?per_page=100', {
      headers: { 'User-Agent': 'xiaobaozi-homepage' }
    })
    const starred = await starredRes.json()
    const stars = Array.isArray(starred) ? starred.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0) : 0

    return NextResponse.json({ stars })
  } catch {
    return NextResponse.json({ stars: 0 })
  }
}