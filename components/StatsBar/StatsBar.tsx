'use client'

import { useEffect, useState } from 'react'
import styles from './StatsBar.module.css'
import { useLanguage } from '@/i18n/LanguageProvider'

interface Stats {
  github?: number | null
  bilibili?: number | null
  xiaohongshu?: number | string | null
}

export default function StatsBar() {
  const { lang } = useLanguage()
  const [stats, setStats] = useState<Stats>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadStats() {
      const [github, bilibili, xiaohongshu] = await Promise.allSettled([
        fetch('/api/stats/github').then(parseJson),
        fetch('/api/stats/bilibili').then(parseJson),
        fetch('/api/stats/xiaohongshu').then(parseJson),
      ])

      if (cancelled) {
        return
      }

      setStats({
        github: github.status === 'fulfilled' ? github.value.stars : null,
        bilibili: bilibili.status === 'fulfilled' ? bilibili.value.followers : null,
        xiaohongshu: xiaohongshu.status === 'fulfilled' ? xiaohongshu.value.followers : null,
      })
      setLoading(false)
    }

    loadStats().catch(() => {
      if (!cancelled) {
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className={styles.statsBar}>
      <div className={styles.stat}>
        <span className={styles.statValue}>{loading ? '-' : (stats.github ?? '-')}</span>
        <span className={styles.statLabel}>GitHub Stars</span>
      </div>
      <span className={styles.separator} />
      <div className={styles.stat}>
        <span className={styles.statValue}>{loading ? '-' : formatNumber(stats.bilibili)}</span>
        <span className={styles.statLabel}>{lang === 'zh' ? 'B站粉丝' : 'Bilibili followers'}</span>
      </div>
      <span className={styles.separator} />
      <div className={styles.stat}>
        <span className={styles.statValue}>{loading ? '-' : formatNumber(stats.xiaohongshu)}</span>
        <span className={styles.statLabel}>{lang === 'zh' ? '小红书粉丝' : 'REDnote followers'}</span>
      </div>
    </div>
  )
}

async function parseJson(response: Response) {
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return response.json()
}

function formatNumber(num?: number | string | null): string {
  if (typeof num === 'string') return num
  if (typeof num !== 'number') return '-'
  if (num >= 10000) return Math.floor(num / 1000) / 10 + 'w+'
  if (num >= 1000) return Math.floor(num / 100) / 10 + 'k+'
  return num.toString()
}
