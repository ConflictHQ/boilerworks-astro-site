import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// NOTE: For SSR routes, add @astrojs/cloudflare adapter:
//   import cloudflare from "@astrojs/cloudflare";
//   adapter: cloudflare(),
//   output: "hybrid",

export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
