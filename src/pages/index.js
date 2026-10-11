import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import SafetyIcon from '../components/SafetyIcon';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

const translations = {
  en: {
    aiKicker: 'OPEN KNOWLEDGE',
    title: 'Safety starts before the trade.',
    lead: 'Learn to recognize scams, verify payments, and preserve evidence. Practical guidance for safer peer-to-peer decisions.',
    explore: 'Explore guides', payment: 'Third-party payments',
    quickLabel: 'A practical safety knowledge base', urgent: 'If something looks wrong', urgentBody: 'Pause the trade. Check payment details through trusted channels and keep relevant evidence.', readGuide: 'Read the guide', aiTitle: 'Clear for people. Structured for AI.', aiBody: 'Guides use explicit scenarios, warning signs, actions, and limitations. AI readers can find canonical links and interpretation boundaries in our machine-readable index.', aiLink: 'AI reading index',
    checks: ['Verify the recipient', 'Watch for pressure', 'Preserve evidence'],
    pathsTitle: 'What happened?', pathsIntro: 'Choose a situation to reach the most relevant first step.', paths: [['I received a payment receipt', 'Verify payment independently before releasing assets.', '/guides/fraudes/comprovantes-falsos'], ['The payment recipient changed', 'Check the actual beneficiary and stop if instructions conflict.', '/guides/pagamentos/destinatario-divergente'], ['A dispute has started', 'Preserve original records and use the authorized process.', '/guides/operacoes/gestao-de-evidencias'], ['I trade P2P professionally', 'Follow a repeatable pre-trade and reconciliation workflow.', '/guides/operacoes/checklist-antes-de-negociar']],
    audienceTitle: 'Choose your safety journey', audiences: [['I am new to P2P', 'A step-by-step checklist before sending money or releasing crypto.', '/guides/decisao-segura-p2p'], ['I am a merchant', 'Reconcile payments, protect customer data and document exceptions.', '/guides/operacoes/conciliacao-de-pagamentos'], ['I am an arbitrator', 'Understand impartiality, evidence and the limits of dispute decisions.', '/guides/seguranca-arbitragem']],
    heading: 'Find the guide for your situation',
    subheading: 'Understand warning signs, risks, and next steps before you act.',
    notice: 'Important:', noticeBody: 'This portal provides educational guidance. It does not verify bank accounts, replace official dispute channels, or promise fund recovery.',
    topics: [
      ['Scams and phishing', 'Spot pressure tactics, fake links, and suspicious requests.', '/guides/fraudes/pressao-e-phishing'],
      ['Payments', 'Check recipients and understand third-party payment risks.', '/guides/pagamentos/terceiros'],
      ['Escrow and trades', 'Learn what crypto escrow can and cannot protect.', '/guides/negociacoes/limites-do-escrow'],
      ['Disputes and evidence', 'Know which records to keep and how to protect sensitive data.', '/guides/disputas/preservar-evidencias'],
      ['Identity and privacy', 'Respond to suspected account compromise.', '/guides/identidade/conta-comprometida'],
      ['Professional operations', 'Checklists, reconciliation, and incident response for active traders.', '/guides/operacoes/checklist-antes-de-negociar'],
      ['Start here', 'Understand the portal’s limits and basic safety precautions.', '/guides/']
    ]
  },
  'pt-BR': {
    aiKicker: 'CONHECIMENTO ABERTO',
    title: 'Segurança começa antes da negociação.',
    lead: 'Aprenda a reconhecer fraudes, conferir pagamentos e preservar evidências. Orientação clara para decisões mais informadas em negociações P2P.',
    explore: 'Explorar os guias', payment: 'Pagamento a terceiros',
    quickLabel: 'Base prática de conhecimento em segurança', urgent: 'Se algo parecer errado', urgentBody: 'Interrompa a negociação. Confira os dados de pagamento em canais confiáveis e preserve as evidências.', readGuide: 'Ler o guia', aiTitle: 'Claro para pessoas. Estruturado para IA.', aiBody: 'Os guias apresentam cenários, alertas, ações e limites. Sistemas de IA encontram links oficiais e regras de interpretação em nosso índice.', aiLink: 'Índice para IA',
    checks: ['Confira o beneficiário', 'Desconfie de urgência', 'Preserve evidências'],
    pathsTitle: 'O que aconteceu?', pathsIntro: 'Escolha uma situação para encontrar o primeiro passo mais relevante.', paths: [['Recebi um comprovante', 'Confirme o pagamento no seu banco antes de liberar ativos.', '/guides/fraudes/comprovantes-falsos'], ['O beneficiário mudou', 'Confira o destinatário e pare se houver divergências.', '/guides/pagamentos/destinatario-divergente'], ['Começou uma disputa', 'Preserve os registros originais e siga o processo autorizado.', '/guides/operacoes/gestao-de-evidencias'], ['Opero P2P profissionalmente', 'Use checklists e conciliação em cada negociação.', '/guides/operacoes/checklist-antes-de-negociar']],
    audienceTitle: 'Escolha sua jornada de segurança', audiences: [['Estou começando no P2P', 'Checklist antes de pagar ou liberar criptoativos.', '/guides/decisao-segura-p2p'], ['Sou comerciante', 'Concilie pagamentos, proteja dados e registre exceções.', '/guides/operacoes/conciliacao-de-pagamentos'], ['Sou árbitro', 'Entenda imparcialidade, evidências e limites da arbitragem.', '/guides/seguranca-arbitragem']],
    heading: 'Escolha o guia para sua situação',
    subheading: 'Entenda sinais de alerta, riscos e próximos passos antes de agir.',
    notice: 'Importante:', noticeBody: 'Este portal oferece orientação educativa. Não verifica contas bancárias, não substitui canais oficiais de disputa e não promete recuperar fundos.',
    topics: [
      ['Fraudes e golpes', 'Identifique pressão, phishing e pedidos suspeitos.', '/guides/fraudes/pressao-e-phishing'],
      ['Pagamentos', 'Confira o beneficiário e entenda riscos de pagamentos a terceiros.', '/guides/pagamentos/terceiros'],
      ['Escrow e negociações', 'Entenda o que a proteção de criptoativos cobre e não cobre.', '/guides/negociacoes/limites-do-escrow'],
      ['Disputas e evidências', 'Saiba quais registros preservar e como reduzir a exposição de dados.', '/guides/disputas/preservar-evidencias'],
      ['Identidade e privacidade', 'O que fazer diante de uma conta possivelmente comprometida.', '/guides/identidade/conta-comprometida'],
      ['Operações profissionais', 'Checklists, conciliação e resposta a incidentes.', '/guides/operacoes/checklist-antes-de-negociar'],
      ['Comece por aqui', 'Conheça os limites do portal e os cuidados básicos.', '/guides/']
    ]
  },
  es: {
    aiKicker: 'CONOCIMIENTO ABIERTO',
    title: 'La seguridad comienza antes de operar.',
    lead: 'Aprende a reconocer fraudes, verificar pagos y conservar pruebas. Orientación práctica para tomar decisiones más informadas en operaciones P2P.',
    explore: 'Explorar las guías', payment: 'Pagos de terceros',
    quickLabel: 'Base práctica de conocimientos de seguridad', urgent: 'Si algo parece incorrecto', urgentBody: 'Detén la operación. Verifica los datos de pago por canales confiables y conserva las pruebas.', readGuide: 'Leer la guía', aiTitle: 'Claro para personas. Estructurado para IA.', aiBody: 'Las guías incluyen situaciones, alertas, acciones y límites. Los sistemas de IA pueden consultar enlaces oficiales y criterios de interpretación en nuestro índice.', aiLink: 'Índice para IA',
    checks: ['Verifica al beneficiario', 'Desconfía de la urgencia', 'Conserva pruebas'],
    pathsTitle: '¿Qué ocurrió?', pathsIntro: 'Elige una situación para encontrar el primer paso más útil.', paths: [['Recibí un comprobante', 'Verifica el pago en tu banco antes de liberar activos.', '/guides/fraudes/comprovantes-falsos'], ['Cambió el destinatario', 'Comprueba el beneficiario y detente si hay diferencias.', '/guides/pagamentos/destinatario-divergente'], ['Comenzó una disputa', 'Conserva los registros originales y utiliza el proceso autorizado.', '/guides/operacoes/gestao-de-evidencias'], ['Opero P2P profesionalmente', 'Aplica listas y conciliación en cada operación.', '/guides/operacoes/checklist-antes-de-negociar']],
    audienceTitle: 'Elige tu ruta de seguridad', audiences: [['Soy nuevo en P2P', 'Lista de verificación antes de pagar o liberar criptoactivos.', '/guides/decisao-segura-p2p'], ['Soy comerciante', 'Concilia pagos, protege datos y registra excepciones.', '/guides/operacoes/conciliacao-de-pagamentos'], ['Soy árbitro', 'Comprende imparcialidad, pruebas y límites del arbitraje.', '/guides/seguranca-arbitragem']],
    heading: 'Encuentra la guía para tu situación',
    subheading: 'Conoce las señales de alerta, los riesgos y los próximos pasos antes de actuar.',
    notice: 'Importante:', noticeBody: 'Este portal ofrece información educativa. No verifica cuentas bancarias, no sustituye los canales oficiales de disputas ni promete recuperar fondos.',
    topics: [
      ['Fraudes y phishing', 'Identifica presiones, enlaces falsos y solicitudes sospechosas.', '/guides/fraudes/pressao-e-phishing'],
      ['Pagos', 'Comprueba los destinatarios y los riesgos de pagos de terceros.', '/guides/pagamentos/terceiros'],
      ['Escrow y operaciones', 'Entiende qué puede y qué no puede proteger el escrow.', '/guides/negociacoes/limites-do-escrow'],
      ['Disputas y pruebas', 'Aprende qué registros conservar y cómo proteger tus datos.', '/guides/disputas/preservar-evidencias'],
      ['Identidad y privacidad', 'Qué hacer ante una posible cuenta comprometida.', '/guides/identidade/conta-comprometida'],
      ['Operaciones profesionales', 'Listas, conciliación y respuesta a incidentes.', '/guides/operacoes/checklist-antes-de-negociar'],
      ['Empieza aquí', 'Conoce los límites del portal y las precauciones básicas.', '/guides/']
    ]
  }
};

export default function Home() {
  const {i18n} = useDocusaurusContext();
  const t = translations[i18n.currentLocale] || translations.en;
  const aiIndexUrl = useBaseUrl('/llms.txt');
  const editorial = {
    en: {brand:'SAILS / SAFETY CENTER', kicker:'P2P SAFETY LIBRARY', section:'Start with your situation', library:'Browse the knowledge base', libraryDesc:'Focused guidance, organized by the risks you need to understand.', note:'Before you proceed', resources:'Resources and transparency', resourceLabel:'Machine-readable guide index', view:'Open guide'},
    'pt-BR': {brand:'SAILS / CENTRO DE SEGURANÇA', kicker:'BIBLIOTECA DE SEGURANÇA P2P', section:'Comece pela sua situação', library:'Biblioteca de segurança', libraryDesc:'Orientações organizadas pelos riscos que você precisa compreender.', note:'Antes de continuar', resources:'Recursos e transparência', resourceLabel:'Índice de guias para sistemas de IA', view:'Abrir guia'},
    es: {brand:'SAILS / CENTRO DE SEGURIDAD', kicker:'BIBLIOTECA DE SEGURIDAD P2P', section:'Empieza por tu situación', library:'Biblioteca de seguridad', libraryDesc:'Guías organizadas por los riesgos que necesitas comprender.', note:'Antes de continuar', resources:'Recursos y transparencia', resourceLabel:'Índice de guías para sistemas de IA', view:'Abrir guía'}
  }[i18n.currentLocale] || {
    brand:'SAILS / SAFETY CENTER', kicker:'P2P SAFETY LIBRARY', section:'Start with your situation', library:'Browse the knowledge base', libraryDesc:'Focused guidance, organized by the risks you need to understand.', note:'Before you proceed', resources:'Resources and transparency', resourceLabel:'Machine-readable guide index', view:'Open guide'
  };
  return (
    <Layout title={t.title} description={t.lead}>
      <main className="editorialHome">
        <header className="editorialHero">
          <div className="container editorialContainer">
            <p className="editorialEyebrow"><span className="editorialBrandMark" aria-hidden="true"/> {editorial.kicker}</p>
            <h1>{t.title}</h1>
            <p className="editorialIntro">{t.lead}</p>
            <div className="editorialHeroActions">
              <Link className="editorialPrimary" to="#library-heading">{t.explore} <SafetyIcon name="arrow"/></Link>
              <Link className="editorialSecondary" to="/guides/pagamentos/terceiros">{t.payment} <SafetyIcon name="arrow"/></Link>
            </div>
          </div>
        </header>
        <section className="editorialSection editorialSituations" aria-labelledby="situations-heading">
          <div className="container editorialContainer">
            <div className="editorialSectionHeading">
              <div><p className="editorialSectionLabel">01 / {editorial.section}</p><h2 id="situations-heading">{t.pathsTitle}</h2><p>{t.pathsIntro}</p></div>
            </div>
            <div className="editorialSituationList">
              {t.paths.map(([title,description,to],index) => (
                <Link to={to} className="editorialSituation" key={to}>
                  <span className="editorialIndex">{String(index+1).padStart(2,'0')}</span>
                  <span className="editorialSituationCopy"><strong>{title}</strong><span>{description}</span></span>
                  <SafetyIcon name="arrow" className="editorialRowArrow"/>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="editorialSection editorialLibrary" aria-labelledby="library-heading">
          <div className="container editorialContainer">
            <div className="editorialSectionHeading"><div><p className="editorialSectionLabel">02 / {editorial.library}</p><Heading as="h2" id="library-heading">{editorial.library}</Heading><p>{editorial.libraryDesc}</p></div></div>
            <Link className="editorialStart" to="/guides/">{t.topics[6][0]}<span>{t.topics[6][1]}</span><span aria-hidden="true"><SafetyIcon name="arrow"/></span></Link>
            <div className="editorialTopicGrid">
              {t.topics.slice(0, 6).map(([title,description,to],index) => (
                <Link className="editorialTopic" to={to} key={to}>
                  <div className="editorialTopicTitle"><SafetyIcon name={['fraud','payment','escrow','evidence','privacy','operations'][index]}/><h3>{title}</h3></div><p>{description}</p><span className="editorialTopicLink">{editorial.view} <SafetyIcon name="arrow"/></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="editorialSection editorialBottom" aria-labelledby="safety-note-heading">
          <div className="container editorialContainer">
            <div className="editorialNotice"><div><p className="editorialSectionLabel">{editorial.note}</p><h2 id="safety-note-heading">{t.urgent}</h2><p>{t.urgentBody}</p><p className="editorialLimit"><strong>{t.notice}</strong> {t.noticeBody}</p></div><Link to="/guides/fraudes/pressao-e-phishing">{t.readGuide} <SafetyIcon name="arrow"/></Link></div>
            <div className="editorialResources"><span>{editorial.resources}</span><a href={aiIndexUrl}>{editorial.resourceLabel} <SafetyIcon name="arrow"/></a></div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
