# AGENTS.md

## PROJECT_STRUCTURE

- root/
  - app/                  # Next.js app router and pages
    - api/                # API routes (REST or RPC)
    - components/         # Shared React components
    - styles/             # CSS or Tailwind files
  - lib/                  # Utility functions and Prisma instance
  - prisma/               # Prisma schema and migrations
    - schema.prisma
    - migrations/
  - tests/                # Unit and integration tests
  - .env                  # Environment variables (never commit with secrets)
  - README.md             # Human documentation
  - AGENTS.md             # Machine-first documentation

## TECH_STACK

- language: TypeScript
- framework: Next.js (App Router, Server Components allowed)
- orm: Prisma
- styling: Tailwind CSS (utility-first)
- test: Jest

## CODING_STANDARDS

- Use **TypeScript strict** mode
- Prefer functional React components (arrow functions)
- File naming:
  - React components: PascalCase (`MyComponent.tsx`)
  - Utils/hooks: camelCase (`useFeature.ts`)
- Always type all function params and returns
- Prefer async/await (no .then chaining)
- All DB queries use Prisma client via `lib/prisma.ts`
- Do not access process.env outside `lib/config.ts`

## DATABASE

- All database access through Prisma
- Schema changes: update `prisma/schema.prisma`, run `npx prisma migrate`
- Do not write raw SQL except in migration files
- Seed data via `prisma/seed.ts`

## TESTING

- All new features must have unit tests (`/tests`)
- Use Jest for all tests
- Mock Prisma in tests
- Run `npm test` before commit
- 80% min code coverage for business logic

## PULL_REQUESTS

- Branch naming: `feature/<short-description>` or `fix/<short-description>`
- PR description must include:
  - Purpose of changes
  - Linked issue (if any)
  - "How to test" section
- All PRs require review by at least 1 dev
- All PRs must pass CI: lint, type-check, test

## COMMANDS

- Lint:        `npm run lint`
- Type check:  `npm run type-check`
- Test:        `npm test`
- Coverage:    `npm test -- --coverage`
- Build:       `npm run build`
- Prisma Migrate: `npx prisma migrate dev`
- Seed:        `npx prisma db seed`

## ENVIRONMENT

- Node.js >= 20
- Use `.env` for all secrets and config
- Never commit secrets

## AUTOMATION_GUIDELINES

- Auto-fix code style with `npm run lint -- --fix` before commit
- Run `npm run type-check` before push
- Ensure `npm run build` passes before PR merge

## COMMENTS_FOR_AGENTS

- All changes must be idempotent and reversible
- Do not introduce breaking changes without migration
- When generating new components, include minimal Jest tests
- Prefer server actions (Next.js) over legacy API routes when possible

## REFERENCES

- https://nextjs.org/docs
- https://www.prisma.io/docs
- https://jestjs.io/docs/getting-started

## END
