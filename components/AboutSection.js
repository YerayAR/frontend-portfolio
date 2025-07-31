import styles from '../styles/About.module.css'

export default function AboutSection() {
  return (
    <section className={styles.about}>
      <h2>About Me</h2>
      <p>I'm a software engineer with a love for automation and data analytics.</p>
      <ul className={styles.skills}>
        <li>Python</li>
        <li>Java</li>
        <li>C</li>
        <li>JavaScript</li>
        <li>React</li>
        <li>Next.js</li>
      </ul>
    </section>
  )
}
