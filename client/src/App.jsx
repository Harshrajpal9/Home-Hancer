import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import WhyChooseUs from './components/WhyChooseUs'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './components/admin/Admin'
import { apiRequest } from './lib/api'
import { fallbackServices, fallbackGallery, fallbackTestimonials } from './data/fallback'

function PublicSite() {
  const [theme, setTheme] = useState(() => localStorage.getItem('home-hancer-theme') || 'light')
  const [content, setContent] = useState({ services: fallbackServices, gallery: fallbackGallery, testimonials: fallbackTestimonials })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('home-hancer-theme', theme)
  }, [theme])

  useEffect(() => {
    let alive = true
    apiRequest('/content')
      .then(data => { if (alive) setContent({
        services: data.services?.length ? data.services : fallbackServices,
        gallery: data.gallery?.length ? data.gallery : fallbackGallery,
        testimonials: data.testimonials?.length ? data.testimonials : fallbackTestimonials,
      }) })
      .catch(() => {})
    return () => { alive = false }
  }, [])

  return <>
    <Navbar theme={theme} onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')} />
    <main>
      <Hero />
      <Services items={content.services} />
      <About />
      <WhyChooseUs />
      <Gallery items={content.gallery} />
      <Testimonials items={content.testimonials} />
      <Contact services={content.services} />
    </main>
    <Footer />
  </>
}

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<PublicSite />} />
    <Route path="/admin/*" element={<Admin />} />
  </Routes></BrowserRouter>
}
