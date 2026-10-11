import React, {useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const copy = {
  en: ['Search guides', 'Search by risk, topic, or keyword', 'No results found'],
  'pt-BR': ['Buscar guias', 'Busque por risco, tema ou palavra-chave', 'Nenhum resultado encontrado'],
  es: ['Buscar guías', 'Busca por riesgo, tema o palabra clave', 'No se encontraron resultados']
};
export default function SearchPage() {
  const {i18n, siteConfig} = useDocusaurusContext();
  const [query, setQuery] = useState('');
  const [guides, setGuides] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);
  const indexUrl = siteConfig.baseUrl + 'knowledge/index.json';
  const [title, placeholder, empty] = copy[i18n.currentLocale] || copy.en;
  const loadingText = {en:'Loading guides…','pt-BR':'Carregando guias…',es:'Cargando guías…'}[i18n.currentLocale] || 'Loading guides…';
  const errorMessage = {en:'Search index unavailable. Please try again later.', 'pt-BR':'A pesquisa está indisponível. Tente novamente mais tarde.', es:'La búsqueda no está disponible. Inténtalo de nuevo más tarde.'}[i18n.currentLocale] || 'Search index unavailable.';
  useEffect(() => {
    let active = true;
    fetch(indexUrl).then(r => {if (!r.ok) throw Error('index unavailable'); return r.json();})
      .then(data => {if (active) setGuides(data.guides || []);})
      .catch(() => {if (active) setLoadError(true);})
      .finally(() => {if (active) setLoading(false);});
    return () => {active = false;};
  }, [indexUrl]);
  const matches = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    if (!needle) return [];
    return guides.filter(g => g.locale === i18n.currentLocale &&
      [g.title, g.content].some(v => String(v || '').toLocaleLowerCase().includes(needle)))
      .sort((a,b) => Number(String(b.title || '').toLocaleLowerCase().includes(needle)) - Number(String(a.title || '').toLocaleLowerCase().includes(needle)))
      .slice(0, 40);
  }, [query, guides, i18n.currentLocale]);
  return <Layout title={title}><main className="container margin-vert--lg">
    <h1>{title}</h1>
    <label htmlFor="safety-search">{placeholder}</label>
    <input id="safety-search" type="search" value={query} onChange={e => setQuery(e.target.value)}
      placeholder={placeholder} autoFocus
      style={{display:'block',width:'100%',maxWidth:720,padding:14,margin:'12px 0 24px',borderRadius:8,border:'1px solid var(--ifm-color-emphasis-400)',background:'var(--ifm-background-color)',color:'var(--ifm-font-color-base)'}}/>
    {loading && <p role="status">{loadingText}</p>}
    {loadError && <p role="alert">{errorMessage}</p>}
    {query.trim() && !loadError && !loading && <div aria-live="polite">{matches.length === 0 ? <p>{empty}</p> :
      <ul>{matches.map(g => <li key={g.url} className="margin-bottom--md">
        <Link to={g.url}><strong>{g.title}</strong></Link>
      </li>)}</ul>}</div>}
  </main></Layout>;
}
