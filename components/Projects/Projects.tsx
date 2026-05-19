'use client'

import { useEffect, useState } from 'react'
import projects from '@/data/projects.json'
import { useLanguage } from '@/i18n/LanguageProvider'
import styles from './Projects.module.css'

interface GitHubProjectsResponse {
  projects?: Record<string, number>
}

export default function Projects() {
  const { lang } = useLanguage()
  const [projectStars, setProjectStars] = useState<Record<string, number>>({})

  useEffect(() => {
    let cancelled = false

    fetch('/api/stats/github')
      .then(parseProjectsResponse)
      .then((data) => {
        if (!cancelled) {
          setProjectStars(data.projects ?? {})
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

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
            <div className={styles.cardMeta}>★ {formatStarCount(projectStars[project.repoName])}</div>
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

async function parseProjectsResponse(response: Response): Promise<GitHubProjectsResponse> {
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return response.json() as Promise<GitHubProjectsResponse>
}

function formatStarCount(value?: number): string {
  if (typeof value !== 'number') {
    return '-'
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }

  return value.toString()
}
