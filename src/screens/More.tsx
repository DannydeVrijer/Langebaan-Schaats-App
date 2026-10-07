import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../state';
import { faq, sponsors, socials, tournaments } from '../data/tournaments';
import { embeds } from '../data/embeds';
import { TopBar, Icon, ShareButton, Quotes, Ph } from '../components/ui';

export default function More() {
  const { selected, toggle, reset, pushOptIn, setPushOptIn, demo, setDemo } = useApp();
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
        <p className="muted small" style={{ margin: '0 0 10px' }}>Programma-wijzigingen, verkeersinfo en live-momenten. Gemiddeld 3 per toernooi. </p>
        <button className="btn btn-ghost" onClick={() => setPushOptIn(!pushOptIn)}>{pushOptIn ? 'Meldingen uitzetten' : 'Meldingen aanzetten'}</button>
      </div>

      <div className="card">
        <div className="card-title-row"><h3 className="display">Samen naar Thialf</h3><Icon name="users" /></div>
        <p className="muted small" style={{ marginBottom: 12 }}>Schaatsen is leuker samen. Stuur de app door en plan jullie toernooi.</p>
        <ShareButton text="Ga je mee schaatsen kijken in Thialf? Alles staat in deze app:" />
      </div>

      <section className="section">
        <div className="section-head"><h3 className="display">Handig</h3></div>
        <div className="list">
          <Link to="/uitleg" className="row"><span className="ico"><Icon name="rules" /></span><span className="body"><span className="title">Zo werkt schaatsen</span><span className="sub">World Cup, allround, sprint, regels, dweilpauze</span></span><Icon name="chev" /></Link>
          {embeds.map((e) => (
            <Link key={e.id} to={`/embed/${e.id}`} className="row"><span className="ico"><Icon name={e.id === 'game' ? 'star' : e.id === 'parkeren' ? 'car' : 'ticket'} /></span><span className="body"><span className="title">{e.title}</span><span className="sub"><Ph text={e.url.startsWith('[') ? e.url : 'Binnen de app'} /></span></span><Icon name="chev" /></Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head"><h3 className="display">Wat schaatsers en fans zeggen</h3></div>
        <Quotes />
      </section>

      <section className="section" id="faq">
        <div className="section-head"><h3 className="display">Veelgestelde vragen</h3></div>
        {faq.map((f) => (
          <details className="faq" key={f.q}><summary>{f.q}</summary><p><Ph text={f.a} /></p></details>
        ))}
      </section>

      <section className="section">
        <div className="section-head"><h3 className="display">Contact</h3></div>
        <div className="list">
          <div className="row"><span className="ico"><Icon name="chat" /></span><span className="body"><span className="title">Vragen over tickets</span><span className="sub"><Ph text="[aanleveren: e-mailadres / telefoon klantenservice]" /></span></span></div>
          <div className="row"><span className="ico"><Icon name="info" /></span><span className="body"><span className="title">Tijdens het toernooi</span><span className="sub"><Ph text="[aanleveren: infobalie, EHBO, verloren voorwerpen]" /></span></span></div>
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
        {demo && <p className="faint small" style={{ marginTop: 10 }}>[aanleveren: partnerlogo's + eventuele partnercontent/acties]</p>}
      </section>

      <div className="divider" />
      <button className="btn btn-ghost" onClick={() => setDemo(!demo)}>{demo ? 'Fan-weergave (verberg placeholders)' : 'Demo-weergave (toon placeholders)'}</button>
      {demo && (
        <>
          <button className="btn btn-ghost" style={{ marginTop: 8 }} onClick={() => { reset(); nav('/'); }}>Opnieuw beginnen (reset demo)</button>
          <p className="faint small" style={{ textAlign: 'center', marginTop: 14 }}>Conceptversie 0.6 · #MVS</p>
        </>
      )}
    </div>
  );
}
