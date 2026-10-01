import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type State = {
  selected: string[];
  toggle: (id: string) => void;
  setSelected: (ids: string[]) => void;
  onboarded: boolean;
  finishOnboarding: () => void;
  reset: () => void;
  pollAnswers: Record<string, string>;
  answerPoll: (pollId: string, optionId: string) => void;
};

const Ctx = createContext<State | null>(null);
const KEY = 'schaatsen-app-v1';

type Persisted = { selected: string[]; onboarded: boolean; pollAnswers: Record<string, string> };

const load = (): Persisted => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* leeg */ }
  return { selected: [], onboarded: false, pollAnswers: {} };
};

export function AppState({ children }: { children: ReactNode }) {
  const [s, setS] = useState<Persisted>(load);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* leeg */ }
  }, [s]);

  const value: State = {
    selected: s.selected,
    onboarded: s.onboarded,
    pollAnswers: s.pollAnswers,
    toggle: (id) => setS((p) => ({ ...p, selected: p.selected.includes(id) ? p.selected.filter((x) => x !== id) : [...p.selected, id] })),
    setSelected: (ids) => setS((p) => ({ ...p, selected: ids })),
    finishOnboarding: () => setS((p) => ({ ...p, onboarded: true })),
    reset: () => setS({ selected: [], onboarded: false, pollAnswers: {} }),
    answerPoll: (pollId, optionId) => setS((p) => ({ ...p, pollAnswers: { ...p.pollAnswers, [pollId]: optionId } })),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useApp = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('AppState ontbreekt');
  return v;
};
