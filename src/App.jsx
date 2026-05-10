import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import FacialTuning from './components/FacialTuning'
import KoreanAesthetic from './components/KoreanAesthetic'
import BeautyFocus from './components/BeautyFocus'
import Approach from './components/Approach'
import Trust from './components/Trust'
import Concierge from './components/Concierge'
import Consultation from './components/Consultation'
import Footer from './components/Footer'
import PreCheckFlow from './components/precheck/PreCheckFlow'

const LandingPage = () => (
  <>
    <Nav />
    <main>
      <Hero />
      <Philosophy />
      <FacialTuning />
      <KoreanAesthetic />
      <BeautyFocus />
      <Approach />
      <Trust />
      <Concierge />
      <Consultation />
    </main>
    <Footer />
  </>
)

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/precheck" element={<PreCheckFlow />} />
    </Routes>
  </BrowserRouter>
)

export default App
