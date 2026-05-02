import { nextJsConfig } from "next/eslint-plugin-next";

export default [
  {
    ignores: ["node_modules/**", ".next/**", "out/**"],
  },
  ...nextJsConfig,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];
