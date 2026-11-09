import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';
import './MobileServicesMenu.css';

export default function MobileServicesMenu({ onItemClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isServicesActive = location.pathname.startsWith('/services');
  const { t, getLocalizedService } = useLanguage();

  return (
    <div className="mobile-services-accordion">
      <button
        type="button"
        className={`mobile-services-trigger ${isServicesActive ? 'is-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="mobile-services-label-wrap">
          <span className="mobile-services-num">03</span>
          <span className="mobile-services-title">{t('nav.services')}</span>
        </div>
        <motion.div
          className="mobile-services-chevron"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="mobile-services-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-services-inner">
              {servicesData.map((service) => {
                const isCurrent = location.pathname === service.path;
                const locService = getLocalizedService(service);

                return (
                  <Link
                    key={service.id}
                    to={service.path}
                    className={`mobile-service-subitem ${isCurrent ? 'is-current' : ''}`}
                    onClick={onItemClick}
                  >
                    <span className="mobile-subitem-num">{service.id}</span>
                    <span className="mobile-subitem-title">{locService.title}</span>
                    <ArrowRight size={14} className="mobile-subitem-arrow" />
                  </Link>
                );
              })}

              <Link
                to="/services"
                className="mobile-view-all-services"
                onClick={onItemClick}
              >
                <span>{t('nav.viewAllServices')}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
