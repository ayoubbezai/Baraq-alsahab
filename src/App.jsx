import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from "./pages/Landing";
import { LanguageProvider } from './states/LanguageContext';

function Layout() {
  const location = useLocation();
  const showNavAndFooter = location.pathname === '/' || location.pathname === '/joinUs';

  return (
    <>
      {showNavAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/joinUs" element={<Landing />} />
        <Route path="/admin" element={<Landing />} />
      </Routes>
      {showNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <Layout />
      </LanguageProvider>
    </Router>
  );
}

export default App;
