import { projects } from '@/data/projects'
import styles from './Projects.module.css'

export default function Projects() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>✦</span>
        <h2 className={styles.headerTitle}>GitHub Projects</h2>
      </div>
      <div className={styles.grid}>
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardName}>{project.name}</span>
              <span className={styles.cardStars}>{project.stars}</span>
            </div>
            <p className={styles.cardDescription}>{project.description}</p>
            <span className={styles.cardLanguage}>{project.language}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
