import React from 'react';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from '../../styles/AboutSection.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection({ id, onSectionChange }) {

  React.useEffect(() => {
    ScrollTrigger.create({
      trigger: `#${id}`,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => onSectionChange(1),
      onEnterBack: () => onSectionChange(1)
    });
  }, [id, onSectionChange]);

  return (
    <section id={id} className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title}>About Me</h2>
        <p className={styles.description}>
          I am a frontend developer with a passion for creating stunning digital experiences.
          With expertise in JavaScript, React, and Three.js, I specialize in building
          interactive web applications that push the boundaries of what's possible on the web.
        </p>
        <p className={styles.description}>
          My journey in technology has been driven by a love for innovation and creativity.
          I'm constantly learning and experimenting with the latest tools and techniques to
          deliver cutting-edge solutions that are not only functional but also visually
          captivating.
        </p>
      </div>
    </section>
  );
}

