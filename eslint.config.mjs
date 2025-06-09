import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    languageOptions: { globals: globals.browser },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{ts,cts,mts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: process.cwd(),
      },
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off", // ✅ Désactive la règle ici
      "@typescript-eslint/no-unused-vars": "off",  // (optionnel) Désactive aussi ça si tu veux
    },
  },
]);
