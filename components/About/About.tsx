import styles from './About.module.css'

export default function About() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>✦</span>
        <h2 className={styles.headerTitle}>About Me</h2>
      </div>
      <div className={styles.content}>
        <p>
          东南大学学生，对技术充满热情，专注于全栈开发和人工智能领域。
          喜欢折腾各种有趣的项目，从大模型应用开发到浏览器插件制作。
        </p>
        <p>
          在互联网各个角落都有我的痕迹：写博客记录学习心得，
          做开源项目分享代码，偶尔也会在 B 站发发视频。
          如果你也有有趣的想法，欢迎联系我！
        </p>
      </div>
    </section>
  )
}
