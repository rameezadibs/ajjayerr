import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const BASE_URL = 'http://127.0.0.1:5173';

async function runContactTests() {
  console.log('--- 1. Testing /contact Page on Desktop ---');
  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));

  try {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // 1. Title & Meta
    const title = await page.title();
    console.log('Page Title:', title);
    assert.equal(title, 'Contact AJJAYER | Construction & Engineering Enquiries Dubai, UAE');

    const metaDesc = await page.locator('meta[name="description"]').first().getAttribute('content');
    console.log('Meta Description:', metaDesc);
    assert.ok(metaDesc && metaDesc.includes('Contact AJJAYER in Dubai for construction, steel fabrication'));

    const canonical = await page.locator('link[rel="canonical"]').first().getAttribute('href');
    console.log('Canonical URL:', canonical);
    assert.equal(canonical, 'https://www.ajjayer.com/contact');

    // 2. Heading hierarchy (Exactly ONE H1)
    const h1Count = await page.locator('h1').count();
    const rawH1 = await page.locator('h1').first().textContent();
    const h1Text = rawH1.trim().replace(/\s+/g, ' ');
    console.log(`H1 count: ${h1Count}, Text: "${h1Text}"`);
    assert.equal(h1Count, 1, 'Contact page must have exactly ONE H1');
    assert.ok(h1Text.includes("LET'S BUILD SOMETHING THAT LASTS."));

    // 3. Hero Kicker & Architectural Contact Index
    const kicker = await page.locator('.contact-hero-kicker').textContent();
    assert.ok(kicker.includes('01') && kicker.includes('CONTACT / PROJECT ENQUIRY'));

    const contactIndex = page.locator('.contact-hero-index');
    assert.equal(await contactIndex.isVisible(), true, 'Contact index must be visible');
    const callVal = await page.locator('.contact-index-item a[href="tel:+971541696975"]').textContent();
    assert.ok(callVal.includes('+971 54 169 6975'));
    console.log('✓ Hero architectural contact index verified');

    // 4. Large Architectural Connector
    const connector = page.locator('.arch-connector');
    assert.equal(await connector.isVisible(), true, 'Connector must be visible');
    const connectorText = await connector.textContent();
    assert.ok(connectorText.includes('02') && connectorText.includes('PROJECT CONSULTATION'));
    console.log('✓ Architectural connector verified');

    // 5. Main Project Enquiry Section (40/60 Dark Section)
    console.log('\n--- 2. Testing Project Enquiry Section & Form ---');
    const darkSection = page.locator('.project-enquiry-section');
    assert.equal(await darkSection.isVisible(), true);

    // Left shortcuts: Call, Email, WhatsApp
    const actionRows = page.locator('.enquiry-action-row');
    assert.equal(await actionRows.count(), 3);
    assert.equal(await actionRows.nth(0).getAttribute('href'), 'tel:+971541696975');
    assert.equal(await actionRows.nth(1).getAttribute('href'), 'mailto:sales@ajjayer.com');
    assert.ok((await actionRows.nth(2).getAttribute('href')).includes('wa.me/971541696975'));

    // Service shortcuts 01-06
    const serviceItems = page.locator('.enquiry-service-item');
    assert.equal(await serviceItems.count(), 6, 'Must list all 6 core services');
    console.log('✓ 6 service shortcuts verified');

    // 6. Form Validation & Submission Flow
    console.log('\n--- 3. Testing Form Validation & Submission ---');
    const submitBtn = page.locator('.enquiry-submit-btn');

    // Click submit empty -> should trigger errors
    await submitBtn.click();
    await page.waitForTimeout(200);

    const errorMsgs = page.locator('.form-error-msg');
    const errCount = await errorMsgs.count();
    console.log(`Validation errors triggered on empty submit: ${errCount}`);
    assert.ok(errCount >= 4, 'Empty submission must show validation errors for required fields');

    // Fill in valid details
    await page.locator('#contact-fullName').fill('Hassan Al-Nuaimi');
    await page.locator('#contact-company').fill('Gulf Commercial Holdings');
    await page.locator('#contact-email').fill('hassan@gulfcommercial.ae');
    await page.locator('#contact-phone').fill('+971 50 123 4567');
    await page.locator('#contact-service').selectOption('Steel Structures & Fabrication');
    await page.locator('#contact-location').fill('Dubai Industrial City');
    await page.locator('#contact-type').fill('Logistics Hub Steel Girders');
    await page.locator('#contact-details').fill('We require 1,800 tons of structural steel fabrication and erection for a new distribution facility with 36m clear spans.');

    // Submit valid form
    await submitBtn.click();
    await page.waitForTimeout(600);

    // Check success panel
    const successPanel = page.locator('.form-feedback-panel.is-success');
    assert.equal(await successPanel.isVisible(), true, 'Success panel should appear upon submission');
    const successTitle = await successPanel.locator('.form-feedback-title').textContent();
    console.log(`Form submission result: "${successTitle.trim()}"`);
    assert.ok(successTitle.includes('THANK YOU. YOUR ENQUIRY HAS BEEN RECEIVED.'));

    // 7. Direct Contact Strip
    console.log('\n--- 4. Testing Direct Contact Strip ---');
    const stripCols = page.locator('.direct-contact-col');
    assert.equal(await stripCols.count(), 3);
    const waLink = page.locator('.direct-contact-col a[href*="wa.me"]');
    assert.equal(await waLink.getAttribute('rel'), 'noopener noreferrer');
    console.log('✓ Direct contact strip verified (Call, Email, WhatsApp with noopener noreferrer)');

    // 8. Location Section (Dubai, UAE & Coordinates)
    console.log('\n--- 5. Testing Location Section ---');
    const locH2 = await page.locator('#location-heading').textContent();
    assert.ok(locH2.includes('DUBAI') && locH2.includes('UNITED ARAB EMIRATES'));

    const coords = await page.locator('.location-coords-box').textContent();
    assert.ok(coords.includes('25.2048° N') && coords.includes('55.2708° E'));
    console.log('✓ Location coordinates and Dubai heading verified');

    // 9. Final CTA
    console.log('\n--- 6. Testing Final CTA Smooth Scroll ---');
    const finalCta = page.locator('.final-cta-btn');
    assert.equal(await finalCta.isVisible(), true);
    await finalCta.click();
    await page.waitForTimeout(600);

    // 10. Mobile Responsiveness (390px Viewport)
    console.log('\n--- 7. Testing Mobile Responsiveness (390px Viewport) ---');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`Mobile scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);
    assert.equal(scrollWidth <= clientWidth, true, 'Zero horizontal overflow required on mobile');

    assert.deepEqual(errors, []);
    console.log('\n======================================================');
    console.log('ALL CONTACT PAGE AUDIT TESTS PASSED 100%!');
    console.log('======================================================');
  } finally {
    await browser.close();
  }
}

runContactTests().catch((err) => {
  console.error('Test Failed:', err);
  process.exit(1);
});
