import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('test-results', { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
for (const [name, width, height] of [['desktop',1672,941],['tablet',820,1180],['mobile',390,844],['small-mobile',320,700]]) {
  await page.setViewportSize({width,height});
  await page.goto('http://127.0.0.1:5173');
  await page.waitForTimeout(1900);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  if (overflow) throw new Error(`${name} has horizontal overflow`);
  await page.screenshot({ path: `test-results/${name}.png`, fullPage: true });
  if (width < 1100) {
    await page.getByRole('button', {name:'Open navigation'}).click();
    await page.getByRole('navigation', {name:'Mobile navigation'}).waitFor();
    await page.keyboard.press('Escape');
    if (await page.getByRole('button', {name:'Open navigation'}).getAttribute('aria-expanded') !== 'false') throw new Error('Menu did not close');
  }
  console.log(`${name}: no horizontal overflow; screenshot saved${width < 1100 ? '; menu passed' : ''}`);
}
await page.emulateMedia({reducedMotion:'reduce'});
await page.reload();
await page.getByRole('heading',{level:1}).waitFor();
if(errors.length) throw new Error(errors.join('\n'));
console.log('Reduced-motion rendering passed; no browser runtime errors.');
await browser.close();
