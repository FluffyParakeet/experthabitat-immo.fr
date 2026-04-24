import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

let _db: Db | null = null;

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it in .env (Neon) to use the app.",
    );
  }
  if (!_db) {
    _db = drizzle(neon(url), { schema });
  }
  return _db;
}

export * from "./schema";
