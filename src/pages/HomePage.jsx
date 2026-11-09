import React from 'react';
import HeroSection from '../components/HeroSection';
import WhoWeAreSection from '../components/WhoWeAreSection';
import CapabilitiesSection from '../components/CapabilitiesSection';
import WhyAjjayerSection from '../components/WhyAjjayerSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import SEOHead from '../components/SEOHead';

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="AJJAYER | Premier Construction, Engineering & Fabrication Contractor Dubai UAE"
        description="AJJAYER Constructions Contracting LLC is a leading UAE contractor delivering high-performance construction, structural engineering, and precision metal fabrication from Dubai across the Emirates."
        canonicalUrl="https://ajjayer.ae/"
        ogImage="/home/hero.png"
      />
      <main id="main-content">
        <HeroSection />
        <WhoWeAreSection />
        <CapabilitiesSection />
        <WhyAjjayerSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </>
  );
}
