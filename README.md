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

## Published release status and source review

**The Day 0 educational content baseline is published** on GitHub Pages at https://sails-protocol.github.io/Sails-P2P-Safety-Center/. The content scope is distinct from the Sails Protocol runtime Day 0 production gate.

- The public site supports EN, PT-BR and ES, including the incident triage page.
- On Safety Center main commit `7ebbe23d7ea55095a32db47ba58dea40d8d4d10f`, Docusaurus build/deploy, Chromium smoke and live production smoke passed (runs `38205868059`, `38205868052`, `38205946628`). This is the last independently verified production baseline at the time of the documentation audit, not proof that the present PR is deployed.
- The product owner reported successful manual desktop and mobile checks in all three languages.
- Human keyboard-only and screen-reader sign-off is still tracked in [issue #21](https://github.com/sails-protocol/Sails-P2P-Safety-Center/issues/21). Automated checks do not establish full WCAG conformance.
- V2.3 discovery is tracked in [issue #25](https://github.com/sails-protocol/Sails-P2P-Safety-Center/issues/25). The Day 0 editorial scope was closed with evidence in [issue #33](https://github.com/sails-protocol/Sails-P2P-Safety-Center/issues/33).
- [GitHub source traceability](editorial/GITHUB_SOURCE_TRACEABILITY.md) maps existing articles to protocol documents and defines when a merged/homologated change warrants editorial review. Open protocol PRs #576/#577 are context, not published capabilities.

### Publication rules

Only a push to `main` deploys the GitHub Pages site. A green PR build is not a production deployment. Before merging, verify exact-head CI and the [publication checklist](docs/RELEASE_CHECKLIST.md). After merging, verify main deployment and live-production smoke. Keep editorial claims limited to evidence and do not imply unimplemented protocol guarantees.

## License

The repository's MIT license applies to software unless otherwise specified. A separate content license for educational articles will be selected before publication.

