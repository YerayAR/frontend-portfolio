import { useState } from 'react';
import styles from '../styles/Projects.module.css';

export default function ProjectCard({ project, index, isVisible }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className={`${styles.card} ${isVisible ? styles.visible : ''} ${project.featured ? styles.featured : ''}`}
      style={{ '--animation-delay': `${index * 0.1}s` }}
    >
      <div className={styles.cardImage}>
        {!imageError ? (
          <img 
            src={project.image} 
            alt={project.title}
            onError={() => setImageError(true)}
            className={styles.projectImage}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>{project.title.split(' ').map(word => word[0]).join('').substring(0, 2)}</span>
          </div>
        )}
        <div className={styles.overlay}>
          <div className={styles.techStack}>
            {project.tech.map(tech => (
              <span key={tech} className={styles.techBadge}>{tech}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <span className={styles.category}>{project.category}</span>
        </div>
        
        <p className={styles.cardDescription}>{project.description}</p>
        
        <div className={styles.cardFooter}>
          <div className={styles.links}>
            {project.url && (
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.linkBtn}
              >
                <span>🌐</span> Live Demo
              </a>
            )}
            <a 
              href={project.repo} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.linkBtn}
            >
              <span>📁</span> Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
