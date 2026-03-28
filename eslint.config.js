import eslintPluginAstro from "eslint-plugin-astro";

export default [
  ...eslintPluginAstro.configs["flat/recommended"],
  {
    rules: {
      "no-console": "warn",
    },
  },
  {
    ignores: ["dist/", "node_modules/", ".astro/"],
  },
];
