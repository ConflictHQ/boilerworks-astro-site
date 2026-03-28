import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";

/**
 * Component rendering tests.
 * Since Astro components can't be rendered outside the Astro build pipeline,
 * these tests verify the component source contains the expected HTML structure
 * and key elements that will appear in rendered output.
 */

const componentsDir = path.resolve("src/components");
const layoutsDir = path.resolve("src/layouts");

describe("Header component", () => {
  const header = fs.readFileSync(path.join(componentsDir, "Header.astro"), "utf-8");

  it("renders nav element", () => {
    expect(header).toContain("<nav");
  });

  it("renders Home nav link", () => {
    expect(header).toContain('{ href: "/", label: "Home" }');
  });

  it("renders Blog nav link", () => {
    expect(header).toContain('{ href: "/blog", label: "Blog" }');
  });

  it("renders Tags nav link", () => {
    expect(header).toContain('{ href: "/tags", label: "Tags" }');
  });

  it("renders RSS link", () => {
    expect(header).toContain('href="/rss.xml"');
  });

  it("renders Boilerworks logo", () => {
    expect(header).toContain('src="/boilerworks-logo.svg"');
  });
});

describe("Footer component", () => {
  const footer = fs.readFileSync(path.join(componentsDir, "Footer.astro"), "utf-8");

  it("renders footer element", () => {
    expect(footer).toContain("<footer");
  });

  it("renders copyright text", () => {
    expect(footer).toContain("&copy;");
    expect(footer).toContain("Boilerworks. All rights reserved.");
  });

  it("renders GitHub link", () => {
    expect(footer).toContain("https://github.com/ConflictHQ/boilerworks-astro-site");
  });

  it("renders RSS link", () => {
    expect(footer).toContain('href="/rss.xml"');
  });
});

describe("BlogPostLayout", () => {
  const layout = fs.readFileSync(path.join(layoutsDir, "BlogPostLayout.astro"), "utf-8");

  it("wraps content in BaseLayout with SEO props", () => {
    expect(layout).toContain("BaseLayout");
    expect(layout).toContain("title={title}");
    expect(layout).toContain("description={description}");
  });

  it("renders article element", () => {
    expect(layout).toContain("<article");
  });

  it("renders post title as h1", () => {
    expect(layout).toContain("<h1");
    expect(layout).toContain("{title}");
  });

  it("renders publication date", () => {
    expect(layout).toContain("FormattedDate");
    expect(layout).toContain("date={pubDate}");
  });

  it("renders tags when present", () => {
    expect(layout).toContain("TagList");
    expect(layout).toContain("tags={tags}");
  });

  it("renders back to blog link", () => {
    expect(layout).toContain('href="/blog"');
    expect(layout).toContain("Back to blog");
  });
});

describe("TagList component", () => {
  const tagList = fs.readFileSync(path.join(componentsDir, "TagList.astro"), "utf-8");

  it("renders a link for each tag", () => {
    expect(tagList).toContain("tags.map");
    expect(tagList).toContain("href={`/tags/${tag}`}");
  });

  it("displays tag text", () => {
    expect(tagList).toContain("{tag}");
  });

  it("accepts tags array prop", () => {
    expect(tagList).toContain("tags: string[]");
  });
});

describe("BlogPostCard component", () => {
  const card = fs.readFileSync(path.join(componentsDir, "BlogPostCard.astro"), "utf-8");

  it("links to the blog post", () => {
    expect(card).toContain("href={`/blog/${slug}`}");
  });

  it("renders post title", () => {
    expect(card).toContain("{title}");
    expect(card).toContain("<h2");
  });

  it("renders post description", () => {
    expect(card).toContain("{description}");
  });

  it("renders publication date", () => {
    expect(card).toContain("FormattedDate");
    expect(card).toContain("date={pubDate}");
  });
});
