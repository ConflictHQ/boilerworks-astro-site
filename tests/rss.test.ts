import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";

describe("RSS feed page", () => {
  it("rss.xml.ts endpoint exists", () => {
    const rssPath = path.resolve("src/pages/rss.xml.ts");
    expect(fs.existsSync(rssPath)).toBe(true);
  });

  it("rss.xml.ts exports a GET function", async () => {
    const rssPath = path.resolve("src/pages/rss.xml.ts");
    const content = fs.readFileSync(rssPath, "utf-8");
    expect(content).toContain("export async function GET");
  });
});
