import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ArchitecturalConnector() {
  const { isRTL } = useLanguage();

  return (
    <div className="arch-connector" aria-hidden="true">
      <svg
        className="arch-connector-svg"
        viewBox="0 0 1440 90"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Subtle horizontal guideline */}
        <line
          x1="0"
          y1="45"
          x2="1440"
          y2="45"
          stroke="#ca9468"
          strokeWidth="1"
          strokeOpacity="0.25"
        />

        {/* Large sweeping bronze arc */}
        <path
          d="M 200 90 Q 720 -10 1240 90"
          stroke="#a47756"
          strokeWidth="1.5"
          fill="none"
          strokeOpacity="0.4"
        />

        {/* Technical vertical measurement tick marks */}
        <line x1="360" y1="35" x2="360" y2="55" stroke="#a47756" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="540" y1="38" x2="540" y2="52" stroke="#a47756" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="900" y1="38" x2="900" y2="52" stroke="#a47756" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="1080" y1="35" x2="1080" y2="55" stroke="#a47756" strokeWidth="1" strokeOpacity="0.3" />
      </svg>

      <div className="arch-connector-badge">
        <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#a47756' }}>02</span>
        <span style={{ width: '24px', height: '1px', background: '#a47756' }} />
        <span>{isRTL ? 'استشارة ومناقشة المشروع' : 'PROJECT CONSULTATION'}</span>
        <ArrowDown size={14} className="arch-connector-arrow" />
      </div>
    </div>
  );
}
