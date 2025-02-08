import React from 'react'
import Hero from "../components/sections/HeroSection"
import AboutUsSection from "../components/sections/AboutUsSection"
import WhyUsSection from "../components/sections/WhyUsSection"
import OurServices from "../components/sections/OurServices"
import SectorsSection from "../components/sections/SectorsSection"
import HowWeWork from "../components/sections/HowWeWork"
import JoinUsSection from "../components/sections/JoinUsSection"
import OurClients from "../components/sections/OurClients"
const Landing = () => {
  return (
    <>
          <Hero />
          <AboutUsSection />
          <WhyUsSection />
          <OurServices />
          <SectorsSection />
          <HowWeWork />
      <JoinUsSection />
          <OurClients /> 
    </>
  )
}

export default Landing
