# Boilerworks Astro Site

> Edge template -- Astro on Cloudflare Pages. Content sites, blogs, docs, marketing. SSG + SSR hybrid.

## Quick Start

```bash
npm install
npm run dev
```

Site runs at `http://localhost:4321`.

## Scripts

| Command           | Description               |
| ----------------- | ------------------------- |
| `npm run dev`     | Start dev server          |
| `npm run build`   | Build for production      |
| `npm run preview` | Preview production build  |
| `npm run check`   | Astro type checking       |
| `npm test`        | Run vitest                |
| `npm run lint`    | ESLint + Prettier check   |
| `npm run format`  | Auto-format with Prettier |

## Project Structure

```
src/
  components/       # Astro components (Header, Footer, BlogPostCard, etc.)
  content/
    blog/           # Blog posts (Markdown/MDX)
  layouts/          # Page layouts (BaseLayout, BlogPostLayout)
  pages/            # File-based routing
    blog/           # Blog index + [slug] pages
    tags/           # Tag index + [tag] pages
    rss.xml.ts      # RSS feed endpoint
    404.astro       # Custom 404
  styles/
    global.css      # Tailwind + Boilerworks theme
  content.config.ts # Content collection schemas
tests/              # Vitest tests
```

## Content

Blog posts live in `src/content/blog/` as `.md` or `.mdx` files. Frontmatter schema:

```yaml
---
title: "Post Title"
description: "Brief description."
pubDate: 2026-03-15
updatedDate: 2026-03-20 # optional
tags: ["tag1", "tag2"] # optional, defaults to []
draft: false # optional, defaults to false
heroImage: "/image.jpg" # optional
---
```

Draft posts (`draft: true`) are excluded from the published site.

## Deployment

Static output deploys to any static host. For Cloudflare Pages:

1. Connect repository to Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `dist`

For SSR routes, uncomment the `@astrojs/cloudflare` adapter in `astro.config.mjs`.

## Stack

- Astro 6 (content collections, file-based routing)
- Tailwind CSS v4
- MDX support
- RSS feed + Sitemap
- SEO meta tags (Open Graph, Twitter cards)
- Vitest for testing
- ESLint + Prettier
- GitHub Actions CI (lint, build, test, audit)
