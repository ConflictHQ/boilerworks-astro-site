import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";

describe("SEO configuration", () => {
  it("BaseLayout includes meta description", () => {
    const layout = fs.readFileSync(path.resolve("src/layouts/BaseLayout.astro"), "utf-8");
    expect(layout).toContain('name="description"');
  });

  it("BaseLayout includes Open Graph tags", () => {
    const layout = fs.readFileSync(path.resolve("src/layouts/BaseLayout.astro"), "utf-8");
    expect(layout).toContain('property="og:title"');
    expect(layout).toContain('property="og:description"');
    expect(layout).toContain('property="og:image"');
    expect(layout).toContain('property="og:url"');
  });

  it("BaseLayout includes Twitter card tags", () => {
    const layout = fs.readFileSync(path.resolve("src/layouts/BaseLayout.astro"), "utf-8");
    expect(layout).toContain('name="twitter:card"');
    expect(layout).toContain('name="twitter:title"');
  });

  it("BaseLayout links to sitemap", () => {
    const layout = fs.readFileSync(path.resolve("src/layouts/BaseLayout.astro"), "utf-8");
    expect(layout).toContain("sitemap-index.xml");
  });

  it("BaseLayout links to RSS feed", () => {
    const layout = fs.readFileSync(path.resolve("src/layouts/BaseLayout.astro"), "utf-8");
    expect(layout).toContain("rss.xml");
  });

  it("astro.config.mjs has site URL configured", () => {
    const config = fs.readFileSync(path.resolve("astro.config.mjs"), "utf-8");
    expect(config).toContain("site:");
  });

  it("astro.config.mjs includes sitemap integration", () => {
    const config = fs.readFileSync(path.resolve("astro.config.mjs"), "utf-8");
    expect(config).toContain("sitemap()");
  });
});
