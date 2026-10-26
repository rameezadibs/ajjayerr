import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('test-results', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
for (const [name, width, height] of [['reference',2073,758],['desktop',1440,900],['tablet',820,1180],['mobile',390,844],['small',320,700]]) {
  await page.setViewportSize({ width, height });
  await page.goto('http://127.0.0.1:5173/about');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1800);
  const result = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > innerWidth,
    image: document.querySelector('.about-visual img').naturalWidth,
    stats: document.querySelectorAll('.about-stat').length,
    overlap: document.querySelector('.about-story').getBoundingClientRect().bottom > document.querySelector('.about-stats').getBoundingClientRect().top,
  }));
  if (result.overflow || !result.image || result.stats !== 4 || result.overlap) throw new Error(`${name}: ${JSON.stringify(result)}`);
  await page.screenshot({ path: `test-results/about-${name}.png`, fullPage: true });
  console.log(`${name}: image loaded, four statistics, no overflow or CTA overlap`);
}
await page.getByRole('link', { name: 'OUR STORY' }).click();
await page.waitForURL('**/#who-we-are');
await page.locator('#who-we-are').waitFor();
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.goto('http://127.0.0.1:5173/about');
await page.getByRole('heading', { level: 1 }).waitFor();
if (errors.length) throw new Error(errors.join('\n'));
console.log('Story destination and reduced motion passed; no runtime errors.');
await browser.close();
