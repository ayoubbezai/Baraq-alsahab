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
import DelegateArchive from "./pages/DelegateArchive"
import Companies from './pages/Companies';
import CompaniesArchive from './pages/CompaniesArchive';
import CompanyDetails from './pages/CompanyDetails';
import MainDashboard from './pages/MainDashboard';
import CompaniesArchivedetails from './pages/CompaniesArchivedetails';
import DelegateArchiveDetails from './pages/DelegateArchiveDetails';
import Places from './pages/Places';
import ChangeDeliveryPlaces from './pages/ChangeDeliveryPlaces';
import QuestionsPage from './pages/QuestionsPage';

function Layout() {
    const location = useLocation();
    const showNavAndFooter = location.pathname === '/' || location.pathname === '/joinUs' || location.pathname === '/shipment' || location.pathname === '/sectors' || location.pathname === '/questions';

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/joinUs" element={<JoinOurFleet />} />
                <Route path="/places" element={<Places />} />
                <Route path="/shipment" element={<Trackshipment />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/sectors" element={<Sectors />} />
                <Route path="/questions" element={<QuestionsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/delegates" element={<Dashboard />} />
                    <Route path="/dashboard" element={<MainDashboard />} />
                    <Route path="/delegate/:id" element={<Delegate />} />
                    <Route path="/delegates-archive" element={<DelegateArchive />} />
                    <Route path="/delegates-archive/:id" element={<DelegateArchiveDetails />} />
                    <Route path="/companies-dashboard" element={<Companies />} />
                    <Route path="/companies-archive" element={<CompaniesArchive />} />
                    <Route path="/companies-archive/:id" element={<CompaniesArchivedetails />} />
                    <Route path="/company/:id" element={<CompanyDetails />} />
                    <Route path="/delivery-places" element={<ChangeDeliveryPlaces />} />

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
