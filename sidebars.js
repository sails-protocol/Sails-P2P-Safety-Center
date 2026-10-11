module.exports = {
  safetySidebar: [
    {type: 'doc', id: 'intro'},
    {type: 'category', label: 'Scams and phishing', link: {type: 'doc', id: 'fraudes/pressao-e-phishing'}, items: ['fraudes/comprovantes-falsos', 'fraudes/reputation-farming', 'fraudes/falsa-arbitragem', 'fraudes/pressao-por-avaliacao']},
    {type: 'category', label: 'Payments', link: {type: 'doc', id: 'pagamentos/terceiros'}, items: ['pagamentos/destinatario-divergente', 'pagamentos/reversao-e-estorno', 'pagamentos/conta-mula', 'pagamentos/valor-divergente']},
    {type: 'category', label: 'Escrow and trades', link: {type: 'doc', id: 'negociacoes/limites-do-escrow'}, items: ['negociacoes/falsa-liquidez', 'negociacoes/conferir-envio']},
    {type: 'category', label: 'Disputes and evidence', link: {type: 'doc', id: 'disputas/preservar-evidencias'}, items: ['disputas/privacidade-das-evidencias', 'disputas/seguranca-arbitragem']},
    {type: 'doc', id: 'identidade/conta-comprometida'},
    {type: 'category', label: 'Professional trader operations', link: {type: 'doc', id: 'operacoes/checklist-antes-de-negociar'}, items: ['operacoes/conciliacao-de-pagamentos', 'operacoes/gestao-de-evidencias', 'operacoes/resposta-a-incidentes', 'operacoes/resultado-desconhecido', 'operacoes/limites-dos-alertas-de-ia', 'operacoes/decisao-segura-p2p']},
    {type: 'doc', id: 'editorial-policy'}
  ]
};