'use client'

import styles from './About.module.css'
import { translations } from '@/i18n/translations'
import { useLanguage } from '@/i18n/LanguageProvider'

export default function About() {
  const { lang } = useLanguage()
  const t = translations.about
  const content = lang === 'zh' ? t.content : t.contentEn

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.headerLine} />
        <h2 className={styles.headerTitle}>{t.header}</h2>
      </div>
      <div className={styles.content}>
        {content.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  )
}
