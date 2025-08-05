import { motion } from 'framer-motion';
import styles from '../styles/Header.module.css';

export default function Header({ onExplode }) {
  return (
    <header className={styles.header}>
      <motion.h1
        className={styles.title}
        initial={{ y: -250 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
      >
        Yeray Alonso Reyes
      </motion.h1>
      <motion.button
        className={styles.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onExplode}
      >
        🚀 See My Explosive Resume 💥
      </motion.button>
    </header>
  );
}
