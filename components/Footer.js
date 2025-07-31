import styles from '../styles/Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Neon Bytes</h3>
            <p className={styles.footerDescription}>
              Interactive portfolio showcasing software engineering expertise 
              and passion for automation and innovation.
            </p>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#about">About</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Connect</h4>
            <ul className={styles.footerLinks}>
              <li><a href="https://linkedin.com/in/yeray-alonso" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://github.com/yeray-alonso" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://neon-bytes.vercel.app" target="_blank" rel="noopener noreferrer">Newsletter</a></li>
              <li><a href="mailto:yeray.alonso@example.com">Email</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>
            © {currentYear} Yeray Alonso Reyes. Built with Next.js and passion for clean code.
          </p>
          <p className={styles.footerNote}>
            This portfolio demonstrates modern web development practices and neon aesthetic design.
          </p>
        </div>
      </div>
    </footer>
  );
}
