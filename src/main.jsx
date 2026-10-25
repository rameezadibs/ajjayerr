import React from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhoWeAreSection from './components/WhoWeAreSection';
import CapabilitiesSection from './components/CapabilitiesSection';
import WhyAjjayerSection from './components/WhyAjjayerSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    <main>
      <HeroSection />
      <WhoWeAreSection />
      <CapabilitiesSection />
      <WhyAjjayerSection />
      <TestimonialsSection />
      <CTASection />
    </main>
    <Footer />
  </React.StrictMode>
);
