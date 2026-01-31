/* Fundo em madeira para as "telas" (sections .screen)
   Coloque a imagem em: assets/wood-bg.jpg (a partir de src/style.css use ../assets/wood-bg.jpg)
*/

:root{
  --screen-bg-image: url('../assets/wood-bg.jpg');
  --screen-overlay: rgba(255,255,255,0.86); /* ajuste para clarear/fazer contraste */
  --card-max-width: 720px;
}

/* Aplica o fundo às telas */
.screen{
  position: relative; /* necessário para o overlay pseudo-elemento */
  background-image: var(--screen-bg-image);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 2.5rem;
  box-sizing: border-box;
  color: #222;
  min-height: 60vh; /* ajuste conforme preferir */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Overlay semitransparente para melhorar leitura do conteúdo sobre a imagem */
.screen::before{
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(var(--screen-overlay), var(--screen-overlay));
  pointer-events: none;
  z-index: 0;
}

/* Garante que o conteúdo da "card" fique acima do overlay */
.screen > *{
  position: relative;
  z-index: 1;
}

/* Opcional: limitar largura das cards para melhor aparência */
.card{
  max-width: var(--card-max-width);
  width: 100%;
  margin: 0 auto;
  background: transparent; /* já temos overlay, então a card pode ser transparente */
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  border-radius: 12px;
  padding: 2rem;
  box-sizing: border-box;
}

/* Se quiser que o visual do "papel" dentro do gift não fique opaco pelo overlay,
   aumente o z-index desse elemento específico para ficar acima do overlay e do card */
.gift-screen .paper,
.gift-screen .paper-inner{
  position: relative;
  z-index: 2;
  background: rgba(255,255,255,0.95); /* opcional: papel claro por cima do fundo */
  border-radius: 8px;
}

/* Ajustes responsivos simples */
@media (max-width: 600px){
  .screen {
    padding: 1.25rem;
    min-height: 55vh;
  }
  .card { padding: 1rem; }
}
