import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Phone, Mail, MapPin, Clock } from 'lucide-react';
import Brand from './Brand';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

const navColumnsEn = [
  {
    num: '01',
    title: 'Services',
    links: [
      { label: 'General Construction', href: '/services/general-construction' },
      { label: 'Tensile Shade Structures', href: '/services/tensile-shade-structures' },
      { label: 'Car Parking Shades & Pergolas', href: '/services/car-parking-shades-pergolas' },
      { label: 'Warehouses & Pre-Engineered Buildings', href: '/services/warehouses-pre-engineered-buildings' },
      { label: 'Fit-Out & Finishing', href: '/services/fit-out-finishing' },
    ],
  },
  {
    num: '02',
    title: 'Company',
    links: [
      { label: 'About Our Heritage', href: '#who-we-are' },
      { label: 'Engineering Team & Leadership', href: '#who-we-are' },
      { label: 'Quality & HSE Standards', href: '#why-ajjayer' },
      { label: 'Certifications & Compliance', href: '#why-ajjayer' },
      { label: 'Careers in Dubai & UAE', href: '#contact' },
    ],
  },
  {
    num: '03',
    title: 'Sectors',
    links: [
      { label: 'Commercial & High-Rise Towers', href: '#capabilities' },
      { label: 'Industrial Warehousing & Plants', href: '#capabilities' },
      { label: 'Civil Infrastructure & Utilities', href: '#capabilities' },
      { label: 'Energy & Heavy Industry', href: '#capabilities' },
      { label: 'Luxury Mixed-Use Developments', href: '#capabilities' },
    ],
  },
];

const navColumnsAr = [
  {
    num: '01',
    title: 'الخدمات والتخصصات',
    links: [
      { label: 'المقاولات العامة', href: '/services/general-construction' },
      { label: 'مظلات الأشرعة المشدودة', href: '/services/tensile-shade-structures' },
      { label: 'مظلات السيارات والبرجولات', href: '/services/car-parking-shades-pergolas' },
      { label: 'المستودعات والمباني الجاهزة', href: '/services/warehouses-pre-engineered-buildings' },
      { label: 'التشطيبات والديكور الداخلي', href: '/services/fit-out-finishing' },
    ],
  },
  {
    num: '02',
    title: 'الشركة',
    links: [
      { label: 'نبذة عن مسيرتنا الهندسية', href: '#who-we-are' },
      { label: 'فريق العمل والقيادة الهندسية', href: '#who-we-are' },
      { label: 'معايير الجودة والسلامة المهنية', href: '#why-ajjayer' },
      { label: 'الشهادات والاعتمادات الرسمية', href: '#why-ajjayer' },
      { label: 'الوظائف والفرص المهنية', href: '#contact' },
    ],
  },
  {
    num: '03',
    title: 'القطاعات التخصصية',
    links: [
      { label: 'الأبراج والمشاريع التجارية', href: '#capabilities' },
      { label: 'المستودعات والمصانع الحديثة', href: '#capabilities' },
      { label: 'البنية التحتية والمرافق العامة', href: '#capabilities' },
      { label: 'قطاع الطاقة والمشاريع الصناعية', href: '#capabilities' },
      { label: 'المجمعات السكنية والتجارية الفاخرة', href: '#capabilities' },
    ],
  },
];

export default function Footer() {
  const { isRTL } = useLanguage();
  const navColumns = isRTL ? navColumnsAr : navColumnsEn;
  const isAboutPage = typeof window !== 'undefined' && /^\/about\/?$/.test(window.location.pathname);
  const getHref = (hash) => (isAboutPage ? `/${hash}` : hash);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section" role="contentinfo" aria-label="AJJAYER Corporate Footer">
      {/* Giant Background Architectural Wordmark */}
      <div className="footer-watermark" aria-hidden="true">
        AJJAYER
      </div>

      <div className="footer-container">
        {/* ==================================================================
            TOP TIER: Brand Narrative
           ================================================================== */}
        <div className="footer-top-row">
          <div className="footer-brand-block">
            <a
              href={isAboutPage ? '/' : '#home'}
              onClick={isAboutPage ? undefined : scrollToTop}
              aria-label="AJJAYER Home"
            >
              <Brand className="footer-brand-logo" />
            </a>
            <p className="footer-brand-motto">
              {isRTL
                ? 'تدمج شركة الجيّر لمقاولات البناء ذ.م.م بين أعمال المقاولات والهندسة الإنشائية والتصنيع المعدني فائق الدقة تحت نهج منضبط واحد — لتقديم معالم هندسية وقيمة مستدامة في مختلف أنحاء دولة الإمارات العربية المتحدة.'
                : 'AJJAYER Constructions Contracting LLC integrates construction, structural engineering, and precision metal fabrication under one disciplined approach — delivering landmark reliability and enduring value across the United Arab Emirates.'}
            </p>
          </div>
        </div>

        {/* ==================================================================
            MIDDLE TIER: 4 Architectural Columns
           ================================================================== */}
        <div className="footer-nav-grid">
          {navColumns.map((col) => (
            <div key={col.num} className="footer-col">
              <div className="footer-col-header">
                <span className="footer-col-num">{col.num}</span>
                <h4 className="footer-col-title">{col.title}</h4>
              </div>
              <ul className="footer-links-list">
                {col.links.map((link) => (
                  <li key={link.label} className="footer-link-item">
                    {link.href.startsWith('/') ? (
                      <Link to={link.href}>
                        <span>{link.label}</span>
                      </Link>
                    ) : (
                      <a href={getHref(link.href)}>
                        <span>{link.label}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 4th Column: Headquarters Contact Details */}
          <div className="footer-col">
            <div className="footer-col-header">
              <span className="footer-col-num">04</span>
              <h4 className="footer-col-title">{isRTL ? 'المقر الرئيسي' : 'Headquarters'}</h4>
            </div>

            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <MapPin size={17} />
                <div>
                  <span style={{ color: '#ffffff', display: 'block' }}>
                    {isRTL ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, United Arab Emirates'}
                  </span>
                </div>
              </div>

              <div className="footer-contact-item">
                <Phone size={17} />
                <div>
                  <a href="tel:+971541696975" dir="ltr" style={{ fontWeight: 500, color: '#ffffff', display: 'inline-block' }}>
                    +971 54 169 6975
                  </a>
                  <span style={{ display: 'block', fontSize: '0.74rem', color: '#7d8285' }}>
                    {isRTL ? 'الخط الهاتفي المباشر للهندسة' : 'Direct Engineering Hotline'}
                  </span>
                </div>
              </div>

              <div className="footer-contact-item">
                <Mail size={17} />
                <div>
                  <a href="mailto:contact@ajjayer.ae" dir="ltr" style={{ color: '#ffffff', display: 'inline-block' }}>
                    contact@ajjayer.ae
                  </a>
                  <span style={{ display: 'block', fontSize: '0.74rem', color: '#7d8285' }}>
                    {isRTL ? 'استشارات المشاريع وطلبات العروض' : 'Project Consultations & RFPs'}
                  </span>
                </div>
              </div>

              <div className="footer-contact-item">
                <Clock size={17} />
                <div>
                  <span style={{ color: '#ffffff', display: 'block' }}>
                    {isRTL ? '٩:٠٠ ص – ٦:٠٠ م' : '9:00 AM – 6:00 PM'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================
            BOTTOM TIER: Operational Status, Legal & Back-To-Top
           ================================================================== */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <p className="footer-copyright">
              {isRTL
                ? `© ${new Date().getFullYear()} شركة الجيّر لمقاولات البناء ذ.م.م. جميع الحقوق محفوظة.`
                : `© ${new Date().getFullYear()} AJJAYER Constructions Contracting LLC. All rights reserved.`}
            </p>
          </div>

          <div className="footer-bottom-right">
            <ul className="footer-legal-links">
              <li><a href={getHref('#home')}>{isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}</a></li>
              <li><a href={getHref('#home')}>{isRTL ? 'شروط التعاقد' : 'Terms of Engagement'}</a></li>
              <li><a href={getHref('#home')}>{isRTL ? 'سياسة الجودة والسلامة' : 'HSE & Quality Policy'}</a></li>
              <li><a href={getHref('#home')}>{isRTL ? 'خريطة الموقع' : 'Sitemap'}</a></li>
            </ul>

            <button
              type="button"
              className="footer-back-to-top"
              onClick={scrollToTop}
              aria-label={isRTL ? 'العودة لأعلى الصفحة' : 'Back to top of page'}
            >
              <span>{isRTL ? 'العودة للأعلى' : 'Back to Top'}</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
