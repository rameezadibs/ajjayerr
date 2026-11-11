import React from 'react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactHero from '../components/contact/ContactHero';
import ArchitecturalConnector from '../components/contact/ArchitecturalConnector';
import ProjectEnquirySection from '../components/contact/ProjectEnquirySection';
import DirectContactStrip from '../components/contact/DirectContactStrip';
import ContactCTA from '../components/contact/ContactCTA';
import { useLanguage } from '../context/LanguageContext';
import './ContactPage.css';

export default function ContactPage() {
  const { isRTL } = useLanguage();

  const breadcrumbsList = [
    { name: isRTL ? 'الرئيسية' : 'Home', url: '/' },
    { name: isRTL ? 'اتصل بنا' : 'Contact', url: '/contact' }
  ];

  // Organization Schema with verified company details only
  const contactOrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': 'https://www.ajjayer.com/#organization',
    'name': 'AJJAYER Constructions Contracting LLC',
    'alternateName': 'AJJAYER',
    'url': 'https://www.ajjayer.com/',
    'logo': 'https://ajjayer.ae/assets/reference.png',
    'image': 'https://ajjayer.ae/home/hero.png',
    'telephone': '+971541696975',
    'email': 'sales@ajjayer.com',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+971541696975',
      'contactType': 'customer service',
      'email': 'sales@ajjayer.com',
      'areaServed': 'AE',
      'availableLanguage': ['English', 'Arabic']
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Dubai',
      'addressRegion': 'Dubai',
      'addressCountry': 'AE'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 25.2048,
      'longitude': 55.2708
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'United Arab Emirates'
    }
  };

  return (
    <div className="contact-page-wrapper" itemScope itemType="https://schema.org/ContactPage">
      {/* Route-Level SEO Head */}
      <SEOHead
        title={isRTL ? "اتصل بشركة الجيّر | استفسارات ومشاريع المقاولات في دبي والإمارات" : "Contact AJJAYER | Construction & Engineering Enquiries Dubai, UAE"}
        description={isRTL ? "تواصل مع شركة الجيّر في دبي لمشاريع المقاولات العامة، وتصنيع الهياكل الفولاذية، ومظلات الشد المعماري، والمباني الجاهزة، وأعمال التشطيبات في كافة أنحاء الإمارات." : "Contact AJJAYER in Dubai for construction, steel fabrication, tensile structures, pre-engineered buildings, fit-out and engineering project enquiries across the UAE."}
        canonicalUrl="https://www.ajjayer.com/contact"
        ogImage="/assets/about-architecture.png"
        breadcrumbs={breadcrumbsList}
      />

      {/* Structured Organization Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactOrganizationSchema) }}
      />

      {/* 1. Contact Hero */}
      <ContactHero breadcrumbsList={breadcrumbsList} />

      {/* 2. Large Architectural Connector */}
      <ArchitecturalConnector />

      {/* 3. Main Project Enquiry Section (with 40/60 layout & ContactForm) */}
      <ProjectEnquirySection />

      {/* 4. Direct Contact Strip (Call, Email, WhatsApp) */}
      <DirectContactStrip />

      {/* 5. Final CTA */}
      <ContactCTA />
    </div>
  );
}
