import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../state';
import { messages, plannedFlow } from '../data/messages';
import { byId } from '../data/tournaments';
import { BackLink, BrandMark, Icon } from '../components/ui';

export default function Messages() {
  const { pollAnswers, answerPoll } = useApp();
  const [sent, setSent] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const [showFlow, setShowFlow] = useState(false);

  let lastDay = '';

  return (
    <div className="screen" style={{ paddingBottom: 150 }}>
      <BackLink />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <BrandMark size={44} />
        <div>
          <h2 className="display" style={{ fontSize: 20 }}>Beleef de magie van schaatsen</h2>
          <span className="muted small">Officieel kanaal · reageert op werkdagen</span>
        </div>
      </div>

      <div className="chat">
        {messages.map((m) => {
          const divider = m.day !== lastDay ? <div className="day-divider" key={'d' + m.id}>{m.day}</div> : null;
          lastDay = m.day;
          return (
            <div key={m.id}>
              {divider}
              <div className="msg">
                <span className="avatar"><Icon name="skate" /></span>
                <div className="bubble">
                  {m.text}
                  {m.kind === 'image' && <img src={m.image} alt="" />}
                  {m.kind === 'cta' && <div className="cta"><a className="btn btn-primary" href={m.href} target="_blank" rel="noreferrer">{m.label} <Icon name="external" /></a></div>}
                  {m.kind === 'route' && <div className="cta"><Link className="btn btn-secondary" to={`/toernooi/${m.tournamentId}?tab=programma`}>Programma {byId(m.tournamentId)?.shortName}</Link></div>}
                  {m.kind === 'poll' && (
                    <div className="poll">
                      {m.options.map((o) => {
                        const chosen = pollAnswers[m.id] === o.id;
                        const answered = !!pollAnswers[m.id];
                        return (
                          <button key={o.id} className={chosen ? 'chosen' : ''} onClick={() => answerPoll(m.id, o.id)}>
                            {o.label}{answered && <span className="pct">{o.pct}%</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  <div className="meta">{m.time}</div>
                </div>
              </div>
            </div>
          );
        })}

        {pollAnswers['m3'] && (
          <div className="msg">
            <span className="avatar"><Icon name="skate" /></span>
            <div className="bubble">
              {pollAnswers['m3'] === 'car' && 'Top! Drie dagen voor het toernooi sturen we je de parkeerinfo en actuele verkeersinfo rond Heerenveen. Tip: koop je parkeerticket vooraf. [link aanleveren]'}
              {pollAnswers['m3'] === 'train' && 'Goed bezig 🌱 Vanaf station Heerenveen is het ca. 25 min lopen of een korte busrit. We sturen je op de dag zelf de actuele reisinfo. [pendelbus bevestigen]'}
              {pollAnswers['m3'] === 'bike' && 'Lekker fris! Bij Thialf is een fietsenstalling. We houden het weer voor je in de gaten ☀️'}
              <div className="meta">Nu</div>
            </div>
          </div>
        )}

        {sent.map((s, i) => (
          <div className="msg" key={i}><div className="bubble me">{s}<div className="meta" style={{ color: 'rgba(255,255,255,.6)' }}>Nu · bezorgd</div></div></div>
        ))}
      </div>

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
        {!showFlow && <p className="muted small" style={{ margin: 0 }}>Zo zou een automatische berichtenflow eruitzien (zoals in de Ajax Fan App). Tik om te bekijken.</p>}
      </div>

      <form className="composer" onSubmit={(e) => { e.preventDefault(); if (draft.trim()) { setSent((s) => [...s, draft.trim()]); setDraft(''); } }}>
        <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Stel een vraag…" />
        <button type="submit" aria-label="Verstuur"><Icon name="send" /></button>
      </form>
    </div>
  );
}
