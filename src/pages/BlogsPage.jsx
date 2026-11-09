import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  ArrowRight, 
  Calendar, 
  Clock, 
  BookOpen, 
  Phone, 
  Mail, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { 
  blogsHubData, 
  blogCategories, 
  blogPosts, 
  popularGuides, 
  getLocalizedPost, 
  getLocalizedGuide 
} from '../data/blogsData';
import { servicesData } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';
import './BlogsPage.css';

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

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { t, isRTL, getLocalizedService } = useLanguage();

  const breadcrumbsList = [
    { name: isRTL ? 'الرئيسية' : 'Home', url: '/' },
    { name: isRTL ? 'المقالات والأبحاث' : 'Insights', url: '/blogs' }
  ];

  // Live filter articles based on search query & selected category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((rawPost) => {
      const post = getLocalizedPost(rawPost, isRTL);
      // Category match
      const matchesCategory =
        selectedCategory === 'All' ||
        rawPost.category === selectedCategory ||
        rawPost.secondaryCategory === selectedCategory;

      if (!matchesCategory) return false;

      // Search query match
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = post.title.toLowerCase().includes(q) || rawPost.title.toLowerCase().includes(q);
      const excerptMatch = post.excerpt.toLowerCase().includes(q) || rawPost.excerpt.toLowerCase().includes(q);
      const categoryMatch = rawPost.category.toLowerCase().includes(q) || (categoryLabelsAr[rawPost.category] || '').toLowerCase().includes(q);
      const tagsMatch = rawPost.tags && rawPost.tags.some((t) => t.toLowerCase().includes(q));
      const keywordsMatch = rawPost.keywords && rawPost.keywords.some((k) => k.toLowerCase().includes(q));

      return titleMatch || excerptMatch || categoryMatch || tagsMatch || keywordsMatch;
    });
  }, [searchQuery, selectedCategory, isRTL]);

  // Dedicated single featured article
  const featuredPost = useMemo(() => {
    const rawFeatured = blogPosts.find((p) => p.featured) || blogPosts[0];
    return getLocalizedPost(rawFeatured, isRTL);
  }, [isRTL]);

  // Calculate article counts per category
  const categoryCounts = useMemo(() => {
    const counts = { All: blogPosts.length };
    blogCategories.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = blogPosts.filter(
          (p) => p.category === cat || p.secondaryCategory === cat
        ).length;
      }
    });
    return counts;
  }, []);

  // JSON-LD CollectionPage & Blog Schema for Google Search
  const blogCollectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': blogsHubData.h1,
    'description': blogsHubData.metaDescription,
    'url': blogsHubData.canonical,
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'AJJAYER Constructions Contracting LLC',
      'url': 'https://ajjayer.ae/'
    },
    'about': {
      '@type': 'Thing',
      'name': 'UAE Construction & Engineering Knowledge'
    },
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': blogPosts.map((post, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'BlogPosting',
          'headline': post.title,
          'description': post.excerpt,
          'url': `https://www.ajjayer.com/blogs/${post.slug}`,
          'datePublished': '2026-10-01',
          'author': {
            '@type': 'Organization',
            'name': post.author
          },
          'image': `https://ajjayer.ae${post.image}`
        }
      }))
    }
  };

  return (
    <div className="blogs-hub-page" itemScope itemType="https://schema.org/CollectionPage">
      {/* Route-Level SEO Metadata */}
      <SEOHead
        title={isRTL ? 'أبحاث ومقالات الهندسة والمقاولات في دبي | شركة الجيّر' : blogsHubData.seoTitle}
        description={isRTL ? 'استكشف أحدث المقالات والأدلة الفنية في المقاولات العامة وتصنيع الهياكل الفولاذية والمستودعات ومظلات الشد المعماري في دبي والإمارات.' : blogsHubData.metaDescription}
        canonicalUrl={blogsHubData.canonical}
        ogImage={blogsHubData.ogImage}
        breadcrumbs={breadcrumbsList}
      />

      {/* Structured Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionSchema) }}
      />

      {/* ====================================================================
          1. HERO / SEO INTRO
         ==================================================================== */}
      <section className="blogs-hero-section" aria-labelledby="blogs-h1-heading">
        <div className="blogs-hero-grid" aria-hidden="true" />
        <div className="blogs-container">
          <Breadcrumbs items={breadcrumbsList} />

          <div className="blogs-hero-content">
            <motion.div 
              className="blogs-hero-label-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="blogs-hero-crosshair" aria-hidden="true">+</span>
              <span className="blogs-hero-line" aria-hidden="true" />
              <span>{t('blogsHub.heroLabel')}</span>
            </motion.div>

            <motion.h1
              id="blogs-h1-heading"
              className="blogs-hero-h1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              {isRTL ? (
                <>
                  رؤى المقاولات والهندسة والتصنيع الإنشائي{' '}
                  <span className="blogs-h1-highlight">في الإمارات</span>
                </>
              ) : (
                <>
                  Construction, Engineering &amp; Fabrication{' '}
                  <span className="blogs-h1-highlight">Insights</span>
                </>
              )}
            </motion.h1>

            <motion.p
              className="blogs-hero-intro"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
            >
              {t('blogsHub.heroIntro')}
            </motion.p>

            <motion.div 
              className="blogs-hero-meta-strip"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.24 }}
            >
              <span className="blogs-hero-meta-item">
                <span>{isRTL ? 'الموقع: دبي، الإمارات العربية المتحدة' : 'LOCATION: DUBAI, UAE'}</span>
              </span>
              <span className="blogs-hero-meta-item">
                <span>{isRTL ? 'المراجعة الفنية: المكتب الهندسي لشركة الجيّر' : 'EDITORIAL REVIEW: AJJAYER TECHNICAL DESK'}</span>
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. SEARCH & 3. CATEGORY NAVIGATION
         ==================================================================== */}
      <div className="blogs-filter-bar">
        <div className="blogs-container">
          {/* Search Bar */}
          <div className="blogs-search-wrapper">
            <Search size={18} className="blogs-search-icon" aria-hidden="true" />
            <input
              type="text"
              className="blogs-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('blogsHub.searchPlaceholder')}
              aria-label={t('blogsHub.searchPlaceholder')}
            />
            {searchQuery && (
              <button
                type="button"
                className="blogs-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label={isRTL ? 'مسح البحث' : 'Clear search query'}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <nav className="blogs-categories-nav" aria-label="Article categories">
            {blogCategories.map((category) => {
              const isActive = selectedCategory === category;
              const count = categoryCounts[category] || 0;
              const label = isRTL ? (categoryLabelsAr[category] || category) : category;

              return (
                <button
                  key={category}
                  type="button"
                  className={`blogs-category-tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isActive}
                >
                  <span>{label}</span>
                  <span className="category-tab-count" dir="ltr">({count})</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ====================================================================
          4. FEATURED ARTICLE (ONE PROMINENT ARTICLE)
         ==================================================================== */}
      {selectedCategory === 'All' && !searchQuery.trim() && (
        <section className="blogs-featured-section" aria-labelledby="featured-article-heading">
          <div className="blogs-container">
            <article className="blogs-featured-card">
              <div className="blogs-featured-visual">
                <Link to={`/blogs/${featuredPost.slug}`} tabIndex={-1} aria-hidden="true">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.imageAlt}
                    width={featuredPost.imageWidth}
                    height={featuredPost.imageHeight}
                    fetchPriority="high"
                    decoding="async"
                    className="blogs-featured-img"
                  />
                  <div className="blogs-featured-overlay" />
                  <span className="blogs-featured-tag-badge">{t('blogsHub.featuredBadge')}</span>
                </Link>
              </div>

              <div className="blogs-featured-content">
                <div className="blogs-featured-kicker">
                  <span>{isRTL ? (categoryLabelsAr[featuredPost.category] || featuredPost.category) : featuredPost.category}</span>
                  <span aria-hidden="true">•</span>
                  <span>{isRTL ? 'الأرشيف الفني' : 'TECHNICAL ARCHIVE'}</span>
                </div>

                <h2 id="featured-article-heading" className="blogs-featured-h2">
                  <Link to={`/blogs/${featuredPost.slug}`}>
                    {featuredPost.featuredTitle || featuredPost.title}
                  </Link>
                </h2>

                <p className="blogs-featured-excerpt">
                  {featuredPost.excerpt}
                </p>

                <div className="blogs-featured-meta">
                  <span>
                    <Calendar size={13} aria-hidden="true" />
                    <span>{featuredPost.displayDate}</span>
                  </span>
                  <span>
                    <Clock size={13} aria-hidden="true" />
                    <span>{featuredPost.readTime}</span>
                  </span>
                </div>

                <Link to={`/blogs/${featuredPost.slug}`} className="blogs-read-cta">
                  <span>{t('blogsHub.readArticle')}</span>
                  <ArrowRight size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                </Link>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* ====================================================================
          5. LATEST ARTICLES SECTION (3-COL GRID)
         ==================================================================== */}
      <section className="blogs-latest-section" aria-labelledby="latest-insights-heading">
        <div className="blogs-container">
          <div className="blogs-section-header">
            <div className="blogs-section-tag">
              <span className="blogs-section-tag-line" aria-hidden="true" />
              <span>{t('blogsHub.latestTag')}</span>
            </div>
            <h2 id="latest-insights-heading" className="blogs-section-h2">
              {t('blogsHub.latestTitle')}
            </h2>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="blogs-grid">
              {filteredPosts.map((rawPost) => {
                const post = getLocalizedPost(rawPost, isRTL);
                return (
                  <article key={post.id} className="blog-card">
                    <div className="blog-card-visual">
                      <Link to={`/blogs/${post.slug}`} tabIndex={-1} aria-hidden="true">
                        <img
                          src={post.image}
                          alt={post.imageAlt}
                          width={post.imageWidth}
                          height={post.imageHeight}
                          loading="lazy"
                          decoding="async"
                          className="blog-card-img"
                        />
                      </Link>
                    </div>

                    <div className="blog-card-body">
                      <span className="blog-card-category">
                        {isRTL ? (categoryLabelsAr[post.category] || post.category) : post.category}
                      </span>
                      <h3 className="blog-card-title">
                        <Link to={`/blogs/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="blog-card-excerpt">
                        {post.excerpt}
                      </p>

                      <div className="blog-card-footer">
                        <span>{post.date}</span>
                        <Link to={`/blogs/${post.slug}`} className="blog-card-cta">
                          <span>{t('blogsHub.readArticle')}</span>
                          <ArrowRight size={14} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="blogs-empty-state">
              <h3 className="blogs-empty-title">
                {isRTL ? 'لم يتم العثور على مقالات' : 'No Articles Found'}
              </h3>
              <p className="blogs-empty-copy">
                {isRTL
                  ? `لم نتمكن من العثور على أي مقالات تطابق بحثك "${searchQuery}".`
                  : `We couldn't find any articles matching your search query “${searchQuery}”.`}
              </p>
              <button
                type="button"
                className="blogs-reset-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                {isRTL ? 'إعادة ضبط التصفية' : 'Reset Filters'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ====================================================================
          6. HIGH-INTENT GUIDES SECTION (EDITORIAL 2-COLUMN LIST)
         ==================================================================== */}
      <section className="blogs-guides-section" aria-labelledby="popular-guides-heading">
        <div className="blogs-container">
          <div className="blogs-section-header">
            <div className="blogs-section-tag">
              <span className="blogs-section-tag-line" aria-hidden="true" />
              <span>{t('blogsHub.popularTag')}</span>
            </div>
            <h2 id="popular-guides-heading" className="blogs-section-h2">
              {t('blogsHub.popularTitle')}
            </h2>
          </div>

          <div className="blogs-guides-grid">
            {popularGuides.map((rawGuide, idx) => {
              const guide = getLocalizedGuide(rawGuide, isRTL);
              return (
                <article key={idx} className="guide-item-card">
                  <div>
                    <div className="guide-header">
                      <span className="guide-category">
                        {isRTL ? (categoryLabelsAr[guide.category] || guide.category) : guide.category}
                      </span>
                      <span className="guide-badge" dir={isRTL ? "rtl" : "ltr"}>
                        {isRTL ? `دليل 0${idx + 1}` : `G-0${idx + 1}`}
                      </span>
                    </div>
                    <h3 className="guide-title">{guide.topic}</h3>
                    <p className="guide-desc">{guide.description}</p>
                  </div>
                  <Link to={`/blogs/${guide.slug}`} className="guide-link">
                    <span>{guide.anchorText}</span>
                    <ArrowRight size={14} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. SERVICE INTERNAL LINKING SECTION
         ==================================================================== */}
      <section className="blogs-services-linking-section" aria-labelledby="capabilities-linking-heading">
        <div className="blogs-container">
          <div className="blogs-section-header">
            <div className="blogs-section-tag">
              <span className="blogs-section-tag-line" aria-hidden="true" />
              <span>{t('blogsHub.couplingTag')}</span>
            </div>
            <h2 id="capabilities-linking-heading" className="blogs-section-h2">
              {t('blogsHub.couplingTitle')}
            </h2>
          </div>

          <div className="services-linking-grid">
            {servicesData.map((rawService) => {
              const service = getLocalizedService(rawService);
              return (
                <Link
                  key={service.id}
                  to={service.path}
                  className="service-linking-card"
                >
                  <div>
                    <span className="service-linking-num" dir={isRTL ? "rtl" : "ltr"}>
                      {isRTL ? `تخصص ${service.id}` : `${service.id} / DISCIPLINE`}
                    </span>
                    <h3 className="service-linking-title">{service.title}</h3>
                    <p className="service-linking-copy">{service.descriptor}</p>
                  </div>
                  <div className="service-linking-arrow">
                    <span>{t('blogsHub.exploreService')}</span>
                    <ArrowRight size={14} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. FINAL CTA (PROJECT CONSULTATION)
         ==================================================================== */}
      <section id="project-consultation" className="blogs-cta-section" aria-labelledby="cta-heading">
        <div className="blogs-container">
          <div className="blogs-cta-card">
            <div>
              <span className="blogs-cta-eyebrow">{t('blogsHub.ctaEyebrow')}</span>
              <h2 id="cta-heading" className="blogs-cta-h2">
                {t('blogsHub.ctaH2')}
              </h2>
              <p className="blogs-cta-copy">
                {t('blogsHub.ctaCopy')}
              </p>
              <div className="blogs-cta-actions">
                <a href="tel:+971541696975" className="blogs-cta-btn-primary">
                  <Phone size={15} />
                  <span>{t('blogsHub.ctaBtn')}</span>
                  <ArrowRight size={14} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                </a>
                <a href="mailto:projects@ajjayer.ae" className="blogs-cta-btn-secondary">
                  <Mail size={15} />
                  <span dir="ltr">projects@ajjayer.ae</span>
                </a>
              </div>
            </div>

            <div className="blogs-cta-contact-box">
              <div className="blogs-cta-row">
                <span className="blogs-cta-label">
                  {isRTL ? 'الاتصال الهندسي المباشر' : 'Direct Engineering Desk'}
                </span>
                <span className="blogs-cta-val" dir="ltr">+971 54 169 6975</span>
              </div>
              <div className="blogs-cta-row">
                <span className="blogs-cta-label">
                  {isRTL ? 'موقع المكتب' : 'Office Location'}
                </span>
                <span className="blogs-cta-val">
                  {isRTL ? 'داون تاون والخليج التجاري، دبي، الإمارات' : 'Downtown & Business Bay, Dubai, UAE'}
                </span>
              </div>
              <div className="blogs-cta-row">
                <span className="blogs-cta-label">
                  {isRTL ? 'النطاق الهندسي والتنفيذي' : 'Technical Scope'}
                </span>
                <span className="blogs-cta-val">
                  {isRTL ? 'المقاولات، الفولاذ، المستودعات، المظلات والتشطيبات' : 'Commercial, Steel, PEB, Shading & Turnkey Fit-Out'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
