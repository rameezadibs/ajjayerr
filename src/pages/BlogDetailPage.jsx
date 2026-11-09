import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Compass, 
  Share2 
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { getPostBySlug, getRelatedPosts, blogsHubData, getLocalizedPost } from '../data/blogsData';
import { servicesArabicData } from '../locales/translations';
import { useLanguage } from '../context/LanguageContext';
import './BlogDetailPage.css';

const categoryLabelsAr = {
  'All': 'الكل',
  'General Construction': 'المقاولات العامة',
  'Steel Structures & Fabrication': 'الهياكل الفولاذية والتصنيع',
  'Tensile Shade Structures': 'مظلات الشد المعماري',
  'Parking Shades & Pergolas': 'مظلات السيارات والبرجولات',
  'Warehouses & PEB': 'المستودعات والمباني الجاهزة',
  'Fit-Out & Finishing': 'التشطيبات والديكور الداخلي',
  'Engineering Insights': 'رؤى وتحليلات هندسية',
  'UAE Construction Guides': 'أدلة البناء في الإمارات',
  'Regulatory & Compliance': 'اللوائح والتراخيص',
};

export default function BlogDetailPage() {
  const { slug } = useParams();
  const rawPost = getPostBySlug(slug);
  const { isRTL } = useLanguage();
  const post = getLocalizedPost(rawPost, isRTL);

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 2);

  const breadcrumbsList = [
    { name: isRTL ? 'الرئيسية' : 'Home', url: '/' },
    { name: isRTL ? 'المقالات والأبحاث' : 'Insights', url: '/blogs' },
    { name: post.title, url: `/blogs/${post.slug}` }
  ];

  // Article JSON-LD Schema
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'image': [`https://ajjayer.ae${post.image}`],
    'datePublished': '2026-10-01T08:00:00+04:00',
    'dateModified': '2026-11-18T10:00:00+04:00',
    'author': {
      '@type': 'Organization',
      'name': post.author,
      'url': 'https://ajjayer.ae/'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'AJJAYER Constructions Contracting LLC',
      'url': 'https://ajjayer.ae/',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://ajjayer.ae/assets/reference.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://www.ajjayer.com/blogs/${post.slug}`
    },
    'keywords': post.keywords ? post.keywords.join(', ') : undefined
  };

  return (
    <article className="blog-detail-page" itemScope itemType="https://schema.org/BlogPosting">
      <SEOHead
        title={isRTL ? `${post.title} | أبحاث الجيّر الهندسية` : `${post.title} | AJJAYER Insights`}
        description={post.excerpt}
        canonicalUrl={`https://www.ajjayer.com/blogs/${post.slug}`}
        ogImage={post.image}
        ogType="article"
        breadcrumbs={breadcrumbsList}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      <div className="blog-detail-container">
        <Breadcrumbs items={breadcrumbsList} />

        {/* Article Header */}
        <header className="blog-detail-header">
          <div className="blog-detail-meta-top">
            <span className="blog-detail-category-badge">
              {isRTL ? (categoryLabelsAr[post.category] || post.category) : post.category}
            </span>
            <span aria-hidden="true">•</span>
            <span>{isRTL ? `الأرشيف الفني رقم: ${post.id}` : `TECHNICAL ARCHIVE REF: ${post.id}`}</span>
          </div>

          <h1 className="blog-detail-h1" itemProp="headline">
            {post.title}
          </h1>

          <div className="blog-detail-byline-strip">
            <div className="blog-detail-author-info">
              <div className="blog-detail-author-avatar" aria-hidden="true">
                {isRTL ? 'الجيّر' : 'AJ'}
              </div>
              <div>
                <span itemProp="author" itemScope itemType="https://schema.org/Organization">
                  <span itemProp="name" style={{ fontWeight: 600, color: '#1f1f1d' }}>{post.author}</span>
                </span>
                <div style={{ fontSize: '0.65rem', color: '#887d70' }}>{post.authorRole}</div>
              </div>
            </div>

            <div className="blog-detail-dates-info">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={13} />
                <span>{post.date}</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={13} />
                <span>{post.readTime}</span>
              </span>
            </div>
          </div>
        </header>

        {/* Hero Media */}
        <div className="blog-detail-media-frame">
          <img
            src={post.image}
            alt={post.imageAlt}
            width={post.imageWidth}
            height={post.imageHeight}
            fetchPriority="high"
            decoding="async"
            className="blog-detail-hero-img"
            itemProp="image"
          />
          <div className="blog-detail-caption">
            <span>{isRTL ? `الأرشيف الفني • ${post.imageAlt}` : `TECHNICAL ARCHIVE • ${post.imageAlt}`}</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="blog-detail-body" itemProp="articleBody">
          {/* H2 Introduction */}
          <h2 className="blog-detail-h2">
            {isRTL ? 'المقدمة والنظرة الهندسية الشاملة' : 'Introduction & Operational Overview'}
          </h2>
          <div className="blog-detail-intro-block">
            {post.intro || post.excerpt}
          </div>

          {/* Main Topic Sections with Semantic H2 & H3 */}
          {post.sections && post.sections.map((sec, idx) => (
            <section key={idx}>
              <h2 className="blog-detail-h2">{sec.h2}</h2>
              <p className="blog-detail-p">{sec.p}</p>

              {sec.subsections && sec.subsections.map((sub, subIdx) => (
                <div key={subIdx}>
                  <h3 className="blog-detail-h3">{sub.h3}</h3>
                  <p className="blog-detail-p">{sub.p}</p>
                </div>
              ))}
            </section>
          ))}

          {/* H2 Practical Recommendations */}
          {post.recommendations && (
            <section>
              <h2 className="blog-detail-h2">
                {isRTL ? 'توصيات فنية وعملية للمطورين في الإمارات' : 'Practical Recommendations for UAE Developers'}
              </h2>
              <ul className="blog-recommendations-list">
                {post.recommendations.map((rec, rIdx) => (
                  <li key={rIdx} className="blog-recommendation-item">
                    <CheckCircle2 size={18} className="blog-rec-icon" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* H2 Frequently Asked Questions */}
          {post.faqs && (
            <section>
              <h2 className="blog-detail-h2">
                {isRTL ? 'الأسئلة الأكثر تداولاً' : 'Frequently Asked Questions'}
              </h2>
              <div className="blog-faq-list">
                {post.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="blog-faq-item">
                    <h3 className="blog-faq-q">{faq.q}</h3>
                    <p className="blog-faq-a">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* H2 Related Services (SEO Internal Linking with Natural Anchor Text) */}
          {post.relatedServiceSlug && (
            <section>
              <h2 className="blog-detail-h2">
                {isRTL ? 'الخدمات الهندسية والإسنادية ذات الصلة' : 'Related Engineering & Construction Services'}
              </h2>
              <div className="blog-related-service-box">
                <span className="blog-related-service-kicker">
                  {isRTL ? 'قدرات متكاملة في دولة الإمارات' : 'INTEGRATED UAE CAPABILITY'}
                </span>
                <h3 className="blog-related-service-title">
                  {isRTL ? (servicesArabicData[post.relatedServiceSlug]?.title || post.relatedServiceTitle) : post.relatedServiceTitle}
                </h3>
                <p className="blog-detail-p" style={{ marginBottom: '1.25rem' }}>
                  {isRTL
                    ? 'توفر الجيّر مسؤولية فنية موحدة تشمل التصميم الهندسي، والتراخيص المعتمدة، والتصنيع، والتركيب الميداني في كافة أنحاء الإمارات.'
                    : 'AJJAYER provides single-point technical accountability across design, authority permitting, fabrication, and on-site erection throughout Dubai and the UAE.'}
                </p>
                <Link
                  to={`/services/${post.relatedServiceSlug}`}
                  className="blog-related-service-link"
                >
                  <span>
                    {isRTL
                      ? `استكشف قدرات الجيّر في ${servicesArabicData[post.relatedServiceSlug]?.title || post.relatedServiceTitle} ←`
                      : (post.relatedServiceAnchor || `Explore AJJAYER’s ${post.relatedServiceTitle} capabilities →`)}
                  </span>
                  <ArrowRight size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                </Link>
              </div>
            </section>
          )}

          {/* H2 Related Articles */}
          {relatedPosts.length > 0 && (
            <section>
              <h2 className="blog-detail-h2">
                {isRTL ? 'مقالات ورؤى هندسية ذات صلة' : 'Related Engineering Insights'}
              </h2>
              <div className="blog-detail-related-grid">
                {relatedPosts.map((rawRel) => {
                  const rel = getLocalizedPost(rawRel, isRTL);
                  return (
                    <Link
                      key={rel.id}
                      to={`/blogs/${rel.slug}`}
                      className="blog-detail-related-card"
                    >
                      <img
                        src={rel.image}
                        alt={rel.imageAlt}
                        width={rel.imageWidth}
                        height={rel.imageHeight}
                        loading="lazy"
                        className="blog-detail-related-img"
                      />
                      <div className="blog-detail-related-body">
                        <span className="blog-detail-related-cat">
                          {isRTL ? (categoryLabelsAr[rel.category] || rel.category) : rel.category}
                        </span>
                        <h3 className="blog-detail-related-h3">{rel.title}</h3>
                        <div className="blog-detail-related-cta">
                          <span>{isRTL ? 'قراءة التحليل الفني' : 'READ INSIGHT'}</span>
                          <ArrowRight size={13} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* H2 Discuss Your Project (Final CTA) */}
          <section id="discuss-project">
            <h2 className="blog-detail-h2">
              {isRTL ? 'ناقش مشروعك مع قيادة الهندسة' : 'Discuss Your Project With Our Engineering Team'}
            </h2>
            <div
              className="blog-related-service-box"
              style={{
                background: '#2b251f',
                color: '#f5f5f3',
                borderLeftColor: isRTL ? 'transparent' : '#ca9468',
                borderRightColor: isRTL ? '#ca9468' : 'transparent',
                borderRightWidth: isRTL ? '4px' : '1px'
              }}
            >
              <span className="blog-related-service-kicker" style={{ color: '#ca9468' }}>
                {isRTL ? 'استشارات المشاريع والجدوى الفنية' : 'PROJECT CONSULTATION & FEASIBILITY'}
              </span>
              <h3 className="blog-related-service-title" style={{ color: '#f5f5f3' }}>
                {isRTL ? 'تخطط لمشروع مقاولات أو تصنيع في الإمارات؟' : 'Planning Construction or Fabrication in the UAE?'}
              </h3>
              <p style={{ color: '#b9bec4', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {isRTL
                  ? 'تواصل مع شركة الجيّر لمناقشة أعمال البناء، أو الهياكل الفولاذية، أو مظلات الأشرعة، أو المستودعات سابقة الهندسة، أو التشطيبات الداخلية المتكاملة.'
                  : 'Speak with AJJAYER about construction, structural steel fabrication, tensile shade systems, PEB industrial buildings or turnkey commercial fit-out.'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <a
                  href="tel:+971541696975"
                  className="blogs-cta-btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#a47756', color: '#fff', padding: '0.75rem 1.5rem', textDecoration: 'none', borderRadius: '2px', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em' }}
                >
                  <Phone size={14} />
                  <span>{isRTL ? 'اتصال مباشر: ' : ''}</span>
                  <span dir="ltr">+971 54 169 6975</span>
                </a>
                <a
                  href="mailto:projects@ajjayer.ae"
                  className="blogs-cta-btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', textDecoration: 'none', borderRadius: '2px', fontSize: '0.8rem' }}
                >
                  <Mail size={14} />
                  <span dir="ltr">projects@ajjayer.ae</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
