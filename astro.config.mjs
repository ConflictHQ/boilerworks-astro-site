import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// SSR adapter: uncomment when deploying SSR routes to Cloudflare Pages
// import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://example.com",
  // adapter: cloudflare(),
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
