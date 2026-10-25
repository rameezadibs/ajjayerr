import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('test-results', { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
for (const [name, width, height] of [['desktop',1600,1000],['laptop',1100,900],['tablet',820,1180],['mobile',390,844],['small-mobile',320,700]]) {
  await page.setViewportSize({width,height});
  await page.goto('http://127.0.0.1:5173/#who-we-are');
  const section = page.locator('#who-we-are');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  for (const item of await section.locator('article').all()) { await item.scrollIntoViewIfNeeded(); await page.waitForTimeout(600); }
  await page.locator('#who-heading').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error(`${name}: horizontal overflow`);
  if (await section.getByRole('heading', {level:3}).count() !== 3) throw new Error('Expected three capabilities');
  if (await section.getByRole('link', {name:'Our story'}).getAttribute('href') !== '/about') throw new Error('Incorrect story destination');
  const clipped = await section.locator('.who-headline,.who-capability-copy').evaluateAll(els => els.some(el => el.scrollWidth > el.clientWidth + 1));
  if(clipped) throw new Error(`${name}: clipped text`);
  await section.screenshot({path:`test-results/who-${name}.png`});
  console.log(`${name}: layout, copy and links passed`);
}
await page.emulateMedia({reducedMotion:'reduce'});
await page.reload();
await page.locator('#who-heading').scrollIntoViewIfNeeded();
await page.waitForTimeout(100);
if(await page.locator('.who-headline span').first().evaluate(el=>getComputedStyle(el).opacity) !== '1') throw new Error('Reduced motion headline hidden');
if(errors.length) throw new Error(errors.join('\n'));
console.log('Reduced motion passed; no runtime errors.');
await browser.close();
