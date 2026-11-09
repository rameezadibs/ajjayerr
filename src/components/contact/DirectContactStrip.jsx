import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function DirectContactStrip() {
  const { isRTL } = useLanguage();

  return (
    <section className="direct-contact-strip" aria-label="Direct contact details">
      <div className="contact-container">
        <div className="direct-contact-grid">
          {/* 1. CALL */}
          <div className="direct-contact-col">
            <span className="direct-contact-type">{isRTL ? 'اتصال مباشر' : 'DIRECT CALL'}</span>
            <a href="tel:+971541696975" className="direct-contact-main-link" dir="ltr">
              +971 54 169 6975
            </a>
            <p className="direct-contact-sub">
              {isRTL ? 'الإثنين – السبت: ٠٨:٠٠ – ١٨:٠٠ بتوقيت الإمارات' : 'Mon – Sat: 08:00 – 18:00 GST'}
            </p>
          </div>

          {/* 2. EMAIL */}
          <div className="direct-contact-col">
            <span className="direct-contact-type">{isRTL ? 'بريد مباشر' : 'DIRECT EMAIL'}</span>
            <a href="mailto:sales@ajjayer.com" className="direct-contact-main-link" dir="ltr">
              sales@ajjayer.com
            </a>
            <p className="direct-contact-sub">
              {isRTL ? 'استفسارات التقديرات الهندسية ومناقصات المشاريع' : 'Technical estimation & commercial tender enquiries'}
            </p>
          </div>

          {/* 3. WHATSAPP */}
          <div className="direct-contact-col">
            <span className="direct-contact-type">{isRTL ? 'مراسلة فورية' : 'INSTANT MESSAGING'}</span>
            <a
              href="https://wa.me/971541696975"
              target="_blank"
              rel="noopener noreferrer"
              className="direct-contact-main-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <span>{isRTL ? 'بدء المحادثة الفورية' : 'START A CHAT'}</span>
              <ArrowUpRight size={20} color="#ca9468" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
            </a>
            <p className="direct-contact-sub">
              {isRTL ? 'نقاشات سريعة حول المشاريع وإرسال المخططات' : 'Quick project discussions & document dispatch'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
