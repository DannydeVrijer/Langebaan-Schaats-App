/**
 * Meet-events. Nu: console + dataLayer (GTM-klaar). Later: GA4/Plausible koppelen.
 * Gebruik: track('ticket_click', { tournament: 'wckt', source: 'home' })
 */
declare global { interface Window { dataLayer?: Record<string, unknown>[] } }
export const track = (event: string, data: Record<string, unknown> = {}) => {
  const payload = { event, ...data, ts: Date.now() };
  (window.dataLayer ||= []).push(payload);
  if (import.meta.env.DEV) console.info('[track]', payload);
};
