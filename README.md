# AJJAYER hero

React + Vite, Tailwind CSS, Framer Motion and Lucide React. The homepage hero, Who We Are and Our Capabilities sections are implemented.

Run `npm install`, then `npm run dev`. Production: `npm run build` and `npm run preview`.

`src/components/HeroSection.jsx` accepts a `links` object with Home, About, Services, Projects, Blogs and Contact destinations. Defaults point to future site routes; those pages are intentionally outside this hero-only scope. Replace them when integrating the full website.

The provided reference includes the logo but no separate logo file. SVG viewports display the original bitmap logo and strip imagery without redrawing or distorting them. Replace Brand with the official transparent master asset when available. The background is reconstructed from the reference using the built-in image tool; it is not the original unretouched photograph.

Assets: `public/assets/reference.png` (supplied reference) and `public/assets/construction.png` (generated clean background).

Background prompt: Remove all overlaid website graphics, logos, navigation, headline, copy, buttons, right index, scroll indicator and bottom strip; reconstruct the photograph behind them. Preserve framing, columns, crane, suspended beam, two professionals, Dubai skyline, golden-hour lighting, dark left and bright right. No text or UI.

## Who We Are

`src/components/WhoWeAreSection.jsx` is imported immediately after the unchanged hero. Styles are scoped in `WhoWeAreSection.css`. It accepts `storyHref`, `capabilityLinks` (construction, engineering, fabrication), and `establishedYear`. The year defaults to null and displays “BASED / UAE / DUBAI” until confirmed; pass the verified four-digit year to show the establishment annotation. Links target future routes; no additional pages are implemented.

`public/assets/who-reference.jpeg` preserves the supplied reference. SVG viewports use its exact steel, construction, engineering and fabrication photography. `public/assets/who-architecture.png` is a reference-derived collage prepared with the built-in image generation tool. Its A and image-filled AJJAYER treatment are raster artwork, not font substitutions or independently editable vector letter masks. All accompanying labels and editorial/capability text are live HTML.

Artwork generation prompt: Output only the upper-left artwork (x0–1075, y0–630) of the supplied reference. Preserve the enormous concrete/graphite A with welder inset, sunset construction site, Dubai skyline, one worker, and oversized image-filled AJJAYER lettering. Remove small section labels, micro-copy and coordinates; reconstruct the background behind them. Exclude the right editorial panel, bottom capability strip and company descriptor. Retain subtle technical lines.

Browser verification: with the local dev server running, run `node scripts/check-who.mjs`. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` if using a locally installed Chromium executable. Screenshots are saved in ignored `test-results/`.

## Our Capabilities

`src/components/CapabilitiesSection.jsx` follows Who We Are without modifying either existing section. `capabilitiesData.js` holds all six states. Steel Fabrication is the default. Selection updates the title, description, image, SVG technical drawing, annotations, four benefits and destination. Keyboard support includes arrows, Home and End, with roving tab focus. Mobile uses a horizontal capability index, an uncropped feature photograph, then readable content and a two-column benefits grid. Motion respects reduced-motion preferences.

Pass `servicesHref` (default `/services`) and optionally `capabilityLinks` keyed by capability slug to integrate final service pages. Those pages remain outside this section-only scope. Technical details are illustrative reference annotations, not project specifications. Additional capability copy and imagery are draft marketing content, not claims of completed projects.

Assets use the built-in image generation tool. `public/assets/capability-fabrication.png` is the cleaned reference-derived workshop photograph; `public/assets/capability-scenes.png` is a four-photo sheet used through SVG viewports for civil works, structural works, engineering and fit-out. `public/assets/capabilities-reference.jpeg` is the supplied original, whose photographic details appear in the value strip. General Construction reuses the existing construction photo.

Fabrication prompt: Extract only the upper-right photographic panel of the reference, x580–1600 and y0–708. Preserve the dark industrial workshop, suspended structural beam on chains, sunlit windows, welder and realistic sparks at lower right. Remove all typography, buttons, diagrams and annotations, reconstructing the photograph underneath. Exclude left navigation and bottom strip. Landscape 1.44:1, photorealistic golden industrial lighting.

Additional imagery prompt: A 2×2 contact sheet of four equal, separate landscape photographs with no gutters, text or logos. Top left: Dubai civil works with excavator, graded soil and foundations at dusk. Top right: structural steel beams, bolted connections and scaffolding. Bottom left: architectural plans and precision drafting tools on a dark table. Bottom right: commercial fit-out with stone, timber partitions, coordinated ceiling services and Dubai glazing views. Photorealistic editorial style, charcoal shadows, restrained bronze and warm concrete palette.

Run `node scripts/check-capabilities.mjs` against the running dev server for responsive, six-state interaction, image/content update, keyboard, reduced-motion and browser-error checks.
