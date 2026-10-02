import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { teams, skaters, teamById, skaterById, initials, allDistances, type Distance } from '../data/skaters';
import { TopBar, BackLink, Icon } from '../components/ui';
import { useApp } from '../state';
import { track } from '../track';

function Avatar({ name, color, size = 44, photo }: { name: string; color: string; size?: number; photo?: string }) {
  const [broken, setBroken] = useState(false);
  const dim = size ? { width: size, height: size } : { width: '100%', aspectRatio: '1 / 1', borderRadius: 14 };
  if (photo && !broken) return <img className="avatar-ini" src={photo} alt={name} loading="lazy" onError={() => setBroken(true)} style={{ ...dim, objectFit: 'cover', objectPosition: 'top', background: color }} />;
  return (
    <span className="avatar-ini" style={{ ...dim, background: color, fontSize: size ? size * 0.36 : 20 }}>{initials(name)}</span>
  );
}
const age = (born?: string) => born ? Math.floor((Date.now() - new Date(born).getTime()) / (365.25 * 86_400_000)) : null;

export default function Skaters() {
  const { favorites, toggleFavorite } = useApp();
  const [team, setTeam] = useState<string>('all');
  const [dist, setDist] = useState<Distance | 'all'>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const list = skaters
    .filter((s) => (team === 'all' || s.teamId === team) && (dist === 'all' || s.distances.includes(dist)))
    .sort((a, b) => Number(favorites.includes(b.id)) - Number(favorites.includes(a.id)));

  return (
    <div className="screen">
      <TopBar />
      <span className="eyebrow">Seizoen 2026 / 2027</span>
      <h1 className="display" style={{ marginTop: 6, marginBottom: 14 }}>Schaatsers</h1>

      <div className="day-tabs">
        <button className={`day-tab ${team === 'all' ? 'active' : ''}`} onClick={() => setTeam('all')}>Alle teams</button>
        {teams.map((t) => <button key={t.id} className={`day-tab ${team === t.id ? 'active' : ''}`} onClick={() => { setTeam(t.id); track('skaters_filter', { team: t.id }); }}>{t.short}</button>)}
      </div>
      <div className="chips" style={{ marginBottom: 14 }}>
        <button className={`chip ${dist === 'all' ? 'on' : ''}`} onClick={() => setDist('all')}>Alle afstanden</button>
        {allDistances.map((d) => <button key={d} className={`chip ${dist === d ? 'on' : ''}`} onClick={() => setDist(d)}>{d}</button>)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span className="muted small">{list.length} schaatsers</span>
        <div className="chips">
          <button className={`chip ${view === 'grid' ? 'on' : ''}`} onClick={() => setView('grid')}>Smoelenboek</button>
          <button className={`chip ${view === 'list' ? 'on' : ''}`} onClick={() => setView('list')}>Lijst</button>
        </div>
      </div>

      {view === 'grid' && (
        <div className="face-grid">
          {list.map((s) => {
            const t = teamById(s.teamId)!;
            return (
              <Link key={s.id} to={`/schaatser/${s.id}`} className="face">
                <Avatar name={s.name} color={t.color} size={0} photo={s.photo} />
                <span className="face-name">{s.name}</span>
                <span className="face-sub">{t.short}</span>
                <button className={`fav ${favorites.includes(s.id) ? 'on' : ''}`} aria-label={favorites.includes(s.id) ? 'Verwijder favoriet' : 'Maak favoriet'} onClick={(e) => { e.preventDefault(); toggleFavorite(s.id); track('favorite_toggle', { skater: s.id }); }}><Icon name="star" /></button>
              </Link>
            );
          })}
        </div>
      )}

      {view === 'list' && <div className="list">
        {list.map((s) => {
          const t = teamById(s.teamId)!;
          return (
            <Link key={s.id} to={`/schaatser/${s.id}`} className="row">
              <Avatar name={s.name} color={t.color} photo={s.photo} />
              <span className="body">
                <span className="title">{s.name}{s.nationality && <span className="faint small"> · {s.nationality}</span>}</span>
                <span className="sub">{t.short} · {s.distances.join(' · ')}</span>
              </span>
              <button className={`fav ${favorites.includes(s.id) ? 'on' : ''}`} aria-label={favorites.includes(s.id) ? 'Verwijder favoriet' : 'Maak favoriet'} onClick={(e) => { e.preventDefault(); toggleFavorite(s.id); track('favorite_toggle', { skater: s.id }); }}><Icon name="star" /></button>
            </Link>
          );
        })}
      </div>}
      {!list.length && <p className="muted small">Geen schaatsers met deze filters.</p>}
      <p className="muted small" style={{ marginTop: 12 }}>Foto's en bio's: TeamNL. Tik op ★ om een favoriet te kiezen. Binnenkort: een seintje 5 minuten voordat je favoriet start.</p>
      <p className="faint small" style={{ marginTop: 8 }}>[rechten: TeamNL/ANP-portretten vóór livegang regelen; teamindeling 'overig' bevestigen]</p>
    </div>
  );
}

export function SkaterDetail() {
  const { id } = useParams();
  const { favorites, toggleFavorite } = useApp();
  const s = skaterById(id ?? '');
  if (!s) return <Navigate to="/schaatsers" replace />;
  const t = teamById(s.teamId)!;
  const teammates = skaters.filter((x) => x.teamId === s.teamId && x.id !== s.id);
  return (
    <div className="screen">
      <BackLink to="/schaatsers" label="Schaatsers" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <Avatar name={s.name} color={t.color} size={72} photo={s.photo} />
        <div>
          <h1 className="display" style={{ fontSize: 28 }}>{s.name}</h1>
          <span className="muted small">{t.name}{s.nationality ? ` · ${s.nationality}` : ''}{age(s.born) ? ` · ${age(s.born)} jaar` : ''}</span>
        </div>
      </div>
      <p className="muted">{s.bio}</p>
      <div className="chips" style={{ margin: '12px 0 14px' }}>{s.distances.map((d) => <span key={d} className="chip on">{d}</span>)}</div>
      <button className={`btn ${favorites.includes(s.id) ? 'btn-primary' : 'btn-secondary'}`} style={{ marginBottom: 14 }} onClick={() => { toggleFavorite(s.id); track('favorite_toggle', { skater: s.id }); }}>
        <Icon name="star" /> {favorites.includes(s.id) ? 'Favoriet – je krijgt een seintje als ' + s.name.split(' ')[0] + ' start' : 'Maak favoriet'}
      </button>

      <div className="card">
        <div className="card-title-row"><h3 className="display">Persoonlijke records</h3></div>
        <table className="pb">
          <tbody>
            {(Object.keys(s.pb) as Distance[]).map((d) => (
              <tr key={d}><td>{d}{s.pbMeta?.[d] && <span className="faint" style={{ fontSize: 11, display: 'block' }}>{s.pbMeta[d]}</span>}</td><td className="t">{s.pb[d]}</td></tr>
            ))}
          </tbody>
        </table>
        <p className="faint" style={{ fontSize: 11, margin: '8px 0 0' }}>{Object.values(s.pb).some((v) => v === '[PR]') ? 'Nog geen records uit de KNSB-database.' : 'Bron: KNSB live-uitslagen, okt 2026'}</p>
      </div>

      {s.medals && (
        <div className="card">
          <div className="card-title-row"><h3 className="display">Medailles</h3></div>
          <div className="medals">
            {(['os', 'wk', 'ek'] as const).filter((k) => s.medals![k]).map((k) => { const m = s.medals![k]!; return (
              <div key={k} className="medal-row">
                <span className="medal-lbl">{{ os: 'Olympische Spelen', wk: 'WK', ek: 'EK' }[k]}</span>
                <span className="medal gold">{m.g}</span><span className="medal silver">{m.s}</span><span className="medal bronze">{m.b}</span>
              </div>
            ); })}
          </div>
          <p className="faint" style={{ fontSize: 11, margin: '8px 0 0' }}>Bron: teamnl.org</p>
        </div>
      )}
      {s.highlights && (
        <div className="card">
          <div className="card-title-row"><h3 className="display">Hoogtepunten</h3></div>
          <ul className="muted small" style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>{s.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
        </div>
      )}

      <div className="card">
        <div className="card-title-row"><h3 className="display">Waar zie je {s.name.split(' ')[0]}?</h3></div>
        <p className="muted small" style={{ margin: 0 }}>Startlijsten per toernooi volgen zodra de selecties bekend zijn. [aanleveren: koppeling startlijsten]</p>
      </div>

      {teammates.length > 0 && (
        <section className="section">
          <div className="section-head"><h3 className="display">Ploeggenoten</h3></div>
          <div className="list">
            {teammates.map((m) => (
              <Link key={m.id} to={`/schaatser/${m.id}`} className="row">
                <Avatar name={m.name} color={t.color} size={38} photo={m.photo} />
                <span className="body"><span className="title">{m.name}</span><span className="sub">{m.distances.join(' · ')}</span></span>
                <span className="arrow"><Icon name="chev" /></span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
