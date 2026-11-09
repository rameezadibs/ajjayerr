import React from 'react';
import { MapPin, Compass } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function LocationSection() {
  const { isRTL } = useLanguage();

  return (
    <section className="location-section" aria-labelledby="location-heading">
      <div className="contact-container">
        <div className="location-layout">
          {/* Left Text Column */}
          <div className="location-text-col">
            <div className="location-kicker">
              <Compass size={14} aria-hidden="true" />
              <span>{isRTL ? 'المقر الإقليمي' : 'REGIONAL HEADQUARTERS'}</span>
            </div>

            <h2 id="location-heading" className="location-h2">
              {isRTL ? 'دبي' : 'DUBAI'}
              <span className="location-h2-sub">
                {isRTL ? 'الإمارات العربية المتحدة' : 'UNITED ARAB EMIRATES'}
              </span>
            </h2>

            <p className="location-copy">
              {isRTL
                ? 'تنفيذ مشاريع استراتيجية في مختلف أنحاء دولة الإمارات — تقديم خدمات متكاملة في المقاولات العامة، وتصنيع الهياكل الإنشائية، والمباني الصناعية، ومظلات الشد، والتشطيبات في دبي، أبوظبي، الشارقة، والإمارات الشمالية.'
                : 'Supporting projects across the UAE — delivering comprehensive contracting, structural fabrication, industrial buildings, tensile systems, and interior fit-outs throughout Dubai, Abu Dhabi, Sharjah, and the Northern Emirates.'}
            </p>
          </div>

          {/* Right Column: Clean Muted Architectural Schematic Map Frame */}
          <div className="location-map-frame">
            <div className="location-schematic-grid">
              {/* Subtle architectural schematic grid lines */}
              <svg
                className="schematic-svg"
                viewBox="0 0 600 400"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="map-grid-pattern"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="#a47756"
                      strokeWidth="0.5"
                      strokeOpacity="0.12"
                    />
                  </pattern>
                </defs>

                <rect width="100%" height="100%" fill="url(#map-grid-pattern)" />

                {/* Stylized Coastal Line Indicator */}
                <path
                  d="M 0 120 Q 200 180 400 110 T 600 80"
                  stroke="#ca9468"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  strokeOpacity="0.3"
                />

                {/* Concentric distance radius rings */}
                <circle cx="300" cy="200" r="80" stroke="#a47756" strokeWidth="0.8" strokeOpacity="0.15" />
                <circle cx="300" cy="200" r="140" stroke="#a47756" strokeWidth="0.8" strokeOpacity="0.1" />
                <circle cx="300" cy="200" r="200" stroke="#a47756" strokeWidth="0.8" strokeOpacity="0.06" />

                {/* Cardinal axis crosshairs */}
                <line x1="300" y1="0" x2="300" y2="400" stroke="#a47756" strokeWidth="0.8" strokeOpacity="0.2" />
                <line x1="0" y1="200" x2="600" y2="200" stroke="#a47756" strokeWidth="0.8" strokeOpacity="0.2" />
              </svg>

              {/* Central Location Pin Badge */}
              <div className="location-pin-card">
                <div className="pin-icon-wrap" aria-hidden="true">
                  <MapPin size={22} />
                </div>
                <div className="pin-content">
                  <h3>{isRTL ? 'الجيّر دبي' : 'AJJAYER DUBAI'}</h3>
                  <p>{isRTL ? 'الإمارات العربية المتحدة' : 'UNITED ARAB EMIRATES'}</p>
                  <div style={{ marginTop: '0.4rem', fontSize: '0.68rem', color: '#9ca3af' }}>
                    {isRTL ? 'عمليات تغطي كافة إمارات الدولة السبع' : 'OPERATIONS ACROSS ALL SEVEN EMIRATES'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
