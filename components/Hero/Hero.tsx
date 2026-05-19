'use client'

import styles from './Hero.module.css'
import { translations } from '@/i18n/translations'
import { useLanguage } from '@/i18n/LanguageProvider'

export default function Hero() {
  const { lang } = useLanguage()
  const t = translations.hero

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.avatarWrapper}>
          <img
            src="https://imgbed.xiaobaozi.cn/file/avatar.png"
            alt="Avatar"
            className={styles.avatar}
          />
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
