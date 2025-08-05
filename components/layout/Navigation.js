import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from '../../styles/Navigation.module.css'

gsap.registerPlugin(ScrollTrigger)

const navigationItems = [
  { id: 'hero', label: 'Inicio', icon: '🏠' },
  { id: 'about', label: 'Sobre mí', icon: '👤' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'experience', label: 'Experiencia', icon: '💼' },
  { id: 'projects', label: 'Proyectos', icon: '🚀' },
  { id: 'contact', label: 'Contacto', icon: '📧' }
]

export default function Navigation({ currentSection }) {
  const navRef = useRef(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    // Animación de entrada de la navegación
    gsap.fromTo(nav, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 2.5, ease: "power3.out" }
    )
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={styles.navigation} ref={navRef} role="navigation" aria-label="Navegación principal">
      <div className={styles.navContainer}>
        {/* Logo */}
        <div className={styles.logo}>
          <span className={styles.logoText}>YA</span>
        </div>

        {/* Navigation Items */}
        <ul className={styles.navItems}>
          {navigationItems.map((item, index) => (
            <li key={item.id} className={styles.navItem}>
              <button
                className={`${styles.navButton} ${currentSection === index ? styles.active : ''}`}
                onClick={() => scrollToSection(item.id)}
                aria-label={`Ir a ${item.label}`}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Menu Toggle for Mobile */}
        <div className={styles.menuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}
