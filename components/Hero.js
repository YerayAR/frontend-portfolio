import { useState, useEffect } from 'react'
import styles from '../styles/Hero.module.css'

export default function Hero() {
  const fullText = 'Yeray Alonso Reyes'
  const [text, setText] = useState('')

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setText(fullText.slice(0, index + 1))
      index++
      if (index === fullText.length) clearInterval(timer)
    }, 150)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className={styles.hero}>
      <h1 className={styles.neon}>{text}<span className={styles.cursor}>|</span></h1>
    </section>
  )
}
