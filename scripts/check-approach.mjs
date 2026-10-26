import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('test-results', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
for (const [name, width, height] of [['wide',1983,793],['desktop',1440,900],['tablet',820,1180],['mobile',390,844],['small',320,700]]) {
  await page.setViewportSize({ width, height });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:5173/about');
  await page.locator('#our-approach').scrollIntoViewIfNeeded();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(700);
  const result = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > innerWidth,
    images: [...document.querySelectorAll('.work-photo img')].every(img => img.complete && img.naturalWidth > 0),
    stages: document.querySelectorAll('.work-stage').length,
    clippedText: [...document.querySelectorAll('.work-stage h3,.work-stage p')].some(el => el.scrollWidth > el.clientWidth + 1),
  }));
  if(result.overflow || !result.images || result.stages !== 5 || result.clippedText) throw new Error(`${name}: ${JSON.stringify(result)}`);
  const stages = page.locator('.work-stage');
  await stages.first().focus();
  for(let i = 0; i < 5; i++) {
    if(i) await page.keyboard.press('Tab');
    if(!await stages.nth(i).evaluate(el => el === document.activeElement && el.classList.contains('is-active'))) throw new Error(`Keyboard stage ${i} failed`);
  }
  await stages.last().evaluate(el => el.blur());
  await page.locator('.work-scroll').evaluate(el => el.scrollLeft = 0);
  await page.locator('#our-approach').screenshot({path:`test-results/approach-${name}.png`});
  console.log(`${name}: five images loaded, no overflow, keyboard stage highlighting passed`);
}
await page.setViewportSize({width:1440,height:900});
await page.emulateMedia({ reducedMotion: 'no-preference' });
await page.reload();
await page.locator('#our-approach').scrollIntoViewIfNeeded();
await page.locator('.work-stage').nth(2).hover();
await page.waitForTimeout(1700);
if(await page.locator('.work-timeline .is-active .work-segment').evaluate(el => getComputedStyle(el).opacity) !== '1') throw new Error('Timeline hover failed');
if(errors.length) throw new Error(errors.join('\n'));
console.log('Hover, motion and reduced-motion passed; no runtime errors.');
await browser.close();
