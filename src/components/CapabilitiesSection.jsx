import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { capabilities } from './capabilitiesData';
import './CapabilitiesSection.css';

function CapabilityImage({ image, className = '', decorative = false, thumbMode = false }) {
  if (image.crop) return <svg className={className} viewBox={image.crop} preserveAspectRatio="xMidYMid slice" role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : image.alt} aria-hidden={decorative || undefined}><image href={image.src} width={image.width || 1536} height={image.height || 1024}/></svg>;
  const style = thumbMode && image.thumbPosition ? { objectPosition: image.thumbPosition } : undefined;
  return <img className={className} src={image.src} alt={decorative ? '' : image.alt} loading="lazy" style={style}/>;
}


function TechnicalDrawing({ type }) {
  return <svg className="cap-technical-drawing" viewBox="0 0 360 190" fill="none" stroke="currentColor" strokeWidth=".7" aria-hidden="true">
    <g opacity=".6"><path d="M18 15V180M340 15V180M8 25H352M8 165H352M45 8V185M315 8V185M5 65H355M5 135H355" strokeDasharray="3 5"/><path d="M23 12H335M23 8V16M335 8V16M352 28V161M348 28H356M348 161H356M23 178H335M23 174V182M335 174V182"/></g>
    {type === 'building' && <g><path d="M50 155V45L175 22L305 45V155ZM50 65H305M50 95H305M50 125H305M85 40V155M135 30V155M185 25V155M235 33V155M280 41V155"/><path d="M35 155H325M35 162H325M90 155V140H125V155M200 155V140H235V155"/></g>}
    {type === 'structure' && <g><path d="M155 25H205V160H155ZM40 65H320V100H40ZM163 25V160M197 25V160M40 73H320M40 92H320M135 60H225V110H135Z"/>{[145,215].map(x => [70,100].map(y => <circle key={`${x}-${y}`} cx={x} cy={y} r="3"/>))}<path d="M70 140L155 100M205 100L290 140M70 150L155 110M205 110L290 150"/></g>}
    {type === 'tensile' && <g><path d="M55 155L125 45M125 45L235 45M235 45L305 155"/><path d="M125 45V155M235 45V155"/><path d="M55 155Q180 85 305 155M65 145Q180 70 295 145M125 45Q180 95 235 45"/><path d="M35 155H325M40 162H320"/><circle cx="125" cy="45" r="3"/><circle cx="235" cy="45" r="3"/><circle cx="55" cy="155" r="3"/><circle cx="305" cy="155" r="3"/></g>}
    {type === 'pergola' && <g><path d="M60 155V55H300V155M75 55V155M285 55V155"/><path d="M50 55H310M50 48H310"/>{[90,120,150,180,210,240,270].map(x => <path key={x} d={`M${x} 48V62`} />)}<path d="M60 90H185L290 55M75 95H185"/><path d="M35 155H325"/></g>}
    {type === 'warehouse' && <g><path d="M45 155V75L180 35L315 75V155ZM45 75H315M180 35V155"/><path d="M45 155H315M35 155H325"/><path d="M85 155V105H145V155M215 155V105H275V155"/><path d="M75 75L180 115L285 75M120 54V93M240 54V93"/></g>}
    {type === 'interior' && <g><path d="M40 40H315V150H40ZM40 40L80 67H280L315 40M80 67V125L40 150M280 67V125L315 150M80 125H280M120 67V125M170 67V125M220 67V125M145 40V67M240 40V67"/><path d="M85 135H275M50 155H310M55 30H300"/></g>}
    {type === 'beam' && <g><path d="M45 40H310V53H193V137H310V150H45V137H162V53H45Z"/><path d="M50 44H305M50 146H305M168 57V133M186 57V133M45 32H310M45 28V36M310 28V36M326 40V150M322 40H330M322 150H330"/><path d="M66 40V150M290 40V150" strokeDasharray="2 4"/><circle cx="177" cy="95" r="3"/><path d="M170 95H184M177 88V102"/></g>}
    <g stroke="none" fill="currentColor" fontSize="6" fontFamily="monospace"><text x="164" y="9">SECTION</text><text x="168" y="188">DETAIL / 01</text><text x="320" y="100" transform="rotate(-90 320 100)">REF.</text></g>
  </svg>;
}

export default function CapabilitiesSection({ servicesHref = '/services', capabilityLinks = {} }) {
  const [activeId, setActiveId] = useState('01');
  const [mobile, setMobile] = useState(false);
  const tabs = useRef([]);
  const id = useId();
  const reduced = useReducedMotion();
  const active = capabilities.find(item => item.id === activeId);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setMobile(query.matches);
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!mobile) return;
    const tab = tabs.current[capabilities.findIndex(item => item.id === activeId)];
    const list = tab?.parentElement;
    if (list && tab) list.scrollTo({ left: list.scrollLeft + tab.getBoundingClientRect().left - list.getBoundingClientRect().left - 20, behavior: reduced ? 'instant' : 'smooth' });
  }, [activeId, mobile, reduced]);
  const reveal = (delay = 0) => ({ initial: reduced ? false : { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .12 }, transition: { duration: reduced ? 0 : .55, delay: reduced ? 0 : delay } });
  const switchTab = (event, index) => {
    let next;
    if (['ArrowDown','ArrowRight'].includes(event.key)) next = (index + 1) % capabilities.length;
    if (['ArrowUp','ArrowLeft'].includes(event.key)) next = (index + capabilities.length - 1) % capabilities.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = capabilities.length - 1;
    if (next === undefined) return;
    event.preventDefault(); setActiveId(capabilities[next].id); tabs.current[next]?.focus({ preventScroll: true });
    if (mobile) tabs.current[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
  };
  return <MotionConfig reducedMotion="user"><section id="capabilities" className="cap-section relative overflow-hidden" aria-labelledby={`${id}-heading`}>
    <div className="cap-main grid">
      <div className="cap-index relative min-w-0">
        <span className="cap-vertical-note" aria-hidden="true">General Construction · Steel · Tensile · Warehouses · Fit-Out</span>
        <motion.p className="cap-eyebrow flex items-center" {...reveal()}><span>03</span><i/><span>Our Services</span></motion.p>
        <h2 id={`${id}-heading`} className="cap-intro-heading">{['One team.', 'Multiple disciplines.', 'One standard', 'of execution.'].map((line,i) => <motion.span key={line} className={i===2 ? 'cap-accent' : ''} {...reveal(.05+i*.05)}>{line}</motion.span>)}</h2>
        <motion.p className="cap-intro-copy" {...reveal(.18)}>From general construction and structural steel to architectural tensile structures, pre-engineered warehouses and turnkey fit-outs, AJJAYER delivers end-to-end engineering excellence across the UAE.</motion.p>
        <div className="cap-tabs" role="tablist" aria-label="Choose a service" aria-orientation={mobile ? 'horizontal' : 'vertical'}>{capabilities.map((item,i) => <motion.button key={item.id} ref={el => { tabs.current[i]=el; }} id={`${id}-tab-${item.id}`} type="button" role="tab" aria-selected={activeId===item.id} aria-controls={`${id}-panel`} tabIndex={activeId===item.id ? 0 : -1} className={`cap-tab ${activeId===item.id ? 'is-active' : ''}`} onClick={() => setActiveId(item.id)} onKeyDown={event => switchTab(event,i)} {...reveal(.15+i*.04)}>
          {activeId===item.id && <motion.span className="cap-active-indicator" layoutId={`${id}-active`} transition={{duration:reduced ? 0 : .35, ease:'easeOut'}}/>}
          <span className="cap-tab-number">{item.id}</span><CapabilityImage image={item.image} className="cap-thumb" decorative thumbMode/><span className="cap-tab-label">{item.label}</span><span className="cap-tab-line" aria-hidden="true"/><ArrowRight size={18} strokeWidth={1.2}/>
        </motion.button>)}</div>
      </div>
      <div id={`${id}-panel`} className="cap-feature relative min-w-0" role="tabpanel" aria-labelledby={`${id}-tab-${activeId}`} tabIndex={0}>
        {mobile && (
          <div className="cap-mobile-nav flex items-center justify-between" aria-label="Service navigation">
            <button
              type="button"
              className="cap-mobile-nav-btn"
              onClick={() => {
                const idx = capabilities.findIndex(item => item.id === activeId);
                const prevIdx = (idx - 1 + capabilities.length) % capabilities.length;
                setActiveId(capabilities[prevIdx].id);
              }}
              aria-label="Previous service"
            >
              <span>‹</span> Previous
            </button>
            <span className="cap-mobile-nav-counter"><b>{active.id}</b> / 06</span>
            <button
              type="button"
              className="cap-mobile-nav-btn"
              onClick={() => {
                const idx = capabilities.findIndex(item => item.id === activeId);
                const nextIdx = (idx + 1) % capabilities.length;
                setActiveId(capabilities[nextIdx].id);
              }}
              aria-label="Next service"
            >
              Next <span>›</span>
            </button>
          </div>
        )}
        <div className="cap-photo-stage absolute inset-0 overflow-hidden"><AnimatePresence initial={false}>{<motion.div key={activeId} className="cap-photo-layer absolute inset-0" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced ? 0 : .5}}><CapabilityImage image={active.image} className="cap-feature-photo"/></motion.div>}</AnimatePresence></div>
        <div className="cap-photo-gradient absolute inset-0" aria-hidden="true"/>
        <AnimatePresence mode="wait" initial={false}><motion.div key={activeId} className="cap-drawing-block" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced ? 0 : .2}}><TechnicalDrawing type={active.drawing}/><div className="cap-drawing-note"><p>{active.detail[0]}</p>{active.detail.slice(1).map(line => <span key={line}>{line}</span>)}</div></motion.div></AnimatePresence>
        <div className="cap-feature-content relative">
          <AnimatePresence mode="wait" initial={false}><motion.div key={activeId} initial={reduced ? false : {opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced ? 0 : -8}} transition={{duration:reduced ? 0 : .22}}>
            <p className="cap-eyebrow flex items-center"><span>{active.id}</span><i/><span>Service</span></p>
            <h3 className="cap-feature-title"><span>{active.title[0]}</span><span className="cap-accent">{active.title[1]}</span></h3>
            <p className="cap-feature-description">{active.description}</p>
            <motion.button type="button" className="cap-explore inline-flex items-center justify-between cursor-default" whileHover={{ y: -2, backgroundColor: '#dca77b' }} whileTap={{ y: 0 }}><span>Explore service</span> <ArrowRight size={18} strokeWidth={1.2}/></motion.button>
            <div className="cap-benefits grid grid-cols-4">{active.benefits.map(([Icon,line1,line2],i) => <motion.div key={line1+line2} {...reveal(i*.05)}><Icon size={27} strokeWidth={1}/><p>{line1}<br/>{line2}</p></motion.div>)}</div>
          </motion.div></AnimatePresence>
        </div>
      </div>
    </div>
    <div className="cap-section-footer flex items-center justify-between"><p><span>06</span> Services</p><span className="inline-flex items-center cursor-default"><span className="cap-footer-rule" aria-hidden="true"/>Explore all services <ArrowRight size={16} strokeWidth={1.2}/></span></div>
  </section></MotionConfig>;
}
