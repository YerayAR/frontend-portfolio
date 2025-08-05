import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from '../../styles/LoadingSequence.module.css';

export default function LoadingSequence({ onComplete }) {
  const loaderRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;

    const tl = gsap.timeline({ onComplete });

    tl.to(loader, {
      duration: 1.5,
      scale: 1.2,
      rotate: 360,
      ease: 'power3.out',
      repeat: 1,
      yoyo: true
    });

    tl.to(loader, {
      duration: 1.5,
      opacity: 0,
      ease: 'power3.inOut',
      onComplete: () => onComplete()
    });

    return () => tl.kill();
  }, [onComplete]);

  return <div ref={loaderRef} className={styles.loader}>LOADING...</div>;
}
