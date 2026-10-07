import { useParams, useSearchParams, Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '../state';
import { byId, dateRange, nlDate, daysUntil, journey, dayChecklist } from '../data/tournaments';
import { skaterById, teamById } from '../data/skaters';
import { BackLink, TrackRing, DateChip, StatusPill, Countdown, Icon, Toast, Ph, ShareButton, icons, downloadIcs } from '../components/ui';
import { track } from '../track';

const TABS = [
  { id: 'programma', label: 'Programma' },
  { id: 'info', label: 'Info' },
  { id: 'praktisch', label: 'Praktisch' },
] as const;
type TabId = (typeof TABS)[number]['id'];

const today = () => new Date().toISOString().slice(0, 10);
const nowHM = () => new Date().toTimeString().slice(0, 5);

export default function TournamentDetail() {
  const { id } = useParams();
  const [sp, setSp] = useSearchParams();
  const t = byId(id ?? '');
  const { selected, toggle, days, toggleDay, demo } = useApp();
  const [toast, setToast] = useState<string | null>(null);
  if (!t) return <Navigate to="/toernooien" replace />;

  const dUntil = daysUntil(t.start);
  const isLive = today() >= t.start && today() <= t.end;
  const defaultTab: TabId = dUntil <= 14 ? 'programma' : 'info';
  const tab = (sp.get('tab') as TabId) || defaultTab;
  const going = selected.includes(t.id);
  const myDays = days[t.id] ?? [];

  // programma: standaard de dag van vandaag, anders de eerste gekozen dag, anders dag 1
  const dayIdx0 = Math.max(0, t.program.findIndex((d) => d.date === today()) >= 0
    ? t.program.findIndex((d) => d.date === today())
    : t.program.findIndex((d) => myDays.includes(d.date)));
  const [dayState, setDay] = useState<number | null>(null);
  const day = dayState ?? dayIdx0;
  const prog = t.program[day];
  const doors = prog.items.find((i) => /deuren/i.test(i.what));
  const races = prog.items.filter((i) => !/deuren/i.test(i.what));
  const isToday = prog.date === today();
  const nextIdx = isToday ? races.findIndex((r) => r.kind !== 'pauze' && /^\d/.test(r.time) && r.time > nowHM()) : -1;

  return (
    <div className="screen">
      <BackLink to="/toernooien" label="Toernooien" />

      <div className="hero-card" style={{ cursor: 'default', minHeight: 230 }}>
        <img className="bg" src={t.hero} alt="" />
        <TrackRing className="ring" />
        <DateChip iso={t.start} />
        <span className="status">{isLive ? <span className="pill live">Live</span> : <StatusPill status={t.ticketStatus} />}</span>
        <span className="eyebrow">{t.venue} · {t.city}</span>
        <h1 className="display" style={{ fontSize: 30, marginTop: 4 }}>{t.name}</h1>
        <span className="muted small" style={{ marginTop: 4 }}>{dateRange(t)}</span>
      </div>

      {!isLive && (
        <div className="card" style={{ marginTop: 10, padding: '12px 14px' }}>
          <Countdown iso={t.start} compact />
        </div>
      )}

      <div className="btn-row" style={{ marginTop: 10 }}>
        <button className={`btn ${going ? 'btn-secondary' : 'btn-ghost'}`} onClick={() => { toggle(t.id); track(going ? 'tournament_remove' : 'tournament_add', { tournament: t.id }); setToast(going ? 'Verwijderd uit mijn toernooien' : 'Toegevoegd aan mijn toernooien'); }}>
          {going ? <><Icon name="check" /> Ik ga</> : '+ Ik ga'}
        </button>
        <button className="btn btn-ghost" aria-label="Zet in je agenda" onClick={() => { downloadIcs(t, myDays); track('calendar_add', { tournament: t.id }); }}><Icon name="calendar" /> Agenda</button>
        <ShareButton className="btn btn-ghost" label="Delen" text={`Ga je mee naar ${t.name} (${dateRange(t)}) in Thialf?`} />
      </div>

      <div className="tabs" role="tablist">
        {TABS.map((tb) => (
          <button key={tb.id} role="tab" aria-selected={tab === tb.id} className={`tab ${tab === tb.id ? 'active' : ''}`} onClick={() => setSp({ tab: tb.id })}>{tb.label}</button>
        ))}
      </div>

      {tab === 'programma' && (
        <>
          <div className="card" style={{ padding: 12, marginBottom: 12 }}>
            <span className="eyebrow">Mijn dag(en)</span>
            <p className="muted small" style={{ margin: '4px 0 8px' }}>Kies de dag(en) waarop je komt. Dan zie je het juiste programma en krijg je alleen berichten over jouw dag.</p>
            <div className="chips">
              {t.program.map((d) => (
                <button key={d.date} className={`chip ${myDays.includes(d.date) ? 'on' : ''}`} onClick={() => { toggleDay(t.id, d.date); if (!going) toggle(t.id); track('day_toggle', { tournament: t.id, day: d.date }); }}>
                  {myDays.includes(d.date) ? '✓ ' : ''}{d.label} {new Date(d.date + 'T12:00:00').getDate()} {nlDate(d.date, { month: 'short' }).replace('.', '')}
                </button>
              ))}
            </div>
          </div>

          <div className="day-tabs">
            {t.program.map((d, i) => (
              <button key={d.date} className={`day-tab ${day === i ? 'active' : ''}`} onClick={() => setDay(i)}>
                {d.label} {new Date(d.date + 'T12:00:00').getDate()} {nlDate(d.date, { month: 'short' }).replace('.', '')}{myDays.includes(d.date) ? ' ✓' : ''}
              </button>
            ))}
          </div>

          {doors && (
            <div className="row" style={{ marginBottom: 12, background: 'rgba(255,255,255,.1)' }}>
              <span className="ico"><Icon name="ticket" /></span>
              <span className="body"><span className="title">Deuren open {doors.time}</span><span className="sub"><Ph text={doors.note ?? 'Kom op tijd: de eerste rit start kort na opening.'} /></span></span>
            </div>
          )}

          <div className="timeline">
            {races.map((it, i) => {
              const state = !isToday ? '' : i < nextIdx || nextIdx === -1 ? 'done' : i === nextIdx ? 'next' : '';
              return (
                <div key={i} className={`tl-item ${state} ${it.kind === 'pauze' ? 'pauze' : ''}`}>
                  <div className="time">{it.kind === 'pauze' && <Icon name="ice" />} {it.time}{state === 'next' && <span className="pill live" style={{ marginLeft: 8 }}>Volgende</span>}{state === 'done' && <span className="faint small" style={{ marginLeft: 8 }}>afgelopen</span>}</div>
                  <div className="what">{it.what}</div>
                  {it.note && <div className="note"><Ph text={it.note} /></div>}
                </div>
              );
            })}
          </div>
          <p className="faint small">Concept-tijdschema; definitieve tijden volgen van de KNSB.</p>

          <a className="btn btn-secondary" href={t.liveUrl ?? 'https://liveresults.schaatsen.nl/home'} target="_blank" rel="noreferrer" onClick={() => track('live_click', { tournament: t.id })}>
            {isLive ? 'Live uitslagen' : 'Startlijsten & uitslagen (KNSB)'} <Icon name="external" />
          </a>
        </>
      )}

      {tab === 'info' && (
        <>
          <p style={{ fontSize: 16 }}>{t.subtitle}</p>
          <p className="muted">{t.description}</p>
          {t.lossFrame && (
            <div className="card">
              <span className="eyebrow">Wat staat er op het spel</span>
              <p style={{ margin: '6px 0 0' }}>{t.lossFrame}</p>
            </div>
          )}
          {t.topSkaters && (
            <div className="card">
              <div className="card-title-row"><h3 className="display">Toppers aan de start</h3><Link to="/schaatsers" className="small" style={{ color: 'var(--ice-300)' }}>Alle</Link></div>
              <div className="list">
                {t.topSkaters.map((sid) => { const s = skaterById(sid); if (!s) return null; const team = teamById(s.teamId)!; return (
                  <Link key={sid} to={`/schaatser/${sid}`} className="row" style={{ padding: 10 }}>
                    {s.photo ? <img className="avatar-ini" src={s.photo} alt="" style={{ width: 38, height: 38, objectFit: 'cover', objectPosition: 'top', background: team.color }} /> : <span className="avatar-ini" style={{ width: 38, height: 38, background: team.color, fontSize: 13 }}>{s.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}</span>}
                    <span className="body"><span className="title">{s.name}</span><span className="sub">{s.distances.join(' · ')}</span></span>
                    <span className="arrow"><Icon name="chev" /></span>
                  </Link>
                ); })}
              </div>
              <p className="faint" style={{ fontSize: 11, margin: '8px 0 0' }}>Verwachte deelnemers; definitieve startlijsten volgen.</p>
            </div>
          )}
          <div className="card">
            <h3 className="display">Dit maakt dit toernooi anders</h3>
            <ul className="muted small" style={{ margin: '8px 0 0', paddingLeft: 18, lineHeight: 1.7 }}>{t.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          </div>
          <div className="card">
            <div className="card-title-row"><h3 className="display">Side-events & nieuws</h3><span className="pill soon">Volgt</span></div>
            <p className="muted small" style={{ margin: 0 }}><Ph text="[aanleveren: fan village, meet & greet, kids-activiteiten, nieuwsitems]" /></p>
          </div>
          {demo && t.todo && (
            <div className="card" style={{ borderColor: 'rgba(255,209,102,.35)' }}>
              <span className="todo">Nog aan te leveren voor dit toernooi</span>
              <ul className="muted small" style={{ margin: '8px 0 0', paddingLeft: 18 }}>{t.todo.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          )}
        </>
      )}

      {tab === 'praktisch' && (
        <>
          {journey.map((sec) => (
            <section key={sec.id} style={{ marginBottom: 18 }}>
              <h3 className="display" style={{ marginBottom: 8 }}>{sec.title}</h3>
              <div className="list">
                {sec.items.map((it) => {
                  const inner = <><span className="ico">{icons[it.icon as keyof typeof icons]}</span><span className="body"><span className="title">{it.t}</span><span className="sub"><Ph text={it.s} /></span></span>{'to' in it && it.to && <Icon name="chev" />}</>;
                  return 'to' in it && it.to ? <Link className="row" key={it.t} to={it.to}>{inner}</Link> : <div className="row" key={it.t}>{inner}</div>;
                })}
              </div>
            </section>
          ))}

          <h3 className="display" style={{ marginBottom: 8 }}>Plattegrond</h3>
          <div className="map-placeholder">
            <svg viewBox="0 0 320 200" fill="none"><rect x="30" y="20" width="260" height="160" rx="80" stroke="white" strokeWidth="10"/><rect x="70" y="50" width="180" height="100" rx="50" stroke="white" strokeWidth="3"/></svg>
            <div className="lbl"><p className="muted small" style={{ margin: 0 }}><Ph text="[aanleveren: plattegrond met tribunes, vakken, ingangen, horeca, toiletten, EHBO, fanshop]" /></p></div>
          </div>

          <div className="card" style={{ marginTop: 18 }}>
            <div className="card-title-row"><h3 className="display">Op de dag: niet vergeten</h3><Icon name="check" /></div>
            <ul className="muted small" style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>{dayChecklist.map((c) => <li key={c}><Ph text={c} /></li>)}</ul>
          </div>
        </>
      )}

      {t.ticketUrl && !isLive && (
        <Link className="btn btn-primary sticky-ticket" to={`/embed/tickets/${t.id}`} onClick={() => track('ticket_click', { tournament: t.id, source: 'detail-sticky' })}>Koop tickets <Icon name="ticket" /></Link>
      )}
      <div style={{ height: 70 }} />
      {toast && <Toast text={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
