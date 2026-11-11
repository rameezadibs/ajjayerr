import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './ServicesHeroSection.css';

const photographs = [
  ['sails', 'Blue and white tensile sails shading a landscaped pedestrian walkway.'],
  ['pavilion', 'Two-storey white event pavilion with glass walls and exterior stairs.'],
  ['warehouse', 'Open industrial warehouse with exposed steel framing and reflective floors.'],
  ['boardroom', 'Contemporary marble boardroom overlooking the Dubai skyline.'],
  ['pergola', 'Dark slatted pergola above a landscaped outdoor terrace.'],
  ['canopies', 'Cream tensile canopies on white columns beside an outdoor roadway.'],
];

export default function ServicesHeroSection({ servicesHref = '/#capabilities', onExploreClick }) {
  const reducedMotion = useReducedMotion();
  const { t, isRTL } = useLanguage();

  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="services-hero relative isolate overflow-hidden" aria-labelledby="services-heading">
      <svg className="services-drafting pointer-events-none" viewBox="0 0 1714 918" fill="none" preserveAspectRatio="none" aria-hidden="true" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}>
        <g stroke="#9B6038" strokeWidth="0.7">
          <path opacity=".13" d="M430 0L260 918 M0 730L740 95 M0 880L910 0 M0 595L705 95" />
          <path opacity=".5" d="M515 0A218 218 0 1 0 735 345 M270 918A500 500 0 0 1 735 745" />
          <path opacity=".45" d="M349 400Q465 121 748 95" />
        </g>
        <circle cx="486" cy="228" r="4" fill="#b78049" />
      </svg>

      <div className="services-editorial relative z-10">
        <motion.p className="services-eyebrow" {...reveal()}>
          {t('servicesHub.eyebrow')}
        </motion.p>
        <h1 id="services-heading" className="services-heading">
          {isRTL ? (
            <>
              <motion.span {...reveal(0.08)}>{t('servicesHub.headingLine1', 'خدماتنا')}</motion.span>
              <motion.span {...reveal(0.16)}>{t('servicesHub.headingLine2', 'الإنشائية')}</motion.span>
            </>
          ) : (
            <>
              <motion.span {...reveal(0.08)}>{t('servicesHub.headingLine1', 'OUR')}</motion.span>
              <motion.span {...reveal(0.16)}>{t('servicesHub.headingLine2', 'SERVICES')}</motion.span>
            </>
          )}
        </h1>
        <motion.span className="services-rule block" aria-hidden="true" {...reveal(0.22)} />
        <motion.p className="services-description" {...reveal(0.28)}>
          {t('servicesHub.description')}
        </motion.p>
        <motion.a
          className="services-cta inline-flex items-center justify-between"
          href={servicesHref}
          onClick={onExploreClick}
          {...reveal(0.36)}
        >
          <span>{t('servicesHub.exploreCta', isRTL ? 'استكشف خدماتنا' : 'EXPLORE OUR SERVICES')}</span>
          <ArrowRight size={25} strokeWidth={1.3} aria-hidden="true" />
        </motion.a>
      </div>

      <motion.div
        className="services-visual"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        {photographs.map(([name, alt], index) => (
          <div className={`services-photo services-photo--${name}`} key={name}>
            <img
              src={`/services/hero-${name}.webp`}
              alt={alt}
              decoding="async"
              fetchPriority={index < 2 ? 'high' : 'auto'}
            />
          </div>
        ))}
        <svg className="services-dividers" viewBox="0 0 1714 918" preserveAspectRatio="none" aria-hidden="true">
          <g fill="none" stroke="white" strokeWidth="6">
            <path d="M750 -10L440 928 M1245 -10L962 687 M608 432L1092 381 M1084 398H1714 M524 684L962 687L1714 748 M984 690L903 928" />
          </g>
        </svg>
      </motion.div>
      <motion.p className="services-purpose" style={{ whiteSpace: 'pre-line' }} {...reveal(0.5)}>
        {t('servicesHub.purpose')}
      </motion.p>
    </section>
  );
}
