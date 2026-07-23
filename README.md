# UT Competition Prototype

React + Vite prototype based on the supplied Figma screens.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown by Vite. The main route is:

```text
/UT-page/competition-list
```

A route-ready detail placeholder is available at:

```text
/UT-page/competition-detail/:competitionId
```

## Build

```bash
npm run build
npm run preview
```

## Structure

- `src/components` — reusable navbar, sidebar, tabs, filters, cards, toast
- `src/pages` — route-level screens
- `src/data` — prototype data
- `src/styles` — shared tokens and visual styles
