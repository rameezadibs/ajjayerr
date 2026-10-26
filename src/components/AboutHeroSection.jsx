import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './AboutHeroSection.css';

export const aboutStatistics = [
  { value: '7', lines: ['Emirates', 'wide'] },
  { value: 'Turnkey', lines: ['Contracting', 'solutions'] },
  { value: '500+', lines: ['Skilled', 'professionals'] },
  { value: '100%', lines: ['Commitment', 'to quality'] },
];

/** Standalone About hero. Pass storyHref or onStoryClick when adding a story section. */
export default function AboutHeroSection({ storyHref = '/#who-we-are', onStoryClick }) {
  const reducedMotion = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="about-hero" className="about-hero relative isolate overflow-hidden" aria-labelledby="about-heading" itemScope itemType="https://schema.org/WebPageElement">
      <motion.div className="about-visual" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <img src="/assets/about-architecture.png" alt="Sweeping concrete architecture frames the Dubai skyline and Burj Khalifa in golden evening light, beside a tree and reflective stone terraces." fetchPriority="high" width="2073" height="759" itemProp="image" />
      </motion.div>
      <div className="about-wash" aria-hidden="true" />
      <svg className="about-drafting pointer-events-none" viewBox="0 0 2073 758" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="0.7" opacity="0.24">
          <path d="M80 0V758 M795 0V580 M904 70V583 M1755 0V758 M1796 70V575 M1996 70V578 M0 71H2073 M768 337H958 M0 586H2073" />
          <path d="M72 71h16 M80 63v16 M896 71h16 M904 63v16 M1788 145h16 M1796 137v16 M1988 145h16 M1996 137v16" />
        </g>
        <motion.path d="M813 412 A280 280 0 1 1 1340 320 M1438 252 A267 267 0 0 1 1857 581" stroke="currentColor" strokeWidth="1.3" opacity="0.6" initial={reducedMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.3 }} />
      </svg>

      <div className="about-editorial relative z-10">
        <motion.p className="about-section-label flex items-center" {...reveal()}><span>01</span><span className="about-label-rule" aria-hidden="true" />ABOUT AJJAYER</motion.p>
        <h1 id="about-heading" className="about-headline" itemProp="headline">
          <motion.span {...reveal(0.08)}>A</motion.span>
          <motion.span {...reveal(0.16)}>STRONGER</motion.span>
          <motion.span className="about-bronze" {...reveal(0.24)}>TOMORROW</motion.span>
        </h1>
        <motion.p className="about-tagline" {...reveal(0.32)}>BUILT TOGETHER.</motion.p>
        <motion.div className="about-intro" {...reveal(0.4)}>
          <span className="about-accent" aria-hidden="true" />
          <p itemProp="description">At AJJAYER, we combine engineering expertise, disciplined execution and a forward-thinking approach to create lasting value for the UAE and beyond.</p>
        </motion.div>
        <motion.a className="about-story inline-flex items-center justify-between" href={storyHref} onClick={onStoryClick} whileHover={{ y: -2, backgroundColor: '#dca77b' }} whileTap={{ y: 0 }} {...reveal(0.48)}><span>OUR STORY</span><ArrowRight size={17} aria-hidden="true" /></motion.a>
      </div>

      <motion.dl className="about-stats" aria-label="Key Organizational Metrics and Engineering Heritage" {...reveal(0.72)}>
        {aboutStatistics.map(({ value, lines }) => <div className="about-stat" key={value}>
          <dt>{lines[0]}<br />{lines[1]}</dt><dd className={value.length > 4 ? 'about-stat-long' : ''}>{value}</dd>
        </div>)}
      </motion.dl>
    </section>
  );
}
