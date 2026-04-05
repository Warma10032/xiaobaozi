import { sites } from '@/data/sites'
import styles from './Sites.module.css'

export default function Sites() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>✦</span>
        <h2 className={styles.headerTitle}>我在互联网上的作品</h2>
      </div>
      <div className={styles.grid}>
        {sites.map((site) => (
          <a
            key={site.name}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <span className={styles.icon}>{site.icon}</span>
            <span className={styles.name}>{site.name}</span>
            <span className={styles.description}>{site.description}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
