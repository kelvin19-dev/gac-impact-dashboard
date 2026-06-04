# GAC Impact Intelligence Dashboard

A mobile-first impact intelligence dashboard for Afriquity × the Global Alliance for Communities (GAC). It brings member network, project, funding, and impact data into a single board- and donor-ready view.

## Features

- **Overview** — headline KPIs and trends across the GAC network.
- **Network** — member organizations, status, and reach.
- **Projects** — portfolio tracking with status and risk signals.
- **Funding & Loans** — grants, loans, in-kind, and technical support.
- **Impact & Evidence** — outcomes and supporting evidence.
- **Counties & Regions** — geographic breakdown across Kenyan regions.
- **Reports** — donor- and board-ready PowerPoint templates with narrative briefs.
- **Data quality** — coverage and freshness indicators.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Base UI](https://base-ui.com/) primitives via the [coss ui](https://ui.coss.com/) shadcn registry
- [Recharts](https://recharts.org/) for charts
- [lucide-react](https://lucide.dev/) icons
- TypeScript

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |

## Project structure

```
src/
  app/              Next.js App Router entry (layout, page, global styles)
  components/
    dashboard-app.tsx   Main dashboard UI
    ui/                 Reusable UI primitives (coss ui / Base UI)
  data/
    dashboard-content.ts  Dashboard content and types
  lib/
    dashboard-data.ts     Derived metrics and selectors
    utils.ts
public/
  reports/          Downloadable report artifacts
```
