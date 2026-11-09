import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const SERVICE_OPTIONS_EN = [
  'General Construction',
  'Steel Structures & Fabrication',
  'Tensile Shade Structures',
  'Car Parking Shades & Pergolas',
  'Warehouses & Pre-Engineered Buildings',
  'Fit-Out & Finishing',
  'Other'
];

const SERVICE_OPTIONS_AR = [
  'المقاولات العامة',
  'الهياكل الفولاذية والتصنيع',
  'مظلات الشد المعماري',
  'مظلات السيارات والبرجولات',
  'المستودعات والمباني الجاهزة',
  'التشطيبات والديكور الداخلي',
  'أخرى'
];

export default function ContactForm() {
  const { isRTL } = useLanguage();
  const serviceOptions = isRTL ? SERVICE_OPTIONS_AR : SERVICE_OPTIONS_EN;

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    serviceRequired: '',
    projectLocation: '',
    projectType: '',
    projectDetails: '',
    honeypot: '' // Spam protection trap
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [serverMessage, setServerMessage] = useState('');

  // Handle field updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = isRTL ? 'يرجى إدخال الاسم الكامل.' : 'Full Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = isRTL ? 'يرجى إدخال البريد الإلكتروني.' : 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = isRTL ? 'يرجى إدخال بريد إلكتروني صالح.' : 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = isRTL ? 'يرجى إدخال رقم الهاتف.' : 'Phone number is required.';
    }

    if (!formData.serviceRequired) {
      newErrors.serviceRequired = isRTL ? 'يرجى اختيار التخصص الهندسي المطلوب.' : 'Please select a service.';
    }

    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = isRTL ? 'يرجى تزويدنا بتفاصيل المشروع.' : 'Please provide details about your project.';
    } else if (formData.projectDetails.trim().length < 5) {
      newErrors.projectDetails = isRTL ? 'يجب أن تحتوي تفاصيل المشروع على 5 أحرف على الأقل.' : 'Project details must be at least 5 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('loading');
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus('success');
        setServerMessage(
          data.message || (isRTL ? 'شكراً لكم، تم استلام استفسار مشروعكم بنجاح.' : 'THANK YOU. YOUR ENQUIRY HAS BEEN RECEIVED.')
        );
      } else {
        setStatus('error');
        setServerMessage(
          data.error || (isRTL ? 'تعذر إرسال الاستفسار حالياً. يرجى المحاولة لاحقاً أو الاتصال بنا مباشرة.' : "We couldn't send your enquiry. Please try again or contact us directly.")
        );
      }
    } catch (err) {
      console.error('[ContactForm Submit Error]:', err);
      setStatus('error');
      setServerMessage(
        isRTL ? 'تعذر إرسال الاستفسار حالياً. يرجى المحاولة لاحقاً أو الاتصال بنا مباشرة.' : "We couldn't send your enquiry. Please try again or contact us directly."
      );
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      company: '',
      email: '',
      phone: '',
      serviceRequired: '',
      projectLocation: '',
      projectType: '',
      projectDetails: '',
      honeypot: ''
    });
    setErrors({});
    setStatus('idle');
    setServerMessage('');
  };

  return (
    <div id="enquiry-form" className="enquiry-form-container">
      {status === 'success' ? (
        <div className="form-feedback-panel is-success" role="alert">
          <CheckCircle2 size={44} color="#ca9468" />
          <h3 className="form-feedback-title">
            {serverMessage || (isRTL ? 'شكراً لكم، تم استلام استفسار مشروعكم بنجاح.' : 'THANK YOU. YOUR ENQUIRY HAS BEEN RECEIVED.')}
          </h3>
          <p className="form-feedback-text">
            {isRTL
              ? 'سيقوم فريقنا الهندسي بدراسة متطلبات المشروع والتواصل معكم في أقرب وقت.'
              : 'Our engineering team will review your project requirements and connect with you shortly.'}
          </p>
          <button
            type="button"
            className="form-feedback-reset-btn"
            onClick={handleReset}
          >
            {isRTL ? 'إرسال استفسار آخر' : 'Submit Another Enquiry'}
          </button>
        </div>
      ) : status === 'error' ? (
        <div className="form-feedback-panel is-error" role="alert">
          <AlertCircle size={44} color="#e06c75" />
          <h3 className="form-feedback-title">
            {isRTL ? 'خطأ في الإرسال' : 'Submission Error'}
          </h3>
          <p className="form-feedback-text">{serverMessage}</p>
          <button
            type="button"
            className="form-feedback-reset-btn"
            onClick={() => setStatus('idle')}
          >
            {isRTL ? 'مراجعة النموذج والمحاولة مجدداً' : 'Review Form & Try Again'}
          </button>
        </div>
      ) : (
        <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
          {/* Honeypot Spam Protection Field (Hidden from real users) */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="form-honeypot">Leave this blank</label>
            <input
              id="form-honeypot"
              type="text"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={handleChange}
            />
          </div>

          {/* Row 1: Full Name & Company */}
          <div className="form-row-2col">
            <div className={`form-group ${errors.fullName ? 'has-error' : ''}`}>
              <label htmlFor="contact-fullName" className="form-label">
                {isRTL ? 'الاسم الكامل' : 'Full Name'} <span className="form-label-req">*</span>
              </label>
              <input
                id="contact-fullName"
                type="text"
                name="fullName"
                className="form-input"
                placeholder={isRTL ? 'مثال: طارق المنصوري' : 'e.g. Tariq Al Mansoori'}
                value={formData.fullName}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'err-fullName' : undefined}
                disabled={status === 'loading'}
              />
              {errors.fullName && (
                <span id="err-fullName" className="form-error-msg">
                  {errors.fullName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="contact-company" className="form-label">
                {isRTL ? 'الشركة / المؤسسة' : 'Company / Organisation'}
              </label>
              <input
                id="contact-company"
                type="text"
                name="company"
                className="form-input"
                placeholder={isRTL ? 'مثال: شركة التطوير العقاري' : 'e.g. Apex Developments LLC'}
                value={formData.company}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
            </div>
          </div>

          {/* Row 2: Email & Phone */}
          <div className="form-row-2col">
            <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="contact-email" className="form-label">
                {isRTL ? 'البريد الإلكتروني' : 'Email Address'} <span className="form-label-req">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                className="form-input"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'err-email' : undefined}
                disabled={status === 'loading'}
                dir="ltr"
              />
              {errors.email && (
                <span id="err-email" className="form-error-msg">
                  {errors.email}
                </span>
              )}
            </div>

            <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
              <label htmlFor="contact-phone" className="form-label">
                {isRTL ? 'رقم الهاتف المباشر' : 'Phone Number'} <span className="form-label-req">*</span>
              </label>
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                className="form-input"
                placeholder="+971 50 000 0000"
                value={formData.phone}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'err-phone' : undefined}
                disabled={status === 'loading'}
                dir="ltr"
              />
              {errors.phone && (
                <span id="err-phone" className="form-error-msg">
                  {errors.phone}
                </span>
              )}
            </div>
          </div>

          {/* Row 3: Service Required & Project Location */}
          <div className="form-row-2col">
            <div className={`form-group ${errors.serviceRequired ? 'has-error' : ''}`}>
              <label htmlFor="contact-service" className="form-label">
                {isRTL ? 'التخصص الهندسي المطلوب' : 'Service Required'} <span className="form-label-req">*</span>
              </label>
              <select
                id="contact-service"
                name="serviceRequired"
                className="form-select"
                value={formData.serviceRequired}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={Boolean(errors.serviceRequired)}
                aria-describedby={errors.serviceRequired ? 'err-service' : undefined}
                disabled={status === 'loading'}
              >
                <option value="">
                  {isRTL ? 'اختر التخصص الهندسي المطلوب...' : 'Select an engineering discipline...'}
                </option>
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.serviceRequired && (
                <span id="err-service" className="form-error-msg">
                  {errors.serviceRequired}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="contact-location" className="form-label">
                {isRTL ? 'موقع المشروع' : 'Project Location'}
              </label>
              <input
                id="contact-location"
                type="text"
                name="projectLocation"
                className="form-input"
                placeholder={isRTL ? 'مثال: دبي الجنوب / الخليج التجاري' : 'e.g. Dubai South / Business Bay'}
                value={formData.projectLocation}
                onChange={handleChange}
                disabled={status === 'loading'}
              />
            </div>
          </div>

          {/* Row 4: Project Type */}
          <div className="form-group">
            <label htmlFor="contact-type" className="form-label">
              {isRTL ? 'نوع المشروع (اختياري)' : 'Project Type (Optional)'}
            </label>
            <input
              id="contact-type"
              type="text"
              name="projectType"
              className="form-input"
              placeholder={isRTL ? 'مثال: مستودع صناعي / مظلات تجارية / تشطيب مكاتب' : 'e.g. Industrial Warehouse / Commercial Canopy / Corporate Fit-Out'}
              value={formData.projectType}
              onChange={handleChange}
              disabled={status === 'loading'}
            />
          </div>

          {/* Row 5: Project Details */}
          <div className={`form-group ${errors.projectDetails ? 'has-error' : ''}`}>
            <label htmlFor="contact-details" className="form-label">
              {isRTL ? 'تفاصيل ومتطلبات المشروع' : 'Project Details'} <span className="form-label-req">*</span>
            </label>
            <textarea
              id="contact-details"
              name="projectDetails"
              className="form-textarea"
              placeholder={isRTL ? 'أخبرنا عن متطلبات المشروع، المساحة، الجدول الزمني والمواصفات...' : 'Tell us about your project, scope, timeline or requirements...'}
              value={formData.projectDetails}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={Boolean(errors.projectDetails)}
              aria-describedby={errors.projectDetails ? 'err-details' : undefined}
              disabled={status === 'loading'}
            />
            {errors.projectDetails && (
              <span id="err-details" className="form-error-msg">
                {errors.projectDetails}
              </span>
            )}
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="enquiry-submit-btn"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>{isRTL ? 'جاري إرسال الاستفسار...' : 'SENDING ENQUIRY...'}</span>
              </>
            ) : (
              <>
                <span>{isRTL ? 'إرسال استفسار المشروع' : 'SUBMIT PROJECT ENQUIRY'}</span>
                <ArrowRight size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
