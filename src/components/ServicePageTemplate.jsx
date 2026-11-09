import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Phone,
  Mail
} from 'lucide-react';
import SEOHead from './SEOHead';
import Breadcrumbs from './Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';
import './ServicePageTemplate.css';

export default function ServicePageTemplate({ service: rawService, onOpenContact }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const { isRTL, getLocalizedService } = useLanguage();

  if (!rawService) return null;

  const service = getLocalizedService(rawService);

  const breadcrumbsList = [
    { name: isRTL ? 'الرئيسية' : 'Home', url: '/' },
    { name: isRTL ? 'الخدمات' : 'Services', url: '/services' },
    { name: service.shortTitle || service.title, url: service.path }
  ];

  const canonicalUrl = `https://ajjayer.ae${service.path}`;

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="service-page-wrapper">
      {/* Route-specific SEO Metadata via react-helmet-async */}
      <SEOHead
        title={service.seoTitle}
        description={service.metaDescription}
        canonicalUrl={canonicalUrl}
        ogImage={service.image}
        service={service}
        breadcrumbs={breadcrumbsList}
      />

      {/* Hero Section */}
      <section className="service-hero-section relative isolate overflow-hidden" aria-labelledby="service-h1">
        {/* Subtle Architectural Grid Lines */}
        <div className="service-hero-grid" aria-hidden="true" />

        <div className="service-container">
          {/* Semantic Breadcrumbs */}
          <Breadcrumbs items={breadcrumbsList} />

          <div className="service-hero-content">
            <div className="service-hero-kicker">
              <span className="service-kicker-id" dir="ltr">{service.id}</span>
              <span className="service-kicker-divider" aria-hidden="true" />
              <span className="service-kicker-text">
                {isRTL ? 'تخصص هندسي رئيسي لدى الجيّر' : 'AJJAYER CORE CAPABILITY'}
              </span>
              <span className="service-kicker-ref" dir="ltr">{service.technicalRef}</span>
            </div>

            {/* Exactly ONE clear primary H1 */}
            <h1 id="service-h1" className="service-hero-h1">
              {service.h1}
            </h1>

            {/* Short introductory value proposition */}
            <p className="service-hero-tagline">
              {service.tagline}
            </p>

            <div className="service-hero-actions">
              <button
                type="button"
                className="service-primary-btn"
                onClick={() => {
                  const discussEl = document.getElementById('discuss-project');
                  if (discussEl) {
                    discussEl.scrollIntoView({ behavior: 'smooth' });
                  } else if (onOpenContact) {
                    onOpenContact();
                  }
                }}
              >
                <span>{isRTL ? 'طلب عرض فني للمشروع' : 'Request Project Proposal'}</span>
                <ArrowRight size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
              </button>

              <a href="tel:+971541696975" className="service-secondary-btn">
                <Phone size={15} />
                <span dir="ltr">+971 54 169 6975</span>
              </a>
            </div>
          </div>

          {/* Hero Image — LCP Hero does NOT lazy load, has width/height & descriptive ALT */}
          <div className="service-hero-visual-frame">
            <picture>
              {service.imageWebp && (
                <source srcSet={service.imageWebp} type="image/webp" />
              )}
              <img
                src={service.image}
                alt={service.imageAlt}
                width={service.imageWidth || 1920}
                height={service.imageHeight || 1080}
                fetchPriority="high"
                decoding="async"
                className="service-hero-image"
              />
            </picture>
            <div className="service-image-blueprint-overlay" aria-hidden="true" />
            <div className="service-image-caption">
              <span className="caption-tag">{isRTL ? 'الأرشيف الفني' : 'TECHNICAL ARCHIVE'}</span>
              <span className="caption-title">
                {isRTL
                  ? `${service.title} — تنفيذ المشاريع في الإمارات`
                  : `${service.title} — UAE PROJECT EXECUTION`}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="service-main-content">
        {/* Section: Overview (Light Full-Width Section) */}
        <section className="service-section section-light" aria-labelledby="overview-heading">
          <div className="service-container">
            <div className="section-header-tag">
              <span className="section-tag-num">01</span>
              <span className="section-tag-line" aria-hidden="true" />
              <span className="section-tag-label">
                {isRTL ? 'نظرة فنية شاملة' : 'CORE OVERVIEW'}
              </span>
            </div>
            <h2 id="overview-heading" className="service-h2">
              {isRTL ? 'التميز الهندسي في دبي ومختلف إمارات الدولة' : 'Engineering Excellence Across Dubai & the UAE'}
            </h2>
            <div className="service-overview-body">
              {service.overview.map((para, i) => (
                <p key={i} className="service-paragraph">{para}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Capabilities (Dark Full-Width Section) */}
        <section className="service-section section-dark" aria-labelledby="capabilities-heading">
          <div className="service-container">
            <div className="section-header-tag">
              <span className="section-tag-num">02</span>
              <span className="section-tag-line" aria-hidden="true" />
              <span className="section-tag-label">
                {isRTL ? 'المواصفات الفنية والقدرات' : 'TECHNICAL SPECIFICATIONS'}
              </span>
            </div>
            <h2 id="capabilities-heading" className="service-h2">
              {isRTL ? 'نطاق التنفيذ والقدرات الهندسية' : 'Our Capabilities & Scope of Delivery'}
            </h2>
            <div className="capabilities-grid">
              {service.capabilities.map((cap, i) => {
                const IconComponent = cap.icon;
                return (
                  <div key={i} className="capability-card">
                    <div className="capability-icon-wrap">
                      <IconComponent size={22} strokeWidth={1.5} />
                    </div>
                    <h3 className="capability-title">{cap.title}</h3>
                    <p className="capability-description">{cap.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section: How We Deliver (Light Full-Width Section) */}
        <section className="service-section section-light" aria-labelledby="delivery-heading">
          <div className="service-container">
            <div className="section-header-tag">
              <span className="section-tag-num">03</span>
              <span className="section-tag-line" aria-hidden="true" />
              <span className="section-tag-label">
                {isRTL ? 'منهجية التنفيذ الهندسي' : 'EXECUTION METHODOLOGY'}
              </span>
            </div>
            <h2 id="delivery-heading" className="service-h2">
              {isRTL ? 'مراحل التنفيذ: من استخراج التراخيص حتى التسليم النهائي' : 'How We Deliver: From Permitting to Handover'}
            </h2>
            <div className="delivery-steps-list">
              {service.deliverySteps.map((step) => (
                <div key={step.num} className="delivery-step-item">
                  <div className="step-num-badge" dir="ltr">{step.num}</div>
                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Frequently Asked Questions (Dark Full-Width Section) */}
        <section className="service-section section-dark" aria-labelledby="faqs-heading">
          <div className="service-container">
            <div className="section-header-tag">
              <span className="section-tag-num">04</span>
              <span className="section-tag-line" aria-hidden="true" />
              <span className="section-tag-label">
                {isRTL ? 'أسئلة العملاء الشائعة' : 'CLIENT QUESTIONS'}
              </span>
            </div>
            <h2 id="faqs-heading" className="service-h2">
              {isRTL ? 'الأسئلة الأكثر تداولاً' : 'Frequently Asked Questions'}
            </h2>
            <div className="faqs-accordion">
              {service.faqs.map((faq, i) => {
                const isExpanded = openFaqIndex === i;

                return (
                  <div key={i} className={`faq-item ${isExpanded ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => toggleFaq(i)}
                      aria-expanded={isExpanded}
                    >
                      <h3 className="faq-question-text">{faq.q}</h3>
                      <ChevronDown
                        size={18}
                        className={`faq-chevron ${isExpanded ? 'is-rotated' : ''}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          className="faq-answer-panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <p className="faq-answer-text">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section: Internal Linking / Related Services (Light Full-Width Section) */}
        <section className="service-section section-light" aria-labelledby="related-heading">
          <div className="service-container">
            <div className="section-header-tag">
              <span className="section-tag-num">05</span>
              <span className="section-tag-line" aria-hidden="true" />
              <span className="section-tag-label">
                {isRTL ? 'التكامل الهندسي' : 'DISCIPLINARY COUPLING'}
              </span>
            </div>
            <h2 id="related-heading" className="service-h2">
              {isRTL ? 'الخدمات الهندسية والإسنادية ذات الصلة' : 'Related Engineering & Construction Services'}
            </h2>
            <div className="related-services-grid">
              {service.relatedServices.map((rel, i) => (
                <Link key={i} to={`/services/${rel.slug}`} className="related-service-card">
                  <div className="related-card-content">
                    <span className="related-badge">
                      {isRTL ? 'نطاق متكامل' : 'INTEGRATED SCOPE'}
                    </span>
                    <h3 className="related-service-title">{rel.title}</h3>
                    <p className="related-anchor-text">{rel.anchor}</p>
                  </div>
                  <div className="related-arrow-box" aria-hidden="true">
                    <ArrowRight size={18} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Discuss Your Project (Dark Full-Width CTA) */}
        <section id="discuss-project" className="service-cta-section" aria-labelledby="discuss-heading">
          <div className="service-container">
            <div className="discuss-card">
              <div className="discuss-content">
                <span className="discuss-eyebrow">
                  {isRTL ? 'جاهز لبدء مشروعك في الإمارات؟' : 'READY TO BUILD IN THE UAE?'}
                </span>
                <h2 id="discuss-heading" className="discuss-h2">
                  {isRTL
                    ? `ناقش مشروع ${service.shortTitle} مع فريقنا الهندسي`
                    : `Discuss Your ${service.shortTitle} Project With Our Engineering Team`}
                </h2>
                <p className="discuss-copy">
                  {isRTL
                    ? 'سواء كنت تخطط لمشروع تجاري جديد، أو تصنيع هياكل فولاذية، أو مستودع صناعي جاهز، أو تشطيبات داخلية، يقدم لك مهندسونا في دبي دراسات جدوى دقيقة وعروض أسعار متكاملة.'
                    : 'Whether planning a new commercial development, heavy steel fabrication, industrial PEB facility, or turnkey interior fit-out, our Dubai technical directors provide prompt feasibility reviews and comprehensive cost models.'}
                </p>
                <div className="discuss-actions">
                  <a href="tel:+971541696975" className="discuss-cta-primary">
                    <Phone size={16} />
                    <span dir="ltr">+971 54 169 6975</span>
                  </a>
                  <a href="mailto:projects@ajjayer.ae" className="discuss-cta-secondary">
                    <Mail size={16} />
                    <span dir="ltr">projects@ajjayer.ae</span>
                  </a>
                </div>
              </div>
              <div className="discuss-details-box">
                <div className="discuss-detail-row">
                  <span className="detail-name">{isRTL ? 'المقر الرئيسي' : 'Headquarters'}</span>
                  <span className="detail-val">
                    {isRTL ? 'برج برايم، الخليج التجاري، دبي، الإمارات' : 'Downtown & Business Bay, Dubai, UAE'}
                  </span>
                </div>
                <div className="discuss-detail-row">
                  <span className="detail-name">{isRTL ? 'ساعات العمل' : 'Working Hours'}</span>
                  <span className="detail-val">
                    {isRTL ? 'الإثنين – السبت: ٠٨:٠٠ – ١٨:٠٠ بتوقيت الإمارات' : 'Mon – Sat: 08:00 – 18:00 GST'}
                  </span>
                </div>
                <div className="discuss-detail-row">
                  <span className="detail-name">{isRTL ? 'الاعتمادات' : 'Licensing'}</span>
                  <span className="detail-val">
                    {isRTL ? 'معتمدون لدى بلدية دبي والدفاع المدني' : 'Dubai Municipality & DCD Certified'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
