/* Demo-Interaktionen für Mitgliedsanfrage und Mitgliederbereich.
   Reine Vorschau: Es werden keine Daten übertragen oder gespeichert. */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Mitglied-werden: Formular-Vorschau — zeigt nur die Bestätigung an
  const joinForm = document.getElementById('join-form');
  if (joinForm) {
    joinForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const success = document.getElementById('join-success');
      success.hidden = false;
      joinForm.reset();
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Login: Demo-Dashboards (Mitglied / Verwaltung), keine echte Anmeldung
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    let role = 'mitglied';

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        role = tab.dataset.role;
        tabs.forEach((t) => t.classList.toggle('tab--active', t === tab));
      });
    });

    const views = ['login-view', 'dash-member', 'dash-admin'];
    const show = (id) => {
      views.forEach((view) => {
        document.getElementById(view).classList.toggle('hidden', view !== id);
      });
      document.body.classList.toggle('page--dark', id === 'login-view');
      window.scrollTo({ top: 0 });
    };

    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      show(role === 'admin' ? 'dash-admin' : 'dash-member');
    });

    document.querySelectorAll('.logout').forEach((button) => {
      button.addEventListener('click', () => show('login-view'));
    });
  }
});
