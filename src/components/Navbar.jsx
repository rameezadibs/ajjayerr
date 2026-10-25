import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Menu, X, Phone, Mail, MapPin, Clock } from 'lucide-react';
import Brand from './Brand';
import './Navbar.css';

const navItems = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'who-we-are', label: 'About', href: '#who-we-are' },
  { id: 'capabilities', label: 'Services', href: '#capabilities' },
  { id: 'why-ajjayer', label: 'Why AJJAYER', href: '#why-ajjayer' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = 'home';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  // Framer Motion scroll progress line
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Scroll listener for sticky dock transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 35);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setContactModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll handler (activeSection remains 'home' since we are on the home page)
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      const yOffset = -80; // Offset for the floating navbar height
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: targetId === 'home' ? 0 : y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`ajjayer-navbar-wrapper ${isScrolled ? 'is-scrolled' : ''}`}
        role="banner"
      >
        <motion.div
          className="ajjayer-navbar"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Brand Logo */}
          <a
            href="#home"
            className="navbar-brand-link"
            onClick={(e) => handleNavClick(e, 'home')}
            aria-label="AJJAYER Home"
          >
            <Brand className="navbar-brand-logo" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="navbar-links" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="nav-link-item">
                  <button
                    type="button"
                    className={`nav-link-btn ${isActive ? 'is-active' : ''}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && (
                      <motion.div
                        className="nav-active-pill"
                        layoutId="navActiveBackground"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="nav-link-label">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </nav>

          {/* Right Actions: Language Switcher, CTA */}
          <div className="navbar-actions">
            {/* Language Toggle */}
            <button
              type="button"
              className="navbar-lang-toggle"
              onClick={() => setCurrentLang((prev) => (prev === 'EN' ? 'AR' : 'EN'))}
              aria-label="Switch Language"
            >
              <span className={currentLang === 'EN' ? 'lang-active' : ''}>EN</span>
              <span style={{ opacity: 0.4 }}>/</span>
              <span className={currentLang === 'AR' ? 'lang-active' : ''}>AR</span>
            </button>

            {/* Contact CTA */}
            <button
              type="button"
              className="navbar-cta-btn"
              onClick={() => setContactModalOpen(true)}
              aria-label="Open contact information"
            >
              <span>Get in touch</span>
              <ArrowRight size={15} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="navbar-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Integrated Dynamic Laser Progress Indicator */}
          <motion.div
            className="navbar-scroll-progress"
            style={{ scaleX }}
            aria-hidden="true"
          />
        </motion.div>
      </header>

      {/* ======================================================================
          CREATIVE MOBILE DRAWER MENU
         ====================================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-menu-header">
              <Brand className="mobile-menu-brand" />
              <button
                type="button"
                className="mobile-menu-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mobile-menu-links">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  type="button"
                  className={`mobile-nav-link ${activeSection === item.id ? 'is-active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07 }}
                >
                  <span className="mobile-nav-link-label">{item.label}</span>
                  <ArrowRight size={18} />
                </motion.button>
              ))}
            </div>

            <div className="mobile-menu-footer">
              <div className="mobile-contact-card">
                <p>AJJAYER Constructions Contracting LLC</p>
                <span>Dubai, United Arab Emirates</span>
              </div>

              <button
                type="button"
                className="navbar-cta-btn"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setContactModalOpen(true);
                }}
              >
                <span>Get in touch with our team</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================================
          INTERACTIVE ARCHITECTURAL CONTACT MODAL
         ====================================================================== */}
      <AnimatePresence>
        {contactModalOpen && (
          <motion.div
            className="contact-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setContactModalOpen(false)}
          >
            <motion.div
              className="contact-modal-card"
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="contact-modal-header">
                <div>
                  <h3 className="contact-modal-title">
                    Start a <em>Conversation</em>
                  </h3>
                  <p className="contact-modal-subtitle">
                    Connect with our Dubai engineering & construction leadership
                  </p>
                </div>
                <button
                  type="button"
                  className="contact-modal-close"
                  onClick={() => setContactModalOpen(false)}
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="contact-info-list">
                <a
                  href="tel:+97140000000"
                  className="contact-info-item"
                  title="Call AJJAYER Headquarters"
                >
                  <div className="contact-info-icon">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="contact-info-label">Direct Line (UAE)</div>
                    <div className="contact-info-value">+971 4 234 5678</div>
                  </div>
                </a>

                <a
                  href="mailto:contact@ajjayer.ae"
                  className="contact-info-item"
                  title="Email AJJAYER Inquiries"
                >
                  <div className="contact-info-icon">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="contact-info-label">Project Inquiries</div>
                    <div className="contact-info-value">contact@ajjayer.ae</div>
                  </div>
                </a>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="contact-info-label">Head Office</div>
                    <div className="contact-info-value">
                      Downtown & Business Bay, Dubai, UAE
                    </div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="contact-info-label">Working Hours</div>
                    <div className="contact-info-value">
                      Mon – Sat: 08:00 – 18:00 GST
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="navbar-cta-btn"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  setContactModalOpen(false);
                  const contactEl = document.getElementById('contact');
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span>Initiate Project Consultation</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
