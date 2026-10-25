import React, { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Handshake, MapPin, Building2, Users } from 'lucide-react';
import './TestimonialsSection.css';

// ============================================================================
// 1. EDITABLE DATA ARRAYS (Easy to replace with verified client testimonials)
// ============================================================================

export const testimonials = [
  {
    id: 'testimonial-1',
    category: 'COMMERCIAL & MIXED-USE',
    quote:
      'AJJAYER delivered with exceptional professionalism and attention to detail. Their team understood our vision, maintained clear communication, and executed the project to the highest standards. A truly reliable partner we look forward to working with again.',
    name: 'MOHAMED ALI',
    role: 'PROJECT DIRECTOR',
    company: 'AL NOOR DEVELOPMENT',
    initials: 'MA',
  },
  {
    id: 'testimonial-2',
    category: 'INDUSTRIAL & FABRICATION',
    quote:
      'The level of engineering expertise and fabrication quality from AJJAYER is outstanding. They consistently deliver on commitments, even on complex requirements. Their professionalism and technical capability make them a trusted long-term partner.',
    name: 'SALMAN KHAN',
    role: 'OPERATIONS MANAGER',
    company: 'GULF INDUSTRIAL SOLUTIONS',
    initials: 'SK',
  },
  {
    id: 'testimonial-3',
    category: 'INFRASTRUCTURE & CIVIL',
    quote:
      'AJJAYER’s commitment to quality, safety and timely delivery sets them apart. Their team brings deep industry knowledge and a solutions-focused approach, making the entire process smooth and efficient. We highly value their dedication and reliability.',
    name: 'FATIMA ALZAABI',
    role: 'PROCUREMENT HEAD',
    company: 'EMIRATES INFRASTRUCTURE GROUP',
    initials: 'FA',
  },
];

// Editable metric figures
export const trustMetrics = [
  {
    id: 'metric-repeat',
    icon: Handshake,
    value: '98%',
    label: 'REPEAT CLIENTS',
    supporting: 'A reflection of lasting trust.',
  },
  {
    id: 'metric-uae',
    icon: MapPin,
    value: 'UAE-WIDE',
    label: 'DELIVERY',
    supporting: 'Supporting projects across all emirates.',
  },
  {
    id: 'metric-disciplines',
    icon: Building2,
    value: 'TRUSTED ACROSS',
    label: 'CONSTRUCTION, ENGINEERING & FABRICATION',
    supporting: 'End-to-end capability under one roof.',
  },
  {
    id: 'metric-partnerships',
    icon: Users,
    value: 'LONG-TERM',
    label: 'PARTNERSHIPS',
    supporting: 'Built on performance and mutual growth.',
  },
];

// ============================================================================
// 2. ARCHITECTURAL DRAFTING BLUEPRINT SVG (Strictly No Photos/Images)
// ============================================================================

function ArchitecturalDraftingCanvas() {
  return (
    <svg
      className="testimonials-blueprint-canvas"
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="diag-hatch" width="40" height="40" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
        </pattern>
      </defs>

      {/* Large drafting arcs */}
      <circle cx="1600" cy="100" r="520" stroke="currentColor" strokeWidth="0.8" strokeDasharray="6 8" />
      <circle cx="1600" cy="100" r="780" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 6" />
      <circle cx="0" cy="900" r="620" stroke="currentColor" strokeWidth="0.8" strokeDasharray="5 7" />

      {/* Axis & alignment grid lines */}
      <line x1="80" y1="0" x2="80" y2="900" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 6" />
      <line x1="1520" y1="0" x2="1520" y2="900" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 6" />
      <line x1="0" y1="120" x2="1600" y2="120" stroke="currentColor" strokeWidth="0.6" strokeDasharray="8 6" />
      <line x1="0" y1="680" x2="1600" y2="680" stroke="currentColor" strokeWidth="0.6" strokeDasharray="8 6" />

      {/* Crosshairs & technical survey marks */}
      {[
        [80, 120],
        [80, 680],
        [800, 120],
        [800, 680],
        [1520, 120],
        [1520, 680],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} stroke="currentColor" strokeWidth="1" />
          <line x1={cx} y1={cy - 10} x2={cx} y2={cy + 10} stroke="currentColor" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="2.5" fill="currentColor" fillOpacity="0.7" />
        </g>
      ))}

      {/* Technical dimension markers & blueprint annotations */}
      <g stroke="none" fill="currentColor" fontSize="8" fontFamily="ui-monospace, monospace" letterSpacing="0.2em">
        <text x="95" y="112">SEC. 05 / ELEVATION REF. 25.2048° N</text>
        <text x="815" y="112">TOLERANCE ±0.02mm — SPEC. 98% REPEAT</text>
        <text x="1380" y="112">GRID 05-AJJAYER</text>
        <text x="95" y="672">ARCHITECTURAL VALIDATION / UAE</text>
      </g>
    </svg>
  );
}

// ============================================================================
// 3. MAIN COMPONENT: TestimonialsSection
// ============================================================================

export default function TestimonialsSection({
  data = testimonials,
  metrics = trustMetrics,
}) {
  const sectionId = useId();
  const reduced = useReducedMotion();

  // Restrained scroll-triggered animation helper
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
    <section
      id="testimonials"
      className="testimonials-section"
      aria-labelledby={`${sectionId}-heading`}
    >
      {/* 100% Code-drawn architectural linework (Strictly zero photos/images) */}
      <div className="testimonials-grid-pattern" aria-hidden="true" />
      <ArchitecturalDraftingCanvas />

      <div className="testimonials-container">
        {/* ==================================================================
            SECTION HEADER & TOP-RIGHT METADATA
           ================================================================== */}
        <div className="testimonials-top-bar">
          <motion.div className="testimonials-kicker-group" {...reveal(0)}>
            <span className="testimonials-kicker-number">05</span>
            <span className="testimonials-kicker-rule" aria-hidden="true" />
            <h2 id={`${sectionId}-kicker`} className="testimonials-kicker-title">
              TESTIMONIALS
            </h2>
          </motion.div>

          <motion.aside
            className="testimonials-top-aside"
            aria-label="Partnership ethos"
            {...reveal(0.08)}
          >
            <p className="testimonials-aside-tracking">
              REAL PARTNERSHIPS. LASTING IMPACT.
            </p>
            <p className="testimonials-aside-pillars">
              <span>PEOPLE</span>
              <span>/</span>
              <span>PROJECTS</span>
              <span>/</span>
              <span>PROGRESS</span>
              <span>/</span>
              <span>TOGETHER</span>
            </p>
            <span className="testimonials-aside-rule" aria-hidden="true" />
          </motion.aside>
        </div>

        {/* ==================================================================
            MAIN HEADLINE & SUPPORTING EDITORIAL COPY
           ================================================================== */}
        <div className="testimonials-headline-wrap">
          <h2 id={`${sectionId}-heading`} className="testimonials-headline">
            <motion.span {...reveal(0.12)}>
              TRUSTED BY CLIENTS
            </motion.span>
            <motion.span {...reveal(0.2)}>
              WHO BUILD WITH{' '}
              <em className="bronze-highlight">CONFIDENCE.</em>
            </motion.span>
          </h2>

          <motion.p className="testimonials-intro-copy" {...reveal(0.28)}>
            AJJAYER Constructions Contracting LLC is trusted across the UAE for
            construction, engineering and fabrication excellence — delivering
            projects with integrity, precision and a long-term commitment to our
            clients’ success.
          </motion.p>
        </div>

        {/* ==================================================================
            TESTIMONIAL GRID (3 ARCHITECTURAL PANELS)
           ================================================================== */}
        <div
          className="testimonials-grid"
          role="region"
          aria-label="Client testimonials"
        >
          {data.map((item, index) => (
            <motion.article
              key={item.id}
              className="testimonial-panel"
              {...reveal(0.15 + index * 0.1, 18)}
              whileHover={
                reduced
                  ? undefined
                  : {
                      y: -3,
                      transition: { duration: 0.25, ease: 'easeOut' },
                    }
              }
            >
              <div>
                <div className="testimonial-card-header">
                  <span className="testimonial-quote-symbol" aria-hidden="true">
                    “
                  </span>
                  <div className="testimonial-category-wrap">
                    <p className="testimonial-category-label">{item.category}</p>
                    <span
                      className="testimonial-category-line"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <blockquote className="testimonial-quote">
                  <p>{item.quote}</p>
                </blockquote>
              </div>

              <div>
                <div className="testimonial-divider" aria-hidden="true" />

                <div className="testimonial-client-row">
                  {/* Circular outline initials avatar (No photos) */}
                  <div
                    className="testimonial-avatar-initials"
                    aria-label={`Initials for ${item.name}`}
                  >
                    <span>{item.initials}</span>
                  </div>

                  <cite className="testimonial-client-meta not-italic">
                    <h3 className="testimonial-client-name">{item.name}</h3>
                    <span className="testimonial-client-role">{item.role}</span>
                    <span className="testimonial-client-company">
                      {item.company}
                    </span>
                  </cite>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ==================================================================
            LOWER CONTINUOUS HORIZONTAL TRUST METRIC STRIP (4 CELLS)
           ================================================================== */}
        <motion.div
          className="testimonials-trust-strip"
          aria-label="Trust and performance metrics"
          {...reveal(0.38, 16)}
        >
          {/* Subtle architectural corner crosshairs */}
          <span className="trust-strip-crosshair crosshair-tl" aria-hidden="true" />
          <span className="trust-strip-crosshair crosshair-tr" aria-hidden="true" />
          <span className="trust-strip-crosshair crosshair-bl" aria-hidden="true" />
          <span className="trust-strip-crosshair crosshair-br" aria-hidden="true" />

          {metrics.map(({ id, icon: Icon, value, label, supporting }) => (
            <div key={id} className="trust-metric-cell">
              <div className="trust-metric-icon-wrap" aria-hidden="true">
                <Icon size={24} strokeWidth={1.2} />
              </div>
              <p className="trust-metric-value">{value}</p>
              <h4 className="trust-metric-label">{label}</h4>
              <p className="trust-metric-supporting">{supporting}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
