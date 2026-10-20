'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import ImageGallery from './ImageGallery'
import GithubCard from './GithubCard'
import VideoCard from './VideoCard'
import WebsiteCard from './WebsiteCard'
import type { FeedItem } from '@/app/api/feed/route'
import styles from './EchoCard.module.css'

const EXTENSION_TYPE = {
  MUSIC: 'MUSIC',
  VIDEO: 'VIDEO',
  GITHUBPROJ: 'GITHUBPROJ',
  WEBSITE: 'WEBSITE',
} as const

interface EchoCardProps {
  echo: FeedItem
  lang: 'zh' | 'en'
  /**
   * How many of this card's images should load eagerly. Only the first card
   * of the feed gets one, the rest stay lazy.
   */
  priorityImages?: number
}

export default function EchoCard({
  echo,
  lang,
  priorityImages = 0,
}: EchoCardProps) {
  return (
    <article className={styles.echoCard}>
      {/* Header: logo + server_name + username */}
      <div className={styles.echoHeader}>
        {echo.logo ? (
          <img
            src={echo.logo}
            alt=""
            className={styles.echoLogo}
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={styles.echoLogoPlaceholder} />
        )}
        <div className={styles.echoHeaderInfo}>
          <div className={styles.echoHeaderName}>
            <a
              href={echo.server_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.echoServerName}
            >
              {echo.server_name}
            </a>
          </div>
          <span className={styles.echoUsername}>@ {echo.username}</span>
        </div>
      </div>

      {/* Images */}
      <div className={styles.echoBody}>
        <ImageGallery images={echo.images} priorityCount={priorityImages} />

        {/* Markdown content */}
        <div className={styles.echoContent}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
            components={{
              p: ({ children }) => (
                <p className={styles.mdParagraph}>{children}</p>
              ),
              ul: ({ children }) => (
                <ul className={`${styles.mdList} ${styles.mdListUnordered}`}>{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className={`${styles.mdList} ${styles.mdListOrdered}`}>{children}</ol>
              ),
              li: ({ children }) => (
                <li className={styles.mdListItem}>{children}</li>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mdLink}
                >
                  {children}
                </a>
              ),
              blockquote: ({ children }) => (
                <blockquote className={styles.mdBlockquote}>
                  {children}
                </blockquote>
              ),
              pre: ({ children }) => (
                <pre className={styles.mdPre}>{children}</pre>
              ),
              code: ({ children, className }) => {
                const isInline = !className
                return isInline ? (
                  <code className={styles.mdInlineCode}>{children}</code>
                ) : (
                  <code className={className}>{children}</code>
                )
              },
            }}
          >
            {echo.content}
          </ReactMarkdown>
        </div>

        {/* Extension content */}
        {echo.extension && (
          <div className={styles.echoExtension}>
            {echo.extension_type === EXTENSION_TYPE.VIDEO && (
              <VideoCard videoId={echo.extension} />
            )}
            {echo.extension_type === EXTENSION_TYPE.GITHUBPROJ && (
              <GithubCard url={echo.extension} />
            )}
            {echo.extension_type === EXTENSION_TYPE.WEBSITE && (
              <WebsiteCard website={echo.extension} />
            )}
          </div>
        )}
      </div>

      {/* Footer: date + tags + fav_count */}
      <div className={styles.echoFooter}>
        <div className={styles.echoFooterLeft}>
          <time className={styles.echoDate}>
            {formatDate(echo.created_at, lang)}
          </time>
          {echo.tags.length > 0 && (
            <span className={styles.echoTag}>#{echo.tags[0]}</span>
          )}
        </div>
        <div className={styles.echoFooterRight}>
          <button type="button" disabled className={styles.echoLikeBtn}>
            ♡
          </button>
          <span className={styles.echoFavCount}>
            {echo.fav_count > 99 ? '99+' : echo.fav_count}
          </span>
        </div>
      </div>
    </article>
  )
}

function formatDate(dateString: string, lang: 'zh' | 'en'): string {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24))
    const diffInHours = Math.floor(diff / (1000 * 60 * 60))
    const diffInMinutes = Math.floor(diff / (1000 * 60))
    const diffInSeconds = Math.floor(diff / 1000)

    if (lang === 'zh') {
      if (diffInSeconds < 60) return '刚刚'
      if (diffInMinutes < 60) return `${diffInMinutes}分钟前`
      if (diffInHours < 24) return `${diffInHours}小时前`
      if (diffInDays < 3) return `${diffInDays}天前`
      const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 · ${weekDays[date.getDay()]}`
    }

    if (diffInSeconds < 60) return 'just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInDays < 3) return `${diffInDays}d ago`
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}
