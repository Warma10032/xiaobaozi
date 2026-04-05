import LineAnimation from './LineAnimation'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <LineAnimation />
      <div className={styles.heroContent}>
        <div className={styles.avatar}>包</div>
        <h1 className={styles.name}>一只小包子</h1>
        <p className={styles.handle}>Warma10032</p>
        <p className={styles.tagline}>
          东南大学 · 全栈开发 · AI爱好者
        </p>
      </div>
      <div className={styles.scrollIndicator}>
        <span>scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}