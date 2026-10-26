import { defineConfig } from "vite-plus";

export default defineConfig({
  lint: {
    ignorePatterns: [
      "node_modules/**",
      "**/node_modules/**",
      "apps/web/.next/**",
      "apps/web/out/**",
      "apps/server/dist/**",
      "packages/db/dist/**",
      "packages/db/prisma/generated/**",
    ],
    options: {
      typeAware: false,
      typeCheck: false,
    },
    rules: {
      "no-console": "warn",
    },
  },
  fmt: {
    ignorePatterns: [
      "node_modules/**",
      "**/node_modules/**",
      "apps/web/.next/**",
      "apps/web/out/**",
      "apps/server/dist/**",
      "packages/db/dist/**",
      "packages/db/prisma/generated/**",
    ],
    singleQuote: true,
    jsxSingleQuote: false,
    semi: false,
    sortPackageJson: true,
    arrowParens: "avoid",
  },
  staged: {
    "*.{js,ts,jsx,tsx,vue,svelte,json,jsonc,css,md}": "vp check --fix",
  },
});
