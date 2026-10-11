import React, {useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const copy = {
 en: {title:'Something went wrong in a P2P trade?',intro:'Choose what happened. This guide does not assess your transaction or collect personal information.',label:'What happened?',placeholder:'Choose a situation',options:[['receipt','I received a payment receipt'],['recipient','Payment recipient changed'],['dispute','A dispute or arbitration started'],['pressure','Someone is pressuring me']],actions:{receipt:['Do not release assets based on a screenshot. Verify funds in your own bank or payment provider.','/guides/fraudes/comprovantes-falsos'],recipient:['Pause and independently verify recipient details. Do not follow unexpected off-platform changes.','/guides/pagamentos/destinatario-divergente'],dispute:['Preserve original records, minimize exposure of personal data and use the authorized dispute channel.','/guides/disputas/preservar-evidencias'],pressure:['Stop responding to pressure and verify communications through the official platform.','/guides/fraudes/pressao-e-phishing']},read:'Read the safety guide',warning:'Educational guidance only. No bank settlement verification, fraud detection, or guaranteed recovery.'},
 'pt-BR': {title:'Algo deu errado na negociação P2P?',intro:'Escolha o que aconteceu. Este guia não avalia sua transação nem coleta dados pessoais.',label:'O que aconteceu?',placeholder:'Escolha uma situação',options:[['receipt','Recebi um comprovante'],['recipient','Mudaram o beneficiário'],['dispute','Começou uma disputa ou arbitragem'],['pressure','Estão me pressionando']],actions:{receipt:['Não libere ativos com base em imagem de comprovante. Confira o saldo no seu banco ou provedor de pagamento.','/guides/fraudes/comprovantes-falsos'],recipient:['Pare e confira os dados do destinatário de forma independente. Não aceite mudanças inesperadas fora da plataforma.','/guides/pagamentos/destinatario-divergente'],dispute:['Preserve registros originais, reduza exposição de dados pessoais e use o canal formal de disputa.','/guides/disputas/preservar-evidencias'],pressure:['Não ceda à pressão. Confirme a comunicação pelo canal oficial da plataforma.','/guides/fraudes/pressao-e-phishing']},read:'Ler o guia de segurança',warning:'Orientação educativa. Não verifica liquidação bancária, não detecta fraude automaticamente e não garante recuperação.'},
 es: {title:'¿Algo salió mal en tu operación P2P?',intro:'Elige qué ocurrió. Esta guía no evalúa tu transacción ni recopila datos personales.',label:'¿Qué ocurrió?',placeholder:'Elige una situación',options:[['receipt','Recibí un comprobante'],['recipient','Cambió el beneficiario'],['dispute','Comenzó una disputa o arbitraje'],['pressure','Alguien me está presionando']],actions:{receipt:['No liberes activos basándote en una captura. Verifica los fondos en tu propio banco o proveedor de pagos.','/guides/fraudes/comprovantes-falsos'],recipient:['Detente y comprueba los datos del destinatario de manera independiente. No aceptes cambios inesperados fuera de la plataforma.','/guides/pagamentos/destinatario-divergente'],dispute:['Conserva registros originales, limita la exposición de datos personales y usa el canal formal de disputas.','/guides/disputas/preservar-evidencias'],pressure:['No cedas a la presión. Verifica la comunicación por el canal oficial de la plataforma.','/guides/fraudes/pressao-e-phishing']},read:'Leer la guía de seguridad',warning:'Orientación educativa. No verifica liquidación bancaria, no detecta fraude automáticamente ni garantiza recuperación.'}
};
export default function IncidentGuide() {
 const {i18n}=useDocusaurusContext();
 const t=copy[i18n.currentLocale] || copy.en;
 const [scenario,setScenario]=useState('');
 const selected=t.actions[scenario];
 return <Layout title={t.title} description={t.intro}><main className="container margin-vert--lg" style={{maxWidth:850}}>
  <h1>{t.title}</h1><p>{t.intro}</p>
  <label htmlFor="incident-scenario">{t.label}</label>
  <select id="incident-scenario" value={scenario} onChange={e=>setScenario(e.target.value)} style={{display:'block',width:'100%',padding:14,margin:'12px 0 24px',background:'var(--ifm-background-color)',color:'var(--ifm-font-color-base)',border:'1px solid var(--ifm-color-emphasis-400)',borderRadius:8}}>
   <option value="">{t.placeholder}</option>{t.options.map(([id,label])=><option key={id} value={id}>{label}</option>)}
  </select>
  {selected && <section aria-live="polite"><h2>{t.options.find(([id])=>id===scenario)?.[1]}</h2><p>{selected[0]}</p><p><Link to={selected[1]}>{t.read}</Link></p></section>}
  <p><small>{t.warning}</small></p>
 </main></Layout>;
}
