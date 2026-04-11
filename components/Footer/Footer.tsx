'use client'

import styles from './Footer.module.css'
import { translations } from '@/i18n/translations'
import { useLanguage } from '@/i18n/LanguageProvider'

export default function Footer() {
  const { lang } = useLanguage()
  const t = translations.footer
  const year = new Date().getFullYear()
  const copyright = lang === 'zh' ? t.copyright : t.copyrightEn

  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="mailto:warma10032@qq.com" className={styles.link}>Email</a>
        <a href="https://github.com/Warma10032" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
        <a href="https://space.bilibili.com/397711814" target="_blank" rel="noopener noreferrer" className={styles.link}>{lang === 'zh' ? 'B站' : 'Bilibili'}</a>
        <a href="https://www.xiaohongshu.com/user/profile/450821311" target="_blank" rel="noopener noreferrer" className={styles.link}>{lang === 'zh' ? '小红书' : 'REDnote'}</a>
      </div>
      <p className={styles.copyright}>{copyright.replace('{year}', String(year))}</p>
    </footer>
  )
}
