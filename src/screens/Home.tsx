import { Link } from 'react-router-dom';
import { useApp } from '../state';
import { tournaments, dateRange, daysUntil, journey } from '../data/tournaments';
import { messages } from '../data/messages';
import { skaterById } from '../data/skaters';
import { TopBar, HeroCard, Countdown, Icon, nextTournament } from '../components/ui';
import { track } from '../track';

const today = () => new Date().toISOString().slice(0, 10);
const nowHM = () => new Date().toTimeString().slice(0, 5);

export default function Home() {
  const { selected, seen, pushOptIn, setPushOptIn, days, favorites } = useApp();
  const next = nextTournament(selected);
  const mine = tournaments.filter((t) => selected.includes(t.id)).sort((a, b) => a.start.localeCompare(b.start));
  const latest = messages[Math.min(seen, messages.length) - 1] ?? messages[0];
  const d = daysUntil(next.start);
  const isLive = today() >= next.start && today() <= next.end;
  const myDays = days[next.id] ?? [];
  const favs = favorites.map(skaterById).filter(Boolean).slice(0, 4);

  /* ---------- DAG-MODUS: op de wedstrijddag verandert home ---------- */
  if (isLive) {
    const prog = next.program.find((p) => p.date === today());
    const races = prog?.items.filter((i) => !/deuren/i.test(i.what)) ?? [];
    const doors = prog?.items.find((i) => /deuren/i.test(i.what));
    const nextIdx = races.findIndex((r) => r.time > nowHM());
    const current = nextIdx > 0 ? races[nextIdx - 1] : null;
    const upcoming = nextIdx >= 0 ? races[nextIdx] : null;
    const arr = journey.find((j) => j.id === 'aankomst');
    return (
      <div className="screen">
        <TopBar />
        <span className="pill live">Vandaag in Thialf</span>
        <h1 className="display" style={{ marginTop: 10, marginBottom: 14, fontSize: 34 }}>{next.name}</h1>

        <div className="card highlight">
          <span className="eyebrow">Nu op het ijs</span>
          <p className="display" style={{ fontSize: 24, margin: '6px 0 0' }}>{current ? current.what : doors ? `Deuren open ${doors.time}` : 'Programma volgt'}</p>
          {upcoming && <p className="muted small" style={{ margin: '8px 0 0' }}>Volgende: <strong>{upcoming.time}</strong> {upcoming.what}</p>}
          <div className="btn-row" style={{ marginTop: 14 }}>
            <a className="btn btn-primary" href={next.liveUrl ?? 'https://liveresults.schaatsen.nl/home'} target="_blank" rel="noreferrer" onClick={() => track('live_click', { tournament: next.id, source: 'home-day' })}>Live uitslagen <Icon name="external" /></a>
            <Link className="btn btn-secondary" to={`/toernooi/${next.id}?tab=programma`}>Programma</Link>
          </div>
        </div>

        <section className="section">
          <div className="section-head"><h3 className="display">Onderweg & binnen</h3></div>
          <div className="grid-2">
            {arr?.items.slice(0, 2).map((it) => (
              <Link key={it.t} to={`/toernooi/${next.id}?tab=praktisch`} className="tile"><Icon name={it.icon as 'car'} /><span className="t">{it.t}</span><span className="s">Actuele info</span></Link>
            ))}
            <Link to={`/toernooi/${next.id}?tab=praktisch`} className="tile"><Icon name="ticket" /><span className="t">Ingang & deuren</span><span className="s">{doors ? `Open ${doors.time}` : 'Zie praktisch'}</span></Link>
            <Link to={`/toernooi/${next.id}?tab=praktisch`} className="tile"><Icon name="map" /><span className="t">Plattegrond</span><span className="s">Horeca, toiletten, EHBO</span></Link>
          </div>
        </section>

        {favs.length > 0 && (
          <section className="section">
            <div className="section-head"><h3 className="display">Jouw favorieten</h3><Link to="/schaatsers">Alle</Link></div>
            <div className="list">{favs.map((s) => s && <Link key={s.id} to={`/schaatser/${s.id}`} className="row"><span className="ico"><Icon name="star" /></span><span className="body"><span className="title">{s.name}</span><span className="sub">{s.distances.join(' · ')} · startmelding volgt</span></span><span className="arrow"><Icon name="chev" /></span></Link>)}</div>
          </section>
        )}

        <section className="section">
          <div className="section-head"><h3 className="display">Laatste bericht</h3><Link to="/berichten">Alles</Link></div>
          <Link to="/berichten" className="row"><span className="ico"><Icon name="chat" /></span><span className="body"><span className="title">Beleef de magie van schaatsen</span><span className="sub" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{latest.text}</span></span><span className="arrow"><Icon name="chev" /></span></Link>
        </section>
      </div>
    );
  }

  /* ---------- NORMALE MODUS ---------- */
  return (
    <div className="screen">
      <TopBar />

      <span className="eyebrow">{d > 0 ? `Nog ${d} ${d === 1 ? 'dag' : 'dagen'} tot` : 'Binnenkort'}</span>
      <h1 className="display" style={{ marginTop: 6, marginBottom: 14, fontSize: 34 }}>{next.name}</h1>
      <HeroCard t={next} tall hideCountdown />

      <div className="card highlight" style={{ marginTop: 12 }}>
        <div className="card-title-row">
          <span className="eyebrow">Countdown</span>
          <span className="small muted">{myDays.length ? `Jouw dag${myDays.length > 1 ? 'en' : ''}: ${myDays.map((x) => new Date(x + 'T12:00:00').getDate()).join(', ')}` : dateRange(next)}</span>
        </div>
        <Countdown iso={next.start} />
        <div className="btn-row" style={{ marginTop: 14 }}>
          {next.ticketUrl && (
            <a className="btn btn-primary" href={next.ticketUrl} target="_blank" rel="noreferrer" onClick={() => track('ticket_click', { tournament: next.id, source: 'home' })}>
              Koop tickets <Icon name="external" />
            </a>
          )}
          <Link className="btn btn-secondary" to={`/toernooi/${next.id}?tab=programma`}>Programma</Link>
        </div>
      </div>

      {!pushOptIn && (
        <div className="card" style={{ marginTop: 12 }}>
          <div className="card-title-row">
            <h3 className="display">Mis niets op de dag zelf</h3>
            <Icon name="bell" />
          </div>
          <p className="muted small" style={{ marginBottom: 10 }}>Programma-wijzigingen, verkeersinfo en als je favoriete schaatser bijna start — gemiddeld 3 berichten per toernooi.</p>
          <div className="btn-row">
            <button className="btn btn-primary" onClick={() => { setPushOptIn(true); track('push_optin', { source: 'home' }); }}>Zet meldingen aan</button>
            <button className="btn btn-ghost" onClick={() => { setPushOptIn(true); track('push_dismiss', { source: 'home' }); }} style={{ flex: 0.6 }}>Later</button>
          </div>
        </div>
      )}

      <section className="section">
        <div className="section-head">
          <h3 className="display">Jouw seizoen</h3>
          <Link to="/toernooien">{selected.length} van {tournaments.length} · alle</Link>
        </div>
        <div className="list">
          {mine.map((t) => (
            <Link key={t.id} to={`/toernooi/${t.id}`} className="row">
              <span className="ico"><Icon name="skate" /></span>
              <span className="body"><span className="title">{t.name}</span><span className="sub">{dateRange(t)}{(days[t.id]?.length ?? 0) > 0 ? ` · jouw dag: ${days[t.id].map((x) => new Date(x + 'T12:00:00').getDate()).join(', ')}` : ''}</span></span>
              <span className="arrow"><Icon name="chev" /></span>
            </Link>
          ))}
        </div>
      </section>

      {favs.length > 0 && (
        <section className="section">
          <div className="section-head"><h3 className="display">Jouw favorieten</h3><Link to="/schaatsers">Alle</Link></div>
          <div className="list">{favs.map((s) => s && <Link key={s.id} to={`/schaatser/${s.id}`} className="row"><span className="ico"><Icon name="star" /></span><span className="body"><span className="title">{s.name}</span><span className="sub">{s.distances.join(' · ')}</span></span><span className="arrow"><Icon name="chev" /></span></Link>)}</div>
        </section>
      )}

      <section className="section">
        <div className="section-head">
          <h3 className="display">Laatste bericht</h3>
          <Link to="/berichten">Alles</Link>
        </div>
        <Link to="/berichten" className="row">
          <span className="ico"><Icon name="chat" /></span>
          <span className="body">
            <span className="title">Beleef de magie van schaatsen</span>
            <span className="sub" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{latest.text}</span>
          </span>
          <span className="arrow"><Icon name="chev" /></span>
        </Link>
      </section>

      <section className="section">
        <div className="section-head"><h3 className="display">Praktisch</h3></div>
        <div className="grid-2">
          <Link to={`/toernooi/${next.id}?tab=praktisch`} className="tile"><Icon name="car" /><span className="t">Route & parkeren</span><span className="s">Auto, trein, fiets</span></Link>
          <Link to={`/toernooi/${next.id}?tab=praktisch`} className="tile"><Icon name="map" /><span className="t">Plattegrond</span><span className="s">Ingangen, tribunes, horeca</span></Link>
          <Link to={`/toernooi/${next.id}?tab=programma`} className="tile"><Icon name="calendar" /><span className="t">Programma</span><span className="s">Tijdschema per dag</span></Link>
          <Link to="/meer" className="tile"><Icon name="info" /><span className="t">FAQ</span><span className="s">Veelgestelde vragen</span></Link>
        </div>
      </section>
    </div>
  );
}
