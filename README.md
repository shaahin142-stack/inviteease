# InviteEase

Digital invitation marketplace built with React + Vite. Pick a template, edit every detail with a live preview, download a high-quality PNG, or share on WhatsApp.

## Run locally
Requires Node.js 18+.

```bash
npm install
npm run dev        # open the URL shown (usually http://localhost:5173)
```

## Build for production
```bash
npm run build      # outputs the static site to /dist
npm run preview    # test the production build locally
```

## Project structure
```
inviteease/
├── index.html              # page shell + Google Fonts
├── package.json
├── vite.config.js
├── public/favicon.svg      # static assets (copied as-is)
└── src/
    ├── main.jsx            # entry point
    ├── App.jsx             # view switching (home / gallery / editor)
    ├── styles.css          # all styling (pink, cream and gold theme)
    ├── data/templates.js   # categories, 12 templates, fonts, colour swatches, defaults
    ├── utils/draw.js       # canvas renderer for previews and the downloaded image
    ├── utils/hooks.js      # useFonts, useImg
    └── components/         # Nav, Hero, Home, Gallery, Editor, Invite, Field, Swatches, Toast, Footer
```

## Customise
- **Add a template:** add one line to `TPL` in `src/data/templates.js` (id, category, name, background, text colour, accent, decoration, font). Decorations: floral, dots, confetti, stars, hearts, frame, arch.
- **Add a category:** add it to `CATS` and `DEF` in the same file.
- **Change the look of the cards:** edit `src/utils/draw.js`.
- **Branding and colours:** edit the CSS variables at the top of `src/styles.css`.

## Deploy
Deploy the `dist/` folder (after `npm run build`) to any static host:
- **Netlify:** drag `dist` onto https://app.netlify.com/drop, or connect your repo with build command `npm run build` and publish directory `dist`.
- **Vercel:** import the repo; the Vite preset is detected automatically.
- **GitHub Pages:** push the repo and publish `dist` (e.g. with the `gh-pages` package or a GitHub Action).

Notes: fonts load from Google Fonts, so the first load needs internet access. WhatsApp image sharing uses the phone's share sheet; on desktop it opens WhatsApp with the message text and you attach the downloaded image.
