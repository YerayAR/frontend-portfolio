import TimelineItem from './TimelineItem';
import styles from '../styles/Timeline.module.css';

const events = [
  {
    date: '2009-2011',
    title: 'Naval Mechanics Training',
    company: 'I.F.P.M.P. de San Andrés',
    description: 'Completed vocational training in naval mechanical engineering, gaining hands-on experience with diesel engines and marine systems.',
    type: 'education',
    icon: '🎓'
  },
  {
    date: 'April-June 2011',
    title: 'Mechanic Intern',
    company: 'Unelco',
    description: 'Performed maintenance on diesel generators, developing practical skills in mechanical systems and troubleshooting.',
    type: 'work',
    icon: '🔧'
  },
  {
    date: '2018-2023',
    title: 'Data Administrator',
    company: 'Mª del Rosario',
    description: 'Managed comprehensive data workflows using Excel and SQL, laying the foundation for process automation skills.',
    type: 'work',
    icon: '💼'
  },
  {
    date: '2019-2025',
    title: 'B.Sc. Computer Science',
    company: 'Universitat Oberta de Catalunya',
    description: 'Completed Bachelor\'s degree with focus on programming (Python, Java, C, JavaScript) and modern software methodologies.',
    type: 'education',
    icon: '🎓'
  },
  {
    date: 'May-June 2025',
    title: 'Junior Automation Engineer',
    company: 'Alfran',
    description: 'Optimized data workflows using Python scripts, integrated web technologies (HTML/CSS/JavaScript), and leveraged React and Docker.',
    type: 'work',
    icon: '⚡'
  },
  {
    date: 'July 2025',
    title: 'Personal Portfolio Launch',
    company: 'Neon Bytes',
    description: 'Created and launched this interactive portfolio to showcase technical skills and professional journey.',
    type: 'project',
    icon: '🚀'
  }
];

export default function Timeline() {
  return (
    <section id="experience" className={`${styles.timeline} section`}>
      <div className="container">
        <h2 className="section-title">Professional Journey</h2>
        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine}></div>
          {events.map((event, index) => (
            <TimelineItem key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
