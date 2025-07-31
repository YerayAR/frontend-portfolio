import Layout from '../components/Layout'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import Timeline from '../components/Timeline'
import ProjectsList from '../components/ProjectsList'
import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <Layout>
      <Hero />
      <AboutSection />
      <Timeline />
      <ProjectsList />
      <ContactForm />
    </Layout>
  )
}
