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
import AboutHeroSection from './components/AboutHeroSection';
import MissionVisionSection from './components/MissionVisionSection';
import HowWeWorkSection from './components/HowWeWorkSection';

const isAboutPage = /^\/about\/?$/.test(window.location.pathname);

function applyAboutSEO() {
  document.title = 'About AJJAYER | Premier Construction & Structural Engineering Contractor Dubai UAE';

  const updateMeta = (attr, val, content) => {
    let el = document.querySelector(`meta[${attr}="${val}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, val);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  const updateLink = (rel, href) => {
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  };

  updateMeta('name', 'description', 'Discover AJJAYER Constructions Contracting LLC in Dubai, UAE — our engineering mission, vision, five-stage execution process, and leadership shaping landmark commercial and industrial infrastructure across the Emirates.');
  updateMeta('name', 'keywords', 'About AJJAYER, construction contractor Dubai, engineering heritage UAE, structural steel company Dubai, general contracting UAE, civil engineers Dubai, AJJAYER mission vision, UAE construction company');
  updateLink('canonical', 'https://ajjayer.ae/about');

  updateMeta('property', 'og:title', 'About AJJAYER | Engineering Heritage & Landmark Construction Dubai UAE');
  updateMeta('property', 'og:description', 'Discover AJJAYER\'s disciplined engineering approach, visionary leadership, and structured execution process shaping landmark infrastructure across the UAE.');
  updateMeta('property', 'og:url', 'https://ajjayer.ae/about');
  updateMeta('property', 'og:type', 'website');
  updateMeta('property', 'og:image', 'https://ajjayer.ae/assets/about-architecture.png');

  updateMeta('name', 'twitter:card', 'summary_large_image');
  updateMeta('name', 'twitter:title', 'About AJJAYER | Engineering Heritage & Landmark Construction Dubai UAE');
  updateMeta('name', 'twitter:description', 'Discover AJJAYER\'s disciplined engineering approach and structured execution process shaping landmark infrastructure across the UAE.');
  updateMeta('name', 'twitter:image', 'https://ajjayer.ae/assets/about-architecture.png');

  // Inject AboutPage & BreadcrumbList Schema.org JSON-LD
  let schemaScript = document.getElementById('about-schema-ld');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'about-schema-ld';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }
  schemaScript.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://ajjayer.ae/#website',
        'url': 'https://ajjayer.ae/',
        'name': 'AJJAYER Constructions Contracting LLC',
        'inLanguage': 'en-AE',
      },
      {
        '@type': 'AboutPage',
        '@id': 'https://ajjayer.ae/about#webpage',
        'url': 'https://ajjayer.ae/about',
        'name': 'About AJJAYER | Premier Construction & Structural Engineering Contractor Dubai UAE',
        'description': 'Discover AJJAYER Constructions Contracting LLC in Dubai, UAE — our engineering mission, vision, five-stage execution process, and leadership shaping landmark commercial and industrial infrastructure across the Emirates.',
        'isPartOf': { '@id': 'https://ajjayer.ae/#website' },
        'breadcrumb': { '@id': 'https://ajjayer.ae/about#breadcrumb' },
        'mainEntity': { '@id': 'https://ajjayer.ae/#organization' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://ajjayer.ae/about#breadcrumb',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://ajjayer.ae/',
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'About Us',
            'item': 'https://ajjayer.ae/about',
          },
        ],
      },
      {
        '@type': 'GeneralContractor',
        '@id': 'https://ajjayer.ae/#organization',
        'name': 'AJJAYER Constructions Contracting LLC',
        'alternateName': 'AJJAYER',
        'url': 'https://ajjayer.ae/',
        'logo': 'https://ajjayer.ae/assets/reference.png',
        'image': 'https://ajjayer.ae/assets/about-architecture.png',
        'description': 'Leading UAE contractor specializing in commercial construction, structural steel engineering, and precision fabrication throughout Dubai and the United Arab Emirates.',
        'telephone': '+971541696975',
        'email': 'projects@ajjayer.ae',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Prime Tower, Business Bay',
          'addressLocality': 'Dubai',
          'addressRegion': 'Dubai',
          'addressCountry': 'AE',
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 25.2048,
          'longitude': 55.2708,
        },
        'areaServed': [
          { '@type': 'City', 'name': 'Dubai' },
          { '@type': 'City', 'name': 'Abu Dhabi' },
          { '@type': 'City', 'name': 'Sharjah' },
          { '@type': 'Country', 'name': 'United Arab Emirates' },
        ],
        'knowsAbout': [
          'Commercial Construction',
          'Structural Steel Engineering & Fabrication',
          'Tensile Membrane Structures',
          'Pre-Engineered Buildings & Industrial Warehouses',
          'Turnkey Contracting & Architectural Engineering',
        ],
      },
    ],
  });
}

if (isAboutPage) {
  applyAboutSEO();
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    {isAboutPage ? (
      <main id="main-content" itemScope itemType="https://schema.org/AboutPage">
        <meta itemProp="name" content="About AJJAYER Constructions Contracting LLC" />
        <meta itemProp="url" content="https://ajjayer.ae/about" />
        <meta itemProp="description" content="Discover AJJAYER Constructions Contracting LLC in Dubai, UAE — engineering heritage, mission, visionary leadership, and structured execution process shaping landmark infrastructure across the Emirates." />
        <AboutHeroSection />
        <MissionVisionSection />
        <HowWeWorkSection />
        <CTASection bgImage="/about/CTA.png" />
      </main>
    ) : (
      <main id="main-content">
        <HeroSection />
        <WhoWeAreSection />
        <CapabilitiesSection />
        <WhyAjjayerSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    )}
    <Footer />
  </React.StrictMode>
);
