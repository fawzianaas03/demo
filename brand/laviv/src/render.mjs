// Renders HTML/SVG files to PNG with the pre-installed Chromium.
import { createRequire } from 'node:module';
const require = createRequire('/opt/node22/lib/node_modules/');
const { chromium } = require('playwright');

export async function renderPages(jobs) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const { html, out, width, height, scale = 1 } of jobs) {
    await page.setViewportSize({ width, height });
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width, height }, scale: 'css' });
  }
  await browser.close();
}
