import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApp } from '../state';
import { tournaments, nlDate, type Tournament } from '../data/tournaments';
import { messages } from '../data/messages';
import { stats, testimonials, type Testimonial } from '../data/site';

/* ---------- iconen (inline SVG, geen externe libs) ---------- */
const I = {
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z"/></svg>,
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>,
  ticket: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M3 9a2 2 0 0 0 0 6v3h18v-3a2 2 0 0 1 0-6V6H3z"/><path d="M13 6v12" strokeDasharray="2 3"/></svg>,
  chat: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M4 5h16v11H9l-5 4z"/></svg>,
  more: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0"/></svg>,
  chev: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>,
  chevL: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>,
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>,
  car: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M5 11l2-5h10l2 5M4 11h16v6H4zM7 17v2M17 17v2"/><circle cx="8" cy="14" r="1"/><circle cx="16" cy="14" r="1"/></svg>,
  train: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 10h14M8 21l2-4M16 21l-2-4"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/></svg>,
  food: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M16 3c-2 0-3 3-3 6s1 3 3 3v9"/></svg>,
  info: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>,
  map: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14"/></svg>,
  rules: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 3h9l4 4v14H6zM15 3v4h4M9 12h6M9 16h6"/></svg>,
  access: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="4" r="1.5"/><path d="M9 8h6l-1 6h3l2 6M12 8v6M8 14l-2 6"/></svg>,
  shop: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M4 7h16l-1 13H5zM9 7a3 3 0 0 1 6 0"/></svg>,
  star: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.3L12 17.5 6.5 20.4l1-6.3L3 9.7l6.2-.9z"/></svg>,
  send: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l16-8-6 16-2-7z"/></svg>,
  skate: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 18h16M6 18l1-9h7l3 5h3M8 9V5"/></svg>,
  external: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>,
  share: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12M8 7l4-4 4 4M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7"/></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-5-6.3"/></svg>,
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>,
};
export const Icon = ({ name, className }: { name: keyof typeof I; className?: string }) => (
  <span className={className} style={{ display: 'inline-flex', width: '1em', height: '1em', fontSize: 'inherit' }}>{I[name]}</span>
);
export const icons = I;

/* ---------- merk ---------- */
export const BrandMark = ({ size = 34 }: { size?: number }) => (
  <svg className="brand-mark" width={size} height={size} viewBox="0 0 512 512" aria-hidden>
    <defs><radialGradient id="bm" cx="50%" cy="60%" r="70%"><stop offset="0" stopColor="#2E6FD6"/><stop offset="1" stopColor="#050A1A"/></radialGradient></defs>
    <rect width="512" height="512" rx="112" fill="url(#bm)"/>
    <g fill="none" stroke="#fff"><rect x="116" y="76" width="280" height="360" rx="140" strokeWidth="30"/><rect x="166" y="126" width="180" height="260" rx="90" strokeWidth="12" opacity=".45"/></g>
    <path d="M232 214l44 42-44 42" fill="none" stroke="#fff" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/** De oval ‘baan’-ring uit de huisstijl, decoratief. */
export const TrackRing = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 230 260" fill="none" aria-hidden>
    <rect x="18" y="14" width="194" height="232" rx="97" stroke="white" strokeWidth="14" opacity=".95"/>
    <rect x="48" y="44" width="134" height="172" rx="67" stroke="white" strokeWidth="5" opacity=".45"/>
    <rect x="70" y="66" width="90" height="128" rx="45" stroke="white" strokeWidth="2" opacity=".25"/>
  </svg>
);

export const Chevrons = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 40" fill="none" aria-hidden>
    <path d="M4 4l16 16L4 36" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity=".45"/>
    <path d="M24 4l16 16-16 16" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity=".75"/>
    <path d="M44 4l16 16-16 16" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function TopBar() {
  const { seen } = useApp();
  const unread = Math.max(0, messages.length - seen);
  return (
    <header className="topbar">
      <Link to="/" className="brand">
        <BrandMark />
        <span className="brand-text">
          <span className="eyebrow">Beleef de magie van</span>
          <span className="display">Schaatsen</span>
        </span>
      </Link>
      <Link to="/berichten" className="icon-btn" aria-label="Berichten">
        <Icon name="bell" />
        {unread > 0 && <span className="dot" />}
      </Link>
    </header>
  );
}

export function BackLink({ to = '/', label = 'Terug' }: { to?: string; label?: string }) {
  return (
    <Link to={to} className="back"><Icon name="chevL" /> {label}</Link>
  );
}

export function BottomNav() {
  const { selected, seen } = useApp();
  const unread = Math.max(0, messages.length - seen);
  const items = [
    { to: '/', label: 'Home', icon: 'home' as const },
    { to: '/toernooien', label: 'Toernooien', icon: 'calendar' as const },
    { to: '/tickets', label: 'Tickets', icon: 'ticket' as const },
    { to: '/berichten', label: 'Berichten', icon: 'chat' as const, badge: unread },
    { to: '/meer', label: 'Meer', icon: 'more' as const },
  ];
  if (!selected.length) return null;
  return (
    <nav className="bottom-nav">
      {items.map((it) => (
        <NavLink key={it.to} to={it.to} end={it.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="nav-ico">{I[it.icon]}</span>
          {it.label}
          {it.badge ? <span className="badge">{it.badge}</span> : null}
        </NavLink>
      ))}
    </nav>
  );
}

export function StatusPill({ status }: { status: Tournament['ticketStatus'] }) {
  const map = {
    onsale: { cls: 'ok', txt: 'Tickets te koop' },
    soon: { cls: 'soon', txt: 'Binnenkort' },
    offsale: { cls: '', txt: 'Verkoop gesloten' },
    soldout: { cls: 'live', txt: 'Uitverkocht' },
  }[status];
  return <span className={`pill ${map.cls}`}>{map.txt}</span>;
}

export function DateChip({ iso }: { iso: string }) {
  const d = new Date(iso + 'T12:00:00');
  return (
    <span className="date-chip">
      <span className="d">{d.getDate()}</span>
      <span className="m">{d.toLocaleDateString('nl-NL', { month: 'short' }).replace('.', '')}</span>
    </span>
  );
}

export function Countdown({ iso }: { iso: string }) {
  const calc = () => Math.max(0, new Date(iso + 'T12:00:00').getTime() - Date.now());
  const [ms, setMs] = useState(calc);
  useEffect(() => { const t = setInterval(() => setMs(calc()), 1000); return () => clearInterval(t); }, [iso]); // eslint-disable-line
  const d = Math.floor(ms / 86_400_000), h = Math.floor((ms / 3_600_000) % 24), m = Math.floor((ms / 60_000) % 60), s = Math.floor((ms / 1000) % 60);
  const units = [[d, 'dagen'], [h, 'uur'], [m, 'min'], [s, 'sec']] as const;
  return (
    <div className="countdown">
      {units.map(([n, l]) => (
        <div className="unit" key={l}><span className="n">{String(n).padStart(2, '0')}</span><span className="l">{l}</span></div>
      ))}
    </div>
  );
}

export function HeroCard({ t, tall = false }: { t: Tournament; tall?: boolean }) {
  const { selected } = useApp();
  const going = selected.includes(t.id);
  return (
    <Link to={`/toernooi/${t.id}`} className={`hero-card ${tall ? 'tall' : ''}`}>
      <img className="bg" src={t.hero} alt="" />
      <TrackRing className="ring" />
      <DateChip iso={t.start} />
      <span className="status" style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
        <StatusPill status={t.ticketStatus} />
        {going && <span className="pill" style={{ background: 'var(--white)', color: 'var(--ink-900)', borderColor: 'var(--white)' }}>✓ Ik ga</span>}
      </span>
      {t.badge && <span style={{ marginBottom: 8 }}><Badge kind={t.badge} /></span>}
      <span className="eyebrow">{t.venue} · {t.city}</span>
      <h2 className="display" style={{ marginTop: 4 }}>{t.name}</h2>
      <span className="muted small" style={{ marginTop: 4 }}>{nlDate(t.start, { weekday: 'short', day: 'numeric', month: 'short' })} – {nlDate(t.end, { weekday: 'short', day: 'numeric', month: 'short' })}</span>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 10, gap: 8 }}>
        <MiniCountdown iso={t.start} />
        {t.scarcity && <span className="scarcity">{t.scarcity}</span>}
      </div>
    </Link>
  );
}

export const nextTournament = (ids: string[]) => {
  const today = new Date().toISOString().slice(0, 10);
  const mine = tournaments.filter((t) => ids.includes(t.id) && t.end >= today).sort((a, b) => a.start.localeCompare(b.start));
  return mine[0] ?? tournaments.filter((t) => t.end >= today)[0] ?? tournaments[0];
};

export function Toast({ text, onDone }: { text: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t); }, [onDone]);
  return <div className="toast">{text}</div>;
}

export function Badge({ kind }: { kind: NonNullable<Tournament['badge']> }) {
  const txt = { populair: 'Populairste keuze', 'laatste-kans': 'Laatste kans', nieuw: 'Seizoensopener' }[kind];
  return <span className={`badge-top ${kind === 'laatste-kans' ? 'laatste' : ''}`}>{txt}</span>;
}

/** Compacte countdown voor kaarten/lijsten: dagen · uren · minuten. */
export function MiniCountdown({ iso }: { iso: string }) {
  const calc = () => Math.max(0, new Date(iso + 'T12:00:00').getTime() - Date.now());
  const [ms, setMs] = useState(calc);
  useEffect(() => { const t = setInterval(() => setMs(calc()), 30_000); return () => clearInterval(t); }, [iso]); // eslint-disable-line
  const d = Math.floor(ms / 86_400_000), h = Math.floor((ms / 3_600_000) % 24), m = Math.floor((ms / 60_000) % 60);
  if (ms === 0) return <span className="pill live">Nu bezig</span>;
  return (
    <span className="mini-cd" aria-label={`Nog ${d} dagen`}>
      <b>{d}</b><i>d</i><b>{String(h).padStart(2, '0')}</b><i>u</i><b>{String(m).padStart(2, '0')}</b><i>m</i>
    </span>
  );
}

/** Sociale bewijskracht: "x fans gaan al". Cijfers zijn placeholders tot koppeling met ticketshop. */
export function SocialProof({ t }: { t: Tournament }) {
  if (!t.fansGoing) return null;
  return (
    <div className="proof">
      <span className="avatars"><span /><span /><span /></span>
      <span><strong>{t.fansGoing}</strong> fans gaan al</span>
    </div>
  );
}

/** Urgentie: early-bird deadline met countdown. */
export function Urgency({ t }: { t: Tournament }) {
  if (!t.earlyBirdUntil || new Date(t.earlyBirdUntil) < new Date()) return null;
  return (
    <div className="urgency">
      <span>Early-bird prijs nog <strong>t/m {nlDate(t.earlyBirdUntil, { day: 'numeric', month: 'long' })}</strong></span>
      <MiniCountdown iso={t.earlyBirdUntil} />
    </div>
  );
}

/** Deel-knop (Web Share API, met fallback naar kopiëren). */
export function ShareButton({ text, label = 'Nodig een vriend uit', className = 'btn btn-secondary' }: { text: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  const share = async () => {
    const url = location.href.split('#')[0];
    try {
      if (navigator.share) await navigator.share({ title: 'Beleef de magie van schaatsen', text, url });
      else { await navigator.clipboard.writeText(`${text} ${url}`); setDone(true); setTimeout(() => setDone(false), 2000); }
    } catch { /* geannuleerd */ }
  };
  return <button className={className} onClick={share}><Icon name="share" /> {done ? 'Link gekopieerd' : label}</button>;
}

export function Stats() {
  return (
    <div className="stats">
      {stats.map((x) => <div className="st" key={x.l}><span className="n">{x.n}{x.suffix && <small>{x.suffix}</small>}</span><span className="l">{x.l}</span></div>)}
    </div>
  );
}

export function Quotes({ role }: { role?: Testimonial['role'] }) {
  const list = role ? testimonials.filter((q) => q.role === role) : testimonials;
  return (
    <div className="quotes">
      {list.map((q) => (
        <div className="quote" key={q.name}>
          <p>{q.quote}</p>
          <div className="who">{q.name}<span>{q.role === 'schaatser' ? 'Schaatser' : 'Fan'}</span></div>
        </div>
      ))}
    </div>
  );
}
