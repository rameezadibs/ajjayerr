import { chromium } from '@playwright/test';

const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', err => errors.push(err.message));

await page.goto('http://127.0.0.1:5173/about');
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1000);

const seoReport = await page.evaluate(() => {
  const title = document.title;
  const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
  const metaKeywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content');
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
  const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
  const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
  const ogUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content');
  const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
  const jsonLd = document.getElementById('about-schema-ld')?.textContent;

  const h1Elements = [...document.querySelectorAll('h1')].map(h => h.textContent.trim().replace(/\s+/g, ' '));
  const h2Elements = [...document.querySelectorAll('h2')].map(h => h.textContent.trim().replace(/\s+/g, ' '));
  const h3Elements = [...document.querySelectorAll('h3')].map(h => h.textContent.trim().replace(/\s+/g, ' '));

  const mainItemType = document.querySelector('main')?.getAttribute('itemtype');
  const ctaItemType = document.querySelector('#contact')?.getAttribute('itemtype');
  const ctaKickerNum = document.querySelector('.cta-kicker-num')?.textContent.trim();
  const ctaKickerTitle = document.querySelector('.cta-kicker-title')?.textContent.trim();
  const ctaLocationTag = document.querySelector('.cta-location-tag')?.textContent.trim();
  const ctaHeadline = document.querySelector('#cta-heading')?.textContent.trim().replace(/\s+/g, ' ');

  const hasPeoplePlaces = document.body.innerText.includes('PEOPLE.\nPLACES.\nPROGRESS.\nTOGETHER.');
  const hasBuiltByPeople = document.body.innerText.includes('BUILT\nBY PEOPLE.');

  return {
    title,
    metaDesc,
    metaKeywords,
    canonical,
    ogTitle,
    ogDesc,
    ogUrl,
    ogImage,
    hasValidJsonLd: Boolean(jsonLd && JSON.parse(jsonLd)),
    h1Elements,
    h2Elements,
    h3Count: h3Elements.length,
    mainItemType,
    ctaItemType,
    ctaKickerNum,
    ctaKickerTitle,
    ctaLocationTag,
    ctaHeadline,
    hasPeoplePlaces,
    hasBuiltByPeople,
  };
});

console.log('SEO Audit Results:', JSON.stringify(seoReport, null, 2));

if (errors.length) throw new Error(errors.join('\n'));
if (seoReport.h1Elements.length !== 1) throw new Error('More than one H1 found on about page!');
if (seoReport.hasPeoplePlaces) throw new Error('PEOPLE. PLACES. PROGRESS. TOGETHER. still present!');
if (seoReport.hasBuiltByPeople) throw new Error('BUILT BY PEOPLE text still present!');
if (!seoReport.hasValidJsonLd) throw new Error('Invalid or missing Schema.org JSON-LD!');

await browser.close();
console.log('All SEO and structured data checks PASSED cleanly!');
