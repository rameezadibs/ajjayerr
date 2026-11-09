import React, { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Layers, Crosshair, ShieldCheck, Users, Gem } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './WhyAjjayerSection.css';

const advantageIcons = [Layers, Crosshair, ShieldCheck, Users, Gem];

export const whyStatistics = [
  { value: '100', suffix: '+', lines: ['Projects', 'delivered'] },
  { value: '15', suffix: '+', lines: ['Years of', 'experience'] },
  { value: '500', suffix: '+', lines: ['Skilled', 'professionals'] },
  { value: '100', suffix: '%', lines: ['Commitment', 'to quality'] },
];

export const whyAdvantages = [
  { id: '01', title: 'Integrated Expertise', description: 'Construction, engineering and fabrication under one approach.', icon: Layers },
  { id: '02', title: 'Precision Execution', description: 'Detail-driven delivery from concept to completion.', icon: Crosshair },
  { id: '03', title: 'Safety First', description: 'A culture of safety that protects people, progress and performance.', icon: ShieldCheck },
  { id: '04', title: 'Collaborative Partnership', description: 'Working closely with clients, consultants and stakeholders for better outcomes.', icon: Users },
  { id: '05', title: 'Built for the Long Term', description: 'Quality, reliability and lasting value for future generations.', icon: Gem },
];

export default function WhyAjjayerSection({ statistics, advantages, commitmentHref = '/contact' }) {
  const id = useId();
  const reduced = useReducedMotion();
  const { t, isRTL } = useLanguage();

  const localizedStats = statistics || t('why.stats') || whyStatistics;
  const rawAdvantages = advantages || t('why.advantages') || whyAdvantages;
  const localizedAdvantages = rawAdvantages.map((adv, idx) => ({
    ...adv,
    icon: adv.icon || advantageIcons[idx % advantageIcons.length],
  }));

  const headlineLines = t('why.h2Lines') || ['Precision', 'Builds', 'A stronger', 'Tomorrow.'];

  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduced ? 0 : 0.65, delay: reduced ? 0 : delay, ease: 'easeOut' },
  });

  return (
    <section id="why-ajjayer" className="why-section relative grid overflow-hidden" aria-labelledby={`${id}-title`}>
      <div className="why-light relative min-w-0">
        <svg className="why-drafting" viewBox="0 0 960 940" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <g stroke="currentColor" strokeWidth=".7">
            <path d="M60 0V940 M637 0V320 M835 0V670 M0 110H960 M0 888H960 M595 302H960 M835 530H960" />
            <motion.path
              d="M960 20 A255 255 0 1 0 960 530"
              initial={reduced ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0 : 2, delay: 0.2 }}
            />
            <path d="M825 302h20 M835 292v20 M627 302h20 M637 292v20 M50 72h20 M56 62v25 M825 520h20 M835 510v20 M942 20h18 M950 12v16 M942 530h18 M950 522v16" />
          </g>
          <circle cx="835" cy="302" r="1.6" fill="currentColor" />
        </svg>
        <motion.p className="why-eyebrow flex items-center" {...reveal()}>
          <span>04</span>
          <i aria-hidden="true" />
          {t('why.eyebrow')}
        </motion.p>
        <h2 id={`${id}-title`} className="why-headline">
          {headlineLines.map((line, index) => (
            <motion.span key={line} className={index > 1 ? 'why-bronze' : undefined} {...reveal(0.08 + index * 0.09)}>
              {line}
            </motion.span>
          ))}
        </h2>
        <div className="why-annotations" aria-hidden="true">
          <p>
            {isRTL ? (
              <>الكوادر<br />الهندسة<br />المواد<br />الأفكار<br />إلى واقع ملموس</>
            ) : (
              <>People<br />Engineering<br />Materials<br />Ideas<br />Into reality</>
            )}
          </p>
          <i />
          <p>
            {isRTL ? (
              <>دبي<br />الإمارات<br />وما وراءها<span>—</span></>
            ) : (
              <>Dubai<br />UAE<br />Beyond<span>—</span></>
            )}
          </p>
        </div>
        <motion.div className="why-introduction" {...reveal(0.25)}>
          <i className="why-short-rule" aria-hidden="true" />
          <p>{t('why.intro')}</p>
          <motion.button
            type="button"
            className="why-cta inline-flex items-center justify-between cursor-default"
            whileHover={{ y: -2, backgroundColor: '#dca77b' }}
            whileTap={{ y: 0 }}
          >
            <span>{t('why.diffBtn')}</span>
            <ArrowRight aria-hidden="true" size={21} strokeWidth={1.2} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
          </motion.button>
        </motion.div>
        <dl className="why-stats grid">
          {localizedStats.map((stat, index) => (
            <motion.div key={index} {...reveal(index * 0.08)}>
              <dt>
                {stat.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </dt>
              <dd dir="ltr">
                {stat.value}
                <span>{stat.suffix}</span>
              </dd>
              <i aria-hidden="true" />
            </motion.div>
          ))}
        </dl>
        <p className="why-footer">
          {isRTL ? (
            <><span>— الكوادر</span><b>/</b>الدقة<b>/</b>الشراكة<b>/</b>الإنجاز</>
          ) : (
            <><span>— People</span><b>/</b>Precision<b>/</b>Partnership<b>/</b>Progress</>
          )}
        </p>
      </div>
      <div className="why-dark relative min-w-0">
        <ol id={`${id}-advantages`} className="why-advantages" tabIndex={-1} aria-label={t('why.diffBtn')}>
          {localizedAdvantages.map(({ id: number, title, description, icon: Icon }, index) => (
            <motion.li key={number} className="why-advantage" {...reveal(index * 0.08)}>
              <div className="why-number" aria-hidden="true" dir="ltr">{number}</div>
              <motion.div className="why-icon" {...reveal(0.12 + index * 0.08)}>
                <Icon aria-hidden="true" strokeWidth={1} />
              </motion.div>
              <div className="why-advantage-copy">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
        <motion.div className="why-commitment" {...reveal(0.25)}>
          <p className="why-commitment-label">{t('why.commitmentLabel')}</p>
          <p className="why-promise" style={{ whiteSpace: 'pre-line' }}>{t('why.promise')}</p>
          <span className="why-circle inline-flex items-center justify-center cursor-default" aria-hidden="true">
            <ArrowRight size={22} strokeWidth={1.2} aria-hidden="true" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
