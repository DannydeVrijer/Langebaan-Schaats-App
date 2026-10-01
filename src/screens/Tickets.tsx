import { useState } from 'react';
import { useApp } from '../state';
import { tournaments, dateRange } from '../data/tournaments';
import { TopBar, Icon, StatusPill, MiniCountdown, Badge, SocialProof, Urgency } from '../components/ui';

export default function Tickets() {
  const { selected, email, setEmail } = useApp();
  const [draft, setDraft] = useState('');
  const order = [...tournaments].sort((a, b) => Number(selected.includes(b.id)) - Number(selected.includes(a.id)) || a.start.localeCompare(b.start));
  return (
    <div className="screen">
      <TopBar />
      <span className="official">Officiële ticketshop · schaatsen.nl</span>
      <h1 className="display" style={{ marginTop: 6, marginBottom: 8 }}>Tickets</h1>
      <p className="muted small">De enige officiële verkoop. Veilig, direct, geen doorverkoopprijzen.</p>

      <div className="list" style={{ marginTop: 14 }}>
        {order.map((t) => (
          <div key={t.id} className={`card ${selected.includes(t.id) ? 'highlight' : ''}`}>
            <div className="card-title-row" style={{ alignItems: 'flex-start' }}>
              <div>
                {t.badge && <div style={{ marginBottom: 6 }}><Badge kind={t.badge} /></div>}
                <h3 className="display">{t.name}</h3>
                <span className="muted small">{dateRange(t)} · {t.venue}</span>
              </div>
              <StatusPill status={t.ticketStatus} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, margin: '6px 0 10px' }}>
              <MiniCountdown iso={t.start} />
              {t.scarcity && <span className="scarcity">{t.scarcity}</span>}
            </div>
            <SocialProof t={t} />
            <div style={{ marginTop: 10 }}><Urgency t={t} /></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginTop: 12 }}>
              <span className="small">Vanaf <strong>{t.priceFrom}</strong></span>
              {t.ticketUrl && <a className="btn btn-primary" style={{ width: 'auto', padding: '11px 16px', fontSize: 12 }} href={t.ticketUrl} target="_blank" rel="noreferrer">Koop tickets <Icon name="external" /></a>}
            </div>
          </div>
        ))}
      </div>

      {/* Value ladder / anchoring: drie opties, midden = aanbevolen */}
      <div className="card" style={{ marginTop: 20 }}>
        <h3 className="display">Kies je plek</h3>
        <p className="muted small" style={{ marginTop: 6 }}>Voorbeeldindeling — prijzen en categorieën [aanleveren].</p>
        <div className="ladder">
          <div className="opt"><span><span className="n">Tribune</span><span className="s">Goede plek, volle sfeer</span></span><span className="p">[€ xx]</span></div>
          <div className="opt pop"><span><span className="n">Beste zicht ★ Meest gekozen</span><span className="s">Lange zijde, bij de finish</span></span><span className="p">[€ xx]</span></div>
          <div className="opt"><span><span className="n">Lounge-arrangement</span><span className="s">Catering, eigen ingang, beste plekken</span></span><span className="p">[€ xxx]</span></div>
        </div>
      </div>

      <div className="card">
        <h3 className="display">Passe-partout & combi</h3>
        <p className="muted small" style={{ marginTop: 8, marginBottom: 0 }}>Alle 5 toernooien voor één prijs: bespaar [x%] t.o.v. losse tickets. [aanleveren: bestaat dit? prijs + link]</p>
      </div>

      {/* First-party data: e-mail met duidelijke reden-waarom (reciprocity) */}
      <div className="card">
        <h3 className="display">Programma in je mailbox</h3>
        {email ? (
          <p className="small" style={{ marginTop: 8, marginBottom: 0 }}><span className="pill ok">Aangemeld</span> &nbsp;We mailen je zodra het definitieve programma bekend is.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (draft.includes('@')) setEmail(draft.trim()); }}>
            <p className="muted small" style={{ marginTop: 8, marginBottom: 0 }}>Ontvang het definitieve tijdschema en de pre-sale van het volgende toernooi 24 uur eerder dan de rest.</p>
            <div className="inline-form">
              <input type="email" inputMode="email" placeholder="je@e-mail.nl" value={draft} onChange={(e) => setDraft(e.target.value)} />
              <button className="btn btn-primary" type="submit">Aanmelden</button>
            </div>
            <p className="faint" style={{ fontSize: 11, marginTop: 8, marginBottom: 0 }}>Max. 1 mail per toernooi, uitschrijven kan altijd. [privacyverklaring]</p>
          </form>
        )}
      </div>

      <div className="card">
        <h3 className="display">Mijn bestellingen</h3>
        <p className="muted small" style={{ marginTop: 8, marginBottom: 0 }}>Koppel je bestelling om je e-tickets, vak en ingang hier te zien. [beslissen: integratie met ticketshop]</p>
      </div>
    </div>
  );
}
