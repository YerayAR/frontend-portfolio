import Link from 'next/link'
import styles from '../styles/NavBar.module.css'

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>Yeray Alonso</div>
      <ul className={styles.menu}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/experience">Experience</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  )
}
