'use client'

import styles from './Academic.module.css'

const papers = [
  {
    title: "CARD: Towards Conditional Design of Multi-agent Topological Structures",
    authors: "T Wu, Y Li, Z Tang, C Jiang, L Luo, G Qi, S Pan, G Haffari",
    venue: "ICLR 2026",
    year: "2026",
    link: "https://arxiv.org/abs/2603.01089"
  },
  {
    title: "Who Deserves the Reward? SHARP: Shapley Credit-based Optimization for Multi-Agent System",
    authors: "Y Li, X Zhang, WJ Lu, Z Tang, M Wu, H Luo, T Wu, Z Peng, H Mi, Y Feng, ...",
    venue: "arXiv preprint",
    year: "2026",
    link: "https://arxiv.org/abs/2602.08335"
  },
  {
    title: "Two Steps to Precision: Enhancing Reliable API Invocation in Code Generation",
    authors: "Y Li, Z Tang, S Wang, G Qi",
    venue: "NLPCC 2025, Springer",
    year: "2025",
    link: "https://link.springer.com/chapter/10.1007/978-981-95-3346-6_33"
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
              <a
                key={index}
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.paper}
              >
                <span className={styles.paperYear}>{paper.year}</span>
                <div className={styles.paperInfo}>
                  <span className={styles.paperName}>{paper.title}</span>
                  <span className={styles.paperAuthors}>{paper.authors}</span>
                  <span className={styles.paperVenue}>{paper.venue}</span>
                </div>
                <svg className={styles.externalIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
