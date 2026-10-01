import { useNavigate } from 'react-router-dom';
import { useApp } from '../state';
import { tournaments, nlDate, asset } from '../data/tournaments';
import { Icon, TrackRing, Chevrons } from '../components/ui';

export default function Onboarding() {
  const { selected, toggle, finishOnboarding } = useApp();
  const nav = useNavigate();

  return (
    <div className="screen" style={{ paddingBottom: 24 }}>
      <div className="onboard-hero">
        <img src={asset('img/hero-jutta.png')} alt="" />
        <TrackRing style={{ position: 'absolute', right: -60, top: 20, width: 260, opacity: .5 }} />
      </div>

      <div className="onboard-body">
        <span className="eyebrow">Seizoen 2026 / 2027 · Thialf</span>
        <h1 className="display" style={{ marginTop: 6 }}>Beleef de magie<br />van schaatsen</h1>
        <p className="muted" style={{ marginTop: 12 }}>
          Kies de toernooien die jij gaat bezoeken. Je krijgt dan precies de info die je nodig hebt — programma, tickets, route en een seintje op het juiste moment.
        </p>

        <div className="list" style={{ marginTop: 18 }}>
          {tournaments.map((t) => {
            const on = selected.includes(t.id);
            return (
              <button key={t.id} className={`select-card ${on ? 'on' : ''}`} onClick={() => toggle(t.id)}>
                <span className="dc">
                  <span className="d">{new Date(t.start + 'T12:00:00').getDate()}</span>
                  <span className="m">{nlDate(t.start, { month: 'short' }).replace('.', '')}</span>
                </span>
                <span style={{ flex: 1 }}>
                  <span className="t">{t.name}</span><br />
                  <span className="s">{nlDate(t.start)} – {nlDate(t.end)} · {t.venue}</span>
                </span>
                <span className="check">{on && <Icon name="check" />}</span>
              </button>
            );
          })}
        </div>

        <div className="sticky-cta">
          <button
            className="btn btn-primary"
            disabled={!selected.length}
            style={{ opacity: selected.length ? 1 : .4 }}
            onClick={() => { finishOnboarding(); nav('/'); }}
          >
            {selected.length ? `Verder met ${selected.length} toernooi${selected.length > 1 ? 'en' : ''}` : 'Kies minimaal één toernooi'}
            <Chevrons className="chev" />
          </button>
          <p className="faint small" style={{ textAlign: 'center', marginTop: 10 }}>Je kunt dit later altijd aanpassen onder ‘Meer’.</p>
        </div>
      </div>
    </div>
  );
}
