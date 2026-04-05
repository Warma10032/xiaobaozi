import { projects } from '@/data/projects'
import styles from './Projects.module.css'

export default function Projects() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.headerLine} />
        <h2 className={styles.headerTitle}>Projects</h2>
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
            <div className={styles.cardName}>{project.name}</div>
            <div className={styles.cardMeta}>★ {project.stars}</div>
            <p className={styles.cardDescription}>{project.description}</p>
            <span className={styles.cardLanguage}>{project.language}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
