import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import Breadcrumbs from '../Breadcrumbs';

export default function ContactHero({ breadcrumbsList }) {
  const { isRTL } = useLanguage();

  return (
    <section className="contact-hero-section" aria-labelledby="contact-heading">
      {/* Subtle Architectural Drafting Linework */}
      <div className="contact-hero-blueprint" aria-hidden="true">
        <div className="contact-drafting-grid" />
        <div className="contact-drafting-arc" />
        <div className="contact-drafting-arc-inner" />
      </div>

      <div className="contact-container">
        {breadcrumbsList && <Breadcrumbs items={breadcrumbsList} />}
        <div className="contact-hero-layout">
          {/* Left Column: Heading & Intro */}
          <div className="contact-hero-left">
            <motion.div 
              className="contact-hero-kicker"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="contact-hero-kicker-num">01</span>
              <span className="contact-hero-kicker-line" aria-hidden="true" />
              <span>{isRTL ? 'الاتصال / استفسار عن مشروع' : 'CONTACT / PROJECT ENQUIRY'}</span>
            </motion.div>

            <motion.h1
              id="contact-heading"
              className="contact-hero-h1"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              {isRTL ? (
                <>
                  لنبنِ معاً <br />
                  معالم هندسية <br />
                  <span className="contact-h1-highlight">تدوم للأجيال.</span>
                </>
              ) : (
                <>
                  LET'S BUILD <br />
                  SOMETHING <br />
                  <span className="contact-h1-highlight">THAT LASTS.</span>
                </>
              )}
            </motion.h1>

            <motion.div 
              className="contact-hero-desc-wrap"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
            >
              <span className="contact-hero-desc-rule" aria-hidden="true" />
              <p className="contact-hero-desc">
                {isRTL
                  ? 'تواصل مع شركة الجيّر لمناقشة متطلبات المقاولات العامة، والهندسة الإنشائية، وتصنيع الفولاذ، والمظلات المشدودة، والمباني الجاهزة، والتشطيبات في دبي والإمارات.'
                  : 'Speak with AJJAYER about construction, engineering, fabrication, shade structures, pre-engineered buildings or fit-out requirements across Dubai and the UAE.'}
              </p>
            </motion.div>
          </div>

          {/* Right Column: Architectural Contact Index */}
          <motion.div 
            className="contact-hero-index"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-label="Direct contact channels"
          >
            <div className="contact-index-header">
              <span>{isRTL ? 'مرجع الموقع' : 'LOCATION REFERENCE'}</span>
              <span className="contact-index-loc">{isRTL ? 'دبي / الإمارات' : 'DUBAI / UAE'}</span>
            </div>

            <div className="contact-index-item">
              <span className="contact-index-label">{isRTL ? 'هاتف' : 'CALL'}</span>
              <a href="tel:+971541696975" className="contact-index-val" dir="ltr">
                +971 54 169 6975
              </a>
            </div>

            <div className="contact-index-item">
              <span className="contact-index-label">{isRTL ? 'بريد' : 'EMAIL'}</span>
              <a href="mailto:sales@ajjayer.com" className="contact-index-val" dir="ltr">
                sales@ajjayer.com
              </a>
            </div>

            <div className="contact-index-item">
              <span className="contact-index-label">{isRTL ? 'الموقع' : 'WEB'}</span>
              <a href="https://www.ajjayer.com" className="contact-index-val" dir="ltr">
                www.ajjayer.com
              </a>
            </div>

            <div className="contact-index-footer">
              <span>{isRTL ? 'مشاريع في كافة الإمارات' : 'PROJECTS ACROSS THE UAE'}</span>
              <span>{isRTL ? 'تأسست في دبي' : 'EST. DUBAI'}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
