import { Link } from 'react-router-dom';
import { useApp } from '../state';
import { tournaments, dateRange, daysUntil, venueInfo } from '../data/tournaments';
import { messages } from '../data/messages';
import { TopBar, HeroCard, Countdown, Icon, nextTournament, Chevrons, SocialProof, Urgency, ShareButton, Quotes } from '../components/ui';
import { copy } from '../data/site';

export default function Home() {
  const { selected, seen, pushOptIn, setPushOptIn } = useApp();
  const next = nextTournament(selected);
  const mine = tournaments.filter((t) => selected.includes(t.id)).sort((a, b) => a.start.localeCompare(b.start));
  const others = tournaments.filter((t) => !selected.includes(t.id));
  const latest = messages[Math.min(seen, messages.length) - 1] ?? messages[0];
  const d = daysUntil(next.start);
  const pct = Math.round((selected.length / tournaments.length) * 100);

  return (
    <div className="screen">
      <TopBar />

      {/* Eerstvolgende toernooi — één duidelijke actie bovenaan */}
      <span className="eyebrow">{d > 0 ? `Nog ${d} ${d === 1 ? 'dag' : 'dagen'} tot` : 'Nu bezig'}</span>
      <h1 className="display" style={{ marginTop: 6, marginBottom: 14, fontSize: 34 }}>{next.name}</h1>
      <HeroCard t={next} tall />

      <div className="card highlight" style={{ marginTop: 12 }}>
        <div className="card-title-row">
          <span className="eyebrow">Countdown</span>
          <span className="small muted">{dateRange(next)}</span>
        </div>
        <Countdown iso={next.start} />
        <div style={{ marginTop: 12 }}><SocialProof t={next} /></div>
        {next.lossFrame && <p className="small" style={{ margin: '10px 0 0', color: 'var(--ice-200)' }}>{next.lossFrame}</p>}
        <div style={{ marginTop: 12 }}><Urgency t={next} /></div>
        <div className="btn-row" style={{ marginTop: 14 }}>
          {next.ticketUrl && (
            <a className="btn btn-primary" href={next.ticketUrl} target="_blank" rel="noreferrer">
              {copy.ctaPrimary} <Icon name="external" />
            </a>
          )}
          <Link className="btn btn-secondary" to={`/toernooi/${next.id}?tab=programma`}>Programma</Link>
        </div>
      </div>

      {/* Prompt op het juiste moment: meldingen (Fogg: motivatie is nu hoog) */}
      {!pushOptIn && (
        <div className="card" style={{ marginTop: 12 }}>
          <div className="card-title-row">
            <h3 className="display">Mis niets op de dag zelf</h3>
            <Icon name="bell" />
          </div>
          <p className="muted small" style={{ marginBottom: 10 }}>
            Programma-wijzigingen, verkeersinfo en vrijgekomen kaarten — gemiddeld 3 berichten per toernooi.
          </p>
          <div className="btn-row">
            <button className="btn btn-primary" onClick={() => setPushOptIn(true)}>Zet meldingen aan</button>
            <button className="btn btn-ghost" onClick={() => setPushOptIn(true)} style={{ flex: 0.6 }}>Later</button>
          </div>
        </div>
      )}

      {/* Commitment & consistentie: jouw seizoen compleet maken */}
      <section className="section">
        <div className="section-head">
          <h3 className="display">Jouw seizoen</h3>
          <span className="small muted">{selected.length} van {tournaments.length}</span>
        </div>
        <div className="progress"><i style={{ width: `${pct}%` }} /></div>
        <div className="list" style={{ marginTop: 12 }}>
          {mine.map((t) => (
            <Link key={t.id} to={`/toernooi/${t.id}`} className="row">
              <span className="ico"><Icon name="skate" /></span>
              <span className="body"><span className="title">{t.name}</span><span className="sub">{dateRange(t)}</span></span>
              <span className="arrow"><Icon name="chev" /></span>
            </Link>
          ))}
        </div>
        {others.length > 0 && (
          <p className="small muted" style={{ marginTop: 10 }}>
            Nog {others.length} toernooi{others.length > 1 ? 'en' : ''} te gaan dit seizoen — maak je seizoen compleet.
          </p>
        )}
      </section>

      {/* Laatste bericht */}
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

      {/* Sociale bewijskracht: schaatsers & fans */}
      <section className="section">
        <div className="section-head"><h3 className="display">Wat schaatsers en fans zeggen</h3></div>
        <Quotes />
      </section>

      {/* Praktisch */}
      <section className="section">
        <div className="section-head"><h3 className="display">Praktisch</h3></div>
        <div className="grid-2">
          <Link to={`/toernooi/${next.id}?tab=praktisch`} className="tile"><Icon name="car" /><span className="t">Route & parkeren</span><span className="s">{venueInfo.address}</span></Link>
          <Link to={`/toernooi/${next.id}?tab=plattegrond`} className="tile"><Icon name="map" /><span className="t">Plattegrond</span><span className="s">Ingangen, tribunes, horeca</span></Link>
          <Link to={`/toernooi/${next.id}?tab=programma`} className="tile"><Icon name="calendar" /><span className="t">Programma</span><span className="s">Tijdschema per dag</span></Link>
          <Link to="/meer" className="tile"><Icon name="info" /><span className="t">FAQ</span><span className="s">Veelgestelde vragen</span></Link>
        </div>
      </section>

      {/* Upsell / cross-sell */}
      {others.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h3 className="display">Ook dit seizoen</h3>
            <Link to="/toernooien">Alle</Link>
          </div>
          <div className="list">
            {others.slice(0, 2).map((t) => <HeroCard key={t.id} t={t} />)}
          </div>
          <Link to="/tickets" className="btn btn-ghost" style={{ marginTop: 12 }}>Alle tickets <Chevrons className="chev" /></Link>
        </section>
      )}

      {/* Eenheid / referral */}
      <section className="section">
        <div className="card">
          <div className="card-title-row"><h3 className="display">Samen naar Thialf</h3><Icon name="users" /></div>
          <p className="muted small" style={{ marginBottom: 12 }}>Schaatsen is leuker samen. Stuur de app door en plan jullie toernooi.</p>
          <ShareButton text={`Ga je mee naar ${next.name} in Thialf? Alles staat in deze app:`} />
        </div>
      </section>
    </div>
  );
}
