// src/script.js
document.addEventListener("DOMContentLoaded", () => {

  const giftScreen = document.getElementById("gift-screen");
  const firstScreen = document.getElementById("first-screen");
  const secondScreen = document.getElementById("second-screen");

  const paper = document.getElementById("paper");
  const ribbon = document.getElementById("ribbon");

  const startBtn = document.getElementById("startBtn");
  const nextBtn = document.getElementById("nextBtn");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  const after = document.getElementById("after");
  const music = document.getElementById("music");

  // Utilitário para espera
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Detecta preferência de redução de movimento
  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Acessibilidade: encontra o heading dentro de uma seção e garante tabindex para focar
  function focusSectionHeading(section) {
    if (!section) return;
    const heading = section.querySelector('h1, h2, h3, [role="heading"]');
    if (!heading) return;
    // garante que seja focável
    if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
    heading.focus();
  }

  // show/hide que também atualiza aria-hidden
  function show(el) {
    if (!el) return;
    el.classList.remove('hidden');
    el.setAttribute('aria-hidden', 'false');
    // foco no header da nova tela (pequeno timeout para garantir render)
    setTimeout(() => focusSectionHeading(el), 50);
  }

  function hide(el) {
    if (!el) return;
    el.classList.add('hidden');
    el.setAttribute('aria-hidden', 'true');
  }

  // Cria controle de música acessível se não existir no DOM
  function ensureMusicToggle() {
    let btn = document.getElementById('toggleMusic');
    if (btn) return btn;

    btn = document.createElement('button');
    btn.id = 'toggleMusic';
    btn.type = 'button';
    btn.className = 'music-toggle';
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-controls', music ? 'music' : '');
    btn.title = 'Tocar / pausar música';
    btn.innerText = '🎵'; // ícone simples

    btn.addEventListener('click', () => {
      if (!music) return;
      if (music.paused) {
        music.play().catch(() => {});
        btn.setAttribute('aria-pressed', 'true');
        btn.innerText = '🔊';
      } else {
        music.pause();
        btn.setAttribute('aria-pressed', 'false');
        btn.innerText = '🎵';
      }
    });

    // tecla Enter / Space funcionam
    btn.addEventListener('keydown', (ev) => {
      if (ev.key === ' ' || ev.key === 'Enter') {
        ev.preventDefault();
        btn.click();
      }
    });

    document.body.appendChild(btn);
    return btn;
  }

  // Inicial setup: define aria-hidden para as telas existentes
  [giftScreen, firstScreen, secondScreen].forEach(sec => {
    if (!sec) return;
    if (sec.classList.contains('hidden')) {
      sec.setAttribute('aria-hidden', 'true');
    } else {
      sec.setAttribute('aria-hidden', 'false');
    }
  });

  // Adiciona transição suave para o botão "no" e torna acessível via teclado
  if (noBtn) {
    noBtn.style.transition = noBtn.style.transition || 'transform 220ms ease';
    noBtn.setAttribute('aria-label', noBtn.getAttribute('aria-label') || 'Recusar');
    noBtn.setAttribute('role', noBtn.getAttribute('role') || 'button');
    noBtn.tabIndex = noBtn.tabIndex || 0;

    noBtn.addEventListener('click', () => {
      // movimento visual divertido, mas mantém foco no botão
      const x = Math.random() * 140 - 70;
      const y = Math.random() * 100 - 50;
      noBtn.style.transform = `translate(${x}px, ${y}px)`;
      // re-foca para permitir interação por teclado
      setTimeout(() => noBtn.focus(), 100);
    });

    noBtn.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        noBtn.click();
      }
    });
  }

  // Start button flow
  if (startBtn) {
    startBtn.addEventListener('click', async () => {
      startBtn.disabled = true;

      // Tenta tocar música se existir (user gesture => permitido)
      if (music) {
        music.play().catch(() => {});
      }

      // animações do presente — pule se preferir reduzir movimento
      if (ribbon && !prefersReducedMotion()) {
        ribbon.classList.add('untie');
        await wait(300);
      }
      if (paper && !prefersReducedMotion()) {
        paper.classList.add('open');
        await wait(1000);
      } else {
        // se reduced motion, aplica estado final imediatamente
        ribbon?.classList.add('untie');
        paper?.classList.add('open');
      }

      // troca de telas: esconde gift e mostra primeira
      hide(giftScreen);
      show(firstScreen);
      // garante controle de música acessível
      ensureMusicToggle();
    });
  }

  // Next button flow
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      hide(firstScreen);
      show(secondScreen);
    });
  }

  // Yes button flow (mostra after + confetti)
  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      show(after);
      // confetti: checa disponibilidade global
      if (typeof confetti === 'function') {
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        setTimeout(() => confetti({ particleCount: 80, spread: 110, origin: { y: 0.5 } }), 250);
      }
      // foco no bloco after para leitores de tela
      if (after) {
        if (!after.hasAttribute('tabindex')) after.setAttribute('tabindex', '-1');
        after.focus();
      }
    });
  }

  // Se existir controle de música pré-definido no HTML, conecta comportamento (opcional)
  const existingToggle = document.getElementById('toggleMusic');
  if (existingToggle) {
    existingToggle.addEventListener('click', () => {
      if (!music) return;
      if (music.paused) {
        music.play().catch(() => {});
        existingToggle.setAttribute('aria-pressed', 'true');
        existingToggle.innerText = '🔊';
      } else {
        music.pause();
        existingToggle.setAttribute('aria-pressed', 'false');
        existingToggle.innerText = '🎵';
      }
    });
  }

  // A11y tip: ao carregar, se a tela inicial não for o gift, foca seu heading
  const initialScreen = document.querySelector('.card.screen:not(.hidden)') || giftScreen;
  if (initialScreen) {
    setTimeout(() => focusSectionHeading(initialScreen), 50);
  }

});
