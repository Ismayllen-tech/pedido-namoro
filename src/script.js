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

  const show = (el) => el && el.classList.remove("hidden");
  const hide = (el) => el && el.classList.add("hidden");

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  startBtn.addEventListener("click", async () => {
    startBtn.disabled = true;

    // tenta tocar música (se existir)
    music?.play().catch(() => {});

    // animações do presente
    ribbon?.classList.add("untie");
    await wait(300);
    paper?.classList.add("open");
    await wait(1000);

    // troca de telas
    hide(giftScreen);
    show(firstScreen);
  });

  nextBtn.addEventListener("click", () => {
    hide(firstScreen);
    show(secondScreen);
  });

  yesBtn.addEventListener("click", () => {
    show(after);

    if (typeof confetti === "function") {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => confetti({ particleCount: 80, spread: 110, origin: { y: 0.5 } }), 250);
    }
  });

  noBtn.addEventListener("click", () => {
    const x = Math.random() * 140 - 70;
    const y = Math.random() * 100 - 50;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });

});
