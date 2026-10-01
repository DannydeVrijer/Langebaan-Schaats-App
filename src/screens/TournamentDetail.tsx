import { useParams, useSearchParams, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '../state';
import { byId, dateRange, nlDate, venueInfo } from '../data/tournaments';
import { BackLink, TrackRing, DateChip, StatusPill, Countdown, Icon, Toast, Quotes } from '../components/ui';
import { copy } from '../data/site';
import { track } from '../track';

const TABS = [
  { id: 'info', label: 'Info' },
  { id: 'programma', label: 'Programma' },
  { id: 'tickets', label: 'Tickets' },
  { id: 'praktisch', label: 'Praktisch' },
] as const;
type TabId = (typeof TABS)[number]['id'];

export default function TournamentDetail() {
  const { id } = useParams();
  const [sp, setSp] = useSearchParams();
  const t = byId(id ?? '');
  const { selected, toggle } = useApp();
  const [day, setDay] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  if (!t) return <Navigate to="/toernooien" replace />;
  const tab = (sp.get('tab') as TabId) || 'info';
  const going = selected.includes(t.id);

  return (
    <div className="screen">
      <BackLink to="/toernooien" label="Toernooien" />

      <div className="hero-card tall" style={{ cursor: 'default' }}>
        <img className="bg" src={t.hero} alt="" />
        <TrackRing className="ring" />
        <DateChip iso={t.start} />
        <span className="status"><StatusPill status={t.ticketStatus} /></span>
        <span className="eyebrow">{t.venue} · {t.city}</span>
        <h1 className="display" style={{ fontSize: 32, marginTop: 4 }}>{t.name}</h1>
        <span className="muted small" style={{ marginTop: 4 }}>{dateRange(t)}</span>
      </div>

      <div className="card highlight" style={{ marginTop: 12 }}>
        <div className="card-title-row"><span className="eyebrow">Countdown</span></div>
        <Countdown iso={t.start} />
      </div>

      <div className="btn-row" style={{ marginTop: 12 }}>
        {t.ticketUrl && <a className="btn btn-primary" href={t.ticketUrl} target="_blank" rel="noreferrer" onClick={() => track('ticket_click', { tournament: t.id, source: 'detail' })}>Koop tickets <Icon name="external" /></a>}
        <button className={`btn ${going ? 'btn-secondary' : 'btn-ghost'}`} onClick={() => { toggle(t.id); track(going ? 'tournament_remove' : 'tournament_add', { tournament: t.id }); setToast(going ? 'Verwijderd uit mijn toernooien' : 'Toegevoegd aan mijn toernooien'); }}>
          {going ? <><Icon name="check" /> Ik ga</> : '+ Ik ga'}
        </button>
      </div>

      <div className="tabs">
        {TABS.map((tb) => (
          <button key={tb.id} className={`tab ${tab === tb.id ? 'active' : ''}`} onClick={() => setSp({ tab: tb.id })}>{tb.label}</button>
        ))}
      </div>

      {tab === 'info' && (
        <>
          <p style={{ fontSize: 16 }}>{t.subtitle}</p>
          <p className="muted">{t.description}</p>
          <div className="chips" style={{ margin: '14px 0' }}>{t.highlights.map((h) => <span key={h} className="chip">{h}</span>)}</div>
          {t.lossFrame && <p className="muted" style={{ marginTop: -4 }}>{t.lossFrame}</p>}
          <Quotes role="schaatser" />
          <div className="card" style={{ marginTop: 14 }}>
            <div className="card-title-row"><h3 className="display">Deelnemers</h3><span className="pill soon">Volgt</span></div>
            <p className="muted small" style={{ margin: 0 }}>Startlijsten en de Nederlandse selectie worden hier getoond zodra bekend. [aanleveren: bron/feed]</p>
          </div>
          <div className="card">
            <div className="card-title-row"><h3 className="display">Nieuws</h3></div>
            <p className="muted small" style={{ margin: 0 }}>[aanleveren: nieuwsfeed schaatsen.nl of handmatige items per toernooi]</p>
          </div>
          {t.todo && (
            <div className="card" style={{ borderColor: 'rgba(255,209,102,.35)' }}>
              <span className="todo">Nog aan te leveren voor dit toernooi</span>
              <ul className="muted small" style={{ margin: '8px 0 0', paddingLeft: 18 }}>{t.todo.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          )}
        </>
      )}

      {tab === 'programma' && (
        <>
          <div className="day-tabs">
            {t.program.map((d, i) => (
              <button key={d.date} className={`day-tab ${day === i ? 'active' : ''}`} onClick={() => setDay(i)}>
                {d.label} {new Date(d.date + 'T12:00:00').getDate()} {nlDate(d.date, { month: 'short' }).replace('.', '')}
              </button>
            ))}
          </div>
          <div className="timeline">
            {t.program[day].items.map((it, i) => (
              <div key={i} className="tl-item">
                <div className="time">{it.time}</div>
                <div className="what">{it.what}</div>
                {it.note && <div className="note">{it.note}</div>}
              </div>
            ))}
          </div>
          <p className="todo">Concept-tijdschema – definitieve tijden volgen.</p>
          <div className="card">
            <div className="card-title-row"><h3 className="display">Live uitslagen</h3><span className="pill soon">Tijdens toernooi</span></div>
            <p className="muted small" style={{ margin: 0 }}>Tijdens het toernooi zie je hier live tijden en uitslagen. [aanleveren: bron, bijv. ISU results/KNSB-feed of link]</p>
          </div>
        </>
      )}

      {tab === 'tickets' && (
        <>
          <div className="card highlight">
            <div className="card-title-row"><h3 className="display">Tickets</h3><StatusPill status={t.ticketStatus} /></div>
            <p className="muted small" style={{ margin: 0 }}>Verkoop via de officiële shop op tickets.schaatsen.nl. [aanleveren: categorieën, prijzen, kortingen]</p>
            {t.ticketUrl && (
              <a className="btn btn-primary" href={t.ticketUrl} target="_blank" rel="noreferrer" style={{ marginTop: 14 }}>
                Koop tickets – officiële shop <Icon name="external" />
              </a>
            )}
          </div>
          <div className="card">
            <h3 className="display">Arrangementen & lounges</h3>
            <p className="muted small" style={{ marginTop: 8 }}>Beleef het toernooi met een hospitality-arrangement: lounge, catering en de beste plekken. [aanleveren: aanbod + link offerte/boeking]</p>
          </div>
        </>
      )}

      {tab === 'praktisch' && (
        <>
          <div className="list">
            <a href={venueInfo.mapsUrl} target="_blank" rel="noreferrer" className="row">
              <span className="ico"><Icon name="pin" /></span>
              <span className="body"><span className="title">{venueInfo.name}</span><span className="sub">{venueInfo.address}</span></span>
              <span className="arrow"><Icon name="external" /></span>
            </a>
            <div className="row"><span className="ico"><Icon name="car" /></span><span className="body"><span className="title">Parkeren</span><span className="sub">{venueInfo.parking}</span></span></div>
            <div className="row"><span className="ico"><Icon name="train" /></span><span className="body"><span className="title">Openbaar vervoer</span><span className="sub">{venueInfo.publicTransport}</span></span></div>
            <div className="row"><span className="ico"><Icon name="calendar" /></span><span className="body"><span className="title">Deuren open</span><span className="sub">{venueInfo.doorsOpen}</span></span></div>
            <div className="row"><span className="ico"><Icon name="food" /></span><span className="body"><span className="title">Eten & drinken</span><span className="sub">{venueInfo.food}</span></span></div>
            <div className="row"><span className="ico"><Icon name="access" /></span><span className="body"><span className="title">Toegankelijkheid</span><span className="sub">{venueInfo.accessibility}</span></span></div>
            <div className="row"><span className="ico"><Icon name="star" /></span><span className="body"><span className="title">Kinderen & gezin</span><span className="sub">{venueInfo.familyInfo}</span></span></div>
          </div>
          <div className="card" style={{ marginTop: 12 }}>
            <div className="card-title-row"><h3 className="display">Huisregels</h3><Icon name="rules" /></div>
            <ul className="muted small" style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>{venueInfo.houseRules.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
        </>
      )}

      {tab === 'praktisch' && (
        <>
          <h3 className="display" style={{ margin: '22px 0 10px' }}>Plattegrond</h3>
          <div className="map-placeholder">
            <svg viewBox="0 0 320 200" fill="none"><rect x="30" y="20" width="260" height="160" rx="80" stroke="white" strokeWidth="10"/><rect x="70" y="50" width="180" height="100" rx="50" stroke="white" strokeWidth="3"/></svg>
            <div className="lbl">
              <h3 className="display">Plattegrond Thialf</h3>
              <p className="muted small" style={{ marginTop: 6 }}>[aanleveren: plattegrond met tribunes, vakken, ingangen, horeca, toiletten, EHBO, fanshop]</p>
            </div>
          </div>
          <div className="grid-2" style={{ marginTop: 12 }}>
            {['Ingangen', 'Tribunes & vakken', 'Horeca', 'Toiletten', 'EHBO', 'Fanshop', 'Garderobe', 'Rolstoelplekken'].map((x) => (
              <div key={x} className="tile" style={{ minHeight: 0 }}><span className="t">{x}</span><span className="s">[locatie aanleveren]</span></div>
            ))}
          </div>
        </>
      )}

      {t.ticketUrl && tab !== 'tickets' && (
        <a className="btn btn-primary sticky-ticket" href={t.ticketUrl} target="_blank" rel="noreferrer" onClick={() => track('ticket_click', { tournament: t.id, source: 'detail-sticky' })}>{copy.ctaPrimary} <Icon name="external" /></a>
      )}
      <div style={{ height: 70 }} />
      {toast && <Toast text={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
