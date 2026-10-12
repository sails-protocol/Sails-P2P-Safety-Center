import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';

const base = process.env.SAFETY_BASE_URL || 'http://127.0.0.1:4173/Sails-P2P-Safety-Center';
const locales = ['', '/pt-BR', '/es'];
const browser = await chromium.launch({headless: true});
let checks = 0;
try {
  for (const locale of locales) {
    for (const path of ['/', '/incident', '/search']) {
      const context = await browser.newContext({viewport: {width: 375, height: 812}});
      const page = await context.newPage();
      const url = base + locale + path;
      const response = await page.goto(url, {waitUntil: 'networkidle'});
      assert.equal(response?.status(), 200, 'HTTP 200: ' + url);
      const results = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      const violations = results.violations.map(v => ({
        id: v.id, impact: v.impact, description: v.description,
        nodes: v.nodes.slice(0, 4).map(n => ({target: n.target, summary: n.failureSummary}))
      }));
      assert.deepEqual(violations, [], 'WCAG axe violations at ' + url + ': ' + JSON.stringify(violations));
      checks++;
      await context.close();
    }
  }
  console.log(JSON.stringify({status:'PASS',tool:'axe-core',checks,locales:3,pages:['/','/incident']}));
} finally {
  await browser.close();
}
