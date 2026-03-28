# Claude -- Boilerworks Astro Site

Primary conventions doc: [`bootstrap.md`](bootstrap.md)

Read it before writing any code.

## Stack

- **Framework**: Astro 6
- **Content**: Markdown/MDX via content collections
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest
- **Linting**: ESLint + Prettier (with astro plugins)
- **Deployment**: Cloudflare Pages (static output)

## Edge Template

This is an edge template. SSG by default, SSR opt-in. No Docker. Local development uses `npm run dev`. Production deployment targets Cloudflare Pages or any static host.

## Key Files

- `astro.config.mjs` -- Astro configuration (site URL, integrations)
- `src/content.config.ts` -- Content collection schemas (Zod)
- `src/styles/global.css` -- Tailwind imports + Boilerworks theme tokens
- `src/layouts/BaseLayout.astro` -- Base HTML layout with SEO meta tags

## Content

- Blog posts in `src/content/blog/` as `.md` or `.mdx`
- Frontmatter validated by Zod schema at build time
- Draft posts excluded via `draft: true`

## Commands

- `npm run dev` -- dev server at localhost:4321
- `npm run build` -- production build to `dist/`
- `npm test` -- vitest
- `npm run lint` -- eslint + prettier check
- `npm run format` -- auto-format
