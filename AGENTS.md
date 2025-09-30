# Agent Guidelines for shop-ideas-frontend

## Build/Test Commands

- `npm run dev` - Start dev server on port 3000
- `npm run build` - Build for production (runs vite build && tsc)
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier
- `npm run check` - Format and fix all issues (prettier + eslint --fix)
- `npm test` - Run all tests with Vitest
- `vitest run <test-file-path>` - Run a single test file

## Code Style

- **Formatting**: Semi: false, single quotes, trailing commas (Prettier config)
- **TypeScript**: Strict mode enabled, no unused locals/parameters, verbatimModuleSyntax
- **Imports**: Use `@/` alias for src imports (e.g., `import Header from '@/components/Header'`)
- **React**: Use React 19 with TypeScript, functional components only
- **Routing**: TanStack Router - use `createFileRoute()` and export `Route` in route files
- **Styling**: Tailwind CSS v4 - use utility classes, no inline styles
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Types**: Explicit return types preferred, avoid `any`
- **Error Handling**: Use TypeScript strict mode checks, no unchecked side effects

## Project Structure

- Routes in `src/routes/` using TanStack Router file-based routing
- Components in `src/components/`
- Generated route tree at `src/routeTree.gen.ts` (do not edit manually)
