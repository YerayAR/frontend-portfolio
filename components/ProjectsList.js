import { useState, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import styles from '../styles/Projects.module.css';

const projects = [
  {
    title: 'Neon Bytes Portfolio',
    description: 'This interactive portfolio website built with Next.js, featuring neon animations, responsive design, and modern web technologies.',
    tech: ['Next.js', 'React', 'CSS3', 'JavaScript'],
    url: 'https://neon-bytes.vercel.app',
    repo: '#',
    category: 'Web Development',
    featured: true,
    image: '/images/neon-bytes-thumb.png'
  },
  {
    title: 'Data Automation Script',
    description: 'Python automation tool that integrates Excel spreadsheets with SQL databases to streamline monthly reporting processes.',
    tech: ['Python', 'Pandas', 'SQLAlchemy', 'Excel'],
    url: null,
    repo: '#',
    category: 'Automation',
    featured: true,
    image: '/images/automation-thumb.png'
  },
  {
    title: 'Newsletter Platform',
    description: 'Tech newsletter platform "Neon Bytes" showcasing latest technology trends, tutorials, and recommendations for developers.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'MDX'],
    url: 'https://neon-bytes.vercel.app',
    repo: '#',
    category: 'Content Platform',
    featured: true,
    image: '/images/newsletter-thumb.png'
  },
  {
    title: 'Process Optimization Tool',
    description: 'React-based dashboard for monitoring and optimizing data workflows with real-time analytics and visualization.',
    tech: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    url: null,
    repo: '#',
    category: 'Analytics',
    featured: false,
    image: '/images/dashboard-thumb.png'
  }
];

export default function ProjectsList() {
  const [filter, setFilter] = useState('all');
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" ref={sectionRef} className={`${styles.projects} section`}>
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        
        <div className={styles.filters}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.filterBtn} ${filter === category ? styles.active : ''}`}
              onClick={() => setFilter(category)}
            >
              {category === 'all' ? 'All Projects' : category}
            </button>
          ))}
        </div>
        
        <div className={styles.grid}>
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
