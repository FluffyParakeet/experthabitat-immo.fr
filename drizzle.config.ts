import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// drizzle-kit n’inclut pas .env.local par défaut (souvent seulement .env)
config({ path: [".env.local", ".env"] });

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});
