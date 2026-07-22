/* KI-Assistent — reine Design-Vorschau für die Präsentation.
   Keine echte KI, kein Netzwerk, keine Speicherung: Die Konversation
   ist ein fest hinterlegtes Beispiel und wird animiert abgespielt. */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const DEMO = [
    { role: 'user', text: 'Wie lange dauert die praktische Prüfung in Teil 1?' },
    { role: 'bot',
      text: 'Die praktische Prüfung in Teil 1 der Gesellenprüfung dauert in Baden-Württemberg höchstens 4 Stunden. Sie umfasst Haarschnitt, klassische Föhnfrisur und eine Pflegebehandlung.',
      source: 'Prüfungsordnung BW · § 2 · Seite 1' },
  ];

  const launcher = document.createElement('button');
  launcher.type = 'button';
  launcher.className = 'ki-launcher';
  launcher.innerHTML = '<span class="ki-launcher__icon">✂</span> KI-Assistent';
  launcher.setAttribute('aria-label', 'KI-Assistent öffnen (Design-Vorschau)');
  document.body.appendChild(launcher);

  const panel = document.createElement('aside');
  panel.className = 'ki-panel';
  panel.setAttribute('aria-label', 'KI-Assistent (Design-Vorschau)');
  panel.innerHTML = `
    <div class="ki-panel__head">
      <div class="ki-panel__avatar">✂</div>
      <div class="ki-panel__title">
        <span class="ki-panel__name">KI-Assistent</span>
        <span class="ki-panel__meta">LOKALE KI · NUR FÜR MITGLIEDER</span>
      </div>
      <button type="button" class="ki-panel__close" aria-label="Schließen">✕</button>
    </div>
    <div class="ki-panel__badge">DESIGN-VORSCHAU — DIE ECHTE KI FOLGT</div>
    <div class="ki-panel__body"></div>
    <div class="ki-region">Antworten gelten für: <strong>deine Region</strong>
      <span class="ki-region__chip">Baden-Württemberg</span></div>
    <form class="ki-panel__input">
      <input type="text" placeholder="Frage zur Ausbildung oder Prüfung …" aria-label="Frage eingeben">
      <button type="submit" class="ki-panel__send" aria-label="Senden">➤</button>
    </form>`;
  document.body.appendChild(panel);

  const body = panel.querySelector('.ki-panel__body');
  const input = panel.querySelector('input');
  let played = false;

  function bubble(msg) {
    const div = document.createElement('div');
    div.className = 'ki-msg ki-msg--' + msg.role;
    div.textContent = msg.text;
    if (msg.source) {
      const src = document.createElement('span');
      src.className = 'ki-source';
      src.textContent = msg.source;
      src.setAttribute('role', 'button');
      src.addEventListener('click', openSource);
      div.appendChild(src);
      const hint = document.createElement('span');
      hint.className = 'ki-msg__hint';
      hint.textContent = 'Unverbindliche Lernhilfe — verbindlich ist die Prüfungsordnung deines Landes.';
      div.appendChild(hint);
    }
    body.appendChild(div);
    div.scrollIntoView({ behavior: 'smooth', block: 'end' });
    return div;
  }

  // Quellen-Klick: Dokumentansicht mit markierter Fundstelle (Beispielinhalt)
  function openSource() {
    if (panel.querySelector('.ki-docview')) return;
    const view = document.createElement('div');
    view.className = 'ki-docview';
    view.innerHTML = `
      <div class="ki-docview__head">
        <button type="button" class="ki-docview__back">← Zurück zum Chat</button>
        <a class="ki-docview__pdf" href="assets/beispiel-pruefungsordnung-bw.pdf#page=1" target="_blank" rel="noopener">Original-PDF ↗</a>
      </div>
      <div class="ki-docview__body">
        <div class="ki-docview__title">Prüfungsordnung Friseurhandwerk — Baden-Württemberg</div>
        <div class="ki-docchunk"><small>§ 1 · Seite 1</small>Diese Prüfungsordnung gilt für die Gesellenprüfung im Friseurhandwerk im Zuständigkeitsbereich der Handwerkskammern in Baden-Württemberg …</div>
        <div class="ki-docchunk ki-docchunk--hit"><small>ZITIERTE STELLE · § 2 · Seite 1</small>Die praktische Prüfung in Teil 1 der Gesellenprüfung dauert in Baden-Württemberg höchstens 4 Stunden. Sie umfasst die Bereiche Haarschnitt, klassische Föhnfrisur und eine Pflegebehandlung.</div>
        <div class="ki-docchunk"><small>§ 3 · Seite 1</small>Die Prüfung ist bestanden, wenn mindestens 50 von 100 Punkten erreicht werden …</div>
        <div class="ki-docview__note">Design-Vorschau — in der echten KI öffnet sich hier das hinterlegte Originaldokument.</div>
      </div>`;
    view.querySelector('.ki-docview__back').addEventListener('click', () => view.remove());
    panel.appendChild(view);
    requestAnimationFrame(() => view.classList.add('ki-docview--open'));
  }

  function typing() {
    const div = document.createElement('div');
    div.className = 'ki-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(div);
    div.scrollIntoView({ behavior: 'smooth', block: 'end' });
    return div;
  }

  function playDemo() {
    if (played) return;
    played = true;
    bubble({ role: 'bot', text: 'Hallo! Ich beantworte Prüfungsfragen — belegt aus den offiziellen Dokumenten deiner Region.' });
    // Beispielfrage nur als antippbarer Vorschlag — nichts wird automatisch
    // im Namen des Nutzers gesendet.
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'ki-chip';
    chip.textContent = 'Beispiel ansehen: „' + DEMO[0].text + '"';
    chip.addEventListener('click', () => {
      chip.remove();
      bubble(DEMO[0]);
      const dots = typing();
      setTimeout(() => { dots.remove(); bubble(DEMO[1]); }, 1600);
    });
    body.appendChild(chip);
    chip.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  function setOpen(open) {
    panel.classList.toggle('ki-panel--open', open);
    launcher.style.visibility = open ? 'hidden' : 'visible';
    if (open) {
      playDemo();
      input.focus();
    }
  }

  launcher.addEventListener('click', () => setOpen(true));
  panel.querySelector('.ki-panel__close').addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

  panel.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;
    bubble({ role: 'user', text: input.value.trim() });
    input.value = '';
    setTimeout(() => bubble({
      role: 'note',
      text: 'Design-Vorschau: Die echte KI läuft lokal bei der Innung und wird separat vorgeführt.',
    }), 500);
  });
});
