// src/script.js
(() => {
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

  const show = (el) => el && el.classList.remove("hidden");
  const hide = (el) => el && el.classList.add("hidden");

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  startBtn?.addEventListener("click", async () => {
    // trava spam de clique
    startBtn.disabled = true;

    // tenta tocar música (se existir)
    music?.play().catch(() => {});

    // anima presente
    ribbon?.classList.add("untie");
    await wait(250);
    paper?.classList.add("open");

    // espera a animação ficar bonita
    await wait(1100);

    hide(giftScreen);
    show(firstScreen);
  });

  nextBtn?.addEventListener("click", () => {
    hide(firstScreen);
    show(secondScreen);
  });

  yesBtn?.addEventListener("click", () => {
    show(after);

    if (typeof confetti === "function") {
      confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 } });
      setTimeout(() => confetti({ particleCount: 80, spread: 120, origin: { y: 0.5 } }), 250);
    }
  });

  noBtn?.addEventListener("click", () => {
    const x = Math.random() * 160 - 80;
    const y = Math.random() * 110 - 55;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });
})();
