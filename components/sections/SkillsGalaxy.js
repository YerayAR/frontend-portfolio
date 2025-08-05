import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Text, OrbitControls, Stars, useTexture } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInView } from 'react-intersection-observer'
import * as THREE from 'three'
import styles from '../../styles/SkillsGalaxy.module.css'

gsap.registerPlugin(ScrollTrigger)

const skillsData = [
  { name: 'JavaScript', level: 95, color: '#f7df1e', icon: '⚡', radius: 3, speed: 0.01 },
  { name: 'React', level: 90, color: '#61dafb', icon: '⚛️', radius: 4, speed: 0.008 },
  { name: 'Three.js', level: 85, color: '#049ef4', icon: '🎯', radius: 5, speed: 0.006 },
  { name: 'GSAP', level: 88, color: '#88ce02', icon: '🎭', radius: 6, speed: 0.005 },
  { name: 'Next.js', level: 82, color: '#ffffff', icon: '🌟', radius: 7, speed: 0.004 },
  { name: 'TypeScript', level: 80, color: '#3178c6', icon: '💎', radius: 8, speed: 0.003 },
  { name: 'Python', level: 78, color: '#3776ab', icon: '🐍', radius: 9, speed: 0.002 },
  { name: 'Node.js', level: 75, color: '#339933', icon: '🚀', radius: 10, speed: 0.001 }
]

// Planeta de habilidad 3D
function SkillPlanet({ skill, position, onHover, isHovered }) {
  const meshRef = useRef()
  const textRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += skill.speed
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1
      
      // Efecto de pulsación basado en el nivel
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1 * (skill.level / 100)
      meshRef.current.scale.setScalar(hovered ? scale * 1.5 : scale)
    }
    
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position)
    }
  })
  
  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => {
          setHovered(true)
          onHover(skill)
        }}
        onPointerLeave={() => {
          setHovered(false)
          onHover(null)
        }}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          wireframe={false}
        />
      </mesh>
      
      {/* Anillo orbital */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 0.75, 32]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Texto flotante */}
      <Text
        ref={textRef}
        position={[0, 1, 0]}
        fontSize={0.3}
        color={skill.color}
        anchorX="center"
        anchorY="middle"
        visible={hovered}
      >
        {skill.icon} {skill.name}
      </Text>
    </group>
  )
}

// Sistema solar central
function CentralSun() {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02
      meshRef.current.rotation.x += 0.01
      
      // Pulsación del sol central
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.scale.setScalar(scale)
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#ffaa00"
        emissive="#ff6600"
        emissiveIntensity={0.8}
      />
    </mesh>
  )
}

// Componente principal
export default function SkillsGalaxy() {
  const sectionRef = useRef(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [cameraPosition, setCameraPosition] = useState([0, 5, 15])
  const { ref, inView } = useInView({ threshold: 0.3 })
  
  useEffect(() => {
    if (inView) {
      // Sonido ambiente espacial
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime)
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 2)
    }
  }, [inView])
  
  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress
        setCameraPosition([
          Math.sin(progress * Math.PI * 2) * 20,
          5 + progress * 10,
          15 - progress * 5
        ])
      }
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <section className={styles.galaxy} ref={sectionRef}>
      <div ref={ref} className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>SKILLS UNIVERSE</h2>
          <p className={styles.subtitle}>Navigate through my technological solar system</p>
        </div>
        
        <div className={styles.canvasContainer}>
          <Canvas camera={{ position: cameraPosition, fov: 60 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[0, 0, 0]} intensity={2} color="#ffaa00" />
            <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade />
            
            {/* Sol central */}
            <CentralSun />
            
            {/* Planetas de habilidades */}
            {skillsData.map((skill, index) => {
              const angle = (index / skillsData.length) * Math.PI * 2
              const x = Math.cos(angle) * skill.radius
              const z = Math.sin(angle) * skill.radius
              const y = Math.sin(angle * 2) * 2
              
              return (
                <SkillPlanet
                  key={skill.name}
                  skill={skill}
                  position={[x, y, z]}
                  onHover={setHoveredSkill}
                  isHovered={hoveredSkill?.name === skill.name}
                />
              )
            })}
            
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              maxDistance={30}
              minDistance={10}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>
        
        {/* Panel de información */}
        {hoveredSkill && (
          <div className={styles.skillInfo}>
            <div className={styles.skillCard}>
              <div className={styles.skillIcon}>{hoveredSkill.icon}</div>
              <h3 className={styles.skillName}>{hoveredSkill.name}</h3>
              <div className={styles.skillLevel}>
                <div className={styles.levelBar}>
                  <div 
                    className={styles.levelFill}
                    style={{ 
                      width: `${hoveredSkill.level}%`,
                      backgroundColor: hoveredSkill.color 
                    }}
                  />
                </div>
                <span className={styles.levelText}>{hoveredSkill.level}%</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Instrucciones de interacción */}
        <div className={styles.instructions}>
          <p>🖱️ Click and drag to explore • 🎯 Hover planets for details</p>
        </div>
      </div>
    </section>
  )
}
