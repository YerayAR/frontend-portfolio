import { useRef, useEffect, useState } from 'react';
import styles from '../styles/Timeline.module.css';

export default function TimelineItem({ event, index }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div 
      ref={ref} 
      className={`${styles.timelineItem} ${visible ? styles.visible : ''} ${isLeft ? styles.left : styles.right}`}
      style={{ '--animation-delay': `${index * 0.2}s` }}
    >
      <div className={styles.timelineMarker}>
        <div className={styles.markerIcon}>
          {event.icon}
        </div>
      </div>
      
      <div className={styles.timelineContent}>
        <div className={styles.timelineCard}>
          <div className={styles.cardHeader}>
            <span className={styles.date}>{event.date}</span>
            <span className={`${styles.type} ${styles[event.type]}`}>
              {event.type === 'education' ? 'Education' : 
               event.type === 'work' ? 'Work' : 'Project'}
            </span>
          </div>
          
          <h3 className={styles.title}>{event.title}</h3>
          
          {event.company && (
            <h4 className={styles.company}>{event.company}</h4>
          )}
          
          <p className={styles.description}>{event.description}</p>
        </div>
      </div>
    </div>
  );
}
