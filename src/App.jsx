import React from 'react'
import Navbar from './components/layout/Navbar';
import Hero from "./components/sections/HeroSection"
import { LanguageProvider } from './states/LanguageContext';


function App() {
  return (
    <LanguageProvider>
      <Navbar />
      <Hero />
    </LanguageProvider>

  );
}

export default App;
