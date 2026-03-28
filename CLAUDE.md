# Claude -- Boilerworks Astro Site

Primary conventions doc: [`bootstrap.md`](bootstrap.md)

Read it before writing any code.

## Stack

- **Framework**: Astro
- **Architecture**: Islands (Svelte/React/Vue components)
- **Styling**: Tailwind CSS
- **Content**: Markdown/MDX
- **Deployment**: Cloudflare Pages

## Edge Template

This is an edge template. SSG + SSR hybrid, content-first. Islands architecture ships zero JS by default, hydrating interactive components on demand. Production deployment targets Cloudflare Pages, not Docker. Local development uses `astro dev`.

## Status

This template is planned. See the [stack primer](../primers/astro-site/PRIMER.md) for architecture decisions and build order.
