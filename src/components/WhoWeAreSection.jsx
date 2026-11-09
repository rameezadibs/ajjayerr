import { motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './WhoWeAreSection.css';

function ArchitecturalBrandVisual({ reveal }) {
  const reduced = useReducedMotion();
  const { t, isRTL } = useLanguage();

  return <div className="who-visual min-w-0">
    <div className="who-artwork relative overflow-hidden">
      <motion.img className="who-art-image h-full w-full object-cover" src="/home/who.png" alt="Warmly illuminated architecture and landscaped pedestrian walkway at night" loading="lazy" initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .8 }} />
      <div className="who-architectural-layer" aria-hidden="true" />
      <svg className="who-brand-mask" viewBox="0 0 1285 778" preserveAspectRatio="none" aria-hidden="true">
        <defs><mask id="who-wordmark-mask"><rect width="1285" height="778" fill="white" /><text x="180" y="734" textLength="880" lengthAdjust="spacingAndGlyphs" fontFamily="Arial, Helvetica, sans-serif" fontSize="222" fontWeight="900" letterSpacing="-12" fill="black">AJJAYER</text></mask></defs>
        <path d="M0 606H180L210 547H424L455 574H1065L1120 778H0Z" fill="#f2efe9" mask="url(#who-wordmark-mask)" />
        <text x="180" y="734" textLength="880" lengthAdjust="spacingAndGlyphs" fontFamily="Arial, Helvetica, sans-serif" fontSize="222" fontWeight="900" letterSpacing="-12" fill="#100e0b" fillOpacity=".6">AJJAYER</text>
        <path d="M38 0V778M0 740H1020M19 456H114M0 606H185M88 650H155" fill="none" stroke="#514a40" strokeOpacity=".28" strokeWidth="1" />
      </svg>
      <motion.div className="who-section-label flex items-center" {...reveal(0)}><span>02</span><i aria-hidden="true"/><span>{t('who.sectionLabel')}</span></motion.div>
      <motion.p className="who-people" {...reveal(.12)}>
        {isRTL ? <>الكوادر<br/>الهندسة<br/>المواد<br/>الأفكار<br/>إلى أرض الواقع</> : <>People<br/>Engineering<br/>Materials<br/>Ideas<br/>Into reality</>}
      </motion.p>
    </div>
    <motion.p className="who-company-line" {...reveal(.25)}>{t('who.companyLine')}</motion.p>
  </div>;
}

function EditorialAboutPanel({ reveal, storyHref, establishedYear }) {
  const year = establishedYear == null ? null : String(establishedYear);
  const { t, isRTL } = useLanguage();
  const headlineLines = isRTL 
    ? ['لا نكتفي', 'بتشييد المساحات،', 'بل نصنع البيئة', 'التي تلتقي فيها', 'المجتمعات.']
    : ['We don’t just', 'build spaces.', 'We engineer', 'how communities', 'come together.'];

  return <div className="who-editorial min-w-0">
    <motion.div className="who-editorial-kicker flex items-center" {...reveal(.06)}><span>{t('who.kicker')}</span><i aria-hidden="true"/><span className="who-page-count"><b>02</b> / 08</span></motion.div>
    <div className="who-statement-grid">
      <h2 id="who-heading" className="who-headline">
        {headlineLines.map((line, i) => (
          <motion.span key={line} className={i === 2 ? 'who-copper' : ''} {...reveal(.12 + i * .065)}>
            {line}
          </motion.span>
        ))}
      </h2>
      <motion.figure className="who-steel-detail" {...reveal(.3)}><div className="who-detail-crop"><img className="who-project-detail" src="/home/who.png" alt="Bronze-toned architectural canopy and warm facade lighting" loading="lazy"/></div><figcaption><span>{year ? 'EST.' : (isRTL ? 'المقر' : 'BASED')}<br/>{isRTL ? 'الإمارات' : 'UAE'}</span><span>{year ? <>{year.slice(0, 2)}<br/>{year.slice(2)}</> : (isRTL ? 'دبي' : 'DUBAI')}</span></figcaption></motion.figure>
    </div>
    <motion.div className="who-body" {...reveal(.34)}>
      <p>{t('who.p1')}</p>
      <p>{t('who.p2')}</p>
    </motion.div>
    <motion.div className="who-editorial-footer flex items-center" {...reveal(.4)}>
      <Link to={storyHref} className="who-story inline-flex items-center justify-between">
        <span>{t('who.storyBtn')}</span> <ArrowRight size={17} strokeWidth={1.4}/>
      </Link>
    </motion.div>
  </div>;
}

function CapabilityStrip({ reveal }) {
  const { t } = useLanguage();
  const caps = [
    { number: '01', title: t('who.cap1Title'), description: t('who.cap1Desc'), image: '/home/who1.png', alt: 'AJJAYER Construction', slug: 'construction', link: '/services/general-construction' },
    { number: '02', title: t('who.cap2Title'), description: t('who.cap2Desc'), image: '/home/who2.png', alt: 'AJJAYER Engineering', slug: 'engineering', link: '/services/steel-structures-fabrication' },
    { number: '03', title: t('who.cap3Title'), description: t('who.cap3Desc'), image: '/home/who3.png', alt: 'AJJAYER Fabrication', slug: 'fabrication', link: '/services/tensile-shade-structures' }
  ];

  return <div className="who-capabilities grid grid-cols-1 md:grid-cols-3" aria-label="Our capabilities">
    {caps.map((item, i) => (
      <motion.article className={`who-capability who-capability-${item.slug} grid min-w-0`} key={item.slug} {...reveal(i * .12)}>
        <div className="who-capability-copy">
          <span className="who-capability-number">{item.number}</span>
          <i className="who-small-rule" aria-hidden="true"/>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <Link to={item.link} className="who-round-link inline-flex items-center justify-center" aria-label={item.title}>
            <ArrowRight size={16} strokeWidth={1.3}/>
          </Link>
        </div>
        <div className="who-capability-photo relative overflow-hidden">
          <img src={item.image} alt={item.alt} className="who-capability-img" loading="lazy" />
          {i < 2 && <span className="who-bronze-block" aria-hidden="true"/>}
        </div>
      </motion.article>
    ))}
  </div>;
}

/** Establishment date is unconfirmed: supply establishedYear when verified. */
export default function WhoWeAreSection({ storyHref = '/about', establishedYear = null, capabilityLinks = { construction: '/services#construction', engineering: '/services#engineering', fabrication: '/services#fabrication' } }) {
  const reduced = useReducedMotion();
  const reveal = (delay = 0) => ({ initial: reduced ? false : { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .15 }, transition: { duration: .65, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] } });
  return <MotionConfig reducedMotion="user"><section id="who-we-are" className="who-section relative overflow-hidden" aria-labelledby="who-heading"><div className="who-upper grid grid-cols-1 lg:grid-cols-[67.2%_32.8%]"><ArchitecturalBrandVisual reveal={reveal}/><EditorialAboutPanel reveal={reveal} storyHref={storyHref} establishedYear={establishedYear}/></div><CapabilityStrip reveal={reveal} capabilityLinks={capabilityLinks}/></section></MotionConfig>;
}
