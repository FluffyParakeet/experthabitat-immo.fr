import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const coreWebVitals = require("eslint-config-next/core-web-vitals");
const typescript = require("eslint-config-next/typescript");

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "out/**", "tmp/**"] },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
