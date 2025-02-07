import React from 'react'
import Navbar from './components/layout/Navbar';
import { LanguageProvider } from './states/LanguageContext';


function App() {
  return (
    <LanguageProvider>
      <Navbar />
    </LanguageProvider>

  );
}

export default App;
