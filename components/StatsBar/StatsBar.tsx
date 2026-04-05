'use client'

import { useEffect, useState } from 'react'
import styles from './StatsBar.module.css'

interface Stats {
  github?: number
  bilibili?: number
  afdian?: number
  xiaohongshu?: number
}

export default function StatsBar() {
  const [stats, setStats] = useState<Stats>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/stats/github').then(r => r.json()),
      fetch('/api/stats/bilibili').then(r => r.json()),
      fetch('/api/stats/afdian').then(r => r.json()),
      fetch('/api/stats/xiaohongshu').then(r => r.json()),
    ]).then(([github, bilibili, afdian, xiaohongshu]) => {
      setStats({
        github: github.stars,
        bilibili: bilibili.followers,
        afdian: afdian.count,
        xiaohongshu: xiaohongshu.followers,
      })
      setLoading(false)
    }).catch(() => setLoading(false))
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
        <span className={styles.statLabel}>B站粉丝</span>
      </div>
      <span className={styles.separator} />
      <div className={styles.stat}>
        <span className={styles.statValue}>{loading ? '-' : (stats.afdian ?? '-')}</span>
        <span className={styles.statLabel}>爱发电</span>
      </div>
      <span className={styles.separator} />
      <div className={styles.stat}>
        <span className={styles.statValue}>{loading ? '-' : formatNumber(stats.xiaohongshu)}</span>
        <span className={styles.statLabel}>小红书</span>
      </div>
    </div>
  )
}

function formatNumber(num?: number): string {
  if (!num) return '-'
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toString()
}
