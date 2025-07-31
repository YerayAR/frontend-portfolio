import { useState, useEffect, useRef } from 'react';
import styles from '../styles/About.module.css';

const skills = [
  { name: 'Python', level: 90, category: 'Languages' },
  { name: 'JavaScript', level: 85, category: 'Languages' },
  { name: 'Java', level: 75, category: 'Languages' },
  { name: 'C', level: 70, category: 'Languages' },
  { name: 'React', level: 85, category: 'Frameworks' },
  { name: 'Next.js', level: 80, category: 'Frameworks' },
  { name: 'Node.js', level: 75, category: 'Frameworks' },
  { name: 'Docker', level: 70, category: 'Tools' },
  { name: 'Git', level: 85, category: 'Tools' },
  { name: 'SQL', level: 80, category: 'Data' },
  { name: 'PostgreSQL', level: 75, category: 'Data' },
  { name: 'MongoDB', level: 70, category: 'Data' }
];

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="about" ref={sectionRef} className={`${styles.about} section`}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className={styles.content}>
          <div className={styles.bio}>
            <div className={styles.profileImage}>
              <div className={styles.imagePlaceholder}>
                <span>YA</span>
              </div>
            </div>
            
            <div className={styles.bioText}>
              <p>
                I'm a software engineer with a diverse professional background, transitioning from 
                mechanical engineering to a career in software development. My journey began with 
                Naval Mechanics training and evolved through data management roles where I honed 
                my skills with Excel and SQL.
              </p>
              <p>
                Currently pursuing my passion for technology and automation, I recently completed 
                a Bachelor's degree in Computer Science at the Universitat Oberta de Catalunya. 
                I specialize in process automation using Python, web technologies, and modern 
                frameworks like React and Next.js.
              </p>
              <p>
                My unique blend of experiences—from hands-on mechanical systems to high-level 
                software automation—has shaped me into a versatile engineer with a distinctive 
                perspective on problem-solving and continuous learning.
              </p>
            </div>
          </div>
          
          <div className={styles.skills}>
            <h3>Technical Skills</h3>
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className={styles.skillCategory}>
                <h4>{category}</h4>
                <div className={styles.skillGrid}>
                  {categorySkills.map((skill, index) => (
                    <div key={skill.name} className={styles.skill}>
                      <div className={styles.skillInfo}>
                        <span className={styles.skillName}>{skill.name}</span>
                        <span className={styles.skillLevel}>{skill.level}%</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div 
                          className={`${styles.skillProgress} ${isVisible ? styles.animated : ''}`}
                          style={{ 
                            '--skill-level': `${skill.level}%`,
                            '--animation-delay': `${index * 0.1}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
