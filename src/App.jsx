import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Landing from "./pages/Landing";
import JoinOurFleet from "./pages/JoinOurFleet";
import Trackshipment from "./pages/Trackshipment";
import AdminLogin from "./pages/AdminLogin";
import { LanguageProvider } from './states/LanguageContext';
import ScrollToTop from './utils/ScrollTop';
import { AuthProvider } from "./states/AuthContext"

function Layout() {
  const location = useLocation();
  const showNavAndFooter = location.pathname === '/' || location.pathname === '/joinUs' || location.pathname === '/shipment';

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/joinUs" element={<JoinOurFleet />} />
        <Route path="/shipment" element={<Trackshipment />} />
        <Route path="/admin" element={<AdminLogin />} />
        {/* Redirect to "/" if route not found */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <   AuthProvider>
          <Layout />
        </AuthProvider>
      </LanguageProvider>

    </Router >
  );
}

export default App;
