# Calliope — Boilerworks Astro Site
<!-- Agent shim for https://github.com/calliopeai/calliope-cli -->

Primary conventions doc: [`bootstrap.md`](bootstrap.md)

Read it before writing any code.

---

## Project-specific notes

- Astro 6, static-first islands architecture; Tailwind CSS v4 via `@tailwindcss/vite` (CSS-based config — no `tailwind.config.js`).
- Content collections with Zod schemas: blog posts in `src/content/blog/` as `.md`/`.mdx`, frontmatter must match `src/content.config.ts`, `draft: true` excludes from build.
- File-based routing in `src/pages/`; all pages wrap `BaseLayout`; dynamic routes use `getStaticPaths()` for static generation.
- Edge template: SSG by default, SSR opt-in via the Cloudflare adapter (`export const prerender = false;` per SSR route). No Docker; deploys to Cloudflare Pages.
- Testing: Vitest (`tests/`). Linting: ESLint + Prettier with astro plugins. CI runs lint/build/test/e2e on Node 22.
- Commands: `npm run dev` (localhost:4321), `npm run build` (`dist/`), `npm test`, `npm run lint`.
