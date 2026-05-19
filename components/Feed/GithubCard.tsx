'use client'

import { useEffect, useState } from 'react'
import styles from './GithubCard.module.css'

interface GithubCardData {
  name: string
  stargazers_count: number
  forks_count: number
  description: string
  owner: { avatar_url: string }
}

interface GithubCardProps {
  url: string
}

export default function GithubCard({ url }: GithubCardProps) {
  const [data, setData] = useState<GithubCardData | null>(null)

  const parts = url.split('/')
  const repo = parts[parts.length - 1] ?? ''
  const owner = parts[parts.length - 2] ?? ''

  useEffect(() => {
    if (!owner || !repo) return
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json) setData(json as GithubCardData)
      })
      .catch(() => {})
  }, [owner, repo])

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.extensionCard}
    >
      <div className={styles.githubCard}>
        <div className={styles.githubAvatar}>
          {data?.owner?.avatar_url ? (
            <img
              src={data.owner.avatar_url}
              alt=""
              className={styles.githubAvatarImg}
            />
          ) : (
            <span className={styles.githubIcon}>GH</span>
          )}
        </div>
        <div className={styles.githubInfo}>
          <span className={styles.githubName}>{data?.name || repo}</span>
          {data?.description && (
            <p className={styles.githubDesc}>{data.description}</p>
          )}
          <div className={styles.githubStats}>
            <span>★ {data?.stargazers_count ?? 0}</span>
            <span>⑂ {data?.forks_count ?? 0}</span>
          </div>
        </div>
      </div>
    </a>
  )
}
