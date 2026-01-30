# Pedido Namoro

Pequeno projeto/landing para um pedido de namoro — uma página estática e bonita que você pode personalizar com imagens, áudio e mensagens.

## Objetivo
Criar uma experiência simples e romântica para fazer um pedido de namoro usando uma página web estática.

## O que inclui
- `index.html` — página principal (interativa, com confetes e som).
- `src/` — scripts e estilos (separados).
- `assets/` — imagens, áudio e outros recursos.
- `.github/workflows/deploy-pages.yml` — workflow que publica o site (opcional).
- `LICENSE` — MIT.
- `.gitignore` — entradas úteis para projeto web.

## Como usar (local)
1. Clone o repositório:
   git clone git@github.com:Ismayllen-tech/pedido-namoro.git
   cd pedido-namoro

2. Abra `index.html` no navegador para testar localmente:
   - No VSCode: botão "Open with Live Server" (se tiver extensão) ou
   - no terminal: abra o arquivo com seu navegador.

3. Personalize:
   - Substitua `assets/music.mp3` por uma música sua.
   - Troque textos, cores e imagens em `index.html` e `src/style.css`.

## Deploy (GitHub Pages)
- Opção 1 (simples): Habilite GitHub Pages nas configurações do repositório e escolha a branch `gh-pages` (o workflow fornecido publica para `gh-pages`).
- Opção 2: Hospede manualmente em qualquer host estático (Netlify, Vercel, Surge).

## Licença
MIT — veja o arquivo LICENSE.

## Estrutura sugerida
- index.html
- src/
  - script.js
  - style.css
- assets/
  - music.mp3 (substitua)
  - image.jpg (opcional)
- .github/
  - workflows/
    - deploy-pages.yml
- README.md
- LICENSE
