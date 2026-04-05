'use client'

import { useEffect, useState } from 'react'
import styles from './Feed.module.css'

interface FeedItem {
  title: string
  pubDate: string
  content: string
  link: string
}

export default function Feed() {
  const [items, setItems] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/feed')
      .then(r => r.json())
      .then(data => {
        setItems(data.items || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.header}>
          <span className={styles.headerIcon}>✦</span>
          <h2 className={styles.headerTitle}>最近在做些什么</h2>
        </div>
        <p className={styles.loading}>Loading...</p>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.header}>
          <span className={styles.headerIcon}>✦</span>
          <h2 className={styles.headerTitle}>最近在做些什么</h2>
        </div>
        <p className={styles.empty}>暂无动态</p>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>✦</span>
        <h2 className={styles.headerTitle}>最近在做些什么</h2>
      </div>
      <div className={styles.list}>
        {items.map((item, index) => (
          <div key={index} className={styles.item}>
            <p className={styles.date}>{formatDate(item.pubDate)}</p>
            <p
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: item.content || item.title }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  } catch {
    return dateStr
  }
}
