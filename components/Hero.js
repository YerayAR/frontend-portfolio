import { useState, useEffect } from 'react';
import styles from '../styles/Hero.module.css';

export default function Hero() {
  const fullText = 'Yeray Alonso Reyes';
  const [text, setText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(timer);
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero}>
      <h1 className={`${styles.neon} neon-text`}>{text}<span className={styles.cursor}>|</span></h1>
      <p className="fade-in" style={{ marginTop: '1.5rem', color: '#b3b3b3' }}>Software Engineer | Automation Enthusiast</p>
      <div className="fade-in" style={{ marginTop: '2rem' }}>
        <a href="#about" className="btn neon-glow" style={{ padding: '0.75rem 2rem', borderRadius: '4px' }}>Learn More</a>
      </div>
    </section>
  );
}
