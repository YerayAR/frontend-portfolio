import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Stars, Float, OrbitControls, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'
import styles from '../styles/ExplosiveResume.module.css'

// Datos del curriculum expandidos
const resumeData = {
  skills: [
    { name: 'JavaScript', level: 95, color: '#f7df1e', icon: '⚡' },
    { name: 'React', level: 90, color: '#61dafb', icon: '⚛️' },
    { name: 'Python', level: 88, color: '#3776ab', icon: '🐍' },
    { name: 'Node.js', level: 85, color: '#339933', icon: '🚀' },
    { name: 'TypeScript', level: 82, color: '#3178c6', icon: '💎' },
    { name: 'Next.js', level: 80, color: '#ffffff', icon: '🌟' },
    { name: 'Three.js', level: 75, color: '#049ef4', icon: '🎯' },
    { name: 'GSAP', level: 78, color: '#88ce02', icon: '🎭' }
  ],
  experience: [
    {
      title: 'Senior Frontend Wizard',
      company: 'Tech Innovation Corp',
      period: '2022 - Present',
      achievements: [
        'Architected 5+ mind-blowing web applications',
        'Boosted performance by 400% with advanced optimizations',
        'Led a team of 8 developers to digital greatness',
        'Implemented cutting-edge 3D interfaces'
      ],
      color: '#00ffff'
    },
    {
      title: 'Full Stack Magician',
      company: 'Digital Solutions Ltd',
      period: '2020 - 2022',
      achievements: [
        'Built scalable applications serving 100K+ users',
        'Mentored 12+ junior developers',
        'Created real-time systems with 99.9% uptime',
        'Pioneered microservices architecture'
      ],
      color: '#ff00ff'
    },
    {
      title: 'Creative Developer',
      company: 'Innovation Labs',
      period: '2019 - 2020',
      achievements: [
        'Developed award-winning interactive experiences',
        'Integrated AI/ML into web applications',
        'Created viral marketing campaigns',
        'Pushed the boundaries of web technology'
      ],
      color: '#ffff00'
    }
  ],
  projects: [
    { 
      name: 'Neural Interface Dashboard', 
      tech: 'React, TensorFlow.js, WebGL', 
      description: 'AI-powered data visualization with neural network predictions',
      color: '#ff6b6b'
    },
    { 
      name: 'Quantum E-commerce', 
      tech: 'Next.js, Stripe, MongoDB, Redis', 
      description: 'Ultra-fast shopping experience with real-time inventory',
      color: '#4ecdc4'
    },
    { 
      name: 'Holographic Chat Platform', 
      tech: 'Socket.io, WebRTC, Three.js', 
      description: '3D virtual communication with spatial audio',
      color: '#45b7d1'
    },
    { 
      name: 'AR Portfolio Showcase', 
      tech: 'WebXR, A-Frame, GSAP', 
      description: 'Augmented reality portfolio with gesture controls',
      color: '#f9ca24'
    }
  ]
}

// Componente 3D para las partículas
function Particles() {
  const mesh = useRef()
  const particlesRef = useRef()
  
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.2
      mesh.current.rotation.y += delta * 0.1
    }
  })
  
  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#00ffff" wireframe />
      </mesh>
    </Float>
  )
}

// Componente 3D para texto flotante
function FloatingText({ text, position, color = '#ffffff' }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Text
        position={position}
        fontSize={0.5}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        {text}
      </Text>
    </Float>
  )
}

export default function ExplosiveResume() {
  const [currentSection, setCurrentSection] = useState(0)
  const [particles, setParticles] = useState([])
  
  const sections = ['skills', 'experience', 'projects']
  
  useEffect(() => {
    // Crear partículas de explosión
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      delay: Math.random() * 2
    }))
    setParticles(newParticles)
    
    // Auto-rotate entre secciones
    const interval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % sections.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }
  
  const explosionVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: [0, 1.2, 1],
      rotate: [0, 360, 0],
      transition: {
        duration: 1,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Fondo 3D con partículas */}
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
          <Particles />
          <FloatingText text="YERAY ALONSO" position={[0, 3, 0]} color="#00ffff" />
          <FloatingText text="FRONTEND WIZARD" position={[0, -3, 0]} color="#ff00ff" />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      
      {/* Partículas de explosión */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={styles.particle}
          style={{
            left: particle.x,
            top: particle.y,
          }}
          variants={explosionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: particle.delay }}
        />
      ))}
      
      {/* Contenido principal */}
      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {currentSection === 0 && (
            <motion.div
              key="skills"
              className={styles.section}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.h2 variants={itemVariants} className={styles.sectionTitle}>
                SKILLS EXPLOSION 💥
              </motion.h2>
              <div className={styles.skillsCloud}>
                {resumeData.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className={styles.skillBubble}
                    style={{ '--skill-color': skill.color }}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 360,
                      boxShadow: `0 0 20px ${skill.color}`
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className={styles.skillName}>{skill.name}</span>
                    <div className={styles.skillLevel}>
                      <motion.div
                        className={styles.skillBar}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.1, duration: 1 }}
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {currentSection === 1 && (
            <motion.div
              key="experience"
              className={styles.section}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.h2 variants={itemVariants} className={styles.sectionTitle}>
                EXPERIENCE TIMELINE 🚀
              </motion.h2>
              <div className={styles.timeline}>
                {resumeData.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    className={styles.timelineItem}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 20px 40px rgba(0, 255, 255, 0.3)'
                    }}
                  >
                    <div className={styles.timelinePeriod}>{exp.period}</div>
                    <h3 className={styles.timelineTitle}>{exp.title}</h3>
                    <p className={styles.timelineCompany}>{exp.company}</p>
                    <ul className={styles.achievements}>
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.2) + (i * 0.1) }}
                        >
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {currentSection === 2 && (
            <motion.div
              key="projects"
              className={styles.section}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.h2 variants={itemVariants} className={styles.sectionTitle}>
                PROJECT SHOWCASE 🎯
              </motion.h2>
              <div className={styles.projectsGrid}>
                {resumeData.projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className={styles.projectCard}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.1, 
                      rotateY: 10,
                      boxShadow: '0 25px 50px rgba(255, 0, 255, 0.3)'
                    }}
                    style={{ '--project-delay': `${index * 0.1}s` }}
                  >
                    <h3 className={styles.projectName}>{project.name}</h3>
                    <p className={styles.projectTech}>{project.tech}</p>
                    <motion.div
                      className={styles.projectGlow}
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Indicadores de sección */}
        <div className={styles.sectionIndicators}>
          {sections.map((section, index) => (
            <motion.button
              key={section}
              className={`${styles.indicator} ${currentSection === index ? styles.active : ''}`}
              onClick={() => setCurrentSection(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {section.toUpperCase()}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
