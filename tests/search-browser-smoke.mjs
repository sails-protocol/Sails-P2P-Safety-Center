import {chromium} from 'playwright';
import assert from 'node:assert/strict';

const base = process.env.SAFETY_BASE_URL || 'http://127.0.0.1:4173/Sails-P2P-Safety-Center';
const locales = [
  {prefix:'', label:'Search guides', empty:'No results found', error:'Search index unavailable', loading:'Loading guides…'},
  {prefix:'/pt-BR', label:'Buscar guias', empty:'Nenhum resultado encontrado', error:'A pesquisa está indisponível', loading:'Carregando guias…'},
  {prefix:'/es', label:'Buscar guías', empty:'No se encontraron resultados', error:'La búsqueda no está disponible', loading:'Cargando guías…'}
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
    // Deterministic delayed response proves the visible loading state and its transition.
    const delayedContext = await browser.newContext({viewport:{width:375,height:812}});
    let releaseIndex;
    const indexGate = new Promise(resolve => {releaseIndex = resolve;});
    await delayedContext.route('**/knowledge/index.json', async route => {
      await indexGate;
      await route.continue();
    });
    const delayedPage = await delayedContext.newPage();
    await delayedPage.goto(base + locale.prefix + '/search', {waitUntil:'domcontentloaded'});
    await delayedPage.getByRole('status').getByText(locale.loading, {exact:true}).waitFor();
    releaseIndex();
    await delayedPage.getByRole('status').waitFor({state:'detached'});
    await delayedContext.close();
    checks++;

    // Title-only and body-only matches must both be discoverable in the current locale.
    const matchContext = await browser.newContext({viewport:{width:375,height:812}});
    await matchContext.route('**/knowledge/index.json', route => route.fulfill({status:200, contentType:'application/json', body:JSON.stringify({guides:[
      {locale:locale.prefix === '' ? 'en' : locale.prefix.slice(1),title:'unique-title-93812',content:'ordinary body',url:'https://sails-protocol.github.io/Sails-P2P-Safety-Center/guides/title-test'},
      {locale:locale.prefix === '' ? 'en' : locale.prefix.slice(1),title:'ordinary title',content:'unique-body-47193',url:'https://sails-protocol.github.io/Sails-P2P-Safety-Center/guides/body-test'}
    ]})}));
    const matchPage = await matchContext.newPage();
    await matchPage.goto(base + locale.prefix + '/search', {waitUntil:'networkidle'});
    await matchPage.locator('#safety-search').fill('unique-title-93812');
    await matchPage.locator('[aria-live="polite"] a[href$="/title-test"]').waitFor();
    assert.equal(await matchPage.locator('[aria-live="polite"] a').count(), 1);
    await matchPage.locator('#safety-search').fill('unique-body-47193');
    await matchPage.locator('[aria-live="polite"] a[href$="/body-test"]').waitFor();
    assert.equal(await matchPage.locator('[aria-live="polite"] a').count(), 1);
    checks += 2;
    await matchContext.close();

  }
  console.log(JSON.stringify({status:'PASS',checks,locales:3,scenarios:['results','no-results','index-failure','loading','title-match','content-match']}));
} finally {
  await browser.close();
}
