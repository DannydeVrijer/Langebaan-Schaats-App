import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { tournaments } from '../data/tournaments';
import { embeds } from '../data/embeds';
import { BackLink, Icon } from '../components/ui';
import { track } from '../track';

/**
 * Generiek embed-scherm: toont een externe dienst (Paylogic-ticketshop, Playable-game,
 * Mijn Paylogic) in een iframe binnen de app. Blokkeert de dienst iframes
 * (X-Frame-Options / CSP), dan tonen we na een korte wachttijd een knop om
 * de pagina in een nieuw venster te openen.
 */
export default function Embed() {
  const { kind, id } = useParams();
  const [sp] = useSearchParams();
  const [slow, setSlow] = useState(false);
  const [loaded, setLoaded] = useState(false);

  let url = '';
  let title = '';
  if (kind === 'tickets') {
    const t = tournaments.find((x) => x.id === id);
    url = t?.ticketUrl ?? '';
    title = `Tickets ${t?.shortName ?? ''}`;
  } else {
    const e = embeds.find((x) => x.id === kind);
    url = sp.get('url') ?? e?.url ?? '';
    title = e?.title ?? 'Extern';
  }
  const isPlaceholder = !url || url.startsWith('[');

  useEffect(() => {
    track('embed_open', { kind: kind ?? '', id: id ?? '' });
    const t = setTimeout(() => setSlow(true), 4000);
    return () => clearTimeout(t);
  }, [kind, id]);

  return (
    <div className="screen" style={{ paddingLeft: 12, paddingRight: 12 }}>
      <BackLink to={kind === 'tickets' ? `/toernooi/${id}` : '/meer'} label="Terug" />
      <div className="card-title-row" style={{ marginBottom: 8 }}>
        <h2 className="display" style={{ fontSize: 22 }}>{title}</h2>
        {!isPlaceholder && <a className="chip" href={url} target="_blank" rel="noreferrer">Open apart <Icon name="external" /></a>}
      </div>
      {isPlaceholder ? (
        <div className="card">
          <p className="muted" style={{ margin: 0 }}>Deze koppeling is nog niet ingericht. <span className="faint">{url || '[aanleveren: embed-URL]'}</span></p>
        </div>
      ) : (
        <>
          {!loaded && slow && (
            <div className="card" style={{ marginBottom: 10 }}>
              <p className="muted small" style={{ margin: '0 0 10px' }}>Laadt het niet? Sommige diensten staan weergave in een app niet toe.</p>
              <a className="btn btn-primary" href={url} target="_blank" rel="noreferrer">Open in nieuw venster <Icon name="external" /></a>
            </div>
          )}
          <iframe
            className="embed-frame"
            src={url}
            title={title}
            onLoad={() => setLoaded(true)}
            allow="payment; fullscreen; clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </>
      )}
    </div>
  );
}
