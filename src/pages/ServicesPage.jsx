import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ServicesHeroSection from '../components/ServicesHeroSection';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { servicesData, servicesHubData } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';
import './ServicesPage.css';

export default function ServicesPage() {
  const { t, isRTL, getLocalizedService } = useLanguage();

  const breadcrumbsList = [
    { name: isRTL ? 'الرئيسية' : 'Home', url: '/' },
    { name: isRTL ? 'الخدمات' : 'Services', url: '/services' }
  ];

  return (
    <div className="services-hub-page">
      {/* Route-Specific SEO Head */}
      <SEOHead
        title={isRTL ? 'خدمات المقاولات والهندسة الإنشائية في دبي | الجيّر' : servicesHubData.seoTitle}
        description={isRTL ? 'استكشف التخصصات الستة لشركة الجيّر: المقاولات العامة، تصنيع الهياكل الفولاذية، مظلات الأشرعة المشدودة، مظلات السيارات، المستودعات، والتشطيبات.' : servicesHubData.metaDescription}
        canonicalUrl={servicesHubData.canonical}
        ogImage="/services/services-architecture.png"
        breadcrumbs={breadcrumbsList}
      />

      {/* Services Hero Section (Maintains H1 and .services-cta verified by test suite) */}
      <ServicesHeroSection servicesHref="/#capabilities" />

      {/* Architectural Services Directory Grid */}
      <section id="services-directory" className="services-directory-section" aria-labelledby="directory-heading">
        <div className="service-container">
          <Breadcrumbs items={breadcrumbsList} />

          <div className="directory-header">
            <div className="section-header-tag">
              <span className="section-tag-num">06</span>
              <span className="section-tag-line" aria-hidden="true" />
              <span className="section-tag-label">
                {isRTL ? 'التخصصات الهندسية الرئيسية' : 'CORE DISCIPLINES'}
              </span>
            </div>
            <h2 id="directory-heading" className="directory-h2">
              {isRTL ? 'تخصصات معمارية وإنشائية وهندسية متكاملة' : 'Integrated Architectural & Structural Disciplines'}
            </h2>
            <p className="directory-subtitle">
              {isRTL
                ? 'توفر الجيّر نقطة مسؤولية هندسية موحدة عبر ستة قطاعات إنشائية وتصنيعية متخصصة في كافة أنحاء دولة الإمارات.'
                : 'AJJAYER provides single-point technical accountability across six specialized construction and fabrication sectors throughout the UAE.'}
            </p>
          </div>

          <div className="services-showcase-list">
            {servicesData.map((rawService) => {
              const service = getLocalizedService(rawService);
              return (
                <article key={service.id} className="service-showcase-item">
                  <div className="showcase-content">
                    <div className="showcase-meta">
                      <span className="showcase-id" dir="ltr">{service.id}</span>
                      <span className="showcase-ref" dir="ltr">{service.technicalRef}</span>
                    </div>
                    <h3 className="showcase-title">
                      <Link to={service.path} className="showcase-title-link">
                        {service.title}
                      </Link>
                    </h3>
                    <p className="showcase-tagline">{service.tagline}</p>

                    <div className="showcase-caps-preview">
                      {service.capabilities.slice(0, 3).map((cap, i) => (
                        <span key={i} className="showcase-cap-badge">
                          {cap.title}
                        </span>
                      ))}
                    </div>

                    <Link to={service.path} className="showcase-link-btn">
                      <span>
                        {isRTL ? `استكشف حلول ${service.shortTitle}` : `Explore ${service.shortTitle} Solutions`}
                      </span>
                      <ArrowRight size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                    </Link>
                  </div>

                  <div className="showcase-visual">
                    <Link to={service.path} tabIndex={-1} aria-hidden="true">
                      <picture>
                        {service.imageWebp && (
                          <source srcSet={service.imageWebp} type="image/webp" />
                        )}
                        <img
                          src={service.image}
                          alt={service.imageAlt}
                          width={640}
                          height={360}
                          loading="lazy"
                          className="showcase-img"
                        />
                      </picture>
                      <div className="showcase-visual-overlay" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-Disciplinary Value Section */}
      <section className="services-integration-section">
        <div className="service-container">
          <div className="integration-card">
            <span className="integration-eyebrow">
              {isRTL ? 'تنفيذ هندسي موحد' : 'UNIFIED DELIVERY'}
            </span>
            <h2 className="integration-h2">
              {isRTL ? 'تنسيق متكامل عبر مقاول رئيسي موحد لكافة التخصصات' : 'Single-Contractor Coordination Across All Disciplines'}
            </h2>
            <p className="integration-copy">
              {isRTL
                ? 'من خلال امتلاك قدرات الهندسة المدنية وتصنيع الهياكل الفولاذية وإنتاج مظلات الشد المعماري ذاتياً، تقضي شركة الجيّر على تعارض المقاولين الباطنيين وهدر الوقت والتكاليف، لضمان تسليم سلس ودقيق.'
                : 'By controlling in-house civil engineering, steel fabrication, and tensile canopy production, AJJAYER eliminates the subcontractor friction, margin compounding, and scheduling bottlenecks typical of multi-tiered UAE projects.'}
            </p>
            <div className="integration-metrics-grid">
              <div className="metric-box">
                <span className="metric-number" dir="ltr">100%</span>
                <span className="metric-label">
                  {isRTL ? 'تدقيق جودة هندسي داخلي' : 'In-House Quality Auditing'}
                </span>
              </div>
              <div className="metric-box">
                <span className="metric-number" dir="ltr">06</span>
                <span className="metric-label">
                  {isRTL ? 'تخصصات رئيسية موحدة' : 'Unified Core Disciplines'}
                </span>
              </div>
              <div className="metric-box">
                <span className="metric-number" dir="ltr">DM & DCD</span>
                <span className="metric-label">
                  {isRTL ? 'تراخيص بلدية ودفاع مدني معتمدة' : 'Certified Statutory Permitting'}
                </span>
              </div>
              <div className="metric-box">
                <span className="metric-number">
                  {isRTL ? 'كافة الإمارات' : 'UAE-Wide'}
                </span>
                <span className="metric-label">
                  {isRTL ? 'تغطية تنفيذية شاملة' : 'Execution Coverage'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
