/* Mobile Hamburger-Navigation: öffnet/schließt das Vollbild-Menü.
   Kein Netzwerk, keine Speicherung — nur Klassen-Toggles im DOM. */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open
      ? (toggle.dataset.labelClose || 'Menü schließen')
      : (toggle.dataset.labelOpen || 'Menü öffnen'));
  };

  toggle.addEventListener('click', () => {
    setOpen(!document.body.classList.contains('nav-open'));
  });

  // Menü schließt beim Klick auf einen Link
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  // Beim Wechsel auf Desktop-Breite Zustand zurücksetzen
  const desktop = window.matchMedia('(min-width: 1100px)');
  desktop.addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
});
