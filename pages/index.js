import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { Canvas } from '@react-three/fiber'
import { Lenis } from 'lenis/react'
import Navigation from '../components/layout/Navigation'
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import SkillsGalaxy from '../components/sections/SkillsGalaxy'
import ExperienceTimeline from '../components/sections/ExperienceTimeline'
import ProjectShowcase from '../components/sections/ProjectShowcase'
import ContactSection from '../components/sections/ContactSection'
import CursorTrail from '../components/effects/CursorTrail'
import LoadingSequence from '../components/effects/LoadingSequence'
import ScrollProgress from '../components/effects/ScrollProgress'
import BackgroundScene from '../components/3d/BackgroundScene'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    // Carga optimizada
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingSequence onComplete={() => setIsLoading(false)} />
  }

  return (
    <>
      <Head>
        <title>Yeray Alonso Reyes | Frontend Developer & 3D Experience Creator</title>
        <meta name="description" content="Desarrollador Frontend especializado en React, Three.js, GSAP y experiencias web interactivas. Creando interfaces que inspiran y transforman." />
        <meta name="keywords" content="React, Three.js, GSAP, Frontend Developer, JavaScript, Web Development, 3D, Interactive Design" />
        <meta name="author" content="Yeray Alonso Reyes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yerayalonso.dev/" />
        <meta property="og:title" content="Yeray Alonso Reyes | Frontend Developer" />
        <meta property="og:description" content="Desarrollador Frontend especializado en experiencias web interactivas" />
        <meta property="og:image" content="/images/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yerayalonso.dev/" />
        <meta property="twitter:title" content="Yeray Alonso Reyes | Frontend Developer" />
        <meta property="twitter:description" content="Desarrollador Frontend especializado en experiencias web interactivas" />
        <meta property="twitter:image" content="/images/og-image.jpg" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <Lenis root>
        <div className={styles.container} ref={containerRef}>
          <CursorTrail />
          <ScrollProgress />
          <Navigation currentSection={currentSection} />
          
          {/* Escena 3D de fondo global */}
          <BackgroundScene />
          
          {/* Secciones principales */}
          <main className={styles.main}>
            <HeroSection id="hero" onSectionChange={setCurrentSection} />
            <AboutSection id="about" onSectionChange={setCurrentSection} />
            <SkillsGalaxy id="skills" onSectionChange={setCurrentSection} />
            <ExperienceTimeline id="experience" onSectionChange={setCurrentSection} />
            <ProjectShowcase id="projects" onSectionChange={setCurrentSection} />
            <ContactSection id="contact" onSectionChange={setCurrentSection} />
          </main>
        </div>
      </Lenis>
    </>
  )
}
