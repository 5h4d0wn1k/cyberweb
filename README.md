> **⚠️ EDUCATIONAL USE ONLY — AUTHORIZED TESTING ONLY.**
> This project exists for education, research, and **defense of systems you own
> or hold explicit written authorization to assess**. Unauthorized use is
> prohibited and may be illegal. Read [ETHICS.md](ETHICS.md) and
> [SCOPE.md](SCOPE.md) before use. Use at your own risk; **AS IS**, no warranty.

# CyberWeb — Cybersecurity Learning Platform

CyberWeb is a **cybersecurity education** web application built with
**TypeScript**, **Next.js**, and **Supabase**. It turns security theory into
hands-on learning with a course catalog, interactive **hacking challenges**,
quizzes, progress tracking, and an admin CMS for course content.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/5h4d0wn1k/cyberweb)](https://github.com/5h4d0wn1k/cyberweb)
[![Last commit](https://img.shields.io/github/last-commit/5h4d0wn1k/cyberweb)](https://github.com/5h4d0wn1k/cyberweb)
[![Issues](https://img.shields.io/github/issues/5h4d0wn1k/cyberweb)](https://github.com/5h4d0wn1k/cyberweb)

## Why CyberWeb

Where do people learn cybersecurity safely? Most courses lean on
video lectures that never let the student touch a real attack surface. CyberWeb
closes that gap with a structured, ethical, browser-based learning path:
courses across offensive and defensive topics, interactive challenges and
quizzes, and per-user progress with points. It is built only for
**authorized, educational security testing** — the platform teaches concepts
and defends systems you own or are explicitly permitted to assess.

## Features

- **Course catalog** — offensive/defensive courses with difficulty levels and points (`supabase/seed.sql`)
- **Interactive challenges** — learn-by-doing challenge pages with per-challenge detail routes
- **Quiz builder** — reusable assessment component for hands-on evaluation
- **Progress & gamification** — user profiles, points totals, and completion stats via `/api/education/stats`
- **Admin CMS** — course/module/challenge management dialogs and dashboard overview
- **Auth** — NextAuth + Supabase login and registration with route protection
- **Supabase backend** — migrations, config, and seed data for courses/challenges/users
- **SEO-ready pages** — `sitemap.ts` and `robots.ts`, plus marketing pages (blog, careers, pricing, services)
- **Quality tooling** — Vitest config, `npm run validate` (type-check + lint)

## Quickstart

```bash
cp .env.example .env    # Supabase URL/keys + NextAuth secret
npm install
npm run dev             # http://localhost:3000
```

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run validate` | Type-check + lint gate |
| `npm run test` | Vitest suite |

## Project structure

- `app/` — Next.js App Router pages: `education/`, `admin/`, `api/`, `auth/`, plus marketing routes
- `components/` — `admin/`, `assessment/`, `education/`, and UI primitives
- `supabase/` — `config.toml`, `migrations/`, `seed.sql`
- `lib/`, `hooks/`, `types/` — typed Supabase clients, API helpers, and schema types

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

MIT — see [LICENSE](LICENSE).

## Legal

- [ETHICS.md](ETHICS.md) · [SCOPE.md](SCOPE.md) · [SECURITY.md](SECURITY.md)