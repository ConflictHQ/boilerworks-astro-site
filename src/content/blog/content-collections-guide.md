---
title: "Type-Safe Content with Astro Collections"
description: "How to use Astro's content collections for validated, type-safe Markdown and MDX content."
pubDate: 2026-03-25
tags: ["astro", "content", "typescript"]
---

Astro's content collections give you type-safe content with schema validation. Define a schema once, and every piece of content is validated at build time.

## Defining a Collection

Collections are configured in `src/content.config.ts`:

```typescript
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

The schema is a Zod object. If a post's frontmatter doesn't match, the build fails with a clear error message.

## Querying Content

Use `getCollection` to query all entries:

```typescript
import { getCollection } from "astro:content";

const posts = await getCollection("blog", ({ data }) => !data.draft);
```

The filter callback lets you exclude drafts or filter by any frontmatter field. The returned data is fully typed -- your editor knows every field and its type.

## Rendering Content

To render a post's Markdown/MDX body:

```typescript
import { render } from "astro:content";

const { Content } = await render(post);
```

The `Content` component renders the processed Markdown as HTML. MDX posts can include interactive components.

## Benefits

- **Type safety** -- catch typos and missing fields at build time
- **Validation** -- Zod schemas enforce data integrity
- **IDE support** -- full autocomplete for frontmatter fields
- **Flexibility** -- schemas can include transforms, defaults, and custom types
