import {chromium} from 'playwright';
import assert from 'node:assert/strict';

const base = process.env.SAFETY_BASE_URL || 'http://127.0.0.1:4173/Sails-P2P-Safety-Center';
const locales = [
  {prefix:'', label:'Search guides', empty:'No results found', error:'Search index unavailable'},
  {prefix:'/pt-BR', label:'Buscar guias', empty:'Nenhum resultado encontrado', error:'A pesquisa está indisponível'},
  {prefix:'/es', label:'Buscar guías', empty:'No se encontraron resultados', error:'La búsqueda no está disponible'}
];
const browser = await chromium.launch({headless:true});
let checks = 0;
try {
  for (const locale of locales) {
    const context = await browser.newContext({viewport:{width:375,height:812}});
    const page = await context.newPage();
    const response = await page.goto(base + locale.prefix + '/search', {waitUntil:'networkidle'});
    assert.equal(response?.status(), 200, 'Localized search page status');
    assert.equal(await page.locator('h1').innerText(), locale.label);
    const input = page.locator('input#safety-search');
    assert.equal(await input.count(), 1);
    assert.equal(await page.locator('label[for="safety-search"]').count(), 1);
    await input.focus();
    assert.equal(await input.evaluate(el => document.activeElement === el), true, 'Search input accepts keyboard focus');
    await page.keyboard.type('comprovantes');
    assert.equal(await input.inputValue(), 'comprovantes', 'Search accepts keyboard typing');
    await page.locator('[aria-live="polite"] a').first().waitFor();
    assert.ok(await page.locator('[aria-live="polite"] a').count() > 0, 'Index search results');
    const result = page.locator('[aria-live="polite"] a').first();
    assert.match(await result.getAttribute('href'), /\/guides\//);
    await input.fill('zzz-no-matching-guide-928374');
    await page.getByText(locale.empty, {exact:true}).waitFor();
    checks += 3;
    await context.close();

    const brokenContext = await browser.newContext({viewport:{width:375,height:812}});
    await brokenContext.route('**/knowledge/index.json', route => route.fulfill({status:503, contentType:'application/json', body:'{}'}));
    const brokenPage = await brokenContext.newPage();
    assert.equal((await brokenPage.goto(base + locale.prefix + '/search', {waitUntil:'networkidle'}))?.status(), 200);
    await brokenPage.locator('[role="alert"]').getByText(locale.error, {exact:false}).waitFor();
    assert.equal(await brokenPage.locator('[aria-live="polite"] a').count(), 0);
    checks++;
    await brokenContext.close();
  }
  console.log(JSON.stringify({status:'PASS',checks,locales:3,scenarios:['results','no-results','index-failure']}));
} finally {
  await browser.close();
}
