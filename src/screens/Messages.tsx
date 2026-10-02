import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../state';
import { messages, plannedFlow, arrivalOffsetsMin } from '../data/messages';
import { byId } from '../data/tournaments';
import { BackLink, BrandMark, Icon, ShareButton } from '../components/ui';
import { track } from '../track';

const fmtTime = (ms: number) => new Date(ms).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
const fmtDay = (ms: number) => {
  const d = new Date(ms), now = new Date();
  if (d.toDateString() === now.toDateString()) return 'Vandaag';
  return d.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' });
};

export default function Messages() {
  const { pollAnswers, answerPoll, onboardedAt, seen, markSeen, pushOptIn, setPushOptIn, demo } = useApp();
  const [showFlow, setShowFlow] = useState(false);
  const [visible, setVisible] = useState(seen);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const base = onboardedAt ?? Date.now();

  // Berichten ‘komen binnen’ na aanmelden: één voor één, met typ-indicator. Daarna blijven ze staan.
  useEffect(() => {
    if (visible >= messages.length) return;
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setVisible((v) => { markSeen(v + 1); return v + 1; });
    }, visible === 0 ? 700 : 1300);
    return () => clearTimeout(t);
  }, [visible]); // eslint-disable-line

  useEffect(() => { const t = setTimeout(() => endRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' }), 50); return () => clearTimeout(t); }, [visible, typing, pollAnswers, pushOptIn]);

  let lastDay = '';
  const shown = messages.slice(0, visible);

  return (
    <div className="screen" style={{ paddingBottom: 150 }}>
      <BackLink />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <BrandMark size={44} />
        <div>
          <h2 className="display" style={{ fontSize: 20 }}>Beleef de magie van schaatsen</h2>
          <span className="official">Officieel kanaal</span>
        </div>
      </div>

      <div className="chat">
        {shown.map((m, i) => {
          const at = base + (arrivalOffsetsMin[m.id] ?? i) * 60_000;
          const day = fmtDay(at);
          const divider = day !== lastDay ? <div className="day-divider">{day}</div> : null;
          lastDay = day;
          return (
            <div key={m.id}>
              {divider}
              <div className="msg">
                <span className="avatar"><Icon name="skate" /></span>
                <div className="bubble">
                  {m.text}
                  {m.kind === 'image' && <img src={m.image} alt="" />}
                  {m.kind === 'cta' && <div className="cta"><a className="btn btn-primary" href={m.href} target="_blank" rel="noreferrer" onClick={() => track('ticket_click', { source: 'chat', message: m.id })}>{m.label} <Icon name="external" /></a></div>}
                  {m.kind === 'route' && <div className="cta"><Link className="btn btn-secondary" to={`/toernooi/${m.tournamentId}?tab=programma`}>Programma {byId(m.tournamentId)?.shortName}</Link></div>}
                  {m.kind === 'optin' && (
                    <div className="cta">
                      {pushOptIn
                        ? <span className="pill ok">Meldingen staan aan</span>
                        : <button className="btn btn-primary" onClick={() => { setPushOptIn(true); track('push_optin', { source: 'chat' }); }}>Zet meldingen aan</button>}
                    </div>
                  )}
                  {m.kind === 'share' && <div className="cta"><ShareButton text="Ga je mee schaatsen kijken in Thialf? Alles staat in deze app:" className="btn btn-primary" /></div>}
                  {m.kind === 'poll' && (
                    <div className="poll">
                      {m.options.map((o) => {
                        const chosen = pollAnswers[m.id] === o.id;
                        const answered = !!pollAnswers[m.id];
                        return (
                          <button key={o.id} className={chosen ? 'chosen' : ''} onClick={() => { answerPoll(m.id, o.id); track('poll_answer', { poll: m.id, option: o.id }); }}>
                            {o.label}{answered && <span className="pct">{o.pct}%</span>}
                          </button>
                        );
                      })}
                      {pollAnswers[m.id] && <span className="faint" style={{ fontSize: 11 }}>Zo reizen andere fans (voorbeeldcijfers)</span>}
                    </div>
                  )}
                  <div className="meta">{fmtTime(at)}</div>
                </div>
              </div>
            </div>
          );
        })}

        {typing && (
          <div className="msg"><span className="avatar"><Icon name="skate" /></span><div className="bubble typing"><i /><i /><i /></div></div>
        )}

        {messages.filter((m) => m.kind === 'poll' && pollAnswers[m.id] && shown.includes(m)).map((m) => m.kind === 'poll' && (
          <div className="msg" key={m.id + '-fu'}>
            <span className="avatar"><Icon name="skate" /></span>
            <div className="bubble">{m.followUps[pollAnswers[m.id]]}<div className="meta">Nu</div></div>
          </div>
        ))}

        <div ref={endRef} />
      </div>

      {demo && visible >= messages.length && (
        <div className="card" style={{ marginTop: 24 }}>
          <button className="card-title-row" style={{ width: '100%' }} onClick={() => setShowFlow((v) => !v)}>
            <h3 className="display">Geplande berichten (voorbeeld-flow)</h3>
            <span className="muted">{showFlow ? '–' : '+'}</span>
          </button>
          {showFlow && (
            <div className="list">
              {plannedFlow.map((f) => (
                <div key={f.trigger} className="row" style={{ alignItems: 'flex-start' }}>
                  <span className="body"><span className="eyebrow">{f.trigger}</span><span className="sub">{f.text}</span></span>
                </div>
              ))}
            </div>
          )}
          {!showFlow && <p className="muted small" style={{ margin: 0 }}>Zo ziet de automatische berichtenflow eruit (zoals in de Ajax Fan App). Tik om te bekijken.</p>}
        </div>
      )}

      <Link to="/meer" className="composer" style={{ textDecoration: 'none' }}>
        <span style={{ flex: 1, padding: '12px 14px', background: 'rgba(10,20,45,.9)', border: '1px solid var(--line-strong)', borderRadius: 999, color: 'var(--text-muted)', fontSize: 14 }}>Een vraag? Bekijk de veelgestelde vragen</span>
        <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--white)', color: 'var(--ink-900)', display: 'grid', placeItems: 'center' }}><Icon name="info" /></span>
      </Link>
    </div>
  );
}
