'use client'

import { projects } from '@/data/projects'
import { useLanguage } from '@/i18n/LanguageProvider'
import styles from './Projects.module.css'

export default function Projects() {
  const { lang } = useLanguage()

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.headerLine} />
        <h2 className={styles.headerTitle}>Projects</h2>
      </div>
      <div className={styles.grid}>
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.cardName}>{project.name}</div>
            <div className={styles.cardMeta}>★ {project.stars}</div>
            <p className={styles.cardDescription}>
              {lang === 'zh' ? project.description : project.descriptionEn}
            </p>
            <span className={styles.cardLanguage}>{project.language}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
