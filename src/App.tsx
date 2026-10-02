import { HashRouter as BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppState, useApp } from './state';
import { BottomNav, FloatingBell } from './components/ui';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import Tournaments from './screens/Tournaments';
import TournamentDetail from './screens/TournamentDetail';
import Tickets from './screens/Tickets';
import Messages from './screens/Messages';
import More from './screens/More';
import Skaters, { SkaterDetail } from './screens/Skaters';

function ScrollTop() {
  const { pathname, search } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname, search]);
  return null;
}

function Shell() {
  const { onboarded, selected } = useApp();
  const ready = onboarded && selected.length > 0;
  const { pathname } = useLocation();
  return (
    <div className="app">
      <ScrollTop />
      <Routes>
        {!ready ? (
          <>
            <Route path="/start" element={<Onboarding />} />
            <Route path="*" element={<Navigate to="/start" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/toernooien" element={<Tournaments />} />
            <Route path="/toernooi/:id" element={<TournamentDetail />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/schaatsers" element={<Skaters />} />
            <Route path="/schaatser/:id" element={<SkaterDetail />} />
            <Route path="/berichten" element={<Messages />} />
            <Route path="/meer" element={<More />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
      {ready && pathname !== '/berichten' && <FloatingBell />}
      {ready && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <AppState>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </AppState>
  );
}
