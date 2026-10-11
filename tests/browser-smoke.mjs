import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const base = process.env.SAFETY_BASE_URL || 'http://127.0.0.1:4173/Sails-P2P-Safety-Center';
const locales = [
  {prefix: '', title: 'Something went wrong', options: ['receipt', 'recipient', 'dispute', 'pressure']},
  {prefix: '/pt-BR', title: 'Algo deu errado', options: ['receipt', 'recipient', 'dispute', 'pressure']},
  {prefix: '/es', title: '¿Algo salió mal', options: ['receipt', 'recipient', 'dispute', 'pressure']},
];
const browser = await chromium.launch({headless: true});
let checks = 0;
try {
  for (const locale of locales) {
    for (const width of [320, 375, 768, 1280]) {
      const page = await browser.newPage({viewport: {width, height: 800}});
      const response = await page.goto(base + locale.prefix + '/incident', {waitUntil: 'networkidle'});
      assert.equal(response?.status(), 200, 'Incident route HTTP status');
      assert.equal((await page.locator('h1').innerText()).includes(locale.title), true, 'Localized heading');
      const selector = page.locator('#incident-scenario');
      assert.equal(await selector.count(), 1);
      assert.equal(await page.locator('label[for="incident-scenario"]').count(), 1);
      const overflow = await page.evaluate(() => ({viewport: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth, offenders: [...document.querySelectorAll('*')].filter(el => el.getBoundingClientRect().right > innerWidth + 1).slice(0, 8).map(el => ({tag: el.tagName, className: typeof el.className === 'string' ? el.className : '', right: Math.round(el.getBoundingClientRect().right), left: Math.round(el.getBoundingClientRect().left), width: Math.round(el.getBoundingClientRect().width), text: el.textContent?.trim().slice(0,65), parent: el.parentElement?.className, styles: {position: getComputedStyle(el).position, display: getComputedStyle(el).display, whiteSpace: getComputedStyle(el).whiteSpace}}))}));
      assert.equal(overflow.document <= width + 1, true, 'Horizontal overflow at ' + width + ': ' + JSON.stringify(overflow));
      for (const scenario of locale.options) {
        await selector.selectOption(scenario);
        const link = page.locator('section[aria-live="polite"] a');
        assert.equal(await link.count(), 1, 'Accessible result link');
        assert.match(await link.getAttribute('href'), /\/guides\//);
      }
      await page.keyboard.press('Tab');
      checks++;
      await page.close();
    }
    const home = await browser.newPage();
    const response = await home.goto(base + locale.prefix + '/', {waitUntil: 'networkidle'});
    assert.equal(response?.status(), 200);
    assert.equal(await home.locator('a[href$="/incident"]').count() > 0, true, 'Homepage incident link');
    checks++;
    await home.close();
  }
  console.log(JSON.stringify({status: 'PASS', browser: 'Chromium', checks, locales: locales.length, viewports: [320,375,768,1280]}));
} finally {
  await browser.close();
}
