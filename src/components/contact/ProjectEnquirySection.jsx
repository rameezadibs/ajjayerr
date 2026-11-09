import React from 'react';
import { ArrowRight } from 'lucide-react';
import ContactForm from './ContactForm';
import { useLanguage } from '../../context/LanguageContext';

const CORE_SERVICES_EN = [
  { id: '01', title: 'General Construction' },
  { id: '02', title: 'Steel Structures & Fabrication' },
  { id: '03', title: 'Tensile Shade Structures' },
  { id: '04', title: 'Car Parking Shades & Pergolas' },
  { id: '05', title: 'Warehouses & Pre-Engineered Buildings' },
  { id: '06', title: 'Fit-Out & Finishing' }
];

const CORE_SERVICES_AR = [
  { id: '01', title: 'المقاولات العامة' },
  { id: '02', title: 'الهياكل الفولاذية والتصنيع' },
  { id: '03', title: 'مظلات الشد المعماري' },
  { id: '04', title: 'مظلات السيارات والبرجولات' },
  { id: '05', title: 'المستودعات والمباني الجاهزة' },
  { id: '06', title: 'التشطيبات والديكور الداخلي' }
];

export default function ProjectEnquirySection() {
  const { isRTL } = useLanguage();
  const servicesList = isRTL ? CORE_SERVICES_AR : CORE_SERVICES_EN;

  return (
    <section className="project-enquiry-section" aria-labelledby="enquiry-heading">
      <div className="contact-container">
        <div className="project-enquiry-grid">
          {/* Left Column (40%): Project Guidance + Shortcuts */}
          <div className="enquiry-left-panel">
            <span className="enquiry-panel-label">
              {isRTL ? '02 — ابدأ محادثتك معنا' : '02 — START A CONVERSATION'}
            </span>

            <h2 id="enquiry-heading" className="enquiry-panel-h2">
              {isRTL ? (
                <>
                  شاركنا رؤيتك<br />
                  وما تخطط<br />
                  <span className="enquiry-h2-highlight">لبنائه وتشييده.</span>
                </>
              ) : (
                <>
                  TELL US<br />
                  WHAT YOU'RE<br />
                  <span className="enquiry-h2-highlight">BUILDING.</span>
                </>
              )}
            </h2>

            <p className="enquiry-panel-copy">
              {isRTL
                ? 'شاركنا تفاصيل ومتطلبات مشروعك وسيقوم فريقنا بربطك مباشرة بالمهندس المتخصص من شركة الجيّر.'
                : 'Share your project requirements and our team will connect you with the right AJJAYER specialist.'}
            </p>

            {/* Direct Contact Actions: Thin horizontal rows with bronze arrows */}
            <div className="enquiry-action-rows" aria-label="Direct contact shortcuts">
              <a href="tel:+971541696975" className="enquiry-action-row">
                <span>{isRTL ? 'اتصل بنا مباشرة' : 'CALL US'}</span>
                <span className="action-arrow" aria-hidden="true" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}>→</span>
              </a>

              <a href="mailto:sales@ajjayer.com" className="enquiry-action-row">
                <span>{isRTL ? 'راسلنا عبر البريد' : 'EMAIL US'}</span>
                <span className="action-arrow" aria-hidden="true" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}>→</span>
              </a>

              <a
                href="https://wa.me/971541696975"
                target="_blank"
                rel="noopener noreferrer"
                className="enquiry-action-row"
              >
                <span>{isRTL ? 'محادثة عبر واتساب' : 'WHATSAPP'}</span>
                <span className="action-arrow" aria-hidden="true" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}>→</span>
              </a>
            </div>

            {/* Service Scope Shortcuts List */}
            <div className="enquiry-services-block">
              <div className="enquiry-services-title">
                {isRTL ? 'كيف يمكننا مساعدتك؟' : 'WHAT CAN WE HELP WITH?'}
              </div>

              <div className="enquiry-services-grid">
                {servicesList.map((srv) => (
                  <div key={srv.id} className="enquiry-service-item">
                    <span className="enquiry-service-num" dir="ltr">{srv.id}</span>
                    <span>{srv.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (60%): Architectural Project Enquiry Form */}
          <div className="enquiry-right-panel">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
