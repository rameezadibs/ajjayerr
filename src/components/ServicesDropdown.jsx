import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';
import './ServicesDropdown.css';

export default function ServicesDropdown({ isOpen, onClose, onMouseEnter, onMouseLeave }) {
  const location = useLocation();
  const dropdownRef = useRef(null);
  const itemsRef = useRef([]);
  const { t, getLocalizedService } = useLanguage();

  // Keyboard navigation inside dropdown (ArrowDown, ArrowUp, Home, End, Escape)
  const handleKeyDown = (e, index) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (index + 1) % servicesData.length;
      itemsRef.current[nextIdx]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (index - 1 + servicesData.length) % servicesData.length;
      itemsRef.current[prevIdx]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      itemsRef.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      itemsRef.current[servicesData.length - 1]?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      ref={dropdownRef}
      className="services-dropdown-panel"
      role="menu"
      aria-label="Services Submenu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Invisible bridge to prevent cursor loss between navbar button and panel */}
      <div className="dropdown-hover-bridge" aria-hidden="true" />

      {/* Subtle architectural drafting background grid */}
      <div className="dropdown-drafting-grid" aria-hidden="true" />

      {/* Top Architectural Header */}
      <div className="dropdown-header">
        <div className="dropdown-header-left">
          <span className="dropdown-label">{t('nav.ourServices')}</span>
          <span className="dropdown-bronze-bar" aria-hidden="true" />
        </div>
        <span className="dropdown-micro-tag" aria-hidden="true">
          {t('nav.servicesTagline')}
        </span>
      </div>

      {/* Continuous Architectural List of Six Services */}
      <div className="dropdown-list" role="none">
        {servicesData.map((service, index) => {
          const isActive = location.pathname === service.path;
          const locService = getLocalizedService(service);

          return (
            <Link
              key={service.id}
              to={service.path}
              ref={(el) => (itemsRef.current[index] = el)}
              role="menuitem"
              tabIndex={0}
              aria-current={isActive ? 'page' : undefined}
              className={`dropdown-item ${isActive ? 'is-active' : ''}`}
              onClick={onClose}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {/* Active left indicator line */}
              <div className="dropdown-item-left-indicator" aria-hidden="true" />

              {/* Service Number */}
              <span className="dropdown-item-num">{service.id}</span>

              {/* Main Content: Title and Descriptor */}
              <div className="dropdown-item-content">
                <span className="dropdown-item-title">{locService.title}</span>
                <span className="dropdown-item-desc">{locService.descriptor}</span>
              </div>

              {/* Dynamic expanding bronze line on hover */}
              <span className="dropdown-item-line" aria-hidden="true" />

              {/* Architectural Arrow Indicator */}
              <div className="dropdown-item-arrow" aria-hidden="true">
                <ArrowRight size={15} strokeWidth={1.5} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Dropdown CTA */}
      <div className="dropdown-footer">
        <Link
          to="/services"
          className="dropdown-explore-cta"
          onClick={onClose}
          tabIndex={0}
        >
          <span>{t('nav.exploreAllServices')}</span>
          <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
}
