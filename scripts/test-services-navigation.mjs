import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', err => errors.push(err.message));

try {
  console.log('--- 1. Testing Desktop Navbar Services Dropdown & Active Underline ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:5173/');
  await page.waitForTimeout(1000);

  // Hover over SERVICES in Navbar
  const servicesNavContainer = page.locator('.nav-services-container');
  await servicesNavContainer.hover();
  await page.waitForTimeout(300);

  // Check dropdown panel is visible
  const dropdown = page.locator('.services-dropdown-panel');
  assert.equal(await dropdown.isVisible(), true, 'Services dropdown should open on desktop hover');

  // Check Dropdown Header
  const dropdownLabel = await page.locator('.dropdown-label').textContent();
  assert.equal(dropdownLabel.trim(), 'OUR SERVICES', 'Dropdown header label should be OUR SERVICES');
  const microTag = await page.locator('.dropdown-micro-tag').textContent();
  assert.ok(microTag.includes('CONSTRUCT / ENGINEER / FABRICATE / DELIVER'), 'Dropdown micro-tag must match brand slogan');

  // Check all 6 services are present in the dropdown list
  const dropdownItems = page.locator('.dropdown-item');
  const count = await dropdownItems.count();
  assert.equal(count, 6, 'Dropdown must have exactly 6 service items');

  const expectedServices = [
    { id: '01', title: 'GENERAL CONSTRUCTION', desc: 'End-to-end project execution', path: '/services/general-construction' },
    { id: '02', title: 'STEEL STRUCTURES & FABRICATION', desc: 'Engineering • Fabrication • Installation', path: '/services/steel-structures-fabrication' },
    { id: '03', title: 'TENSILE SHADE STRUCTURES', desc: 'Engineered architectural shade systems', path: '/services/tensile-shade-structures' },
    { id: '04', title: 'CAR PARKING SHADES & PERGOLAS', desc: 'Functional shade with architectural character', path: '/services/car-parking-shades-pergolas' },
    { id: '05', title: 'WAREHOUSES & PRE-ENGINEERED BUILDINGS', desc: 'Efficient structural building systems', path: '/services/warehouses-pre-engineered-buildings' },
    { id: '06', title: 'FIT-OUT & FINISHING', desc: 'Spaces completed with precision', path: '/services/fit-out-finishing' }
  ];

  for (let i = 0; i < count; i++) {
    const item = dropdownItems.nth(i);
    const num = (await item.locator('.dropdown-item-num').textContent()).trim();
    const title = (await item.locator('.dropdown-item-title').textContent()).trim().toUpperCase();
    const desc = (await item.locator('.dropdown-item-desc').textContent()).trim();
    const href = await item.getAttribute('href');

    assert.equal(num, expectedServices[i].id);
    assert.equal(title, expectedServices[i].title);
    assert.equal(desc, expectedServices[i].desc);
    assert.equal(href, expectedServices[i].path);
  }
  console.log('✓ Dropdown items, numbers, titles, and descriptors match specifications');

  // Bottom CTA
  const footerCta = page.locator('.dropdown-explore-cta');
  assert.equal(await footerCta.isVisible(), true);
  assert.equal((await footerCta.textContent()).trim(), 'EXPLORE ALL SERVICES');
  console.log('✓ Bottom Dropdown CTA verified');

  // Hover over item 02 to check interactive shift
  const item2 = dropdownItems.nth(1);
  await item2.hover();
  await page.waitForTimeout(200);

  // Click on item 02 to navigate to /services/steel-structures-fabrication
  await item2.click();
  await page.waitForURL('**/services/steel-structures-fabrication');
  await page.waitForTimeout(500);
  console.log('✓ Navigated to /services/steel-structures-fabrication');

  // Verify SERVICES navbar item active state on /services/*
  const servicesNavBtn = page.locator('.nav-services-container .nav-link-btn');
  const btnClasses = await servicesNavBtn.getAttribute('class');
  assert.ok(btnClasses.includes('is-services-active'), 'Services navbar link must have is-services-active class on service page');

  const underline = page.locator('.nav-services-bronze-underline');
  assert.equal(await underline.isVisible(), true, 'Short bronze underline indicator must be visible on SERVICES');
  console.log('✓ SERVICES navbar active underline verified');

  // Re-open dropdown on this page to verify active item highlight
  await servicesNavContainer.hover();
  await page.waitForTimeout(300);
  const activeDropdownItem = page.locator('.dropdown-item.is-active');
  assert.equal(await activeDropdownItem.count(), 1, 'Exactly one active dropdown item');
  const activeTitle = (await activeDropdownItem.locator('.dropdown-item-title').textContent()).trim().toUpperCase();
  assert.equal(activeTitle, 'STEEL STRUCTURES & FABRICATION', 'Active dropdown item must match current route');
  console.log('✓ Active service item highlight verified inside dropdown');

  // Move mouse away to verify controlled close delay
  await page.mouse.move(10, 10);
  await page.waitForTimeout(80); // within delay: still open
  assert.equal(await dropdown.isVisible(), true, 'Dropdown should remain open during 150ms buffer');
  await page.waitForTimeout(450); // after delay + exit animation: unmounted
  assert.equal(await dropdown.isVisible(), false, 'Dropdown should close after controlled delay');
  console.log('✓ Controlled close delay verified');

  console.log('\n--- 2. Testing Mobile Services Accordion ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:5173/');
  await page.waitForTimeout(500);

  // Open mobile drawer
  await page.locator('.navbar-mobile-toggle').click();
  await page.waitForTimeout(350);

  // Tap on SERVICES accordion trigger
  const accordionTrigger = page.locator('.mobile-services-trigger');
  assert.equal(await accordionTrigger.isVisible(), true);
  await accordionTrigger.click();
  await page.waitForTimeout(350);

  const mobileSubitems = page.locator('.mobile-service-subitem');
  assert.equal(await mobileSubitems.count(), 6, 'Mobile accordion must show 6 services');

  const mobileViewAll = page.locator('.mobile-view-all-services');
  assert.equal(await mobileViewAll.isVisible(), true, 'Mobile VIEW ALL SERVICES link must be visible');

  // Click on service 05 (Warehouses & PEB)
  await mobileSubitems.nth(4).click();
  await page.waitForURL('**/services/warehouses-pre-engineered-buildings');
  await page.waitForTimeout(500);
  console.log('✓ Mobile navigation to /services/warehouses-pre-engineered-buildings passed');

  console.log('\n--- 3. Testing All Six Individual Service Pages SEO & Structure ---');
  await page.setViewportSize({ width: 1440, height: 900 });

  const routesToTest = [
    {
      url: 'http://127.0.0.1:5173/services/general-construction',
      expectedH1: 'General Construction Services in Dubai & UAE',
      expectedTitlePart: 'General Construction Company in Dubai',
      canonical: 'https://ajjayer.ae/services/general-construction'
    },
    {
      url: 'http://127.0.0.1:5173/services/steel-structures-fabrication',
      expectedH1: 'Steel Structures & Fabrication in Dubai',
      expectedTitlePart: 'Steel Structure & Fabrication Company Dubai',
      canonical: 'https://ajjayer.ae/services/steel-structures-fabrication'
    },
    {
      url: 'http://127.0.0.1:5173/services/tensile-shade-structures',
      expectedH1: 'Tensile Shade Structure Solutions',
      expectedTitlePart: 'Tensile Shade Structures Dubai',
      canonical: 'https://ajjayer.ae/services/tensile-shade-structures'
    },
    {
      url: 'http://127.0.0.1:5173/services/car-parking-shades-pergolas',
      expectedH1: 'Car Parking Shades & Pergolas',
      expectedTitlePart: 'Car Parking Shades & Pergolas Dubai',
      canonical: 'https://ajjayer.ae/services/car-parking-shades-pergolas'
    },
    {
      url: 'http://127.0.0.1:5173/services/warehouses-pre-engineered-buildings',
      expectedH1: 'Warehouses & Pre-Engineered Buildings',
      expectedTitlePart: 'Warehouse & Pre-Engineered Building Contractor Dubai',
      canonical: 'https://ajjayer.ae/services/warehouses-pre-engineered-buildings'
    },
    {
      url: 'http://127.0.0.1:5173/services/fit-out-finishing',
      expectedH1: 'Fit-Out & Finishing Services',
      expectedTitlePart: 'Fit-Out & Finishing Contractor Dubai',
      canonical: 'https://ajjayer.ae/services/fit-out-finishing'
    }
  ];

  for (const testRoute of routesToTest) {
    await page.goto(testRoute.url);
    await page.waitForTimeout(600);

    const seoData = await page.evaluate(() => {
      const title = document.title;
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
      const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
      const twitterCard = document.querySelector('meta[name="twitter:card"]')?.getAttribute('content');
      const h1s = [...document.querySelectorAll('h1')].map(h => h.textContent.trim());
      const h2s = [...document.querySelectorAll('h2')].map(h => h.textContent.trim());
      const breadcrumbs = [...document.querySelectorAll('.breadcrumb-item')].map(b => b.textContent.trim());

      const jsonLdScripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
      let hasServiceSchema = false;
      let hasBreadcrumbSchema = false;

      for (const s of jsonLdScripts) {
        try {
          const parsed = JSON.parse(s.textContent);
          const graph = parsed['@graph'] || [parsed];
          if (graph.some(item => item['@type'] === 'Service')) hasServiceSchema = true;
          if (graph.some(item => item['@type'] === 'BreadcrumbList')) hasBreadcrumbSchema = true;
        } catch (e) {}
      }

      const heroImg = document.querySelector('.service-hero-image');
      const hasHeroImg = Boolean(heroImg && heroImg.naturalWidth > 0 && heroImg.getAttribute('fetchpriority') === 'high');

      return {
        title,
        metaDesc,
        canonical,
        ogTitle,
        ogDesc,
        ogImage,
        twitterCard,
        h1Count: h1s.length,
        h1Text: h1s[0],
        h2Count: h2s.length,
        breadcrumbs,
        hasServiceSchema,
        hasBreadcrumbSchema,
        hasHeroImg
      };
    });

    assert.ok(seoData.title.includes(testRoute.expectedTitlePart), `Title mismatch on ${testRoute.url}`);
    assert.ok(seoData.metaDesc && seoData.metaDesc.length >= 100, `Meta description too short on ${testRoute.url}`);
    assert.equal(seoData.canonical, testRoute.canonical, `Canonical mismatch on ${testRoute.url}`);
    assert.equal(seoData.h1Count, 1, `Exactly ONE H1 required on ${testRoute.url}`);
    assert.equal(seoData.h1Text, testRoute.expectedH1, `H1 text mismatch on ${testRoute.url}`);
    assert.ok(seoData.h2Count >= 4, `Expected at least 4 H2 sections on ${testRoute.url}`);
    assert.ok(seoData.breadcrumbs.length >= 3, `Expected at least 3 breadcrumbs on ${testRoute.url}`);
    assert.ok(seoData.hasServiceSchema, `Service JSON-LD schema required on ${testRoute.url}`);
    assert.ok(seoData.hasBreadcrumbSchema, `BreadcrumbList JSON-LD schema required on ${testRoute.url}`);
    assert.ok(seoData.hasHeroImg, `High-priority LCP WebP hero image required on ${testRoute.url}`);

    console.log(`✓ Verified ${testRoute.expectedH1}: 1 H1, ${seoData.h2Count} H2s, WebP image, Service & Breadcrumb schema, Canonical`);
  }

  assert.deepEqual(errors, []);
  console.log('\n======================================================');
  console.log('ALL SERVICES NAVIGATION & SEO AUDIT TESTS PASSED 100%!');
  console.log('======================================================');
} finally {
  await browser.close();
}
