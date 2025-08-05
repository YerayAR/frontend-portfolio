import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import styles from '../../styles/BackgroundScene.module.css'

// Partículas flotantes de fondo
function FloatingParticles() {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30
          ]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#ff00ff" : "#ffff00"}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function BackgroundScene() {
  return (
    <div className={styles.backgroundScene}>
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        <Stars 
          radius={100} 
          depth={50} 
          count={2000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.5}
        />
        
        <FloatingParticles />
      </Canvas>
    </div>
  )
}
