---
title: Understanding Sails Protocol: trust and safety boundaries
---
# Understanding Sails Protocol: trust and safety boundaries

Sails Protocol defines economic coordination rules for peer-to-peer applications. A wallet, marketplace or node using the protocol is **not automatically** a custodial service, a bank, an arbitrator, or a guarantee that a payment will settle.

## 1. Who controls the funds?

**Non-custodial** is a requirement of the protocol's normative architecture: an integrating wallet should retain its own key and signing stack. It does **not** mean that every provider or reference implementation in the repository is production-safe. The server-custodial `WDK_USDT_EVM` reference path is explicitly **production-ineligible**; the non-custodial `SAFE_GUARD_EVM` path is a candidate, **not production-activated**.

Before using an application, verify the actual custody model, who signs a release, the selected settlement rail, and its documented limitations. Never share seed phrases or private keys.

## 2. Protocol, node and marketplace are different

The **protocol** defines coordination semantics. A **node** is an operator's service. An **application or marketplace** provides its own interface and operational choices. Choosing a node must not be confused with choosing who owns the market or who controls settlement.

A shared, multi-operator market is an **accepted Day 0 architectural objective**, not proof that independent operators, network convergence or partner beta have been homologated. The evidence gate remains open.

## 3. Permission to act is not unlimited authority

A functional **Capability** and a **CapabilityGrant** (permission for an identity, application or agent to act) are distinct concepts. A message in chat, a payment screenshot or a node's assertion must not be treated as an authorization to change committed payment instructions or release escrow. Verify the actual signed terms and application-specific authority.

## 4. Public trade data is not private payment data

Offer discovery and market coordination may require public information. Private bank or PIX details, identity records and dispute evidence must not be assumed to belong in public offers, gossip messages or screenshots. Share only what the authorized counterparty or dispute process needs, using supported private channels.

## 5. Asset, network, provider and readiness are different

A token's name does not uniquely identify its blockchain, settlement rail, wallet adapter or provider. Fees, confirmation/finality rules, failure handling and release mechanisms can differ. A listed asset, available SDK type, test implementation and production-enabled settlement path are **not equivalent**.

For example, do not send funds on a network merely because the same asset ticker appears in a listing. Verify the exact asset, network, address, amount and applicable settlement mechanism.

## Practical checklist

1. Identify the actual application, counterparty, operator and settlement mechanism.
2. Verify custody and signing authority for that specific rail.
3. Check the exact asset, network, amount and payment instructions in the official trade record.
4. Treat reputation, vouch, dispute options and automated warnings as risk information, **not guarantees**.
5. If any detail conflicts, pause, preserve non-sensitive identifiers and use the official dispute path.

**Claim classification:** Educational explanation of normative boundaries and documented architecture. This page does **not** claim that multi-operator networking, market arbitration, decentralized reputation or any settlement rail is production-approved.

## Technical references

- [Sails Protocol README](https://github.com/sails-protocol/Sails-Protocol/blob/main/README.md)
- [Protocol invariants](https://github.com/sails-protocol/Sails-Protocol/blob/main/docs/PROTOCOL_INVARIANTS.md)
- [ADR-001 multi-operator architecture](https://github.com/sails-protocol/Sails-Protocol/blob/main/docs/adr/ADR-001-day0-multi-operator-network.md)
- [ADR-002 asset/rail/provider distinctions](https://github.com/sails-protocol/Sails-Protocol/blob/main/docs/adr/ADR-002-asset-settlement-rail-adapter-provider-architecture.md)
- [RFC-005 capability model](https://github.com/sails-protocol/Sails-Protocol/blob/main/docs/rfcs/RFC-005-capability-model.md)
- [RFC-019 custody status](https://github.com/sails-protocol/Sails-Protocol/blob/main/docs/rfcs/RFC-019-settlement-custody-reference-vs-normative.md)
- [Day 0 evidence gate #105](https://github.com/sails-protocol/Sails-Protocol/issues/105)
