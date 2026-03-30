import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Boilerworks/);
  });

  test("has navigation links", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("nav")).toBeVisible();
    await expect(page.getByRole("link", { name: "Blog" })).toBeVisible();
  });

  test("shows latest blog posts", async ({ page }) => {
    await page.goto("/");
    const postLinks = page.locator('a[href^="/blog/"]');
    await expect(postLinks.first()).toBeVisible();
  });
});

test.describe("Blog listing", () => {
  test("shows published posts", async ({ page }) => {
    await page.goto("/blog");
    const articles = page.locator('article, [class*="post"], a[href^="/blog/"]');
    expect(await articles.count()).toBeGreaterThan(0);
  });

  test("does not show draft posts", async ({ page }) => {
    await page.goto("/blog");
    const content = await page.textContent("body");
    expect(content).not.toContain("Draft");
  });
});

test.describe("Blog post page", () => {
  test("renders content", async ({ page }) => {
    await page.goto("/blog");
    const firstPost = page.locator('a[href^="/blog/"]').first();
    await firstPost.click();
    await expect(page.locator("h1")).toBeVisible();
  });
});

test.describe("Tags", () => {
  test("tag page filters correctly", async ({ page }) => {
    await page.goto("/tags");
    const tagLinks = page.locator('a[href^="/tags/"]');
    expect(await tagLinks.count()).toBeGreaterThan(0);
    await tagLinks.first().click();
    await expect(page.locator("h1")).toBeVisible();
  });
});

test.describe("RSS feed", () => {
  test("returns valid XML", async ({ request }) => {
    const response = await request.get("/rss.xml");
    expect(response.status()).toBe(200);
    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("xml");
    const body = await response.text();
    expect(body).toContain("<rss");
    expect(body).toContain("<channel>");
    expect(body).toContain("<item>");
  });
});

test.describe("Navigation", () => {
  test("header links work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Blog" }).click();
    await expect(page).toHaveURL(/\/blog/);
  });

  test("footer has links", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer")).toBeVisible();
  });
});
