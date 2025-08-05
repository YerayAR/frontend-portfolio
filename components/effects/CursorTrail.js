import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from '../../styles/CursorTrail.module.css'

export default function CursorTrail() {
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const requestRef = useRef()
  
  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let dotX = 0
    let dotY = 0
    
    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    
    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 })
      gsap.to(cursorDot, { scale: 1, opacity: 1, duration: 0.3 })
    }
    
    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 })
      gsap.to(cursorDot, { scale: 0, opacity: 0, duration: 0.3 })
    }
    
    const handleMouseEnterButton = () => {
      gsap.to(cursor, { 
        scale: 2, 
        backgroundColor: 'rgba(0, 255, 255, 0.2)',
        borderColor: '#00ffff',
        duration: 0.3 
      })
      gsap.to(cursorDot, { scale: 0.5, duration: 0.3 })
      
      // Sonido de hover
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    }
    
    const handleMouseLeaveButton = () => {
      gsap.to(cursor, { 
        scale: 1, 
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        duration: 0.3 
      })
      gsap.to(cursorDot, { scale: 1, duration: 0.3 })
    }
    
    const animate = () => {
      // Smooth follow animation
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      dotX += (mouseX - dotX) * 0.25
      dotY += (mouseY - dotY) * 0.25
      
      if (cursor) {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`
      }
      if (cursorDot) {
        cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`
      }
      
      requestRef.current = requestAnimationFrame(animate)
    }
    
    // Event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    // Button hover effects
    const buttons = document.querySelectorAll('button, a, .hoverable')
    buttons.forEach(button => {
      button.addEventListener('mouseenter', handleMouseEnterButton)
      button.addEventListener('mouseleave', handleMouseLeaveButton)
    })
    
    requestRef.current = requestAnimationFrame(animate)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handleMouseEnterButton)
        button.removeEventListener('mouseleave', handleMouseLeaveButton)
      })
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])
  
  return (
    <>
      <div ref={cursorRef} className={styles.cursor} />
      <div ref={cursorDotRef} className={styles.cursorDot} />
    </>
  )
}
