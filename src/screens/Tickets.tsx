import { useApp } from '../state';
import { tournaments, dateRange } from '../data/tournaments';
import { TopBar, Icon, StatusPill } from '../components/ui';
import { track } from '../track';

export default function Tickets() {
  const { selected } = useApp();
  const order = [...tournaments].sort((a, b) => Number(selected.includes(b.id)) - Number(selected.includes(a.id)) || a.start.localeCompare(b.start));
  return (
    <div className="screen">
      <TopBar />
      <span className="official">Officiële ticketshop · schaatsen.nl</span>
      <h1 className="display" style={{ marginTop: 6, marginBottom: 16 }}>Tickets</h1>

      <div className="list">
        {order.map((t) => (
          <div key={t.id} className={`card ${selected.includes(t.id) ? 'highlight' : ''}`}>
            <div className="card-title-row" style={{ alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <h3 className="display">{t.name}</h3>
                <span className="muted small">{dateRange(t)} · {t.venue}</span>
              </div>
              <StatusPill status={t.ticketStatus} />
            </div>
            {t.ticketUrl && (
              <a className="btn btn-primary" href={t.ticketUrl} target="_blank" rel="noreferrer" onClick={() => track('ticket_click', { tournament: t.id, source: 'tickets' })}>
                Koop tickets <Icon name="external" />
              </a>
            )}
          </div>
        ))}
      </div>

      <p className="faint small" style={{ marginTop: 20 }}>Je koopt in de officiële shop op tickets.schaatsen.nl. Prijzen en categorieën zie je daar. [aanleveren: prijzen, arrangementen, mijn-bestellingen-koppeling]</p>
    </div>
  );
}
