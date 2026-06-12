// One-off generator for the social share card (public/og/og-default.png) and
// the apple-touch-icon (public/apple-touch-icon.png). NOT part of the build —
// run manually with `node scripts/generate-og.mjs` when the brand card needs
// to change, then commit the PNGs.
//
// Requires Space Grotesk + JetBrains Mono installed locally (fontconfig), since
// sharp/librsvg rasterizes SVG text with system fonts.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

// Tokens mirrored from src/styles/global.css :root
const bg = '#0a0a0f';
const ink = '#f4f4f0';
const muted = '#8a8a99';
const acid = '#d4ff00';
const hot = '#ff2d6b';
const electric = '#5b5bff';
const cyan = '#00e5ff';

const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="12%" cy="8%" r="55%">
      <stop offset="0%" stop-color="${electric}" stop-opacity=".30"/>
      <stop offset="100%" stop-color="${electric}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="92%" cy="15%" r="55%">
      <stop offset="0%" stop-color="${hot}" stop-opacity=".26"/>
      <stop offset="100%" stop-color="${hot}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g3" cx="60%" cy="105%" r="60%">
      <stop offset="0%" stop-color="${cyan}" stop-opacity=".18"/>
      <stop offset="100%" stop-color="${cyan}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="${bg}"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <rect width="1200" height="630" fill="url(#g3)"/>

  <!-- kicker (machine voice) -->
  <circle cx="86" cy="106" r="7" fill="${acid}"/>
  <text x="108" y="113" font-family="JetBrains Mono" font-size="22" letter-spacing="3"
        fill="${muted}">JOESTEINKAMP.COM&#160;&#160;·&#160;&#160;ST. LOUIS, MO</text>

  <!-- display -->
  <text x="76" y="312" font-family="Space Grotesk" font-weight="700" font-size="190"
        letter-spacing="-7" fill="${ink}">JOE<tspan fill="${acid}">&#160;↗</tspan></text>
  <text x="76" y="472" font-family="Space Grotesk" font-weight="700" font-size="190"
        letter-spacing="-7" fill="none" stroke="${ink}" stroke-width="3">STEINKAMP</text>

  <!-- tag -->
  <text x="80" y="560" font-family="Space Grotesk" font-weight="500" font-size="36"
        fill="${ink}">Product Design <tspan fill="${cyan}">×</tspan> Design Engineering</text>

  <!-- hairline frame -->
  <rect x="0.5" y="0.5" width="1199" height="629" fill="none"
        stroke="rgba(255,255,255,.10)" stroke-width="1"/>
</svg>`;

// iOS rounds the corners itself — solid square, acid dot mark (the brand's period).
const touchSvg = `
<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${acid}" stop-opacity=".28"/>
      <stop offset="100%" stop-color="${acid}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="180" height="180" fill="${bg}"/>
  <circle cx="90" cy="90" r="78" fill="url(#halo)"/>
  <circle cx="90" cy="90" r="34" fill="${acid}"/>
</svg>`;

await mkdir(new URL('../public/og/', import.meta.url), { recursive: true });
await sharp(Buffer.from(ogSvg)).png().toFile(new URL('../public/og/og-default.png', import.meta.url).pathname);
await sharp(Buffer.from(touchSvg)).png().toFile(new URL('../public/apple-touch-icon.png', import.meta.url).pathname);
console.log('wrote public/og/og-default.png and public/apple-touch-icon.png');
