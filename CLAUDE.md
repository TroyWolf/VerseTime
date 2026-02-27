# Versetime

A Bible verse clock app. Displays verses that match the current time (chapter:verse → HH:MM).

## Monorepo Structure

- `apps/web` — React frontend (versetime-app)
- `apps/api` — Express backend (versetime-api)
- `packages/eslint-config` — shared ESLint config
- `packages/typescript-config` — shared TypeScript config

## Package Manager

Use **pnpm**. The binary is at `~/.local/share/pnpm/pnpm`. Add it to PATH when running commands:

```bash
export PATH="$HOME/.local/share/pnpm:$PATH"
```

Run tasks across the monorepo via Turbo:

```bash
pnpm dev     # starts both apps in dev mode
pnpm build   # builds both apps
pnpm lint
```

Or target a specific app:

```bash
pnpm --filter versetime-app dev
pnpm --filter versetime-api dev
```

## Web App (`apps/web`)

- React 18, React Router 7, Vite 6, TypeScript
- **Tailwind CSS 4** — configured via `@tailwindcss/vite` (no `tailwind.config.js` or `postcss.config.js`)
- All source files are `.tsx` / `.ts`
- `tsconfig.json` uses `"moduleResolution": "bundler"`, `"noEmit": true`

Scripts:

```bash
pnpm dev        # vite dev server
pnpm build      # tsc -b && vite build
pnpm typecheck  # tsc --noEmit
pnpm lint
```

## API (`apps/api`)

- Express 5, PostgreSQL (`pg`), TypeScript, `tsx`
- No Babel — `tsx watch` for dev, `tsc` for production build
- `tsconfig.json` uses `"module": "NodeNext"`, `"moduleResolution": "NodeNext"`, outputs to `dist/`
- All imports within the API must use `.js` extensions (NodeNext resolution)
- Named SQL params via `tinypg-parser`
- Rate limiting via `express-rate-limit` (Caddy proxy, trust proxy already set)

Scripts:

```bash
pnpm dev    # tsx watch src/index.ts
pnpm build  # tsc
pnpm start  # node dist/index.js
```

API routes are mounted under `/api`:
- `GET /api/verse/:book/:chapter/:verse`
- `GET /api/chapter/:book/:chapter`
- `GET /api/time/:chapter/:verse` — verse matching the current time
- `GET /api/full/:chapter/:verse` — full context for time verse

Route handlers type `req.params` with `as Params` (`Record<string, string>`) due to Express 5 types.

## Database

- PostgreSQL in Docker (`versetime-db` container)
- DB: `bible`, User: `api` / `devpass`, Superuser: `root` / `root`
- Schema created by `bootstrap.sql` (runs via `docker-entrypoint-initdb.d`)
- Bible data in `apps/api/bsb-insert.sql` (mounted at `/bible-data/` in container)

Load data after starting the container:

```bash
docker exec -it versetime-db psql -U api -d bible -f /bible-data/bsb-insert.sql
```

API reads env vars from `apps/api/.env` (gitignored). Required vars: `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`.

## Key Patterns

- Service functions (`bible/service.ts`) return `Verse | ErrorResponse`; routes check `'code' in data` to set HTTP status
- SQL files loaded via `import.meta.url` + `fileURLToPath` + `dirname/join`
- `VerseEntry` type in the web app is a loose union that handles both real verses and "no verse" placeholder states (where `scripture` may be a `ReactNode`)
