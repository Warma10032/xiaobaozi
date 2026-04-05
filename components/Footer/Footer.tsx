import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="mailto:warma10032@qq.com" className={styles.link}>Email</a>
        <a href="https://github.com/Warma10032" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
        <a href="https://space.bilibili.com/397711814" target="_blank" rel="noopener noreferrer" className={styles.link}>B站</a>
        <a href="https://afdian.com/a/Warma10032" target="_blank" rel="noopener noreferrer" className={styles.link}>爱发电</a>
        <a href="https://www.xiaohongshu.com/user/profile/450821311" target="_blank" rel="noopener noreferrer" className={styles.link}>小红书</a>
      </div>
      <p className={styles.copyright}>© {new Date().getFullYear()} 一只小包子</p>
    </footer>
  )
}
