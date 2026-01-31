document.addEventListener('DOMContentLoaded', () => {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const after = document.getElementById('after');
  const music = document.getElementById('music');

  function throwConfetti() {
    // três rajadas de confete
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } }), 400);
    setTimeout(() => confetti({ particleCount: 100, spread: 110, origin: { y: 0.6 } }), 700);
  }

  yesBtn.addEventListener('click', () => {
    after.classList.remove('hidden');
    throwConfetti();
    if (music) {
      music.currentTime = 0;
      music.play().catch(() => {
        // autoplay pode falhar; nada a fazer
      });
    }
    // opcional: animar título
    const title = document.getElementById('title');
    title.textContent = 'Ela/Ele disse SIM! 🎉';
  });

  // brincadeira: botão "não" foge se o cursor chegar perto
  noBtn.addEventListener('mouseenter', () => {
    const x = (Math.random() * 60) - 30;
    const y = (Math.random() * 30) - 10;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });

  // reset transform ao clicar em qualquer outro lugar
  document.addEventListener('click', (e) => {
    if (!noBtn.contains(e.target)) noBtn.style.transform = '';
  });
});
