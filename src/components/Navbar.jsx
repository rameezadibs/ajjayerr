import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Menu, X, Phone, Mail, MapPin, Clock } from 'lucide-react';
import Brand from './Brand';
import ServicesDropdown from './ServicesDropdown';
import MobileServicesMenu from './MobileServicesMenu';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, toggleLang, t } = useLanguage();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Services Dropdown State & Controlled Hover Delay
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownCloseTimer = useRef(null);

  // Framer Motion scroll progress line
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Check if current route is /services or a child route
  const isServicesActive = location.pathname.startsWith('/services');
  const isAboutActive = location.pathname.startsWith('/about');
  const isBlogsActive = location.pathname.startsWith('/blogs');
  const isContactActive = location.pathname.startsWith('/contact');
  const isHomeActive = location.pathname === '/' && !location.hash;

  // Scroll listener for sticky dock transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 35);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modals & dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setContactModalOpen(false);
        setServicesDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hover handlers with 140ms controlled close delay
  const handleServicesMouseEnter = () => {
    if (dropdownCloseTimer.current) {
      clearTimeout(dropdownCloseTimer.current);
      dropdownCloseTimer.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    if (dropdownCloseTimer.current) clearTimeout(dropdownCloseTimer.current);
    dropdownCloseTimer.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150); // 150ms controlled delay
  };

  // Main Nav Items as specified in prompt:
  // HOME, ABOUT, SERVICES, PROJECTS, BLOGS, CONTACT
  const handleNavClick = (e, target) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);

    if (target === 'home') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else if (target === 'about') {
      navigate('/about');
    } else if (target === 'services') {
      navigate('/services');
    } else if (target === 'projects') {
      if (location.pathname === '/') {
        const el = document.getElementById('capabilities');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/#capabilities');
      }
    } else if (target === 'blogs') {
      navigate('/blogs');
    } else if (target === 'contact') {
      navigate('/contact');
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
          <Link
            to="/"
            className="navbar-brand-link"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            aria-label="AJJAYER Home"
          >
            <Brand className="navbar-brand-logo" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="navbar-links" aria-label="Main Navigation">
            {/* 1. HOME */}
            <li className="nav-link-item">
              <Link
                to="/"
                className={`nav-link-btn ${isHomeActive ? 'is-active' : ''}`}
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                aria-current={isHomeActive ? 'page' : undefined}
              >
                {isHomeActive && (
                  <motion.div
                    className="nav-active-pill"
                    layoutId="navActiveBackground"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="nav-link-label">{t('nav.home')}</span>
              </Link>
            </li>

            {/* 2. ABOUT */}
            <li className="nav-link-item">
              <Link
                to="/about"
                className={`nav-link-btn ${isAboutActive ? 'is-active' : ''}`}
                aria-current={isAboutActive ? 'page' : undefined}
              >
                {isAboutActive && (
                  <motion.div
                    className="nav-active-pill"
                    layoutId="navActiveBackground"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="nav-link-label">{t('nav.about')}</span>
              </Link>
            </li>

            {/* 3. SERVICES (WITH ARCHITECTURAL DROPDOWN) */}
            <li
              className="nav-link-item nav-services-container"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <Link
                to="/services"
                className={`nav-link-btn ${isServicesActive ? 'is-services-active' : ''}`}
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
                aria-current={isServicesActive ? 'page' : undefined}
                onFocus={handleServicesMouseEnter}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown' || e.key === 'Enter') {
                    setServicesDropdownOpen(true);
                  }
                }}
              >
                <span className="nav-link-label">{t('nav.services')}</span>

                {/* Short bronze underline active indicator when route begins with /services */}
                {isServicesActive && (
                  <motion.span
                    className="nav-services-bronze-underline"
                    layoutId="servicesActiveUnderline"
                    transition={{ duration: 0.25 }}
                    aria-hidden="true"
                  />
                )}
              </Link>

              {/* Architectural Services Dropdown Panel */}
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <ServicesDropdown
                    isOpen={servicesDropdownOpen}
                    onClose={() => setServicesDropdownOpen(false)}
                    onMouseEnter={handleServicesMouseEnter}
                    onMouseLeave={handleServicesMouseLeave}
                  />
                )}
              </AnimatePresence>
            </li>

            {/* 4. PROJECTS */}
            <li className="nav-link-item">
              <button
                type="button"
                className="nav-link-btn"
                onClick={(e) => handleNavClick(e, 'projects')}
              >
                <span className="nav-link-label">{t('nav.projects')}</span>
              </button>
            </li>

            {/* 5. BLOGS */}
            <li className="nav-link-item">
              <Link
                to="/blogs"
                className={`nav-link-btn ${isBlogsActive ? 'is-active' : ''}`}
                aria-current={isBlogsActive ? 'page' : undefined}
              >
                {isBlogsActive && (
                  <motion.div
                    className="nav-active-pill"
                    layoutId="navActiveBackground"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="nav-link-label">{t('nav.blogs')}</span>
              </Link>
            </li>

            {/* 6. CONTACT */}
            <li className="nav-link-item">
              <Link
                to="/contact"
                className={`nav-link-btn ${isContactActive ? 'is-active' : ''}`}
                aria-current={isContactActive ? 'page' : undefined}
              >
                {isContactActive && (
                  <motion.div
                    className="nav-active-pill"
                    layoutId="navActiveBackground"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="nav-link-label">{t('nav.contact')}</span>
              </Link>
            </li>
          </nav>

          {/* Right Actions: Language Switcher, CTA */}
          <div className="navbar-actions">
            {/* Language Toggle */}
            <button
              type="button"
              className="navbar-lang-toggle"
              onClick={toggleLang}
              aria-label={t('nav.switchLang')}
            >
              <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
              <span style={{ opacity: 0.4 }}>/</span>
              <span className={lang === 'ar' ? 'lang-active' : ''}>AR</span>
            </button>

            {/* Contact CTA */}
            <button
              type="button"
              className="navbar-cta-btn"
              onClick={() => setContactModalOpen(true)}
              aria-label="Open contact information"
            >
              <span>{t('common.getInTouch')}</span>
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

          {/* Dynamic Laser Progress Indicator */}
          <motion.div
            className="navbar-scroll-progress"
            style={{ scaleX }}
            aria-hidden="true"
          />
        </motion.div>
      </header>

      {/* ======================================================================
          MOBILE DRAWER MENU WITH ACCORDION SERVICES
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  type="button"
                  className="navbar-lang-toggle"
                  style={{ display: 'inline-flex' }}
                  onClick={toggleLang}
                  aria-label={t('nav.switchLang')}
                >
                  <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
                  <span style={{ opacity: 0.4 }}>/</span>
                  <span className={lang === 'ar' ? 'lang-active' : ''}>AR</span>
                </button>
                <button
                  type="button"
                  className="mobile-menu-close"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label={t('common.close')}
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            <div className="mobile-menu-links">
              {/* Home */}
              <Link
                to="/"
                className={`mobile-nav-link ${isHomeActive ? 'is-active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mobile-nav-link-label">{t('nav.home')}</span>
                <ArrowRight size={18} />
              </Link>

              {/* About */}
              <Link
                to="/about"
                className={`mobile-nav-link ${isAboutActive ? 'is-active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mobile-nav-link-label">{t('nav.about')}</span>
                <ArrowRight size={18} />
              </Link>

              {/* SERVICES ACCORDION */}
              <MobileServicesMenu onItemClick={() => setMobileMenuOpen(false)} />

              {/* Projects */}
              <button
                type="button"
                className="mobile-nav-link"
                onClick={(e) => handleNavClick(e, 'projects')}
              >
                <span className="mobile-nav-link-label">{t('nav.projects')}</span>
                <ArrowRight size={18} />
              </button>

              {/* Blogs */}
              <Link
                to="/blogs"
                className={`mobile-nav-link ${isBlogsActive ? 'is-active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mobile-nav-link-label">{t('nav.blogs')}</span>
                <ArrowRight size={18} />
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                className={`mobile-nav-link ${isContactActive ? 'is-active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mobile-nav-link-label">{t('nav.contact')}</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mobile-menu-footer">
              <div className="mobile-contact-card">
                <p>{t('common.companyName')}</p>
                <span>{t('common.location')}</span>
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
                <span>{t('common.getInTouch')}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================================
          ARCHITECTURAL CONTACT MODAL
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
                    {t('nav.contactModalTitlePre')} <em>{t('nav.contactModalTitleEm')}</em>
                  </h3>
                  <p className="contact-modal-subtitle">
                    {t('nav.contactModalSubtitle')}
                  </p>
                </div>
                <button
                  type="button"
                  className="contact-modal-close"
                  onClick={() => setContactModalOpen(false)}
                  aria-label={t('common.close')}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="contact-info-list">
                <a
                  href="tel:+971541696975"
                  className="contact-info-item"
                  title="Call AJJAYER Headquarters"
                >
                  <div className="contact-info-icon">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="contact-info-label">{t('nav.directLine')}</div>
                    <div className="contact-info-value" dir="ltr">+971 54 169 6975</div>
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
                    <div className="contact-info-label">{t('nav.directEmail')}</div>
                    <div className="contact-info-value" dir="ltr">contact@ajjayer.ae</div>
                  </div>
                </a>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="contact-info-label">{t('nav.headquarters')}</div>
                    <div className="contact-info-value">
                      {t('nav.headquartersVal')}
                    </div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="contact-info-label">{t('nav.officeHours')}</div>
                    <div className="contact-info-value">
                      {t('nav.officeHoursVal')}
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
                  if (location.pathname === '/') {
                    const contactEl = document.getElementById('contact');
                    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/#contact');
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
