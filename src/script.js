document.addEventListener('DOMContentLoaded', () => {
  const first = document.getElementById('first-screen');
  const second = document.getElementById('second-screen');
  const nextBtn = document.getElementById('nextBtn');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const after = document.getElementById('after');
  const music = document.getElementById('music');

  function showScreen(showEl, hideEl) {
    if (hideEl) hideEl.classList.add('hidden');
    if (showEl) showEl.classList.remove('hidden');
  }

  function throwConfetti() {
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } }), 400);
    setTimeout(() => confetti({ particleCount: 100, spread: 110, origin: { y: 0.6 } }), 700);
  }

  // Ir para a segunda tela
  nextBtn.addEventListener('click', () => {
    showScreen(second, first);
    // opcional: dar foco no botão sim
    setTimeout(() => yesBtn.focus(), 120);
  });

  // Clique em "Sim"
  yesBtn.addEventListener('click', () => {
    after.classList.remove('hidden');
    throwConfetti();
    if (music) {
      music.currentTime = 0;
      music.play().catch(() => {
        // autoplay pode falhar sem interação - já houve interação (clique), então normalmente deve tocar
      });
    }
    const title = document.getElementById('title');
    title.textContent = 'Ela/Ele disse SIM! 🎉';
  });

  // Botão "não" foge
  noBtn.addEventListener('mouseenter', () => {
    const x = (Math.random() * 80) - 40;
    const y = (Math.random() * 40) - 10;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });

  // reset transform ao clicar em qualquer outro lugar
  document.addEventListener('click', (e) => {
    if (!noBtn.contains(e.target)) noBtn.style.transform = '';
  });

  // Segurança UX: se não houver música disponível, nada quebra
  if (!music.getAttribute('src')) {
    music.style.display = 'none';
  }
});
