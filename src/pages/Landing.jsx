
import React from 'react'
import Navbar from '../components/layout/Navbar';
import Hero from "../components/sections/mainSection/HeroSection"
import AboutUsSection from "../components/sections/mainSection/AboutUsSection"
import WhyUsSection from "../components/sections/mainSection/WhyUsSection"
import OurServices from "../components/sections/mainSection/OurServices"
import SectorsSection from "../components/sections/mainSection/SectorsSection"
import HowWeWork from "../components/sections/mainSection/HowWeWork"
import JoinUsSection from "../components/sections/mainSection/JoinUsSection"


const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUsSection />
      <WhyUsSection />
      <JoinUsSection />
      <OurServices />
      <SectorsSection />
      <HowWeWork />
    </>
  )
}

export default Landing
