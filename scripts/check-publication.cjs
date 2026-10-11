const fs = require('node:fs');
const path = require('node:path');
const config = require('../docusaurus.config');
const root = path.resolve(__dirname, '..');
const build = path.join(root, 'build');
const normalize = text => text.replaceAll('\r\n', '\n');
const walk = dir => fs.readdirSync(dir, {withFileTypes: true}).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const failures = [];
const requireCondition = (condition, message) => { if (!condition) failures.push(message); };
const catalogue = JSON.parse(fs.readFileSync(path.join(build, 'knowledge/index.json'), 'utf8'));
const sourceCatalogue = JSON.parse(fs.readFileSync(path.join(root, 'static/knowledge/index.json'), 'utf8'));
requireCondition(JSON.stringify(catalogue) === JSON.stringify(sourceCatalogue), 'Published catalogue differs from generated source');
const keys = catalogue.guides.map(guide => guide.locale + ':' + guide.id);
requireCondition(new Set(keys).size === keys.length, 'Duplicate catalogue locale/id');
requireCondition(JSON.stringify(catalogue.locales) === JSON.stringify(config.i18n.locales), 'Catalogue languages differ from site configuration');

// The maintainer release checklist intentionally exists only in English.
const localeOnly = new Set(['en:release-checklist']);
const sharedIds = new Set(catalogue.guides.filter(guide => !localeOnly.has(guide.locale + ':' + guide.id)).map(guide => guide.id));
for (const locale of config.i18n.locales) {
  const sourceDirectory = locale === config.i18n.defaultLocale ? 'docs' : `i18n/${locale}/docusaurus-plugin-content-docs/current`;
  for (const file of walk(path.join(root, sourceDirectory)).filter(file => file.endsWith('.md'))) {
    const text = normalize(fs.readFileSync(file, 'utf8'));
    const frontmatter = text.match(/^---\n([\s\S]*?)\n---\n/)?.[1] || '';
    const explicitId = frontmatter.match(/^id:\s*(.+)$/m)?.[1].replace(/^['"]|['"]$/g, '');
    const id = explicitId || path.relative(path.join(root, sourceDirectory), file).split(path.sep).join('/').replace(/\.md$/, '');
    requireCondition(keys.includes(locale + ':' + id), `Source article missing from catalogue: ${locale}:${id}`);
  }
  for (const id of sharedIds) requireCondition(keys.includes(locale + ':' + id), `Missing translation: ${locale}:${id}`);
  const relative = locale === config.i18n.defaultLocale ? '' : locale;
  for (const name of ['llms.txt', 'llms-full.txt']) {
    const actual = normalize(fs.readFileSync(path.join(build, relative, name), 'utf8'));
    const expected = normalize(fs.readFileSync(path.join(root, 'static', relative, name), 'utf8'));
    requireCondition(actual === expected, `Incorrect published reading index: ${locale}/${name}`);
    requireCondition(actual.startsWith(`# Sails P2P Safety Center — ${locale}\n`), `Incorrect reading-index language: ${locale}/${name}`);
    for (const guide of catalogue.guides.filter(guide => guide.locale === locale)) {
      requireCondition(actual.includes(guide.url), `Reading index omits ${locale}:${guide.id}`);
      if (name === 'llms-full.txt') requireCondition(actual.includes(normalize(guide.content)), `Full reading index omits article text: ${locale}:${guide.id}`);
    }
  }
}

const resolvePage = pathname => {
  const target = path.resolve(build, '.' + decodeURIComponent(pathname.slice(config.baseUrl.length - 1)));
  if (!target.startsWith(build + path.sep) && target !== build) return undefined;
  return [target, target + '.html', path.join(target, 'index.html')].find(file => fs.existsSync(file) && fs.statSync(file).isFile());
};
for (const guide of catalogue.guides) {
  const url = new URL(guide.url);
  requireCondition(url.origin === config.url && url.pathname.startsWith(config.baseUrl), `Unexpected canonical URL: ${guide.url}`);
  requireCondition(Boolean(resolvePage(url.pathname)), `Missing published guide: ${guide.url}`);
  const sourcePrefix = `https://github.com/${config.organizationName}/${config.projectName}/blob/main/`;
  if (!guide.source.startsWith(sourcePrefix)) { failures.push(`Unexpected source: ${guide.source}`); continue; }
  const sourcePath = path.resolve(root, guide.source.slice(sourcePrefix.length));
  const expectedDirectory = guide.locale === config.i18n.defaultLocale ? 'docs' : `i18n/${guide.locale}/docusaurus-plugin-content-docs/current`;
  requireCondition(sourcePath.startsWith(path.resolve(root, expectedDirectory) + path.sep), `Source language mismatch: ${guide.locale}:${guide.id}`);
  if (!sourcePath.startsWith(root + path.sep) || !fs.existsSync(sourcePath)) { failures.push(`Missing source: ${guide.source}`); continue; }
  const raw = normalize(fs.readFileSync(sourcePath, 'utf8'));
  const body = raw.replace(/^---\n[\s\S]*?\n---\n/, '').replace(/^<\/?SafetyFlow>\s*$/gm, '').trim();
  requireCondition(body === normalize(guide.content), `Catalogue text differs from article: ${guide.locale}:${guide.id}`);
}

const sitemapIndex = fs.readFileSync(path.join(build, 'sitemap-index.xml'), 'utf8');
for (const locale of config.i18n.locales) {
  const relative = locale === config.i18n.defaultLocale ? '' : locale + '/';
  const sitemapUrl = config.url + config.baseUrl + relative + 'sitemap.xml';
  requireCondition(sitemapIndex.includes(`<loc>${sitemapUrl}</loc>`), `Sitemap index omits ${locale}`);
  const sitemap = fs.readFileSync(path.join(build, relative, 'sitemap.xml'), 'utf8');
  for (const guide of catalogue.guides.filter(guide => guide.locale === locale)) {
    requireCondition(sitemap.includes(`<loc>${guide.url}</loc>`), `Sitemap omits guide: ${locale}:${guide.id}`);
  }
}

// Incident decision guide is a React page, not a docs article: gate each locale explicitly.
for (const locale of config.i18n.locales) {
  const relative = locale === config.i18n.defaultLocale ? '' : locale + '/';
  const incidentPath = config.baseUrl + relative + 'incident';
  const page = resolvePage(incidentPath);
  requireCondition(Boolean(page), `Missing incident decision page: ${locale}`);
  if (page) {
    const html = fs.readFileSync(page, 'utf8');
    requireCondition(html.includes('incident-scenario'), `Incident decision selector missing: ${locale}`);
    requireCondition(html.includes('<label for="incident-scenario">'), `Incident selector missing associated label: ${locale}`);
    requireCondition(html.includes('Educational guidance only') || html.includes('Orientação educativa') || html.includes('Orientación educativa'), `Incident safety disclaimer missing: ${locale}`);
  }
  const homePath = config.baseUrl + relative;
  const home = resolvePage(homePath);
  requireCondition(Boolean(home), `Missing localized homepage: ${locale}`);
  if (home) {
    const html = fs.readFileSync(home, 'utf8');
    requireCondition(html.includes('href="' + incidentPath + '"'), `Homepage missing incident guide link: ${locale}`);
  }
}

let linksChecked = 0;
for (const file of walk(build).filter(file => file.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (!href.startsWith(config.baseUrl)) continue;
    const url = new URL(href, config.url);
    const destination = resolvePage(url.pathname);
    linksChecked++;
    requireCondition(Boolean(destination), `Broken destination in ${path.relative(build, file)}: ${href}`);
  }
}
console.log(JSON.stringify({articles: catalogue.guides.length, locales: config.i18n.locales, linksChecked, failures}, null, 2));
if (failures.length) process.exitCode = 1;
