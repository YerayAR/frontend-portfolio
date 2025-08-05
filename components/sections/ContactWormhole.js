import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Torus, OrbitControls } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import styles from '../../styles/ContactWormhole.module.css';

export default function ContactWormhole() {
  const wormholeRef = useRef();
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      gsap.to(wormholeRef.current.rotation, {
        z: "+=6.283", // 1 full rotation in radians
        duration: 10,
        ease: 'none',
        repeat: -1
      });
    }
  }, [inView]);

  return (
    <section className={styles.wormhole} ref={ref}>
      <div className={styles.header}>
        <h2 className={styles.title}>CONTACT WORMHOLE</h2>
        <p className={styles.subtitle}>Enter the portal to reach out to me</p>
      </div>

      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls enableZoom={true} />
          
          {/* Wormhole Shape */}
          <Torus ref={wormholeRef} args={[1, 0.4, 16, 100]}>
            <meshStandardMaterial color='#00ffcc' emissive='#009988' wireframe />
          </Torus>

          {/* Center HTML Content */}
          <Html position={[0, 0, 0]} distanceFactor={10} transform>
            <div className={styles.contactForm}>
              <label>Message</label>
              <textarea placeholder="Type your message here..." className={styles.textArea} />
              <button className={styles.sendButton}>Send ➤</button>
            </div>
          </Html>
        </Canvas>
      </div>
    </section>
  );
}
