import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";

const contentDir = path.resolve("src/content/blog");
const pagesDir = path.resolve("src/pages");

/**
 * Helper: extract frontmatter keys from a markdown file.
 */
function extractFrontmatter(content: string): Record<string, unknown> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error("No frontmatter found");

  const raw = match[1];
  const result: Record<string, unknown> = {};

  for (const line of raw.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    result[key] = line.slice(colonIndex + 1).trim();
  }
  return result;
}

/**
 * Collect all blog post files.
 */
function getBlogFiles(): string[] {
  return fs.readdirSync(contentDir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
}

/**
 * Recursively collect all .astro page files.
 */
function getPageFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getPageFiles(full));
    } else if (entry.name.endsWith(".astro") || entry.name.endsWith(".ts")) {
      results.push(full);
    }
  }
  return results;
}

describe("Blog post required frontmatter", () => {
  const files = getBlogFiles();

  for (const file of files) {
    it(`${file} has title, date, and description`, () => {
      const content = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const fm = extractFrontmatter(content);
      expect(fm).toHaveProperty("title");
      expect(fm).toHaveProperty("pubDate");
      expect(fm).toHaveProperty("description");
      // Title and description should be non-empty
      expect(String(fm.title).length).toBeGreaterThan(0);
      expect(String(fm.description).length).toBeGreaterThan(0);
    });
  }
});

describe("No broken internal links in pages", () => {
  const pageFiles = getPageFiles(pagesDir);

  // Known static routes that exist in the project
  const knownRoutes = new Set(["/", "/blog", "/tags", "/rss.xml", "/sitemap-index.xml"]);

  // Dynamic route patterns
  const dynamicPatterns = [/^\/blog\//, /^\/tags\//];

  function isValidInternalLink(href: string): boolean {
    if (knownRoutes.has(href)) return true;
    return dynamicPatterns.some((p) => p.test(href));
  }

  for (const file of pageFiles) {
    const relPath = path.relative(pagesDir, file);

    it(`${relPath} has no broken internal links`, () => {
      const content = fs.readFileSync(file, "utf-8");
      // Match href="/..." patterns (internal links)
      const linkMatches = content.matchAll(/href=["'](\/.+?)["']/g);

      for (const match of linkMatches) {
        const href = match[1];
        // Skip template literals (e.g., href={`/blog/${slug}`})
        if (href.includes("{") || href.includes("`")) continue;
        // Skip asset links
        if (href.match(/\.(svg|png|jpg|css|js|xml)$/)) continue;

        expect(isValidInternalLink(href), `Broken link: ${href} in ${relPath}`).toBe(true);
      }
    });
  }
});

describe("No broken internal links in components", () => {
  const componentsDir = path.resolve("src/components");
  const layoutsDir = path.resolve("src/layouts");

  const componentFiles = [
    ...fs.readdirSync(componentsDir).map((f) => path.join(componentsDir, f)),
    ...fs.readdirSync(layoutsDir).map((f) => path.join(layoutsDir, f)),
  ].filter((f) => f.endsWith(".astro"));

  const knownRoutes = new Set(["/", "/blog", "/tags", "/rss.xml", "/sitemap-index.xml"]);
  const dynamicPatterns = [/^\/blog\//, /^\/tags\//];

  function isValidInternalLink(href: string): boolean {
    if (knownRoutes.has(href)) return true;
    return dynamicPatterns.some((p) => p.test(href));
  }

  for (const file of componentFiles) {
    const name = path.basename(file);

    it(`${name} has no broken internal links`, () => {
      const content = fs.readFileSync(file, "utf-8");
      const linkMatches = content.matchAll(/href="(\/.+?)"/g);

      for (const match of linkMatches) {
        const href = match[1];
        if (href.includes("{") || href.includes("`")) continue;
        if (href.match(/\.(svg|png|jpg|css|js|xml)$/)) continue;
        expect(isValidInternalLink(href), `Broken link: ${href} in ${name}`).toBe(true);
      }
    });
  }
});

describe("RSS feed completeness", () => {
  it("RSS endpoint imports getCollection for blog posts", () => {
    const rssContent = fs.readFileSync(path.resolve("src/pages/rss.xml.ts"), "utf-8");
    expect(rssContent).toContain('getCollection("blog"');
  });

  it("RSS endpoint filters out drafts", () => {
    const rssContent = fs.readFileSync(path.resolve("src/pages/rss.xml.ts"), "utf-8");
    expect(rssContent).toContain("!data.draft");
  });

  it("RSS endpoint includes title, pubDate, description, and link per item", () => {
    const rssContent = fs.readFileSync(path.resolve("src/pages/rss.xml.ts"), "utf-8");
    expect(rssContent).toContain("title: post.data.title");
    expect(rssContent).toContain("pubDate: post.data.pubDate");
    expect(rssContent).toContain("description: post.data.description");
    expect(rssContent).toContain("link:");
  });
});

describe("Sitemap coverage", () => {
  it("astro.config.mjs imports sitemap integration", () => {
    const config = fs.readFileSync(path.resolve("astro.config.mjs"), "utf-8");
    expect(config).toContain('import sitemap from "@astrojs/sitemap"');
  });

  it("sitemap is included in integrations array", () => {
    const config = fs.readFileSync(path.resolve("astro.config.mjs"), "utf-8");
    expect(config).toMatch(/integrations:\s*\[.*sitemap\(\).*\]/s);
  });

  it("site URL is configured (required for sitemap generation)", () => {
    const config = fs.readFileSync(path.resolve("astro.config.mjs"), "utf-8");
    // Sitemap requires a site URL; verify it's a full URL, not empty
    const siteMatch = config.match(/site:\s*["'](.+?)["']/);
    expect(siteMatch).not.toBeNull();
    expect(siteMatch![1]).toMatch(/^https?:\/\//);
  });

  it("all static pages exist to be included in sitemap", () => {
    // Verify the pages that sitemap should pick up exist
    const expectedPages = [
      "src/pages/index.astro",
      "src/pages/blog/index.astro",
      "src/pages/tags/index.astro",
      "src/pages/404.astro",
    ];
    for (const page of expectedPages) {
      expect(fs.existsSync(path.resolve(page)), `Missing page: ${page}`).toBe(true);
    }
  });
});
