import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, RoundedBox, Text, Float, MeshDistortMaterial, Environment } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInView } from 'react-intersection-observer'
import * as THREE from 'three'
import confetti from 'canvas-confetti'
import styles from '../../styles/ProjectShowcase.module.css'

gsap.registerPlugin(ScrollTrigger)

const projectsData = [
  {
    id: 1,
    name: 'Neural Interface Dashboard',
    description: 'AI-powered data visualization with neural network predictions and real-time analytics',
    tech: ['React', 'TensorFlow.js', 'WebGL', 'D3.js'],
    color: '#ff6b6b',
    glowColor: '#ff9999',
    url: 'https://neural-dashboard.demo',
    github: 'https://github.com/yeray/neural-dashboard'
  },
  {
    id: 2,
    name: 'Quantum E-commerce',
    description: 'Ultra-fast shopping experience with quantum-inspired performance optimizations',
    tech: ['Next.js', 'Stripe', 'MongoDB', 'Redis'],
    color: '#4ecdc4',
    glowColor: '#7ee8e0',
    url: 'https://quantum-ecommerce.demo',
    github: 'https://github.com/yeray/quantum-ecommerce'
  },
  {
    id: 3,
    name: 'Holographic Chat Platform',
    description: '3D virtual communication with spatial audio and gesture recognition',
    tech: ['Socket.io', 'WebRTC', 'Three.js', 'MediaPipe'],
    color: '#45b7d1',
    glowColor: '#73c5e1',
    url: 'https://holo-chat.demo',
    github: 'https://github.com/yeray/holo-chat'
  },
  {
    id: 4,
    name: 'AR Portfolio Showcase',
    description: 'Augmented reality portfolio with gesture controls and immersive experiences',
    tech: ['WebXR', 'A-Frame', 'GSAP', 'Computer Vision'],
    color: '#f9ca24',
    glowColor: '#f6d55c',
    url: 'https://ar-portfolio.demo',
    github: 'https://github.com/yeray/ar-portfolio'
  },
  {
    id: 5,
    name: 'Blockchain Analytics Engine',
    description: 'Real-time cryptocurrency analytics with predictive modeling and DeFi tracking',
    tech: ['Python', 'Web3.js', 'FastAPI', 'PostgreSQL'],
    color: '#a55eea',
    glowColor: '#c88ef4',
    url: 'https://blockchain-analytics.demo',
    github: 'https://github.com/yeray/blockchain-analytics'
  },
  {
    id: 6,
    name: 'Quantum Music Visualizer',
    description: 'Interactive music visualization using quantum computing principles and WebGL',
    tech: ['Web Audio API', 'WebGL2', 'Quantum.js', 'FFT'],
    color: '#fd79a8',
    glowColor: '#fd92b8',
    url: 'https://quantum-music.demo',
    github: 'https://github.com/yeray/quantum-music'
  }
]

// Componente 3D para cada proyecto
function ProjectCard3D({ project, position, index, onHover, isActive }) {
  const meshRef = useRef()
  const textRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Rotación suave basada en el tiempo
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + index) * 0.1
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.5 + index) * 0.05
      
      // Levitación
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index * 2) * 0.2
      
      // Efecto de escala cuando está activo o hover
      const targetScale = (hovered || isActive) ? 1.2 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
    
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position)
    }
  })
  
  const handleClick = () => {
    // Efectos de sonido
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(1760, audioContext.currentTime + 0.1)
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
    
    // Confetti específico del proyecto
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x: 0.5, y: 0.7 },
      colors: [project.color, project.glowColor, '#ffffff']
    })
  }
  
  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh
          ref={meshRef}
          onPointerEnter={() => {
            setHovered(true)
            onHover(project)
          }}
          onPointerLeave={() => {
            setHovered(false)
            onHover(null)
          }}
          onClick={handleClick}
        >
          <RoundedBox args={[2, 2.5, 0.2]} radius={0.1} smoothness={4}>
            <MeshDistortMaterial
              color={project.color}
              emissive={project.color}
              emissiveIntensity={hovered ? 0.3 : 0.1}
              distort={hovered ? 0.2 : 0.1}
              speed={2}
              roughness={0.2}
              metalness={0.8}
            />
          </RoundedBox>
        </mesh>
        
        {/* Título del proyecto */}
        <Text
          ref={textRef}
          position={[0, 0, 0.2]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
          textAlign="center"
          font="/fonts/Inter-Bold.woff"
        >
          {project.name}
        </Text>
        
        {/* Indicador de tecnologías */}
        <group position={[0, -0.8, 0.1]}>
          {project.tech.slice(0, 3).map((tech, i) => (
            <Text
              key={tech}
              position={[(i - 1) * 0.6, 0, 0]}
              fontSize={0.08}
              color={project.glowColor}
              anchorX="center"
              anchorY="middle"
            >
              {tech}
            </Text>
          ))}
        </group>
      </Float>
      
      {/* Efectos de partículas alrededor */}
      {hovered && (
        <group>
          {Array.from({ length: 10 }).map((_, i) => (
            <Float key={i} speed={3 + Math.random() * 2} floatIntensity={2}>
              <mesh position={[
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 2
              ]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial
                  color={project.glowColor}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            </Float>
          ))}
        </group>
      )}
    </group>
  )
}

// Componente principal
export default function ProjectShowcase() {
  const sectionRef = useRef(null)
  const [hoveredProject, setHoveredProject] = useState(null)
  const [activeProject, setActiveProject] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.2 })
  
  useEffect(() => {
    if (inView) {
      // Sonido ambiente tecnológico
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      // Crear múltiples osciladores para armonías
      const frequencies = [220, 330, 440]
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime)
        oscillator.type = 'sine'
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 3 + index)
        
        oscillator.start(audioContext.currentTime + index * 0.5)
        oscillator.stop(audioContext.currentTime + 3 + index)
      })
    }
  }, [inView])
  
  useEffect(() => {
    // Auto-rotation de proyectos activos
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projectsData.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        // Parallax suave para los proyectos
        const progress = self.progress
        const elements = document.querySelectorAll(`.${styles.projectInfo}`)
        elements.forEach((el, index) => {
          gsap.to(el, {
            y: progress * (index % 2 === 0 ? -50 : 50),
            duration: 0.3
          })
        })
      }
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <section className={styles.showcase} ref={sectionRef}>
      <div ref={ref} className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>PROJECT MULTIVERSE</h2>
          <p className={styles.subtitle}>Explore my digital creations across dimensions</p>
        </div>
        
        <div className={styles.canvasContainer}>
          <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
            <Environment preset="night" />
            
            {/* Grid de proyectos 3D */}
            {projectsData.map((project, index) => {
              const col = index % 3
              const row = Math.floor(index / 3)
              const x = (col - 1) * 3
              const y = (1 - row) * 3
              const z = Math.sin(index) * 2
              
              return (
                <ProjectCard3D
                  key={project.id}
                  project={project}
                  position={[x, y, z]}
                  index={index}
                  onHover={setHoveredProject}
                  isActive={activeProject === index}
                />
              )
            })}
          </Canvas>
        </div>
        
        {/* Panel de información del proyecto */}
        {hoveredProject && (
          <div className={styles.projectInfo}>
            <div className={styles.infoCard} style={{ borderColor: hoveredProject.color }}>
              <h3 className={styles.projectName} style={{ color: hoveredProject.color }}>
                {hoveredProject.name}
              </h3>
              <p className={styles.projectDescription}>
                {hoveredProject.description}
              </p>
              <div className={styles.techStack}>
                {hoveredProject.tech.map((tech, index) => (
                  <span 
                    key={tech} 
                    className={styles.techTag}
                    style={{ 
                      backgroundColor: `${hoveredProject.color}20`,
                      borderColor: hoveredProject.color,
                      color: hoveredProject.color
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className={styles.projectLinks}>
                <a 
                  href={hoveredProject.url} 
                  className={styles.linkButton}
                  style={{ backgroundColor: hoveredProject.color }}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  🚀 Live Demo
                </a>
                <a 
                  href={hoveredProject.github} 
                  className={styles.linkButton}
                  style={{ 
                    backgroundColor: 'transparent',
                    borderColor: hoveredProject.color,
                    color: hoveredProject.color
                  }}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  📱 GitHub
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Navegación por proyectos */}
        <div className={styles.navigation}>
          {projectsData.map((project, index) => (
            <button
              key={project.id}
              className={`${styles.navDot} ${activeProject === index ? styles.active : ''}`}
              onClick={() => setActiveProject(index)}
              style={{ 
                backgroundColor: activeProject === index ? project.color : 'transparent',
                borderColor: project.color
              }}
            />
          ))}
        </div>
        
        {/* Instrucciones */}
        <div className={styles.instructions}>
          <p>🖱️ Hover over projects to explore • ✨ Click for magical effects</p>
        </div>
      </div>
    </section>
  )
}
