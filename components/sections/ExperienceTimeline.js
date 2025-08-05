import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Text, OrbitControls } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import styles from '../../styles/ExperienceTimeline.module.css';

const experienceData = [
  {
    position: 'Senior Frontend Developer',
    company: 'Tech Innovation Corp',
    period: '2022 - Present',
    icon: '🚀',
    color: '#00ffff',
    achievements: [
      'Architected 5+ major web applications',
      'Led team of 8 developers',
      'Advanced performance optimizations',
      'Implemented 3D interfaces'
    ]
  },
  {
    position: 'Full Stack Developer',
    company: 'Digital Solutions Ltd',
    period: '2020 - 2022',
    icon: '🌟',
    color: '#ff00ff',
    achievements: [
      'Scalable applications for 100K+ users',
      'Mentored junior developers',
      'Real-time systems with 99.9% uptime'
    ]
  },
  {
    position: 'Creative Developer',
    company: 'Innovation Labs',
    period: '2019 - 2020',
    icon: '🎨',
    color: '#ffff00',
    achievements: [
      'Award-winning interactive experiences',
      'Integrated AI/ML into web applications'
    ]
  }
];

// Componente para cada elemento de la línea de tiempo
function TimelineItem({ data, index, total }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() + index) * 0.1;
      groupRef.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.5 + index) * 0.05;
    }
  });

  const angle = (index / total) * Math.PI * 2;
  const x = Math.cos(angle) * 5;
  const z = Math.sin(angle) * 5;

  return (
    <group ref={groupRef} position={[x, 0, z]}>
      <Sphere args={[0.5, 32, 32]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={data.color} emissive={data.color} emissiveIntensity={0.5} />
      </Sphere>
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.3}
        color={data.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000"
      >
        {data.icon} {data.position}
      </Text>
    </group>
  );
}

// Componente principal
export default function ExperienceTimeline() {
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      experienceData.forEach((experience, index) => {
        gsap.fromTo(
          `.${styles.timelineItem}-${index}`,
          {
            y: '+=50',
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            delay: index * 0.5,
            duration: 1,
            ease: 'bounce'
          }
        );
      });
    }
  }, [inView]);

  return (
    <section className={styles.timeline} ref={ref}>
      <div className={styles.header}>
        <h2 className={styles.title}>EXPERIENCE TIMELINE</h2>
        <p className={styles.subtitle}>Journey through my professional growth</p>
      </div>

      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <OrbitControls enableZoom={true} />
          {experienceData.map((data, index) => (
            <TimelineItem key={index} data={data} index={index} total={experienceData.length} />
          ))}
        </Canvas>
      </div>
    </section>
  );
}

