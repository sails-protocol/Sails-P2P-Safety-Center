---
title: Comprender Sails Protocol y sus límites de seguridad
---
# Comprender Sails Protocol y sus límites de seguridad

Sails Protocol define reglas de coordinación económica para aplicaciones entre pares (P2P). Una billetera, marketplace o nodo que usa el protocolo **no se convierte automáticamente** en custodio, banco, árbitro ni garante de pagos.

## 1. ¿Quién controla los fondos?

La arquitectura normativa exige **autocustodia**: la billetera integrada debe conservar el control de sus claves y firmas. Esto **no** significa que todos los proveedores o implementaciones de referencia sean aptos para producción. La referencia `WDK_USDT_EVM`, con custodia del servidor, es explícitamente **no apta para producción**. La vía no custodial `SAFE_GUARD_EVM` es candidata, **no activada en producción**.

Antes de operar, comprueba quién controla las claves, quién firma la liberación, qué mecanismo de liquidación se usa y sus límites. Nunca compartas frases semilla ni claves privadas.

## 2. Protocolo, nodo y marketplace son distintos

El **protocolo** define reglas de coordinación. Un **nodo** es un servicio operado por alguien. Una **aplicación o marketplace** ofrece su propia interfaz y decisiones operativas. Elegir un nodo no equivale a elegir al propietario del mercado ni a quien controla la liquidación.

Un mercado compartido entre operadores independientes es un **objetivo arquitectónico aceptado para Day 0**, no prueba de homologación de la red multioperador, convergencia ni beta con socios. La verificación de evidencias sigue abierta.

## 3. Permiso para actuar no significa autoridad ilimitada

Una **Capability** (capacidad funcional) y una **CapabilityGrant** (permiso otorgado a una identidad, aplicación o agente) son conceptos diferentes. Un mensaje de chat, una captura de un comprobante o una afirmación de un nodo no autorizan por sí mismos cambiar instrucciones de pago comprometidas o liberar escrow. Verifica los términos autenticados y la autoridad real de la aplicación.

## 4. Los datos públicos de la operación no son datos privados de pago

El descubrimiento de ofertas puede necesitar información pública. Los datos bancarios o PIX, la identidad y las pruebas de una disputa no deben considerarse contenido público de ofertas, mensajes de propagación o capturas de pantalla. Comparte solo lo necesario con las partes autorizadas y mediante canales privados admitidos.

## 5. Activo, red, proveedor y madurez son diferentes

El nombre de un token no identifica por sí solo la blockchain, el mecanismo de liquidación, el adaptador de billetera o el proveedor. Comisiones, confirmaciones, finalidad, fallos y liberación pueden variar. Un activo listado, un tipo en el SDK, una implementación de prueba y un mecanismo **habilitado para producción** no son equivalentes.

Por ejemplo, no envíes fondos por una red solo porque el mismo símbolo aparece en la oferta. Verifica activo, red, dirección, importe y mecanismo de liquidación.

## Lista práctica

1. Identifica aplicación, contraparte, operador y mecanismo de liquidación.
2. Comprueba quién conserva las claves y quién autoriza la liberación en esa red.
3. Verifica activo, red, importe e instrucciones en el registro oficial de la operación.
4. Considera reputación, vouch, disputas y alertas automáticas como señales de riesgo, **no garantías**.
5. Si hay discrepancias, detente, conserva identificadores no sensibles y usa el canal oficial de disputas.

**Clasificación:** explicación educativa de límites normativos y arquitectura documentada. Esta página **no** afirma homologación de red multioperador, arbitraje de mercado, reputación descentralizada ni ningún rail en producción.

## Referencias técnicas

- [README de Sails Protocol](https://github.com/sails-protocol/Sails-Protocol/blob/main/README.md)
- [Invariantes del protocolo](https://github.com/sails-protocol/Sails-Protocol/blob/main/docs/PROTOCOL_INVARIANTS.md)
- [ADR-001: arquitectura multioperador](https://github.com/sails-protocol/Sails-Protocol/blob/main/docs/adr/ADR-001-day0-multi-operator-network.md)
- [ADR-002: activo, rail y proveedor](https://github.com/sails-protocol/Sails-Protocol/blob/main/docs/adr/ADR-002-asset-settlement-rail-adapter-provider-architecture.md)
- [RFC-005: capacidades y permisos](https://github.com/sails-protocol/Sails-Protocol/blob/main/docs/rfcs/RFC-005-capability-model.md)
- [RFC-019: custodia y madurez](https://github.com/sails-protocol/Sails-Protocol/blob/main/docs/rfcs/RFC-019-settlement-custody-reference-vs-normative.md)
- [Gate Day 0, Issue #105](https://github.com/sails-protocol/Sails-Protocol/issues/105)
