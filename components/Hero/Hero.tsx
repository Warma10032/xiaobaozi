import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <img
          src="https://imgbed.xiaobaozi.cn/file/avatar.jpg"
          alt="Avatar"
          className={styles.avatar}
        />
        <h1 className={styles.name}>一只小包子</h1>
        <p className={styles.handle}>Warma10032</p>
        <hr className={styles.divider} />
        <p className={styles.tagline}>
          东南大学 · 全栈开发 · AI爱好者
        </p>
      </div>
    </section>
  )
}
