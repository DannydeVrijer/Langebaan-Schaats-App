import { useApp } from '../state';
import { tournaments, dateRange } from '../data/tournaments';
import { TopBar, Icon, StatusPill } from '../components/ui';

export default function Tickets() {
  const { selected } = useApp();
  const order = [...tournaments].sort((a, b) => Number(selected.includes(b.id)) - Number(selected.includes(a.id)) || a.start.localeCompare(b.start));
  return (
    <div className="screen">
      <TopBar unread={1} />
      <span className="eyebrow">Officiële ticketshop</span>
      <h1 className="display" style={{ marginTop: 6, marginBottom: 8 }}>Tickets</h1>
      <p className="muted small">Koop direct via tickets.schaatsen.nl — de enige officiële verkoop. Pas op voor doorverkoopsites.</p>

      <div className="list" style={{ marginTop: 14 }}>
        {order.map((t) => (
          <div key={t.id} className={`card ${selected.includes(t.id) ? 'highlight' : ''}`}>
            <div className="card-title-row">
              <div>
                <h3 className="display">{t.name}</h3>
                <span className="muted small">{dateRange(t)} · {t.venue}</span>
              </div>
              <StatusPill status={t.ticketStatus} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
              <span className="small">Vanaf <strong>{t.priceFrom}</strong></span>
              {t.ticketUrl && <a className="btn btn-primary" style={{ width: 'auto', padding: '10px 14px', fontSize: 12 }} href={t.ticketUrl} target="_blank" rel="noreferrer">Koop <Icon name="external" /></a>}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <h3 className="display">Passe-partout & combi</h3>
        <p className="muted small" style={{ marginTop: 8, marginBottom: 0 }}>[aanleveren: zijn er seizoenskaarten of combitickets? Prijs + link]</p>
      </div>
      <div className="card">
        <h3 className="display">Mijn bestellingen</h3>
        <p className="muted small" style={{ marginTop: 8, marginBottom: 0 }}>Koppel je bestelling om je e-tickets, vak en ingang hier te zien. [beslissen: integratie met ticketshop]</p>
      </div>
    </div>
  );
}
