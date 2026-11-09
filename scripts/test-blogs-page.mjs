import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const BASE_URL = 'http://127.0.0.1:5173';

async function runBlogsTests() {
  console.log('--- 1. Testing /blogs Hub Page on Desktop ---');
  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage();

  try {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/blogs`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // 1. Title & Meta
    const title = await page.title();
    console.log('Page Title:', title);
    assert.ok(title.includes('Construction & Engineering Insights'), 'Title must contain target keywords');

    const metaDesc = await page.locator('meta[name="description"]').first().getAttribute('content');
    console.log('Meta Description:', metaDesc);
    assert.ok(metaDesc && metaDesc.length > 50, 'Meta description should be informative');

    const canonical = await page.locator('link[rel="canonical"]').first().getAttribute('href');
    console.log('Canonical URL:', canonical);
    assert.ok(canonical && canonical.includes('/blogs'), 'Canonical must point to /blogs');

    // 2. Heading hierarchy (Exactly ONE H1 on /blogs)
    const h1Count = await page.locator('h1').count();
    const h1Text = await page.locator('h1').first().textContent();
    console.log(`H1 count: ${h1Count}, Text: "${h1Text.trim()}"`);
    assert.equal(h1Count, 1, 'Blogs hub must have exactly ONE H1');
    assert.ok(h1Text.includes('Construction, Engineering & Fabrication'), 'H1 text must match requirement');

    // 3. Featured Article
    const featuredCard = page.locator('.blogs-featured-card');
    assert.equal(await featuredCard.isVisible(), true, 'Featured article card must be visible');
    const featuredTitle = await page.locator('#featured-article-heading').textContent();
    console.log('Featured Article Title:', featuredTitle.trim());

    // 4. Latest Insights Grid
    const cards = page.locator('.blog-card');
    const initialCount = await cards.count();
    console.log(`Initial blog cards displayed: ${initialCount}`);
    assert.ok(initialCount >= 6, 'Should display sample articles');

    // 5. Search Bar Filtering
    console.log('\n--- 2. Testing Live Search Filtering ---');
    const searchInput = page.locator('.blogs-search-input');
    await searchInput.fill('steel');
    await page.waitForTimeout(300);

    const filteredCount = await page.locator('.blog-card').count();
    console.log(`Articles matching "steel": ${filteredCount}`);
    assert.ok(filteredCount > 0 && filteredCount < initialCount, 'Search should filter the card grid');

    // Clear search
    await page.locator('.blogs-search-clear').click();
    await page.waitForTimeout(200);
    assert.equal(await page.locator('.blog-card').count(), initialCount, 'Clearing search restores all cards');
    console.log('✓ Search clear verified');

    // 6. Category Filtering
    console.log('\n--- 3. Testing Category Navigation ---');
    const tensileTab = page.locator('.blogs-category-tab:has-text("Tensile Shade Structures")');
    await tensileTab.click();
    await page.waitForTimeout(300);
    const tensileCount = await page.locator('.blog-card').count();
    console.log(`Articles under Tensile Shade Structures: ${tensileCount}`);
    assert.ok(tensileCount >= 1, 'Tensile category must have matching articles');

    // Click All tab
    const allTab = page.locator('.blogs-category-tab:has-text("All")');
    await allTab.click();
    await page.waitForTimeout(200);

    // 7. Popular Guides Section
    console.log('\n--- 4. Testing High-Intent Popular Guides Section ---');
    const guides = page.locator('.guide-item-card');
    const guideCount = await guides.count();
    console.log(`Popular guides count: ${guideCount}`);
    assert.equal(guideCount, 6, 'Should display exactly 6 high-intent popular guides');

    // 8. Service Internal Linking Section
    console.log('\n--- 5. Testing Service Internal Linking ---');
    const serviceLinks = page.locator('.service-linking-card');
    assert.equal(await serviceLinks.count(), 6, 'Must link to all 6 core services');

    const firstHref = await serviceLinks.first().getAttribute('href');
    assert.ok(firstHref.startsWith('/services/'), 'Service card links must point to /services/*');
    console.log('✓ All 6 services verified with valid internal links');

    // 9. Individual Article Page
    console.log('\n--- 6. Testing Individual Article Page (/blogs/steel-structures-dubai-guide) ---');
    await page.goto(`${BASE_URL}/blogs/steel-structures-dubai-guide`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const articleH1Count = await page.locator('h1').count();
    const articleH1 = await page.locator('h1').first().textContent();
    console.log(`Article H1: "${articleH1.trim()}" (Count: ${articleH1Count})`);
    assert.equal(articleH1Count, 1, 'Article page must have exactly 1 H1');

    const articleH2s = await page.locator('.blog-detail-h2').allTextContents();
    console.log(`Article H2 sections count: ${articleH2s.length}`);
    assert.ok(articleH2s.length >= 5, 'Article must have at least 5 structured H2 sections');

    const relatedServiceBox = page.locator('.blog-related-service-box');
    assert.equal(await relatedServiceBox.first().isVisible(), true, 'Related service box must be visible');

    // 10. Mobile Responsiveness & Overflow Test
    console.log('\n--- 7. Testing Mobile Responsiveness (390px Viewport) ---');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/blogs`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`Mobile scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);
    assert.equal(scrollWidth <= clientWidth, true, 'Zero horizontal overflow required on mobile');

    console.log('\n======================================================');
    console.log('ALL BLOGS & INSIGHTS AUDIT TESTS PASSED 100%!');
    console.log('======================================================');
  } finally {
    await browser.close();
  }
}

runBlogsTests().catch((err) => {
  console.error('Test Failed:', err);
  process.exit(1);
});
