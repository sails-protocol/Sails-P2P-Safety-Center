---
title: Entenda o Sails Protocol e seus limites de segurança
---
# Entenda o Sails Protocol e seus limites de segurança

O Sails Protocol define regras de coordenação econômica para aplicações entre pares (P2P). Uma carteira, marketplace ou nó que utiliza o protocolo **não se torna automaticamente** um custodiante, banco, árbitro ou garantidor de pagamentos.

## 1. Quem controla os fundos?

A arquitetura normativa exige **autocustódia**: a carteira integrada deve manter o controle das próprias chaves e assinaturas. Isso **não** significa que todo provedor ou implementação de referência do repositório seja seguro para produção. A referência `WDK_USDT_EVM`, com custódia no servidor, é explicitamente **inelegível para produção**. O caminho não custodial `SAFE_GUARD_EVM` é candidato, **não ativado em produção**.

Antes de operar, confira quem controla as chaves, quem assina a liberação, qual mecanismo de liquidação será usado e seus limites. Nunca compartilhe frases-semente ou chaves privadas.

## 2. Protocolo, nó e marketplace são coisas diferentes

O **protocolo** define as regras de coordenação. O **nó** é um serviço operado por alguém. A **aplicação ou marketplace** fornece a interface e toma decisões operacionais próprias. Escolher um nó não significa escolher quem é dono do mercado nem quem controla a liquidação.

Um mercado compartilhado entre operadores independentes é um **objetivo arquitetural aceito para o Day 0**, não uma comprovação de homologação da rede multioperador, convergência ou beta com parceiros. O gate de evidências continua aberto.

## 3. Permissão para agir não é autoridade ilimitada

Uma **Capability** (capacidade funcional) e uma **CapabilityGrant** (permissão concedida a uma identidade, aplicação ou agente) são conceitos distintos. Uma mensagem de chat, imagem de comprovante ou declaração de um nó não autoriza, por si só, alterar instruções de pagamento comprometidas ou liberar escrow. Confira os termos autenticados e as autorizações efetivamente disponíveis.

## 4. Dados públicos da negociação não são dados privados de pagamento

A descoberta de ofertas pode exigir informações públicas. Dados bancários ou PIX, identidade e evidências de disputa não devem ser tratados como conteúdo público de ofertas, mensagens de propagação ou capturas de tela. Compartilhe apenas o necessário com as partes autorizadas e pelos canais privados suportados.

## 5. Ativo, rede, provedor e maturidade são coisas diferentes

O nome de um token não identifica sozinho a blockchain, o mecanismo de liquidação, o adaptador da carteira ou o provedor. Taxas, confirmações, finalidade, falhas e liberação podem variar. Um ativo listado, um tipo presente no SDK, uma implementação de teste e um mecanismo **habilitado para produção** não são equivalentes.

Por exemplo, não envie fundos para uma rede só porque o mesmo ticker aparece na oferta. Confira ativo, rede, endereço, valor e mecanismo de liquidação.

## Checklist prático

1. Identifique aplicação, contraparte, operador e mecanismo de liquidação.
2. Confira quem detém as chaves e quem autoriza a liberação naquela rede.
3. Verifique ativo, rede, valor e instruções no registro oficial da negociação.
4. Trate reputação, vouch, disputas e alertas automáticos como sinais de risco, **não garantias**.
5. Se houver divergência, pause, preserve identificadores não sensíveis e use o canal oficial de disputa.

**Classificação:** explicação educativa de limites normativos e arquitetura documentada. Este artigo **não** afirma homologação de rede multioperador, arbitragem de mercado, reputação descentralizada ou qualquer rail em produção.

## Referências técnicas

- [README do Sails Protocol](https://github.com/sails-protocol/Sails-Protocol/blob/main/README.md)
- [Invariantes do protocolo](https://github.com/sails-protocol/Sails-Protocol/blob/main/docs/PROTOCOL_INVARIANTS.md)
- [ADR-001: arquitetura multioperador](https://github.com/sails-protocol/Sails-Protocol/blob/main/docs/adr/ADR-001-day0-multi-operator-network.md)
- [ADR-002: ativo, rail e provedor](https://github.com/sails-protocol/Sails-Protocol/blob/main/docs/adr/ADR-002-asset-settlement-rail-adapter-provider-architecture.md)
- [RFC-005: capacidades e permissões](https://github.com/sails-protocol/Sails-Protocol/blob/main/docs/rfcs/RFC-005-capability-model.md)
- [RFC-019: custódia e maturidade](https://github.com/sails-protocol/Sails-Protocol/blob/main/docs/rfcs/RFC-019-settlement-custody-reference-vs-normative.md)
- [Gate Day 0, Issue #105](https://github.com/sails-protocol/Sails-Protocol/issues/105)
