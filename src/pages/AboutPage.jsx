import React from 'react';
import AboutHeroSection from '../components/AboutHeroSection';
import MissionVisionSection from '../components/MissionVisionSection';
import HowWeWorkSection from '../components/HowWeWorkSection';
import CTASection from '../components/CTASection';
import SEOHead from '../components/SEOHead';

export default function AboutPage() {
  const breadcrumbsList = [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' }
  ];

  return (
    <>
      <SEOHead
        title="About AJJAYER | Premier Construction & Structural Engineering Contractor Dubai UAE"
        description="Discover AJJAYER Constructions Contracting LLC in Dubai, UAE — our engineering mission, vision, five-stage execution process, and leadership shaping landmark commercial and industrial infrastructure across the Emirates."
        canonicalUrl="https://ajjayer.ae/about"
        ogImage="/assets/about-architecture.png"
        breadcrumbs={breadcrumbsList}
      />
      <main id="main-content" itemScope itemType="https://schema.org/AboutPage">
        <meta itemProp="name" content="About AJJAYER Constructions Contracting LLC" />
        <meta itemProp="url" content="https://ajjayer.ae/about" />
        <meta itemProp="description" content="Discover AJJAYER Constructions Contracting LLC in Dubai, UAE — engineering heritage, mission, visionary leadership, and structured execution process shaping landmark infrastructure across the Emirates." />
        <AboutHeroSection />
        <MissionVisionSection />
        <HowWeWorkSection />
        <CTASection bgImage="/about/CTA.png" />
      </main>
    </>
  );
}
