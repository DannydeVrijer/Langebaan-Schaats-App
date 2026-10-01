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
  onboardedAt: number | null;
  seen: number;
  markSeen: (n: number) => void;
  pushOptIn: boolean;
  setPushOptIn: (v: boolean) => void;
  email: string | null;
  setEmail: (v: string) => void;
};

const Ctx = createContext<State | null>(null);
const KEY = 'schaatsen-app-v1';

type Persisted = { selected: string[]; onboarded: boolean; pollAnswers: Record<string, string>; onboardedAt: number | null; seen: number; pushOptIn: boolean; email: string | null };

const load = (): Persisted => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { onboardedAt: null, seen: 0, pushOptIn: false, email: null, ...JSON.parse(raw) };
  } catch { /* leeg */ }
  return { selected: [], onboarded: false, pollAnswers: {}, onboardedAt: null, seen: 0, pushOptIn: false, email: null };
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
    finishOnboarding: () => setS((p) => ({ ...p, onboarded: true, onboardedAt: p.onboardedAt ?? Date.now() })),
    reset: () => setS({ selected: [], onboarded: false, pollAnswers: {}, onboardedAt: null, seen: 0, pushOptIn: false, email: null }),
    onboardedAt: s.onboardedAt,
    seen: s.seen,
    markSeen: (n) => setS((p) => (p.seen >= n ? p : { ...p, seen: n })),
    pushOptIn: s.pushOptIn,
    setPushOptIn: (v) => setS((p) => ({ ...p, pushOptIn: v })),
    email: s.email,
    setEmail: (v) => setS((p) => ({ ...p, email: v })),
    answerPoll: (pollId, optionId) => setS((p) => ({ ...p, pollAnswers: { ...p.pollAnswers, [pollId]: optionId } })),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useApp = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('AppState ontbreekt');
  return v;
};
