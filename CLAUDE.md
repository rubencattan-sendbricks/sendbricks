# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

No test framework is configured.

## Architecture

**SendBricks** is a French-language SaaS for artisans to manage quotes ("devis") and invoices ("factures"). It is a React 18 + Vite frontend with a Base44 backend SDK (currently mocked for development).

### Routing (`src/App.jsx`)

Three route categories:
- **Public**: `/quote/:id` — client-facing quote signing page (`ClientQuote.jsx`)
- **Admin** (wrapped in `AdminLayout`): `/admin/quotes`, `/admin/invoices`, `/admin/products`, `/admin/clients`, `/admin/templates`, `/admin/settings`, `/admin/select-company`, `/admin/dashboard`
- **Super-admin**: `/admin/super/dashboard`, `/admin/super/users`, `/admin/super/companies`

Default `/` redirects to `/admin`.

### Data Layer

**Services** (`src/services/`):
- `base44.js` — Base44 SDK wrapper; defines entity schemas (Company, Product, Quote, Client, CGV, Option) and reads `VITE_BASE44_PROJECT_ID` / `VITE_BASE44_API_KEY` from env.
- `quotes.js` / `invoices.js` — Currently use mock data (Base44 calls are commented out). Replace mocks with `Base44.db.entity.list()` / `.create()` etc. when integrating.

**Hooks** (`src/hooks/`):
- `useQuotes.js` / `useInvoices.js` — TanStack React Query wrappers over the services. Queries are keyed `['quotes']` / `['invoices']`; mutations invalidate the cache automatically.
- `useAuth.js` — Stub for Google OAuth + email magic link via Base44. Not fully wired.
- `useCompany.js` — Multi-tenant company switcher using mock companies. Active company is tracked here; sidebar reads it to show the current tenant badge.

### UI Components (`src/components/`)

Reusable primitives (`Button`, `Card`, `Badge`, `Input`) follow the shadcn/ui pattern: variants are defined with `class-variance-authority`, class merging uses `src/utils/cn.js` (`clsx` + `tailwind-merge`).

`AdminLayout.jsx` renders the fixed left sidebar (288 px) with role-aware navigation (regular artisan vs super-admin).

### Styling

Tailwind CSS with a CSS-variable color system (HSL tokens: `--primary`, `--destructive`, `--muted`, etc.) defined in `src/index.css`. Custom fonts: **Clash Grotesk** (`font-clash`) for headings, **Fira Mono** (`font-mono`) for body. Dark mode is implemented via the `.dark` class.

### PDF Generation

`jspdf` and `jspdf-autotable` are installed but PDF export is not yet implemented. `DocumentPreview.jsx` is the integration point.

### Environment Variables

```
VITE_BASE44_PROJECT_ID=
VITE_BASE44_API_KEY=
```

Copy `.env.example` to `.env` and fill in values to enable real backend calls.
