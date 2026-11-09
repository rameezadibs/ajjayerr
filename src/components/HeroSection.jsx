import { motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const defaultLinks = { Home: '#home', About: '#who-we-are', Services: '#capabilities', Projects: '#capabilities', Blogs: '#why-ajjayer', Contact: '#contact' };

export default function HeroSection({ links = defaultLinks }) {
  const reduced = useReducedMotion();
  const { lang, isRTL, t } = useLanguage();
  const reveal = (delay = 0) => ({ initial: reduced ? false : { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } });

  return <MotionConfig reducedMotion="user">
    <section
      id="home"
      className="hero relative isolate overflow-hidden"
      aria-label="AJJAYER Construction, Engineering and Fabrication in Dubai, UAE"
      itemScope
      itemType="https://schema.org/GeneralContractor"
    >
      {/* Hidden SEO Microdata */}
      <meta itemProp="name" content="AJJAYER Constructions Contracting LLC" />
      <meta itemProp="description" content="Premier construction, structural engineering, and precision fabrication contractor delivering landmark projects across Dubai and the UAE." />
      <meta itemProp="address" content="Dubai, United Arab Emirates" />
      <meta itemProp="areaServed" content="United Arab Emirates, Dubai, Abu Dhabi, Sharjah" />

      <img
        className="hero-photo absolute inset-0 h-full w-full object-cover"
        src="/home/hero.png"
        alt="AJJAYER construction and engineering landmark project in Dubai UAE"
        title="AJJAYER Construction and Engineering Projects Dubai UAE"
        fetchPriority="high"
        width="1920"
        height="1080"
        itemProp="image"
      />
      <div className="photo-shade absolute inset-0" aria-hidden="true" />
      <a href="#hero-heading" className="skip-link">{t('common.skipToContent')}</a>
      <div className="hero-top-spacer" aria-hidden="true" />

      <div className="hero-content">
        <motion.p className="eyebrow" {...reveal(0.12)} aria-label="Core disciplines: Construction, Engineering, and Fabrication in UAE">
          {t('hero.eyebrow')}
        </motion.p>

        <motion.div
          className="detail-line"
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.32, duration: 0.6 }}
          aria-hidden="true"
        />

        <h1 id="hero-heading" tabIndex={-1}>
          {isRTL ? (
            <>
              <motion.span {...reveal(0.38)}>نبني المعالم الهندسية</motion.span>
              <motion.span {...reveal(0.48)}>من <em>أدق التفاصيل</em>.</motion.span>
            </>
          ) : (
            <>
              <motion.span {...reveal(0.38)}>Built from</motion.span>
              <motion.span {...reveal(0.48)}>the <em>detail</em> up.</motion.span>
            </>
          )}
        </h1>

        <motion.p className="description" {...reveal(0.58)} itemProp="disambiguatingDescription">
          {t('hero.description')}
        </motion.p>

        {/* Both CTAs now share identical primary copper button styling */}
        <motion.div className="hero-actions flex" {...reveal(0.68)} role="group" aria-label="Primary Call to Actions">
          <motion.a
            href="#capabilities"
            className="button primary-button cursor-pointer inline-flex items-center"
            aria-label="Explore our construction, engineering and fabrication work in the UAE"
            whileHover={{ y: -2, backgroundColor: '#dca77b' }}
            whileTap={{ y: 0 }}
          >
            <span>{t('hero.exploreBtn')}</span>
            <ArrowRight size={17} aria-hidden="true" />
          </motion.a>
          
          <motion.a
            href="#contact"
            className="button primary-button cursor-pointer inline-flex items-center"
            aria-label="Discuss a construction or engineering project with AJJAYER"
            whileHover={{ y: -2, backgroundColor: '#dca77b' }}
            whileTap={{ y: 0 }}
          >
            <span>{t('hero.discussBtn')}</span>
            <ArrowRight size={17} aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>

      <a
        className="scroll-cue"
        href="#architectural-strip"
        aria-label="Scroll down to explore structural capabilities"
      >
        <motion.span
          animate={reduced ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <ArrowDown size={46} strokeWidth={1} />
        </motion.span>
        <span>{t('hero.scroll')}</span>
      </a>

      <motion.div
        id="architectural-strip"
        className="architectural-strip"
        role="region"
        aria-label="Structural engineering highlights"
        {...reveal(0.9)}
      >
        <img
          src="/home/hero1.png"
          alt="AJJAYER structural steel framework and precision fabrication"
          className="structure-image"
          loading="lazy"
        />
        <div className="strip-cell structure-caption">
          {isRTL ? <>منشآت<br />تدوم طويلاً</> : <>Structures<br />that last</>}<span aria-hidden="true" />
        </div>
        <div className="strip-cell">
          {isRTL ? <>دقة متناهية<br />في كل تفصيل</> : <>Precision<br />in every detail</>}<span aria-hidden="true" />
        </div>
        <div className="strip-cell">
          {isRTL ? <>نبني إمارات<br />أقوى معاً</> : <>A stronger<br />UAE together</>}<span aria-hidden="true" />
        </div>
      </motion.div>
    </section>
  </MotionConfig>;
}
