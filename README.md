# Versetime

A web app that displays a Bible verse matching the current time of day — 3:16 PM shows a verse from chapter 3, verse 16.

Check it out at https://VerseTime.net

It's not a perfect idea, and here's why: https://VerseTime.net/coverage


## Architecture

- **apps/web** — React 18, React Router 7, Vite 6, Tailwind CSS 4
- **apps/api** — Express 5, PostgreSQL, TypeScript (tsx for dev)
- **Database** — PostgreSQL in Docker with BSB Bible data

In dev, Vite proxies `/api/*` to the Express server. In production, Express serves the built web app as static files.

```
Browser
  └─ Vite dev server :5173  →  /api/*  →  Express API :3000  →  PostgreSQL :5432
```

## Prerequisites

- Node.js 18+
- pnpm 10+
- Docker

## Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start PostgreSQL

```bash
cd apps/api
docker compose up -d
```

### 3. Create the API environment file

Create `apps/api/.env`:

```env
PGHOST=localhost
PGUSER=api
PGPASSWORD=devpass
PGDATABASE=bible
PGPORT=5432
```

### 4. Load Bible data

```bash
docker exec -it versetime-db psql -U api -d bible -f /bible-data/bsb-insert.sql
```

This only needs to be done once. The 4.6 MB BSB data file is mounted read-only in the container.

## Development

```bash
pnpm dev          # starts all apps via Turbo
```

Or run individually:

```bash
cd apps/api && pnpm dev    # tsx watch on port 3000
cd apps/web && pnpm dev    # Vite dev server on port 5173
```

## Build

```bash
pnpm build        # type-checks and builds all apps via Turbo
```

## Database Connection

```bash
docker exec -it versetime-db psql -U api -d bible
```

Or connect via a GUI client:

| Setting  | Value     |
|----------|-----------|
| Host     | localhost |
| Port     | 5432      |
| User     | api       |
| Password | devpass   |
| Database | bible     |

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/verse/:book/:chapter/:verse` | Fetch a single verse |
| GET | `/api/chapter/:book/:chapter` | Fetch all verses in a chapter |
| GET | `/api/time/:chapter/:verse` | Fetch a verse where chapter:verse matches the time |
| GET | `/api/full/:chapter/:verse` | Fetch a verse with surrounding context (smart sentence boundaries) |

## Attribution

Scripture quotations are taken from the [Berean Standard Bible](https://berean.bible/) (BSB), © 2016–2024 by Bible Hub, used by permission. All rights reserved worldwide.
