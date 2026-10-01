import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { teams, skaters, teamById, skaterById, initials, allDistances, type Distance } from '../data/skaters';
import { TopBar, BackLink, Icon } from '../components/ui';
import { track } from '../track';

function Avatar({ name, color, size = 44 }: { name: string; color: string; size?: number }) {
  return (
    <span className="avatar-ini" style={{ width: size, height: size, background: color, fontSize: size * 0.36 }}>{initials(name)}</span>
  );
}

export default function Skaters() {
  const [team, setTeam] = useState<string>('all');
  const [dist, setDist] = useState<Distance | 'all'>('all');
  const list = skaters.filter((s) => (team === 'all' || s.teamId === team) && (dist === 'all' || s.distances.includes(dist)));

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

      <div className="list">
        {list.map((s) => {
          const t = teamById(s.teamId)!;
          return (
            <Link key={s.id} to={`/schaatser/${s.id}`} className="row">
              <Avatar name={s.name} color={t.color} />
              <span className="body">
                <span className="title">{s.name}{s.nationality && <span className="faint small"> · {s.nationality}</span>}</span>
                <span className="sub">{t.short} · {s.distances.join(' · ')}</span>
              </span>
              <span className="arrow"><Icon name="chev" /></span>
            </Link>
          );
        })}
        {!list.length && <p className="muted small">Geen schaatsers met deze filters.</p>}
      </div>
      <p className="faint small" style={{ marginTop: 16 }}>Selectie van toppers; volledige teams, foto's en records volgen. [aanleveren: complete lijst, foto's, PR's]</p>
    </div>
  );
}

export function SkaterDetail() {
  const { id } = useParams();
  const s = skaterById(id ?? '');
  if (!s) return <Navigate to="/schaatsers" replace />;
  const t = teamById(s.teamId)!;
  const teammates = skaters.filter((x) => x.teamId === s.teamId && x.id !== s.id);
  return (
    <div className="screen">
      <BackLink to="/schaatsers" label="Schaatsers" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <Avatar name={s.name} color={t.color} size={64} />
        <div>
          <h1 className="display" style={{ fontSize: 28 }}>{s.name}</h1>
          <span className="muted small">{t.name}{s.nationality ? ` · ${s.nationality}` : ''}</span>
        </div>
      </div>
      <p className="muted">{s.bio}</p>
      <div className="chips" style={{ margin: '12px 0 18px' }}>{s.distances.map((d) => <span key={d} className="chip on">{d}</span>)}</div>

      <div className="card">
        <div className="card-title-row"><h3 className="display">Persoonlijke records</h3></div>
        <table className="pb">
          <tbody>
            {s.distances.filter((d) => s.pb[d]).map((d) => (
              <tr key={d}><td>{d}</td><td className="t">{s.pb[d]}</td></tr>
            ))}
          </tbody>
        </table>
        {Object.values(s.pb).some((v) => v === '[PR]') && <p className="faint" style={{ fontSize: 11, margin: '8px 0 0' }}>[PR] = nog aan te leveren / te verifiëren (bron: speedskatingresults.com)</p>}
      </div>

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
                <Avatar name={m.name} color={t.color} size={38} />
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
