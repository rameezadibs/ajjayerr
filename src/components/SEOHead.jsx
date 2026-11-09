import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage = '/services/services-architecture.png',
  ogType = 'website',
  service,
  breadcrumbs = []
}) {
  const currentCanonical = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://ajjayer.ae/');
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `https://ajjayer.ae${ogImage}`;

  // Update existing DOM head tags to guarantee zero duplicates
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.title = title;

    const setAttr = (selector, attr, val) => {
      let el = document.querySelector(selector);
      if (el) el.setAttribute(attr, val);
    };

    setAttr('link[rel="canonical"]', 'href', currentCanonical);
    setAttr('meta[name="description"]', 'content', description);
    setAttr('meta[property="og:title"]', 'content', title);
    setAttr('meta[property="og:description"]', 'content', description);
    setAttr('meta[property="og:url"]', 'content', currentCanonical);
    setAttr('meta[property="og:image"]', 'content', fullImageUrl);
    setAttr('meta[name="twitter:title"]', 'content', title);
    setAttr('meta[name="twitter:description"]', 'content', description);
    setAttr('meta[name="twitter:image"]', 'content', fullImageUrl);
  }, [title, description, currentCanonical, fullImageUrl]);

  // Organization Schema
  const organizationSchema = {
    '@type': 'GeneralContractor',
    '@id': 'https://ajjayer.ae/#organization',
    'name': 'AJJAYER Constructions Contracting LLC',
    'alternateName': 'AJJAYER',
    'url': 'https://ajjayer.ae/',
    'logo': 'https://ajjayer.ae/assets/reference.png',
    'image': 'https://ajjayer.ae/home/hero.png',
    'telephone': '+971541696975',
    'email': 'projects@ajjayer.ae',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Prime Tower, Business Bay',
      'addressLocality': 'Dubai',
      'addressRegion': 'Dubai',
      'addressCountry': 'AE'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 25.2048,
      'longitude': 55.2708
    },
    'areaServed': [
      { '@type': 'City', 'name': 'Dubai' },
      { '@type': 'City', 'name': 'Abu Dhabi' },
      { '@type': 'City', 'name': 'Sharjah' },
      { '@type': 'Country', 'name': 'United Arab Emirates' }
    ]
  };

  // Breadcrumbs Schema
  const breadcrumbListSchema = breadcrumbs.length > 0 ? {
    '@type': 'BreadcrumbList',
    '@id': `${currentCanonical}#breadcrumb`,
    'itemListElement': breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': crumb.name,
      'item': crumb.url.startsWith('http') ? crumb.url : `https://ajjayer.ae${crumb.url}`
    }))
  } : null;

  // Service Schema
  const serviceSchema = service ? {
    '@type': 'Service',
    '@id': `${currentCanonical}#service`,
    'name': service.title,
    'serviceType': service.title,
    'description': service.metaDescription,
    'url': currentCanonical,
    'provider': {
      '@id': 'https://ajjayer.ae/#organization'
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'United Arab Emirates'
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': `${service.title} Capabilities`,
      'itemListElement': service.capabilities.map(cap => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': cap.title,
          'description': cap.description
        }
      }))
    }
  } : null;

  const graph = [organizationSchema];
  if (breadcrumbListSchema) graph.push(breadcrumbListSchema);
  if (serviceSchema) graph.push(serviceSchema);

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': graph
  };

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={currentCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="AJJAYER Constructions Contracting LLC" />
      <meta property="og:locale" content="en_AE" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentCanonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Structured Data JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </script>
    </Helmet>
  );
}
