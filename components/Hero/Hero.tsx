'use client'

import { useState } from 'react'
import styles from './Hero.module.css'
import { translations } from '@/i18n/translations'
import { useLanguage } from '@/i18n/LanguageProvider'

export default function Hero() {
  const { lang } = useLanguage()
  const t = translations.hero
  const [avatarFailed, setAvatarFailed] = useState(false)

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.avatarWrapper}>
          {!avatarFailed && (
            <picture className={styles.avatarPicture}>
              <source srcSet="/avatar.webp" type="image/webp" />
              <img
                src="/avatar.png"
                alt="Avatar"
                className={styles.avatar}
                width={480}
                height={480}
                decoding="async"
                fetchPriority="high"
                onError={() => setAvatarFailed(true)}
              />
            </picture>
          )}
        </div>
        <h1 className={styles.name}>{t.name}</h1>
        <p className={styles.handle}>{t.nameEn}</p>
        <hr className={styles.divider} />
        <p className={styles.tagline}>
          {lang === 'zh' ? t.tagline : t.taglineEn}
        </p>
      </div>
    </section>
  )
}
