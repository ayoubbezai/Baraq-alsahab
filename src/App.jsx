import React from 'react'
import Navbar from './components/layout/Navbar';
import Hero from "./components/sections/HeroSection"
import AboutUsSection from "./components/sections/AboutUsSection"
import WhyUsSection from "./components/sections/WhyUsSection"
import OurServices from "./components/sections/OurServices"
import SectorsSection from "./components/sections/SectorsSection"
import { LanguageProvider } from './states/LanguageContext';


function App() {
  return (
    <LanguageProvider>
      <Navbar />
      <Hero />
      <AboutUsSection />
      <WhyUsSection />
      <OurServices />
      <SectorsSection />
    </LanguageProvider>

  );
}

export default App;
