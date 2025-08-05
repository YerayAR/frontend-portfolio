import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInView } from 'react-intersection-observer'
import styles from '../../styles/ContactSection.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection({ id, onSectionChange }) {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const { ref, inView } = useInView({ threshold: 0.3 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    if (inView && onSectionChange) {
      onSectionChange(5)
    }
  }, [inView, onSectionChange])

  useEffect(() => {
    const form = formRef.current
    if (!form || !inView) return

    // Animación de entrada del formulario
    gsap.fromTo(form.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }
    )
  }, [inView])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Efecto de envío
    gsap.to(formRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    })

    // Aquí iría la lógica de envío real
    console.log('Formulario enviado:', formData)
    
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id={id} className={styles.contact} ref={sectionRef}>
      <div ref={ref} className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Let's Create Something Amazing</h2>
          <p className={styles.subtitle}>
            Ready to bring your ideas to life? Let's talk about your next project.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.info}>
            <h3 className={styles.infoTitle}>Get in Touch</h3>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📧</span>
              <span className={styles.contactText}>yeray@example.com</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>🌐</span>
              <span className={styles.contactText}>LinkedIn: /in/yeray-alonso</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>💼</span>
              <span className={styles.contactText}>GitHub: /yeray-alonso</span>
            </div>
          </div>

          <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                required
                aria-describedby="name-help"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
                aria-describedby="email-help"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                rows="5"
                required
                aria-describedby="message-help"
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              <span className={styles.buttonText}>Send Message</span>
              <span className={styles.buttonIcon}>🚀</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
