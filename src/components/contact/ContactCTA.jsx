import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ContactCTA() {
  const { isRTL } = useLanguage();

  const handleScrollToForm = (e) => {
    e.preventDefault();
    const formEl = document.getElementById('enquiry-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Give focus to the first input for convenience
      const firstInput = formEl.querySelector('input');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 600);
      }
    }
  };

  return (
    <section className="contact-final-cta-section" aria-labelledby="cta-heading">
      <div className="contact-container">
        <div className="contact-final-cta-card">
          <span className="final-cta-label">
            {isRTL ? 'ابدأ بثقة وريادة هندسية' : 'START SOMETHING STRONG'}
          </span>

          <h2 id="cta-heading" className="final-cta-h2">
            {isRTL ? (
              <>
                مشروعك القادم<br />
                يبدأ بحوار هندسي<br />
                <span className="final-cta-highlight">هادف ومثمر.</span>
              </>
            ) : (
              <>
                YOUR NEXT PROJECT<br />
                STARTS WITH A<br />
                <span className="final-cta-highlight">CONVERSATION.</span>
              </>
            )}
          </h2>

          <p className="final-cta-copy">
            {isRTL
              ? 'تواصل مع فريق شركة الجيّر ودعنا نناقش كيفية تحويل متطلبات مشروعك من الفكرة المعمارية إلى التنفيذ الميداني المتقن.'
              : 'Connect with AJJAYER and let’s discuss how we can bring your requirements from concept to execution.'}
          </p>

          <a
            href="#enquiry-form"
            onClick={handleScrollToForm}
            className="final-cta-btn"
          >
            <span>{isRTL ? 'إرسال استفسار المشروع' : 'START AN ENQUIRY'}</span>
            <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
