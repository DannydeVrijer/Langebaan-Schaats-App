import { Link, useParams } from 'react-router-dom';
import { explainTopics } from '../data/uitleg';
import { TopBar, BackLink, Icon, Ph } from '../components/ui';

/** Overzicht: zo werkt schaatsen */
export default function Explain() {
  return (
    <div className="screen">
      <TopBar />
      <span className="eyebrow">Voor elke fan</span>
      <h1 className="display" style={{ marginBottom: 6 }}>Zo werkt schaatsen</h1>
      <p className="muted" style={{ marginBottom: 16 }}>Van World Cup tot dweilpauze: alles wat je wilt weten voordat je op de tribune zit.</p>
      <div className="explain-grid">
        {explainTopics.map((t) => (
          <Link key={t.id} to={`/uitleg/${t.id}`} className="explain-card">
            <span className="ico"><Icon name={t.icon} /></span>
            <span className="t">{t.title}</span>
            <span className="s">{t.teaser}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ExplainDetail() {
  const { id } = useParams();
  const t = explainTopics.find((x) => x.id === id);
  if (!t) return <div className="screen"><TopBar /><BackLink to="/uitleg" label="Uitleg" /><p>Onderwerp niet gevonden.</p></div>;
  const others = explainTopics.filter((x) => x.id !== t.id).slice(0, 3);
  return (
    <div className="screen">
      <BackLink to="/uitleg" label="Zo werkt schaatsen" />
      <span className="eyebrow">Uitleg</span>
      <h1 className="display" style={{ fontSize: 34, marginBottom: 14 }}>{t.title}</h1>
      <dl className="glossary" style={{ margin: 0 }}>
        {t.sections.map((s) => (
          <div key={s.h}>
            <dt>{s.h}</dt>
            <dd><Ph text={s.p} /></dd>
          </div>
        ))}
      </dl>
      <section className="section">
        <div className="section-head"><h3 className="display">Lees ook</h3></div>
        <div className="list">
          {others.map((o) => (
            <Link key={o.id} to={`/uitleg/${o.id}`} className="row">
              <span className="ico"><Icon name={o.icon} /></span>
              <span className="body"><span className="title">{o.title}</span><span className="sub">{o.teaser}</span></span>
              <Icon name="chev" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
