import styles from './Academic.module.css'

const papers = [
  {
    title: "CARD: Towards Conditional Design of Multi-agent Topological Structures",
    authors: "T Wu, Y Li, Z Tang, C Jiang, L Luo, G Qi, S Pan, G Haffari",
    venue: "arXiv preprint arXiv:2603.01089",
    year: "2026"
  },
  {
    title: "Who Deserves the Reward? SHARP: Shapley Credit-based Optimization for Multi-Agent System",
    authors: "Y Li, X Zhang, WJ Lu, Z Tang, M Wu, H Luo, T Wu, Z Peng, H Mi, Y Feng, ...",
    venue: "arXiv preprint arXiv:2602.08335",
    year: "2026"
  },
  {
    title: "Two Steps to Precision: Enhancing Reliable API Invocation in Code Generation",
    authors: "Y Li, Z Tang, S Wang, G Qi",
    venue: "CCF International Conference on Natural Language Processing and Chinese Computing (NLPCC)",
    year: "2025"
  }
]

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
            <p className={styles.research}>Large Language Models · Multi-Agent Systems · Machine Learning</p>
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
            Google Scholar
          </a>
        </div>

        <div className={styles.papers}>
          <h4 className={styles.papersTitle}>Selected Publications</h4>
          <div className={styles.paperList}>
            {papers.map((paper, index) => (
              <div key={index} className={styles.paper}>
                <span className={styles.paperYear}>{paper.year}</span>
                <div className={styles.paperInfo}>
                  <span className={styles.paperName}>{paper.title}</span>
                  <span className={styles.paperAuthors}>{paper.authors}</span>
                  <span className={styles.paperVenue}>{paper.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
