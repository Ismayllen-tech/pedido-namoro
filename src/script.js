// script.js — substitua o arquivo existente por este
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const giftScreen = document.getElementById('gift-screen');
  const firstScreen = document.getElementById('first-screen');
  const nextBtn = document.getElementById('nextBtn');
  const secondScreen = document.getElementById('second-screen');
  const music = document.getElementById('music');
  const overlay = document.getElementById('autoplay-overlay');

  // 1) remover o overlay de autoplay (não deve aparecer)
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
  }

  // 2) iniciar: tocar música e ir para a primeira tela
  startBtn?.addEventListener('click', async () => {
    // tocar música (user gesture -> normalmente permitido)
    if (music) {
      try {
        await music.play();
      } catch (err) {
        // falha em tocar: apenas logue, não bloqueie navegação
        console.warn('Falha ao reproduzir áudio:', err);
      }
    }

    // fechar tela do presente e abrir primeira tela
    giftScreen?.classList.add('hidden');
    firstScreen?.classList.remove('hidden');
  });

  // 3) próximo: ir para a segunda tela
  nextBtn?.addEventListener('click', () => {
    firstScreen?.classList.add('hidden');
    secondScreen?.classList.remove('hidden');
  });

  // 4) ações da segunda tela
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const after = document.getElementById('after');

  yesBtn?.addEventListener('click', () => {
    // mostrar mensagem de confirmação
    after?.classList.remove('hidden');

    // celebrar com confete, se lib estiver carregada
    if (window.confetti) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  });

  noBtn?.addEventListener('click', () => {
    // comportamento simples para "não" (pode ser personalizado)
    alert('Tudo bem 😊 Você pode voltar quando quiser.');
  });
});
