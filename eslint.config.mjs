import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const coreWebVitals = require("eslint-config-next/core-web-vitals");
const typescript = require("eslint-config-next/typescript");

/**
 * `eslint-config-next` inclut déjà des règles a11y via `@next/eslint-plugin-next` (core-web-vitals).
 * Ne pas embarquer `eslint-plugin-jsx-a11y/recommended` en plus (conflit de clé `plugins`).
 * Pour aller plus loin : lancer un audit Lighthouse/axe en CI ou paquets dédiés.
 */
/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "out/**", "tmp/**"] },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
