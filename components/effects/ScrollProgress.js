import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from '../../styles/ScrollProgress.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const progressRef = useRef(null)

  useEffect(() => {
    const progress = progressRef.current
    if (!progress) return

    // Animación del progreso de scroll
    gsap.set(progress, { scaleX: 0, transformOrigin: "left center" })

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.to(progress, {
          scaleX: self.progress,
          duration: 0.1,
          ease: "none"
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className={styles.scrollProgress} role="progressbar" aria-label="Progreso de lectura">
      <div ref={progressRef} className={styles.progressBar}></div>
    </div>
  )
}
