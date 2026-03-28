---
title: "Understanding Astro's Islands Architecture"
description: "How Astro ships zero JavaScript by default and lets you opt into interactivity exactly where you need it."
pubDate: 2026-03-20
tags: ["astro", "architecture", "performance"]
---

Astro's islands architecture is fundamentally different from traditional SPAs. Instead of shipping a JavaScript bundle for the entire page, Astro renders everything to static HTML and only hydrates the interactive components you specify.

## Zero JavaScript by Default

When you build a page in Astro, the output is plain HTML. No JavaScript framework runtime, no hydration overhead, no bundle to parse. Text, images, and layout are all static.

This means your site loads faster, uses less bandwidth, and works even when JavaScript is disabled.

## Opting Into Interactivity

When you need interactivity -- a search widget, a form, a theme toggle -- you add a hydration directive:

```astro
<!-- Static: rendered as HTML, no JS shipped -->
<MyComponent />

<!-- Interactive: hydrated when the browser is idle -->
<MyComponent client:idle />

<!-- Interactive: hydrated when visible in the viewport -->
<MyComponent client:visible />
```

## Hydration Directives

Astro provides several directives for controlling when a component hydrates:

- **`client:load`** -- Hydrate immediately on page load. Use for above-the-fold interactive content.
- **`client:idle`** -- Hydrate when the browser is idle. Good for non-critical interactivity.
- **`client:visible`** -- Hydrate when the component scrolls into view. Best for below-the-fold content.
- **`client:media`** -- Hydrate when a CSS media query matches. Useful for responsive interactivity.

## Why This Matters

For content sites, most of the page is static. A blog post is text. A marketing page is copy and images. Shipping a full framework runtime for these pages is waste.

Islands architecture lets you have the best of both worlds: static performance with interactive sprinkles exactly where needed.
