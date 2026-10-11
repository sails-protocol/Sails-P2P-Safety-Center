import React, {useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const copy = {
  en: ['Search guides', 'Search by risk, topic, or keyword', 'No results found'],
  'pt-BR': ['Buscar guias', 'Busque por risco, tema ou palavra-chave', 'Nenhum resultado encontrado'],
  es: ['Buscar guías', 'Busca por riesgo, tema o palabra clave', 'No se encontraron resultados']
};
export default function SearchPage() {
  const {i18n} = useDocusaurusContext();
  const [query, setQuery] = useState('');
  const [guides, setGuides] = useState([]);
  const indexUrl = useBaseUrl('/knowledge/index.json');
  const [title, placeholder, empty] = copy[i18n.currentLocale] || copy.en;
  useEffect(() => {
    let active = true;
    fetch(indexUrl).then(r => {if (!r.ok) throw Error('index unavailable'); return r.json();})
      .then(data => {if (active) setGuides(data.guides || []);})
      .catch(() => {if (active) setGuides([]);});
    return () => {active = false;};
  }, [indexUrl]);
  const matches = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    if (!needle) return [];
    return guides.filter(g => g.locale === i18n.currentLocale &&
      [g.title, g.description, g.content].some(v => String(v || '').toLocaleLowerCase().includes(needle))).slice(0, 40);
  }, [query, guides, i18n.currentLocale]);
  return <Layout title={title}><main className="container margin-vert--lg">
    <h1>{title}</h1>
    <label htmlFor="safety-search">{placeholder}</label>
    <input id="safety-search" type="search" value={query} onChange={e => setQuery(e.target.value)}
      placeholder={placeholder} autoFocus
      style={{display:'block',width:'100%',maxWidth:720,padding:14,margin:'12px 0 24px',borderRadius:8,border:'1px solid var(--ifm-color-emphasis-400)',background:'var(--ifm-background-color)',color:'var(--ifm-font-color-base)'}}/>
    {query.trim() && <div aria-live="polite">{matches.length === 0 ? <p>{empty}</p> :
      <ul>{matches.map(g => <li key={g.url} className="margin-bottom--md">
        <Link to={g.url}><strong>{g.title}</strong></Link>
      </li>)}</ul>}</div>}
  </main></Layout>;
}
