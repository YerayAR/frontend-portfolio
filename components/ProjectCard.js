import styles from '../styles/Projects.module.css'

export default function ProjectCard({ project }) {
  return (
    <div className={styles.card}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className={styles.links}>
        <a href={project.url} target="_blank" rel="noopener noreferrer">Demo</a>
        <a href={project.repo} target="_blank" rel="noopener noreferrer">Code</a>
      </div>
    </div>
  )
}
