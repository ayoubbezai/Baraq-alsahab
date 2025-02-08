import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from "./pages/Landing";
import { LanguageProvider } from './states/LanguageContext';

function App() {
  return (
    <Router>
      <LanguageProvider>
        {/* Navbar should be outside Routes */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/joinUs" element={<Navbar />} />
        </Routes>

        {/* Footer should be outside Routes */}
        <Footer />
      </LanguageProvider>
    </Router>
  );
}

export default App;
