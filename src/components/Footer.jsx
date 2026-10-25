import React from 'react';
import { ArrowUp, Phone, Mail, MapPin, Clock } from 'lucide-react';
import Brand from './Brand';
import './Footer.css';

const navColumns = [
  {
    num: '01',
    title: 'Services',
    links: [
      { label: 'General Construction', href: '#capabilities' },
      { label: 'Steel Structures & Fabrication', href: '#capabilities' },
      { label: 'Tensile Shade Structures', href: '#capabilities' },
      { label: 'Car Parking Shades & Pergolas', href: '#capabilities' },
      { label: 'Warehouses & Pre-Engineered Buildings', href: '#capabilities' },
      { label: 'Fit-Out & Finishing', href: '#capabilities' },
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
      { label: 'Verified Client Testimonials', href: '#testimonials' },
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

export default function Footer() {
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
            <a href="#home" onClick={scrollToTop} aria-label="AJJAYER Home">
              <Brand className="footer-brand-logo" />
            </a>
            <p className="footer-brand-motto">
              AJJAYER Constructions Contracting LLC integrates construction, structural engineering, and precision metal fabrication under one disciplined approach — delivering landmark reliability and enduring value across the United Arab Emirates.
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
                    <a href={link.href}>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 4th Column: Headquarters Contact Details */}
          <div className="footer-col">
            <div className="footer-col-header">
              <span className="footer-col-num">04</span>
              <h4 className="footer-col-title">Headquarters</h4>
            </div>

            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <MapPin size={17} />
                <div>
                  <strong style={{ color: '#ffffff', display: 'block' }}>Prime Tower, Downtown</strong>
                  <span>Business Bay, Dubai, United Arab Emirates</span>
                </div>
              </div>

              <div className="footer-contact-item">
                <Phone size={17} />
                <div>
                  <a href="tel:+97142345678" style={{ fontWeight: 500, color: '#ffffff' }}>
                    +971 4 234 5678
                  </a>
                  <span style={{ display: 'block', fontSize: '0.74rem', color: '#7d8285' }}>
                    Direct Engineering Hotline
                  </span>
                </div>
              </div>

              <div className="footer-contact-item">
                <Mail size={17} />
                <div>
                  <a href="mailto:contact@ajjayer.ae" style={{ color: '#ffffff' }}>
                    contact@ajjayer.ae
                  </a>
                  <span style={{ display: 'block', fontSize: '0.74rem', color: '#7d8285' }}>
                    Project Consultations & RFPs
                  </span>
                </div>
              </div>

              <div className="footer-contact-item">
                <Clock size={17} />
                <div>
                  <span>Mon – Sat: 08:00 – 18:00 GST</span>
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
              © {new Date().getFullYear()} AJJAYER Constructions Contracting LLC. All rights reserved.
            </p>
          </div>

          <div className="footer-bottom-right">
            <ul className="footer-legal-links">
              <li><a href="#home">Privacy Policy</a></li>
              <li><a href="#home">Terms of Engagement</a></li>
              <li><a href="#home">HSE & Quality Policy</a></li>
              <li><a href="#home">Sitemap</a></li>
            </ul>

            <button
              type="button"
              className="footer-back-to-top"
              onClick={scrollToTop}
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
