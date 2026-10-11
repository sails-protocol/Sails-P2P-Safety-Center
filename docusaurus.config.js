// @ts-check
const config = {
  title: 'Sails P2P Safety Center',
  tagline: 'Safer peer-to-peer trading starts with better information',
  favicon: 'img/favicon.svg',
  url: 'https://sails-protocol.github.io',
  baseUrl: '/Sails-P2P-Safety-Center/',
  customFields: {knowledgeBaseUrl: '/Sails-P2P-Safety-Center/'},
  organizationName: 'sails-protocol',
  projectName: 'Sails-P2P-Safety-Center',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  i18n: {defaultLocale: 'en', locales: ['en', 'pt-BR', 'es'], localeConfigs: {en: {label: 'English'}, 'pt-BR': {label: 'Português'}, es: {label: 'Español'}}},
  presets: [['classic', {
    docs: {routeBasePath: 'guides', sidebarPath: './sidebars.js'},
    blog: false,
    theme: {customCss: './src/css/custom.css'}
  }]],
  themeConfig: {
    navbar: {title: 'Sails Safety Center', items: [
      {to: '/', label: 'Home', position: 'left', activeBaseRegex: '^/Sails-P2P-Safety-Center(?:/(?:pt-BR|es))?/?$'},
      {type: 'docSidebar', sidebarId: 'safetySidebar', position: 'left', label: 'Guides'},
      {to: '/search', label: 'Pesquisa', position: 'right', className: 'navbar-search-icon', 'aria-label': 'Pesquisa'},
      {type: 'localeDropdown', position: 'right'},
      {href: 'https://github.com/sails-protocol/Sails-P2P-Safety-Center', label: 'GitHub', position: 'right'}
    ]},
    footer: {style: 'dark', links: [
      {title: 'Safety', items: [{label: 'Start here', to: '/guides/'}, {label: 'Third-party payments', to: '/guides/pagamentos/terceiros'}]},
      {title: 'Project', items: [{label: 'Safety Center repository', href: 'https://github.com/sails-protocol/Sails-P2P-Safety-Center'}, {label: 'Sails Protocol — code and technical documentation', href: 'https://github.com/sails-protocol/Sails-Protocol'}]}
    ], copyright: `© ${new Date().getFullYear()} Sails Protocol. Educational content, not a settlement guarantee.`},
    colorMode: {defaultMode: 'dark', respectPrefersColorScheme: true},
  },
};
module.exports = config;
