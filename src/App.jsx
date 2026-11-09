import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BlogsPage from './pages/BlogsPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ContactPage from './pages/ContactPage';

// Individual Service Pages
import GeneralConstructionPage from './pages/services/GeneralConstructionPage';
import SteelStructuresFabricationPage from './pages/services/SteelStructuresFabricationPage';
import TensileShadeStructuresPage from './pages/services/TensileShadeStructuresPage';
import CarParkingShadesPergolasPage from './pages/services/CarParkingShadesPergolasPage';
import WarehousesPEBPage from './pages/services/WarehousesPEBPage';
import FitOutFinishingPage from './pages/services/FitOutFinishingPage';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Six Core Individual Service Routes */}
        <Route path="/services/general-construction" element={<GeneralConstructionPage />} />
        <Route path="/services/steel-structures-fabrication" element={<SteelStructuresFabricationPage />} />
        <Route path="/services/tensile-shade-structures" element={<TensileShadeStructuresPage />} />
        <Route path="/services/car-parking-shades-pergolas" element={<CarParkingShadesPergolasPage />} />
        <Route path="/services/warehouses-pre-engineered-buildings" element={<WarehousesPEBPage />} />
        <Route path="/services/fit-out-finishing" element={<FitOutFinishingPage />} />

        {/* Alias route for backward compatibility */}
        <Route path="/services/warehouses-peb" element={<Navigate to="/services/warehouses-pre-engineered-buildings" replace />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}
