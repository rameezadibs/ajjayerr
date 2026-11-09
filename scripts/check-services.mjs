import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
await mkdir('test-results', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
try {
  for (const [name, width, height] of [['reference',1983,793],['desktop',1440,900],['tablet',820,1180],['mobile',390,844],['small',320,700]]) {
    await page.setViewportSize({ width, height });
    await page.goto('http://127.0.0.1:5173/services');
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1700);
    const result = await page.evaluate(() => {
      const box = selector => document.querySelector(selector).getBoundingClientRect();
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        image: document.querySelector('.services-visual img').naturalWidth,
        headingCount: document.querySelectorAll('h1').length,
        ctaOverlap: box('.services-cta').bottom > (innerWidth < 768 ? box('.services-visual').top : box('.services-purpose').top),
      };
    });
    assert.equal(result.overflow, false, name);
    assert.ok(result.image > 0, name);
    assert.equal(result.headingCount, 1);
    assert.equal(result.ctaOverlap, false, name);
    await page.screenshot({ path: `test-results/services-${name}.png`, fullPage: true });
    console.log(`${name}: no overflow or overlap, image loaded, one heading`);
  }
  await page.locator('.services-cta').focus();
  assert.equal(await page.locator('.services-cta').evaluate(el => el === document.activeElement), true);
  await page.keyboard.press('Enter');
  await page.waitForURL('**/#capabilities');
  await page.locator('#capabilities').waitFor();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:5173/services/');
  await page.getByRole('heading', { name: 'OUR SERVICES' }).waitFor();
  assert.equal(await page.locator('.services-cta').evaluate(el => getComputedStyle(el).opacity), '1');
  assert.deepEqual(errors, []);
  console.log('Keyboard CTA destination, trailing slash, reduced motion, and runtime checks passed.');
} finally { await browser.close(); }
