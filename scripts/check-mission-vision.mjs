import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('test-results', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
for (const [name, width, height] of [['wide',1983,793],['desktop',1440,900],['tablet',820,1180],['mobile',390,844],['small',320,700]]) {
  await page.setViewportSize({ width, height });
  await page.goto('http://127.0.0.1:5173/about');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('#mission-vision').scrollIntoViewIfNeeded();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1800);
  const checks = await page.evaluate(() => {
    const section = document.querySelector('#mission-vision');
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      articles: section.querySelectorAll('article').length,
      textOutside: [...section.querySelectorAll('.mv-orbit')].some(orbit => {
        const a = orbit.getBoundingClientRect();
        const b = orbit.querySelector('.mv-statement').getBoundingClientRect();
        return b.top < a.top || b.bottom > a.bottom;
      }),
    };
  });
  if(checks.overflow || checks.textOutside || checks.articles !== 2) throw new Error(`${name}: ${JSON.stringify(checks)}`);
  await page.locator('#mission-vision').screenshot({path:`test-results/mission-vision-${name}.png`});
  console.log(`${name}: no horizontal overflow; both statements fit`);
}
await page.emulateMedia({ reducedMotion: 'no-preference' });
await page.reload();
await page.locator('#mission-vision').scrollIntoViewIfNeeded();
await page.waitForTimeout(2000);
if (await page.locator('.mv-statement').first().evaluate(el => getComputedStyle(el).opacity) !== '1') throw new Error('Reveal did not finish');
if(errors.length) throw new Error(errors.join('\n'));
console.log('Motion and reduced-motion checks passed; no runtime errors.');
await browser.close();
