import React, { useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageSquare, DraftingCompass, Layers, HardHat, Flag } from 'lucide-react';
import './HowWeWorkSection.css';

export const processSteps = [
  { id: '01', title: 'Understand', description: 'We listen, align on goals and define project requirements.', alt: 'Architectural plans and a technical pen on a drafting desk.', icon: MessageSquare, image: '/assets/approach-process.png' },
  { id: '02', title: 'Engineer', description: 'We develop practical, efficient and buildable solutions.', alt: 'Engineered structural steel frame under construction.', icon: DraftingCompass, image: '/assets/approach-process.png' },
  { id: '03', title: 'Coordinate', description: 'We bring people, plans and resources together for seamless execution.', alt: 'Site engineer in a hard hat and high-visibility vest observing construction.', icon: Layers, image: '/assets/approach-process.png' },
  { id: '04', title: 'Execute', description: 'We build with precision, safety and strict quality control.', alt: 'Crane and lifting chains positioning a structural steel beam.', icon: HardHat, image: '/assets/approach-process.png' },
  { id: '05', title: 'Deliver', description: 'We hand over reliable, high-quality outcomes that create lasting value.', alt: 'Completed architectural production delivered by AJJAYER.', icon: Flag, image: '/about/production.png' },
];

const timeline = 'M0 99 Q500 -1 1000 99';
const nodes = [100, 300, 500, 700, 900].map(x => ({ x, y: 99 - 200 * (x / 1000) * (1 - x / 1000) }));

export default function HowWeWorkSection() {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const active = focused ?? hovered;
  const uid = useId().replace(/:/g, '');
  const reveal = (delay = 0) => ({ initial: reduced ? false : { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .15 }, transition: { duration: .65, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] } });
  return <section id="our-approach" className="work-section relative isolate overflow-hidden" aria-labelledby={`${uid}-heading`} itemScope itemType="https://schema.org/HowTo">
    <svg className="work-architecture pointer-events-none" viewBox="0 0 2000 800" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <defs><linearGradient id={`${uid}-edge`}><stop stopColor="#594536"/><stop offset=".45" stopColor="#c18a56"/><stop offset="1" stopColor="#f6e7d5"/></linearGradient><linearGradient id={`${uid}-stone`} x2=".7" y2="1"><stop stopColor="#eee5da"/><stop offset="1" stopColor="#9a8877"/></linearGradient></defs>
      <path d="M720 0H1080C780 95 537 260 470 465C515 242 617 97 720 0Z" fill={`url(#${uid}-stone)`}/>
      <path d="M959 0H1080C780 95 537 260 470 465C516 277 711 98 959 0Z" fill={`url(#${uid}-edge)`}/>
      <path d="M1080 0C780 95 537 260 470 465C380 733 667 730 970 800" stroke="#a47756" opacity=".35"/>
      <path d="M0 574C150 663 318 639 705 800H0Z" fill={`url(#${uid}-stone)`}/>
      <path d="M0 574C135 658 218 717 435 800H310Z" fill="#f9ecdb"/>
      <path d="M0 574C150 663 318 639 705 800" stroke="#ca9468"/>
      <g stroke="#a47756" strokeWidth=".7" opacity=".13"><path d="M57 600V800 M0 744H360 M1940 120V600 M1870 700H2000"/></g>
    </svg>
    <div className="work-layout">
      <div className="work-intro relative z-10">
        <motion.p className="work-eyebrow flex items-center" {...reveal()}><span aria-hidden="true"/>OUR APPROACH</motion.p>
        <motion.h2 id={`${uid}-heading`} itemProp="name" {...reveal(.08)}>How We<span>Work</span></motion.h2>
        <motion.div {...reveal(.16)}><span className="work-accent" aria-hidden="true"/><p className="work-intro-copy" itemProp="description">A structured, collaborative and execution-focused process that turns ideas into high-quality, real-world outcomes.</p></motion.div>
      </div>
      <div className="work-scroll" role="region" aria-label="Our five-stage process">
        <div className="work-process">
          <ol className="work-stages" itemScope itemType="https://schema.org/ItemList">
            {processSteps.map(({ id, title, description, image, alt, icon: Icon }, index) => {
              const isPanorama = image === '/assets/approach-process.png';
              return (
                <motion.li key={id} className={`work-stage ${active === index ? 'is-active' : ''}`} style={{ '--stage': index }} tabIndex={0} aria-labelledby={`${uid}-${id}`} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} onFocus={() => setFocused(index)} onBlur={() => setFocused(null)} itemScope itemProp="itemListElement" itemType="https://schema.org/HowToStep" {...reveal(.1 + index * .09)}>
                  <meta itemProp="position" content={String(index + 1)} />
                  <div className="work-photo">
                    <img
                      src={image}
                      alt={alt}
                      decoding="async"
                      className={isPanorama ? 'work-photo-panorama' : 'work-photo-single'}
                      style={isPanorama ? { left: `${index * -100}%` } : { left: 0, width: '100%', objectFit: 'cover' }}
                      width={isPanorama ? '2172' : '955'}
                      height={isPanorama ? '724' : '587'}
                      itemProp="image"
                    />
                  </div>
                  <div className="work-stage-content">
                    <span className="work-number">{id}</span>
                    <Icon className="work-icon" aria-hidden="true" strokeWidth={1.15}/>
                    <h3 id={`${uid}-${id}`} itemProp="name">{title}</h3>
                    <p itemProp="text">{description}</p>
                  </div>
                  <span className="work-mobile-node" aria-hidden="true"/>
                </motion.li>
              );
            })}
          </ol>
          <svg className="work-timeline" viewBox="0 0 1000 120" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <defs><radialGradient id={`${uid}-node`} cx="30%" cy="15%" r="80%"><stop stopColor="#ffebc9"/><stop offset=".4" stopColor="#ca9468"/><stop offset="1" stopColor="#89512c"/></radialGradient>{nodes.map((_, i) => <clipPath key={i} id={`${uid}-segment-${i}`}><rect x={i * 200} width="200" height="120"/></clipPath>)}</defs>
            <motion.path d={timeline} stroke="#a47756" strokeWidth="1" initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 1.3, delay: reduced ? 0 : .3 }}/>
            {nodes.map(({ x, y }, index) => <g key={x} className={active === index ? 'is-active' : ''}>
              <path className="work-segment" d={timeline} clipPath={`url(#${uid}-segment-${index})`} stroke="#925131" strokeWidth="2.5"/>
              <motion.circle className="work-node" cx={x} cy={y} r="5.5" fill={`url(#${uid}-node)`} initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: .4, delay: reduced ? 0 : .5 + index * .1 }}/>
            </g>)}
          </svg>
        </div>
      </div>
    </div>
  </section>;
}
