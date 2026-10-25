import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import './CTASection.css';

export default function CTASection({
  primaryCta = { label: 'Discuss a project', href: 'mailto:projects@ajjayer.ae' },
  secondaryCta = { label: '+971 4 234 5678', href: 'tel:+97142345678' },
}) {
  const reduced = useReducedMotion();

  const reveal = (delay = 0, yOffset = 14) => ({
    initial: reduced ? false : { opacity: 0, y: yOffset },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: reduced ? 0 : 0.65,
      delay: reduced ? 0 : delay,
      ease: [0.16, 1, 0.3, 1],
    },
  });

  return (
    <section id="contact" className="cta-section" aria-labelledby="cta-heading">
      {/* Background Photo */}
      <img
        src="/home/CTA.png"
        alt=""
        aria-hidden="true"
        className="cta-bg-photo"
      />
      <div className="cta-bg-overlay" aria-hidden="true" />
      <div className="cta-grid-bg" aria-hidden="true" />
      <div className="cta-ambient-glow" aria-hidden="true" />

      {/* Subtle Blueprint Linework SVG */}
      <svg
        className="cta-blueprint-canvas"
        viewBox="0 0 1600 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="150" cy="400" r="320" stroke="currentColor" strokeWidth="0.8" strokeDasharray="6 8" />
        <circle cx="150" cy="400" r="480" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
        <line x1="0" y1="200" x2="1600" y2="200" stroke="currentColor" strokeWidth="0.6" strokeDasharray="6 8" />
        <line x1="0" y1="650" x2="1600" y2="650" stroke="currentColor" strokeWidth="0.6" strokeDasharray="6 8" />
        <line x1="800" y1="0" x2="800" y2="800" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 8" />

        {/* Technical crosshairs */}
        {[
          [150, 200],
          [150, 650],
          [800, 200],
          [800, 650],
          [1450, 200],
          [1450, 650],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} stroke="currentColor" strokeWidth="1" />
            <line x1={cx} y1={cy - 10} x2={cx} y2={cy + 10} stroke="currentColor" strokeWidth="1" />
            <circle cx={cx} cy={cy} r="2" fill="currentColor" fillOpacity="0.8" />
          </g>
        ))}

        <g stroke="none" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" letterSpacing="0.2em">
          <text x="820" y="190">INITIATE SPEC. // UAE REF. 25.2048° N</text>
          <text x="820" y="640">RESPONSE SLA: ≤ 4.0 HRS</text>
        </g>
      </svg>

      <div className="cta-container">
        {/* Section Top Header */}
        <div className="cta-header-top">
          <motion.div className="cta-kicker-group" {...reveal(0)}>
            <span className="cta-kicker-num">06</span>
            <span className="cta-kicker-rule" aria-hidden="true" />
            <h2 className="cta-kicker-title">INITIATE CONSULTATION</h2>
          </motion.div>
        </div>

        {/* Focused Architectural Call to Action Block */}
        <div className="cta-content-wrap">
          <h2 id="cta-heading" className="cta-headline">
            <motion.span {...reveal(0.12)}>Ready to build</motion.span>
            <motion.span {...reveal(0.2)}>
              Your next <em>landmark?</em>
            </motion.span>
          </h2>

          <motion.p className="cta-description" {...reveal(0.26)}>
            Whether you are executing large-scale commercial developments, tensile structures, pre-engineered buildings, or custom industrial fabrication in the UAE, AJJAYER delivers disciplined engineering, precision craftsmanship, and uncompromised safety.
          </motion.p>

          <motion.div
            className="cta-actions"
            role="group"
            aria-label="Consultation Call to Actions"
            {...reveal(0.34)}
          >
            <motion.a
              href={primaryCta.href}
              className="cta-btn cta-btn-primary"
              aria-label="Email AJJAYER to discuss a project"
              whileHover={{ y: -2, backgroundColor: '#dca77b' }}
              whileTap={{ y: 0 }}
            >
              <span>{primaryCta.label}</span>
              <ArrowRight size={17} aria-hidden="true" />
            </motion.a>

            <motion.a
              href={secondaryCta.href}
              className="cta-btn cta-btn-primary"
              aria-label="Call AJJAYER Dubai Headquarters directly"
              whileHover={{ y: -2, backgroundColor: '#dca77b' }}
              whileTap={{ y: 0 }}
            >
              <span>{secondaryCta.label}</span>
              <ArrowRight size={17} aria-hidden="true" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
