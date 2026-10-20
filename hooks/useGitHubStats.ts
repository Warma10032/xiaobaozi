'use client'

import { useEffect, useState } from 'react'

export interface GitHubStats {
  stars?: number | null
  projects?: Record<string, number>
}

interface GitHubStatsState {
  data: GitHubStats | null
  loading: boolean
  failed: boolean
}

/**
 * StatsBar and Projects both need /api/stats/github, and the response carries
 * both the total star count and the per-project stars. A module-level cache
 * keeps them on a single request instead of two identical ones on every load.
 */
let inFlight: Promise<GitHubStats> | null = null
let resolved: GitHubStats | null = null

function loadGitHubStats(): Promise<GitHubStats> {
  if (!inFlight) {
    inFlight = fetch('/api/stats/github')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`)
        }
        return response.json() as Promise<GitHubStats>
      })
      .then((data) => {
        resolved = data
        return data
      })
      .catch((error) => {
        // Drop the rejected promise so a later mount can retry, but keep the
        // last good value around so the UI does not flash back to empty.
        inFlight = null
        throw error
      })
  }

  return inFlight
}

export function useGitHubStats(): GitHubStatsState {
  const [state, setState] = useState<GitHubStatsState>({
    data: resolved,
    loading: resolved === null,
    failed: false,
  })

  useEffect(() => {
    let cancelled = false

    loadGitHubStats()
      .then((data) => {
        if (!cancelled) {
          setState({ data, loading: false, failed: false })
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ data: resolved, loading: false, failed: true })
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
