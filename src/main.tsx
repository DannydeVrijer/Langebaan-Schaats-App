import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register(import.meta.env.BASE_URL + 'sw.js');
      reg.addEventListener('updatefound', () => {
        const w = reg.installing;
        w?.addEventListener('statechange', () => {
          if (w.state === 'installed' && navigator.serviceWorker.controller) {
            const el = document.createElement('button');
            el.className = 'update-toast';
            el.textContent = 'Nieuwe versie beschikbaar – tik om te vernieuwen';
            el.onclick = () => location.reload();
            document.body.appendChild(el);
          }
        });
      });
    } catch { /* geen sw */ }
  });
}
