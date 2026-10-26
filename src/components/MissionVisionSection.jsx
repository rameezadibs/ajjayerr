import React, { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Eye, Mountain, Flag } from 'lucide-react';
import './MissionVisionSection.css';

const statements = [
  { title: 'Mission', copy: 'To deliver high-quality construction, engineering and fabrication solutions through technical excellence, disciplined execution and an unwavering commitment to safety, integrity and client satisfaction.', values: ['Quality', 'Execution', 'Integrity', 'People'] },
  { title: 'Vision', copy: 'To be a leading and trusted construction and engineering partner in the UAE and beyond, recognized for shaping environments, empowering communities and contributing to a stronger, brighter tomorrow.', values: ['Trusted', 'Innovative', 'Impactful'] },
];

function SculpturalForms() {
  const id = useId().replace(/:/g, '');
  return <svg className="mv-surfaces" viewBox="0 0 2000 380" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-stone`} x1="0" y1="0" x2=".8" y2="1" gradientUnits="objectBoundingBox">
        <stop stopColor="#14181b"/>
        <stop offset=".45" stopColor="#1a2024"/>
        <stop offset="1" stopColor="#0b0d0e"/>
      </linearGradient>
      <linearGradient id={`${id}-bronze`} x1="0" y1="0" x2="1" y2=".6">
        <stop stopColor="#1a130d"/>
        <stop offset=".38" stopColor="#5c381c"/>
        <stop offset=".55" stopColor="#ca9468"/>
        <stop offset=".8" stopColor="#3d220e"/>
        <stop offset="1" stopColor="#120c08"/>
      </linearGradient>
      <linearGradient id={`${id}-cream`} x1="0" y1="0" x2=".5" y2="1">
        <stop stopColor="#1e2529"/>
        <stop offset=".5" stopColor="#151a1d"/>
        <stop offset="1" stopColor="#0a0c0d"/>
      </linearGradient>
    </defs>
    <path d="M0 70 C225 260 285 390 470 365 C600 280 671 183 730 184 C840 200 920 352 1290 335 C1690 320 1880 172 2000 0 L2000 380 H0Z" fill={`url(#${id}-stone)`}/>
    <path d="M0 185 C210 310 350 385 470 365 C650 320 690 230 730 184 C820 249 1010 321 1290 335 C1630 350 1840 240 2000 140 L2000 380 H0Z" fill={`url(#${id}-bronze)`}/>
    <path d="M0 70 C210 240 320 370 470 365 C340 363 205 318 0 225Z" fill={`url(#${id}-cream)`}/>
    <path d="M470 380 C850 267 1080 354 1390 322 C1670 302 1880 185 2000 140 L2000 380Z" fill={`url(#${id}-cream)`}/>
    <g fill="none" stroke="rgba(202, 148, 104, 0.45)" strokeWidth="1.5">
      <path d="M0 185 C210 310 350 385 470 365 C650 320 690 230 730 184 C820 249 1010 321 1290 335 C1630 350 1840 240 2000 140"/>
      <path d="M470 380 C850 267 1080 354 1390 322 C1670 302 1880 185 2000 140"/>
    </g>
    <path d="M730 184 C810 207 860 282 1020 312" stroke="#ca9468" strokeWidth="1" fill="none"/>
  </svg>;
}

export default function MissionVisionSection() {
  const reduced = useReducedMotion();
  const headingId = useId();
  const reveal = (delay = 0) => ({ initial: reduced ? false : { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.65, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] } });
  return <section id="mission-vision" className="mv-section relative isolate overflow-hidden" aria-labelledby={headingId} itemScope itemType="https://schema.org/WebPageElement">
    <svg className="mv-guides pointer-events-none" viewBox="0 0 2000 800" preserveAspectRatio="none" fill="none" aria-hidden="true"><g stroke="#ca9468" strokeWidth=".8" opacity=".12"><path d="M71 0V710 M985 0V760 M1255 0V800 M1530 0V760 M1850 0V800 M0 62H95 M640 351H770 M1760 351H2000 M1690 62H2000 M640 351V242L770 62H985"/><path d="M63 62h16 M71 54v16 M977 62h16 M985 54v16 M1842 351h16 M1850 343v16"/></g></svg>
    <div className="mv-layout">
      <div className="mv-intro relative z-10">
        <motion.p className="mv-eyebrow flex items-center" {...reveal()}><span>02</span><i aria-hidden="true"/>MISSION &amp; VISION</motion.p>
        <h2 id={headingId} className="mv-heading" itemProp="name">
          {['OUR', 'MISSION', '& VISION'].map((line, i) => <motion.span key={line} className={i === 1 ? 'mv-copper' : ''} {...reveal(.08 * i)}>{line}</motion.span>)}
        </h2>
        <motion.div {...reveal(.2)}><span className="mv-rule" aria-hidden="true"/><p className="mv-introduction" itemProp="description">Guided by purpose and driven by progress, AJJAYER continues to build with a long-term mindset — creating spaces, structures and opportunities that make a meaningful difference for people, communities and the UAE.</p></motion.div>
      </div>
      <div className="mv-circles">
        {statements.map(({ title, copy, values }, index) => <article className="mv-orbit" key={title} aria-label={`Our ${title.toLowerCase()}`} itemScope itemType="https://schema.org/Thing">
          <svg className="mv-ring" viewBox="0 0 600 640" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <motion.ellipse cx="300" cy="320" rx="288" ry="305" stroke="#ca9468" strokeWidth=".9" opacity=".55" initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: index * .15 }}/>
            <ellipse cx="300" cy="320" rx="299" ry="319" stroke="#ca9468" strokeWidth=".55" strokeDasharray="1 3" opacity=".35"/>
            <path d="M300 0V52 M300 588V640 M0 300H35 M565 300H600" stroke="#ca9468" strokeWidth=".65" opacity=".4"/>
            <circle cx="300" cy="15" r="3" fill="#ca9468"/><circle cx="300" cy="625" r="3" fill="#ca9468"/>
          </svg>
          <motion.div className="mv-statement" {...reveal(.25 + index * .12)}>
            <div className="mv-icon" aria-hidden="true">{index === 0 ? <><Mountain strokeWidth={1.1}/><Flag className="mv-flag" strokeWidth={1.2}/></> : <Eye strokeWidth={1.1}/>}</div>
            <h3 itemProp="name"><span>OUR</span>{title}</h3>
            <span className="mv-rule" aria-hidden="true"/>
            <p className="mv-copy" itemProp="description">{copy}</p>
            <ul className="mv-values" aria-label={`${title} core values`}>{values.map(value => <li key={value}>{value}</li>)}</ul>
            <span className="mv-rule mv-bottom-rule" aria-hidden="true"/>
          </motion.div>
        </article>)}
        <motion.svg className="mv-connector" viewBox="0 0 100 160" fill="none" aria-hidden="true" {...reveal(.5)}><path d="M50 0Q50 60 100 80Q50 100 50 160Q50 100 0 80Q50 60 50 0Z" stroke="#ca9468" strokeWidth=".6" opacity=".5"/><path d="M50 49Q50 73 74 80Q50 87 50 111Q50 87 26 80Q50 73 50 49Z" fill="#ca9468"/></motion.svg>
      </div>
    </div>
    <motion.div className="mv-surface-wrap" {...reveal(.3)}><SculpturalForms/></motion.div>
  </section>;
}
