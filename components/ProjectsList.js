import ProjectCard from './ProjectCard'
import styles from '../styles/Projects.module.css'

const projects = [
  {
    title: 'Neon Bytes Portfolio',
    description: 'Interactive portfolio built with Next.js.',
    url: '#',
    repo: '#'
  },
  {
    title: 'Data Automation Script',
    description: 'Python tool integrating Excel and SQL.',
    url: '#',
    repo: '#'
  }
]

export default function ProjectsList() {
  return (
    <section className={styles.projects}>
      <h2>Projects</h2>
      <div className={styles.grid}>
        {projects.map((p, i) => <ProjectCard key={i} project={p} />)}
      </div>
    </section>
  )
}
