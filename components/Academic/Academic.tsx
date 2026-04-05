import styles from './Academic.module.css'

export default function Academic() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.headerLine}></span>
        <h2 className={styles.headerTitle}>Academic</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.profile}>
          <div className={styles.profileInfo}>
            <h3 className={styles.name}>Ziye Tang</h3>
            <p className={styles.affiliation}>Southeast University</p>
            <p className={styles.research}>Large Language Models · Machine Learning</p>
          </div>
          <a
            href="https://scholar.google.com/citations?user=aYmhNtsAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profileLink}
          >
            <svg className={styles.scholarIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/>
            </svg>
            View Google Scholar
          </a>
        </div>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <span className={styles.metricValue}>-</span>
            <span className={styles.metricLabel}>Citations</span>
          </div>
          <div className={styles.metricDivider}></div>
          <div className={styles.metric}>
            <span className={styles.metricValue}>-</span>
            <span className={styles.metricLabel}>h-index</span>
          </div>
          <div className={styles.metricDivider}></div>
          <div className={styles.metric}>
            <span className={styles.metricValue}>-</span>
            <span className={styles.metricLabel}>i10-index</span>
          </div>
        </div>

        <div className={styles.coauthors}>
          <h4 className={styles.coauthorsTitle}>Collaborators</h4>
          <div className={styles.coauthorsList}>
            <span className={styles.coauthor}>Shirui Pan</span>
            <span className={styles.coauthor}>Linhao Luo</span>
            <span className={styles.coauthor}>Li Shen</span>
            <span className={styles.coauthor}>Guilin Qi</span>
          </div>
        </div>
      </div>
    </section>
  )
}
