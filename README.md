# Make My Marriage

Frontend-only Next.js project. Backend services will live in a separate repository.

## Current structure
apps/web/src/app/layout.tsx composes Navbar, Sidebar, page children and Footer.

- app/page.tsx: serves the homepage at /
- app/Home/Homepage.tsx: homepage component
- app/auth/login/page.tsx: /auth/login placeholder
- app/auth/signup/page.tsx: /auth/signup placeholder
- components/Navbar.tsx, Footer.tsx, Sidebar.tsx: shared layout pieces
- components/ui: small reusable UI components
- lib/routes.ts: route names

No marketing/family route groups or active dashboard. Login and signup have no authentication implementation yet. Home is a component folder; the root page renders it without adding /Home to the URL.

## Commands
Run from the repository root: npm run dev, npm run lint, npm run typecheck, npm run build.
