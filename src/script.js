document.addEventListener('DOMContentLoaded', () => {
  // screens & elements
  const giftScreen = document.getElementById('gift-screen');
  const paper = document.getElementById('paper');
  const ribbon = document.getElementById('ribbon');
  const startBtn = document.getElementById('startBtn');

  const first = document.getElementById('first-screen');
  const second = document.getElementById('second-screen');
  const nextBtn = document.getElementById('nextBtn');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const after = document.getElementById('after');
  const music = document.getElementById('music');

  const overlay = document.getElementById('autoplay-overlay');
  const overlayPlay = document.getElementById('overlayPlay');

  function showScreen(showEl, hideEl) {
    if (hideEl) hideEl.classList.add('hidden');
    if (showEl) showEl.classList.remove('hidden');
  }

  function throwConfetti() {
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } }), 400);
    setTimeout(() => confetti({ particleCount: 100, spread: 110, origin: { y: 0.6 } }), 700);
  }

  // fade volume helper
  function fadeVolume(el, from, to, duration = 1500) {
    if (!el) return;
    const steps = 30;
    const stepTime = duration / steps;
    let current = from;
    const delta = (to - from) / steps;
    el.volume = Math.max(0, Math.min(1, from));
    let i = 0;
    const iv = setInterval(() => {
      i++;
      current += delta;
      el.volume = Math.max(0, Math.min(1, current));
      if (i >= steps) {
        clearInterval(iv);
        el.volume = Math.max(0, Math.min(1, to));
      }
    }, stepTime);
  }

  // AUTOPLAY fallback helpers (overlay)
  function showOverlay(){ if (overlay){ overlay.classList.remove('hidden'); overlay.setAttribute('aria-hidden','false'); } }
  function hideOverlay(){ if (overlay){ overlay.classList.add('hidden'); overlay.setAttribute('aria-hidden','true'); } }
  function unlockAudioOnUserGesture() {
    const attempt = async () => {
      if (!music) return;
      try { await music.play(); hideOverlay(); removeGestureListeners(); }
      catch(e){ /* keep overlay */ }
    };
    const onFirstGesture = () => attempt();
    ['click','touchstart','keydown'].forEach(evt => window.addEventListener(evt, onFirstGesture, { once:true, passive:true }));
    if (overlayPlay) overlayPlay.addEventListener('click', async () => {
      try { await music.play(); hideOverlay(); } catch(e){ console.warn(e); }
    });
    function removeGestureListeners(){ ['click','touchstart','keydown'].forEach(evt => window.removeEventListener(evt,onFirstGesture)); }
  }

  // startBtn sequence: untie ribbon -> open paper -> show first screen -> fade music in
  startBtn.addEventListener('click', async () => {
    startBtn.disabled = true;
    // untie ribbon
    if (ribbon) ribbon.classList.add('untie');

    // prepare and start music playback now (user gesture), but keep volume low until reveal
    if (music) {
      try {
        music.currentTime = 0;
        music.volume = 0;
        await music.play(); // allowed because it's inside user click handler
      } catch (err) {
        console.warn('Falha ao iniciar áudio no clique:', err);
        // se falhar, mostra overlay para o usuário tocar manualmente
        showOverlay();
      }
    }

    // timings (sincronizar com CSS)
    const UNTIE_DURATION = 700; // ms (mesma referência no CSS)
    const OPEN_DURATION = 800;  // ms

    // abrir papel após o laço desfazer
    setTimeout(() => {
      if (paper) paper.classList.add('open');
    }, UNTIE_DURATION);

    // quando abrir totalmente, mostrar a tela de mensagem e fazer fade-in da música
    setTimeout(() => {
      showScreen(first, giftScreen);
      // fade in music até volume 1
      if (music) fadeVolume(music, 0, 1, 1400);
      // focar botão próximo
      setTimeout(() => nextBtn.focus(), 120);
    }, UNTIE_DURATION + OPEN_DURATION + 100);
  });

  // Próximo passo -> tela do pedido
  nextBtn.addEventListener('click', () => {
    showScreen(second, first);
    setTimeout(() => yesBtn.focus(), 120);
  });

  // clique em "Sim"
  yesBtn.addEventListener('click', async () => {
    after.classList.remove('hidden');
    throwConfetti();
    if (music) {
      try { await music.play(); } catch (err) { showOverlay(); }
    }
    const title = document.getElementById('title');
    title.textContent = 'Ela/Ele disse SIM! 🎉';
  });

  // "não" foge
  noBtn.addEventListener('mouseenter', () => {
    const x = (Math.random() * 80) - 40;
    const y = (Math.random() * 40) - 10;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });
  document.addEventListener('click', (e) => { if (!noBtn.contains(e.target)) noBtn.style.transform = ''; });

  // prepare autoplay fallback listeners
  unlockAudioOnUserGesture();

  // safety: se não houver src, escondemos overlay
  if (!music || !music.getAttribute('src')) hideOverlay();
});
