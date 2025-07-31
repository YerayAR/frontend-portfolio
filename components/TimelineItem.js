import { useRef, useEffect, useState } from 'react'
import styles from '../styles/Timeline.module.css'

export default function TimelineItem({ event }) {
  const ref = useRef()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisible(true)
        obs.disconnect()
      }
    })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className={visible ? styles.itemVisible : styles.item}>
      <span className={styles.date}>{event.date}</span>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
    </div>
  )
}
