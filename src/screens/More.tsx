import { useNavigate } from 'react-router-dom';
import { useApp } from '../state';
import { faq, sponsors, socials, tournaments } from '../data/tournaments';
import { TopBar, Icon } from '../components/ui';

export default function More() {
  const { selected, toggle, reset, pushOptIn, setPushOptIn } = useApp();
  const nav = useNavigate();
  return (
    <div className="screen">
      <TopBar />
      <h1 className="display" style={{ marginBottom: 16 }}>Meer</h1>

      <div className="card">
        <div className="card-title-row"><h3 className="display">Mijn toernooien</h3></div>
        <div className="chips">
          {tournaments.map((t) => (
            <button key={t.id} className="chip" style={selected.includes(t.id) ? { background: 'var(--white)', color: 'var(--ink-900)', borderColor: 'var(--white)' } : {}} onClick={() => toggle(t.id)}>
              {selected.includes(t.id) ? '✓ ' : '+ '}{t.shortName}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title-row"><h3 className="display">Meldingen</h3><span className={`pill ${pushOptIn ? 'ok' : ''}`}>{pushOptIn ? 'Aan' : 'Uit'}</span></div>
        <p className="muted small" style={{ margin: '0 0 10px' }}>Programma-wijzigingen, verkeersinfo en live-momenten. Gemiddeld 3 per toernooi. [techniek: web push / native]</p>
        <button className="btn btn-ghost" onClick={() => setPushOptIn(!pushOptIn)}>{pushOptIn ? 'Meldingen uitzetten' : 'Meldingen aanzetten'}</button>
      </div>

      <section className="section">
        <div className="section-head"><h3 className="display">Veelgestelde vragen</h3></div>
        {faq.map((f) => (
          <details className="faq" key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
        ))}
      </section>

      <section className="section">
        <div className="section-head"><h3 className="display">Contact</h3></div>
        <div className="list">
          <div className="row"><span className="ico"><Icon name="chat" /></span><span className="body"><span className="title">Vragen over tickets</span><span className="sub">[aanleveren: e-mailadres / telefoon klantenservice]</span></span></div>
          <div className="row"><span className="ico"><Icon name="info" /></span><span className="body"><span className="title">Tijdens het toernooi</span><span className="sub">[aanleveren: infobalie, EHBO, verloren voorwerpen]</span></span></div>
        </div>
      </section>

      <section className="section">
        <div className="section-head"><h3 className="display">Volg schaatsen</h3></div>
        <div className="chips">
          {socials.map((s) => <a key={s.label} className="chip" href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a>)}
        </div>
      </section>

      <section className="section">
        <div className="section-head"><h3 className="display">Partners</h3></div>
        <div className="logo-strip">{sponsors.map((s, i) => <span key={i}>{s}</span>)}</div>
        <p className="faint small" style={{ marginTop: 10 }}>[aanleveren: partnerlogo's + eventuele partnercontent/acties]</p>
      </section>

      <div className="divider" />
      <button className="btn btn-ghost" onClick={() => { reset(); nav('/'); }}>Opnieuw beginnen (reset demo)</button>
      <p className="faint small" style={{ textAlign: 'center', marginTop: 14 }}>Conceptversie 0.2 · #MVS</p>
    </div>
  );
}
