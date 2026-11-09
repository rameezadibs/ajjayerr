import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Import services data
const { servicesData, servicesHubData } = await import('../src/data/servicesData.js');

// Import blogs data
const { blogsHubData, blogPosts } = await import('../src/data/blogsData.js');

const templatePath = path.join(distDir, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found! Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

const routes = [
  {
    path: '/about',
    title: 'About AJJAYER | Premier Construction & Structural Engineering Contractor Dubai UAE',
    description: 'Discover AJJAYER Constructions Contracting LLC in Dubai, UAE — our engineering mission, vision, five-stage execution process, and leadership shaping landmark commercial and industrial infrastructure across the Emirates.',
    canonical: 'https://ajjayer.ae/about',
    image: 'https://ajjayer.ae/assets/about-architecture.png',
    h1: 'Built on Heritage. Driven by Engineering Excellence.',
    summary: 'Discover AJJAYER Constructions Contracting LLC in Dubai, UAE — engineering heritage, visionary leadership, and structured execution process shaping landmark infrastructure.'
  },
  {
    path: '/services',
    title: servicesHubData.seoTitle,
    description: servicesHubData.metaDescription,
    canonical: servicesHubData.canonical,
    image: 'https://ajjayer.ae/services/services-architecture.png',
    h1: 'Engineering & Construction Services in Dubai & UAE',
    summary: servicesHubData.heroDescription
  },
  ...servicesData.map(s => ({
    path: s.path,
    title: s.seoTitle,
    description: s.metaDescription,
    canonical: `https://ajjayer.ae${s.path}`,
    image: `https://ajjayer.ae${s.image}`,
    h1: s.h1,
    summary: s.tagline,
    service: s
  })),
  {
    path: '/blogs',
    title: blogsHubData.seoTitle,
    description: blogsHubData.metaDescription,
    canonical: blogsHubData.canonical,
    image: `https://ajjayer.ae${blogsHubData.ogImage}`,
    h1: blogsHubData.h1,
    summary: blogsHubData.heroIntro
  },
  ...blogPosts.map(p => ({
    path: `/blogs/${p.slug}`,
    title: `${p.title} | AJJAYER Insights`,
    description: p.excerpt,
    canonical: `https://www.ajjayer.com/blogs/${p.slug}`,
    image: `https://ajjayer.ae${p.image}`,
    h1: p.title,
    summary: p.excerpt,
    blogPost: p
  })),
  {
    path: '/contact',
    title: 'Contact AJJAYER | Construction & Engineering Enquiries Dubai, UAE',
    description: 'Contact AJJAYER in Dubai for construction, steel fabrication, tensile structures, pre-engineered buildings, fit-out and engineering project enquiries across the UAE.',
    canonical: 'https://www.ajjayer.com/contact',
    image: 'https://ajjayer.ae/assets/about-architecture.png',
    h1: "LET'S BUILD SOMETHING THAT LASTS.",
    summary: 'Speak with AJJAYER about construction, engineering, fabrication, shade structures, pre-engineered buildings or fit-out requirements across Dubai and the UAE.'
  }
];

console.log(`Pre-rendering ${routes.length} static HTML routes...`);

for (const route of routes) {
  let html = template;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

  // Replace or inject Meta Description
  if (html.includes('name="description"')) {
    html = html.replace(/<meta name="description" content=".*?"\/>/i, `<meta name="description" content="${route.description}"/>`);
  }

  // Replace or inject Canonical URL
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href=".*?"\/>/i, `<link rel="canonical" href="${route.canonical}"/>`);
  }

  // Replace Open Graph Tags
  html = html.replace(/<meta property="og:title" content=".*?"\/>/i, `<meta property="og:title" content="${route.title}"/>`);
  html = html.replace(/<meta property="og:description" content=".*?"\/>/i, `<meta property="og:description" content="${route.description}"/>`);
  html = html.replace(/<meta property="og:url" content=".*?"\/>/i, `<meta property="og:url" content="${route.canonical}"/>`);
  html = html.replace(/<meta property="og:image" content=".*?"\/>/i, `<meta property="og:image" content="${route.image}"/>`);

  // Replace Twitter Tags
  html = html.replace(/<meta name="twitter:title" content=".*?"\/>/i, `<meta name="twitter:title" content="${route.title}"/>`);
  html = html.replace(/<meta name="twitter:description" content=".*?"\/>/i, `<meta name="twitter:description" content="${route.description}"/>`);
  html = html.replace(/<meta name="twitter:image" content=".*?"\/>/i, `<meta name="twitter:image" content="${route.image}"/>`);

  // Inject initial pre-rendered semantic HTML inside root for zero-JS crawlers
  const prerenderBody = `
    <div id="prerendered-content" style="display:none;" aria-hidden="true">
      <h1>${route.h1}</h1>
      <p>${route.summary}</p>
      ${route.service ? `
        <h2>Our Capabilities</h2>
        <ul>
          ${route.service.capabilities.map(c => `<li><strong>${c.title}</strong>: ${c.description}</li>`).join('')}
        </ul>
        <h2>Frequently Asked Questions</h2>
        ${route.service.faqs.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}
      ` : ''}
      ${route.blogPost ? `
        <h2>Article Sections</h2>
        ${route.blogPost.sections ? route.blogPost.sections.map(s => `<h3>${s.h2}</h3><p>${s.p}</p>`).join('') : ''}
        ${route.blogPost.faqs ? `
          <h2>Frequently Asked Questions</h2>
          ${route.blogPost.faqs.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}
        ` : ''}
      ` : ''}
    </div>
  `;

  html = html.replace('<div id="root"></div>', `<div id="root">${prerenderBody}</div>`);

  // Target directory
  const targetRelDir = route.path.replace(/^\//, '');
  const outDir = path.join(distDir, targetRelDir);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');

  console.log(`✓ Pre-rendered: ${route.path} -> ${path.relative(rootDir, path.join(outDir, 'index.html'))}`);
}

console.log('All static route HTML files pre-rendered successfully.');
