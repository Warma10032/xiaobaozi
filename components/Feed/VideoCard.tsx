'use client'

import styles from './VideoCard.module.css'

interface VideoCardProps {
  videoId: string
}

export default function VideoCard({ videoId }: VideoCardProps) {
  const isBilibili = videoId.startsWith('BV')

  return (
    <div className={styles.extensionCard}>
      <div className={styles.videoWrapper}>
        {isBilibili ? (
          <iframe
            src={`https://www.bilibili.com/blackboard/html5mobileplayer.html?bvid=${videoId}&as_wide=1&high_quality=1&danmaku=0`}
            scrolling="no"
            frameBorder={0}
            allowFullScreen
            loading="lazy"
            className={styles.videoIframe}
          />
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder={0}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className={styles.videoIframe}
          />
        )}
      </div>
    </div>
  )
}
