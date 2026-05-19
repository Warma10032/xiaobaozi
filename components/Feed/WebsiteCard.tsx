'use client'

import styles from './WebsiteCard.module.css'

interface WebsiteCardProps {
  website: string
}

export default function WebsiteCard({ website }: WebsiteCardProps) {
  let info: { title: string; site: string }
  try {
    info = JSON.parse(website) as { title: string; site: string }
  } catch {
    return null
  }

  return (
    <a
      href={info.site}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.extensionCard}
    >
      <div className={styles.websiteCard}>
        <span className={styles.websiteIcon}>🔗</span>
        <span className={styles.websiteTitle}>{info.title}</span>
      </div>
    </a>
  )
}
