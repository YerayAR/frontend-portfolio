import TimelineItem from './TimelineItem'
import styles from '../styles/Timeline.module.css'

const events = [
  { date: '2009-2011', title: 'Naval Mechanics Training', description: 'Completed vocational training.' },
  { date: '2011', title: 'Mechanic Intern at Unelco', description: 'Maintenance on diesel generators.' },
  { date: '2018-2023', title: 'Data Administrator', description: 'Managed data with Excel and SQL.' },
  { date: '2019-2025', title: 'B.Sc. Computer Science', description: 'Studied at UOC.' },
  { date: '2025', title: 'Junior Automation Engineer', description: 'Automated workflows with Python.' },
]

export default function Timeline() {
  return (
    <section className={styles.timeline}>
      <h2>Experience</h2>
      {events.map((e, i) => <TimelineItem key={i} event={e} />)}
    </section>
  )
}
