# Usaid Siddiqui — Portfolio

A fast, dependency-free personal portfolio. Pure HTML / CSS / JS — no build step, no
framework, no npm install. Deploys as a static site anywhere.

## Design
- **Theme:** near-black surfaces (`#0a0a0b`) with a crimson-red accent (`#ff3040`).
- **Type:** Space Grotesk (display) · Inter (body) · JetBrains Mono (detail), via Google Fonts.
- **Motion:** IntersectionObserver scroll reveals, pointer-tracked spotlight + card glow,
  all gated behind `prefers-reduced-motion`.

## Structure
```
index.html          # all content & markup
css/styles.css      # design system + layout
js/main.js          # reveals, nav state, pointer effects
assets/             # résumé PDF
.nojekyll           # tells GitHub Pages to serve files as-is
```

## Run locally
Just open `index.html` in a browser, or serve the folder with any static server
(e.g. `python3 -m http.server`).

## Deploy to GitHub Pages
1. Create a repo (e.g. `Usaid-Siddiqui.github.io` for a user site, or any name for a project site).
2. Push this folder:
   ```bash
   git remote add origin git@github.com:Usaid-Siddiqui/<repo>.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**, set **Source: Deploy from a branch**,
   branch **main**, folder **/ (root)**, and save.
4. For a **user site** (`<user>.github.io`) it's live at `https://usaid-siddiqui.github.io`.
   For a **project site**, paths are already relative, so it works under
   `https://usaid-siddiqui.github.io/<repo>/` with no changes.

## Editing
- Content lives in `index.html` — projects are `<article class="project">` blocks.
- Colors and spacing are CSS custom properties at the top of `css/styles.css` (`:root`).
