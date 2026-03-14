# experimentum-ts

A strict, ESM-only TypeScript project for experimenting with a TypeScript-native HTTP framework for Node.js.

## Assumptions implemented

- Package name matches the directory: `experimentum-ts`
- ESM-only package (`"type": "module"`)
- Latest TypeScript major line installed (currently 5.x)
- Strictest practical TypeScript compiler settings enabled
- ESLint with strict type-aware rules
- Prettier configured and integrated with linting conflict prevention
- Build output emitted to `dist/` from `lib/`

## Scripts

- `npm run dev` - run in watch mode with `tsx`
- `npm run typecheck` - type-check without emitting files
- `npm run lint` - run ESLint with zero warnings allowed
- `npm run lint:fix` - auto-fix lint issues where possible
- `npm run format` - format files with Prettier
- `npm run format:check` - verify formatting
- `npm run build` - clean and compile to `dist/`

## Quick start

1. Install dependencies:
   - `npm install`
2. Type-check:
   - `npm run typecheck`
3. Lint:
   - `npm run lint`
4. Build:
   - `npm run build`

## Next suggested steps

- Add a test runner (`vitest` or `node:test` harness)
- Add CI workflows for lint/typecheck/build
- Define request/response abstractions and middleware pipeline
- Add publishing metadata when ready for GitHub/npm release
