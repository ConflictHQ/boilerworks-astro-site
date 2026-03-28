import { describe, it, expect } from "vitest";
import { z } from "astro/zod";
import * as fs from "node:fs";
import * as path from "node:path";

/**
 * Validate blog post frontmatter against the expected schema.
 * This mirrors the schema in src/content.config.ts so we catch
 * issues without needing to run the full Astro build.
 */

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  heroImage: z.string().optional(),
});

function extractFrontmatter(content: string): Record<string, unknown> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error("No frontmatter found");

  const raw = match[1];
  const result: Record<string, unknown> = {};

  for (const line of raw.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();

    // Handle booleans
    if (value === "true") value = true;
    else if (value === "false") value = false;
    // Handle arrays (simple single-line YAML arrays)
    else if (typeof value === "string" && value.startsWith("[")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    }
    // Strip quotes
    else if (typeof value === "string" && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

const contentDir = path.resolve("src/content/blog");

describe("Blog content frontmatter", () => {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  it("has at least one blog post", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    it(`${file} has valid frontmatter`, () => {
      const content = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const frontmatter = extractFrontmatter(content);
      const result = blogSchema.safeParse(frontmatter);
      if (!result.success) {
        throw new Error(`Invalid frontmatter in ${file}: ${result.error.message}`);
      }
    });
  }
});

describe("Blog content structure", () => {
  it("content directory exists", () => {
    expect(fs.existsSync(contentDir)).toBe(true);
  });

  it("has at least one non-draft post", () => {
    const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
    const nonDrafts = files.filter((file) => {
      const content = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const frontmatter = extractFrontmatter(content);
      return frontmatter.draft !== true;
    });
    expect(nonDrafts.length).toBeGreaterThan(0);
  });

  it("has a draft post for testing", () => {
    const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
    const drafts = files.filter((file) => {
      const content = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const frontmatter = extractFrontmatter(content);
      return frontmatter.draft === true;
    });
    expect(drafts.length).toBeGreaterThan(0);
  });
});
