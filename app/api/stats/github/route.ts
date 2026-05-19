import { NextResponse } from 'next/server'
import projects from '@/data/projects.json'
import { fetchWithTimeout } from '@/lib/fetchWithTimeout'

export const runtime = 'nodejs'
export const revalidate = 3600

interface GitHubRepo {
  name: string
  fork: boolean
  stargazers_count: number
}

interface GitHubStats {
  stars: number
  projects: Record<string, number>
}

export async function GET() {
  try {
    const stats = await fetchGitHubStats()
    return NextResponse.json(stats)
  } catch {
    return NextResponse.json({ stars: null, projects: {} })
  }
}

async function fetchGitHubStats(): Promise<GitHubStats> {
  const repos: GitHubRepo[] = []
  const projectNames = new Set(projects.map((p) => p.repoName))

  for (let page = 1; page <= 10; page++) {
    const batch = await fetchGitHubRepos(page)
    repos.push(...batch)

    if (batch.length < 100) {
      break
    }
  }

  const stars = repos.reduce((total, repo) => {
    if (repo.fork) {
      return total
    }

    return total + repo.stargazers_count
  }, 0)

  const projectStars = repos.reduce<Record<string, number>>((acc, repo) => {
    if (projectNames.has(repo.name)) {
      acc[repo.name] = repo.stargazers_count
    }

    return acc
  }, {})

  return { stars, projects: projectStars }
}

async function fetchGitHubRepos(page: number): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_TOKEN
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'xiaobaozi-homepage',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetchWithTimeout(
    `https://api.github.com/users/Warma10032/repos?per_page=100&page=${page}&sort=updated`,
    {
      headers,
      next: { revalidate: 3600 },
    }
  )

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status}`)
  }

  const data = await response.json() as unknown

  if (!Array.isArray(data)) {
    throw new Error('GitHub response is not an array')
  }

  return data
    .filter(isGitHubRepo)
    .map((repo) => ({
      name: repo.name,
      fork: repo.fork,
      stargazers_count: repo.stargazers_count,
    }))
}

function isGitHubRepo(value: unknown): value is GitHubRepo {
  if (!value || typeof value !== 'object') {
    return false
  }

  const repo = value as Record<string, unknown>
  return (
    typeof repo.name === 'string' &&
    typeof repo.fork === 'boolean' &&
    typeof repo.stargazers_count === 'number'
  )
}

