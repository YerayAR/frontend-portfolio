import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Float, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import confetti from 'canvas-confetti'
import styles from '../../styles/HeroSection.module.css'

gsap.registerPlugin(ScrollTrigger)

// Componente 3D para partículas reactivas
function ParticleField({ mousePosition }) {
  const meshRef = useRef()
  const particlesRef = useRef()
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1
      meshRef.current.rotation.y += delta * 0.2
      
      // Reacción al mouse
      if (mousePosition.current) {
        const { x, y } = mousePosition.current
        meshRef.current.position.x = x * 0.5
        meshRef.current.position.y = -y * 0.5
      }
    }
  })

  return (
    <group ref={meshRef}>
      <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
        <mesh>
          <icosahedronGeometry args={[1, 4]} />
          <meshStandardMaterial
            color="#00ffff"
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>
      
      {/* Partículas orbitantes */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Float key={i} speed={2 + Math.random() * 2} rotationIntensity={0.5}>
          <mesh position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#ff00ff" : "#00ffff"}
              emissive={i % 2 === 0 ? "#ff00ff" : "#00ffff"}
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Componente de texto 3D flotante
function FloatingText({ text, position, color = "#ffffff", size = 1 }) {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <Text
        position={position}
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {text}
      </Text>
    </Float>
  )
}

// Hook para audio visual (sin micrófono)
function useAudioReactive() {
  const [frequencyData, setFrequencyData] = useState(new Uint8Array(256))
  
  useEffect(() => {
    // Crear datos simulados para el visualizador
    let animationId
    const updateFrequencyData = () => {
      const newData = new Uint8Array(256)
      // Generar datos aleatorios que simulen frecuencias de audio
      for (let i = 0; i < newData.length; i++) {
        newData[i] = Math.random() * 255 * Math.sin(Date.now() * 0.001 + i * 0.1)
      }
      setFrequencyData(newData)
      animationId = requestAnimationFrame(updateFrequencyData)
    }
    
    animationId = requestAnimationFrame(updateFrequencyData)
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])
  
  return frequencyData
}

export default function HeroSection() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const audioData = useAudioReactive()
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  useEffect(() => {
    const tl = gsap.timeline()
    
    // Animación de entrada épica
    tl.from(titleRef.current, {
      duration: 2,
      y: 100,
      opacity: 0,
      scale: 0.5,
      ease: "elastic.out(1, 0.3)"
    })
    .from(subtitleRef.current, {
      duration: 1.5,
      y: 50,
      opacity: 0,
      ease: "power3.out"
    }, "-=1")
    .from(ctaRef.current, {
      duration: 1,
      scale: 0,
      rotation: 360,
      ease: "back.out(1.7)"
    }, "-=0.5")
    
    // ScrollTrigger para parallax
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress
        gsap.to(titleRef.current, {
          y: progress * -100,
          scale: 1 - progress * 0.2,
          duration: 0.3
        })
      }
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  const handleExplosion = () => {
    // Confetti explosion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00ffff', '#ff00ff', '#ffff00']
    })
    
    // Audio feedback
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.3)
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
    
    // Trigger scroll to next section
    gsap.to(window, {
      duration: 2,
      scrollTo: { y: window.innerHeight, autoKill: true },
      ease: "power2.inOut"
    })
  }
  
  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Fondo 3D con partículas */}
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Environment preset="city" />
          
          <ParticleField mousePosition={mousePosition} />
          
          <FloatingText 
            text="YERAY ALONSO" 
            position={[0, 2, 0]} 
            color="#00ffff" 
            size={0.8} 
          />
          <FloatingText 
            text="FRONTEND WIZARD" 
            position={[0, -2, 0]} 
            color="#ff00ff" 
            size={0.5} 
          />
          
          {/* Post-processing effects */}
          <EffectComposer>
            <Bloom intensity={1.5} luminanceThreshold={0.2} />
            <ChromaticAberration offset={[0.002, 0.002]} />
          </EffectComposer>
        </Canvas>
      </div>
      
      {/* Contenido HTML superpuesto */}
      <div className={styles.content}>
        <h1 
          ref={titleRef}
          className={styles.title}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          YERAY ALONSO REYES
        </h1>
        
        <p ref={subtitleRef} className={styles.subtitle}>
          🚀 Frontend Wizard & 3D Experience Creator 🎯
        </p>
        
        <button 
          ref={ctaRef}
          className={styles.cta}
          onClick={handleExplosion}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className={styles.ctaText}>EXPERIENCE THE MAGIC</span>
          <div className={styles.ctaRipple}></div>
        </button>
        
        {/* Indicador de scroll */}
        <div className={styles.scrollIndicator}>
          <div className={styles.mouse}>
            <div className={styles.wheel}></div>
          </div>
          <p>Scroll for epic journey</p>
        </div>
      </div>
      
      {/* Efectos de glassmorphism */}
      <div className={styles.glassOverlay}></div>
      
      {/* Audio visualizer */}
      <div className={styles.audioVisualizer}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className={styles.audioBar}
            style={{
              height: `${(audioData[i * 10] || 0) / 255 * 100}px`,
              backgroundColor: `hsl(${i * 18}, 100%, 50%)`
            }}
          />
        ))}
      </div>
    </section>
  )
}
