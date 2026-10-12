# Sails P2P Safety Center

Open-source P2P safety knowledge base built with Docusaurus. Independent from Sails Protocol economic runtime.

## Local development

Requires Node.js 22 or newer.

```bash
npm ci
npm start
```

To verify a production build:

```bash
npm run build
npm run serve
```

## Source of truth

- This repository owns the public Safety Center site, articles, visual design and translations.
- [Sails Protocol](https://github.com/sails-protocol/Sails-Protocol) owns normative economic and technical policies.
- Changes are reviewed through Pull Requests. An approved policy is not automatically an implemented guarantee.

## Content rules

Never publish personally identifying payment details, secrets, private dispute evidence or unverified security guarantees. See [Editorial Policy](docs/EDITORIAL_POLICY.md) and [Contributing](CONTRIBUTING.md).

## Published release status

**V2.2 is published** on GitHub Pages at https://sails-protocol.github.io/Sails-P2P-Safety-Center/.

- The public site supports EN, PT-BR and ES, including the incident triage page.
- On main commit `12e6a863bca83b9484be0830f7e10a939e09beb5`, Docusaurus build/deploy, local Chromium smoke with automated axe-core WCAG 2.1 A/AA checks, and live production Chromium smoke passed (runs `38189551071`, `38189551112`, `38189656017`).
- The product owner reported successful manual desktop and mobile checks in all three languages.
- Human keyboard-only and screen-reader sign-off is still tracked in [issue #21](https://github.com/sails-protocol/Sails-P2P-Safety-Center/issues/21). Automated checks do not establish full WCAG conformance.
- V2.3 discovery is tracked in [issue #25](https://github.com/sails-protocol/Sails-P2P-Safety-Center/issues/25).

### Publication rules

Only a push to `main` deploys the GitHub Pages site. A green PR build is not a production deployment. Before merging, verify exact-head CI and the [publication checklist](docs/RELEASE_CHECKLIST.md). After merging, verify main deployment and live-production smoke. Keep editorial claims limited to evidence and do not imply unimplemented protocol guarantees.

## License

The repository's MIT license applies to software unless otherwise specified. A separate content license for educational articles will be selected before publication.

