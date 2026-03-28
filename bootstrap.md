# Boilerworks Astro Site -- Bootstrap

## Stack

- **Framework**: Astro 6 (static-first, islands architecture)
- **Content**: Content collections with Zod schemas (Markdown/MDX)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`
- **Deployment**: Cloudflare Pages (static output, optional SSR)
- **Testing**: Vitest
- **Linting**: ESLint (`eslint-plugin-astro`) + Prettier (`prettier-plugin-astro`)

## Conventions

### Content

- Blog posts go in `src/content/blog/` as `.md` or `.mdx` files
- Frontmatter must match the schema in `src/content.config.ts`
- Set `draft: true` to exclude a post from the published site
- Slugs are derived from file names

### Pages

- File-based routing in `src/pages/`
- All pages use `BaseLayout` or a layout that wraps it
- Dynamic routes use `getStaticPaths()` for static generation

### Styling

- Tailwind CSS v4 -- import via `@import "tailwindcss"` in `global.css`
- Boilerworks dark theme uses CSS custom properties (`--brand-*`)
- No `tailwind.config.js` -- Tailwind v4 uses CSS-based configuration

### Components

- Astro components in `src/components/`
- No client-side JavaScript by default
- For interactive islands: add framework integration and use `client:*` directives

### Testing

- Tests in `tests/` directory
- Run with `npm test` (vitest)
- Tests validate content schemas, SEO config, and structural integrity

### CI

- GitHub Actions: lint, build, test, audit
- All jobs run on Node 22

## Adding SSR

To add server-side rendered routes:

1. Uncomment the Cloudflare adapter in `astro.config.mjs`
2. Set `output: "hybrid"` in the config
3. Add `export const prerender = false;` in SSR pages/endpoints
