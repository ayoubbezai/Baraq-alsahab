import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Landing from "./pages/Landing";
import JoinOurFleet from "./pages/JoinOurFleet";
import Trackshipment from "./pages/Trackshipment";
import AdminLogin from "./pages/AdminLogin";
import Sectors from "./pages/Sectors";
import Dashboard from "./pages/Dashboard";
import { LanguageProvider } from './states/LanguageContext';
import ScrollToTop from './utils/ScrollTop';
import { AuthProvider } from "./states/AuthContext"
import ProtectedRoute from './utils/ProtectedRoute';
import Delegate from "./pages/DelegateDetails"

function Layout() {
    const location = useLocation();
    const showNavAndFooter = location.pathname === '/' || location.pathname === '/joinUs' || location.pathname === '/shipment' || location.pathname === '/sectors';

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/joinUs" element={<JoinOurFleet />} />
                <Route path="/shipment" element={<Trackshipment />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/sectors" element={<Sectors />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/delegate/:id" element={<Delegate />} />

                </Route>

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
