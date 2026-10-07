import { Link } from 'react-router-dom';
import { tournaments, internationalEvents, dateRange } from '../data/tournaments';
import { TopBar, HeroCard, Icon } from '../components/ui';

export default function Tournaments() {
  return (
    <div className="screen">
      <TopBar />
      <span className="eyebrow">Seizoen 2026 / 2027</span>
      <h1 className="display" style={{ marginTop: 6, marginBottom: 16 }}>Toernooien in<br />Nederland</h1>
      <div className="list">
        {tournaments.map((t) => (
          <div key={t.id}>
            <HeroCard t={t} />
            {t.ticketUrl && <Link className="btn btn-secondary" style={{ marginTop: 8 }} to={`/embed/tickets/${t.id}`}>Koop tickets <Icon name="ticket" /></Link>}
          </div>
        ))}
      </div>

      <section className="section">
        <div className="section-head"><h3 className="display">Wereldbekers buitenland</h3></div>
        <p className="muted small">Ticketverkoop voor de internationale World Cups start later. Volg ze hier wel: uitslagen, Nederlandse starters en livestream-info.</p>
        <div className="list">
          {internationalEvents.map((e) => (
            <div key={e.name + e.city} className="row">
              <span className="ico"><Icon name="globe" /></span>
              <span className="body"><span className="title">{e.name} · {e.city}</span><span className="sub">{e.country} · {e.dates}</span></span>
            </div>
          ))}
        </div>
      </section>

      <p className="faint small" style={{ marginTop: 18 }}>
        Bron: <a href="https://www.schaatsen.nl/schaatsfan/tickets/langebaanschaatstickets/" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>schaatsen.nl</a>
        {' '}· {tournaments.map((t) => dateRange(t)).length} toernooien in Thialf
      </p>
      <Link to="/meer" className="small" style={{ color: 'var(--ice-300)' }}>Mijn toernooien aanpassen</Link>
    </div>
  );
}
