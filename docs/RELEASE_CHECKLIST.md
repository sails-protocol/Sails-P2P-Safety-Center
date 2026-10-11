---
id: release-checklist
title: Publication verification checklist
sidebar_position: 100
---

# Publication verification checklist

This checklist is a release gate, not a claim that the current branch is deployed.

## Technical gate
- [ ] Exact-head GitHub Actions build, tests and publication checks succeed.
- [ ] Confirm every new guide is present in EN, PT-BR and ES with the intended canonical routes.
- [ ] Confirm the generated knowledge index, sitemaps, localized llms.txt and direct links include new guides.
- [ ] Test search with title matches, content matches, no results, load errors and keyboard navigation.
- [ ] Test navbar and articles at mobile widths and with visible keyboard focus.

## Editorial gate
- [ ] Verify statements about Sails Protocol against current normative source and deployment evidence.
- [ ] Distinguish general safety guidance, proposed policy, approved policy and implemented functionality.
- [ ] Review privacy, payment-method differences, accessibility and translations.
- [ ] Confirm arbitration guidance does not imply live collateral, slashing or governance.

## Production gate
- [ ] Merge only after the above checks are recorded.
- [ ] Confirm GitHub Pages deployment succeeds on the merged main commit.
- [ ] Check public routes and mobile navigation on the deployed site.
- [ ] Record release SHA and follow-up issues for any checks that could not be performed.

A successful CI build is necessary but does not replace human editorial and browser verification.
