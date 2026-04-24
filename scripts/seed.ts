import { config } from "dotenv";
import { hash } from "bcryptjs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../lib/db/schema";

config({ path: [".env.local", ".env"] });

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("Définissez DATABASE_URL (Neon) dans .env");
    process.exit(1);
  }
  const adminEmail = process.env.ADMIN_SEED_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_SEED_PASSWORD;
  if (!adminEmail || !adminPassword) {
    console.error(
      "Définissez ADMIN_SEED_EMAIL et ADMIN_SEED_PASSWORD pour l’utilisateur admin.",
    );
    process.exit(1);
  }

  const dba = drizzle(neon(url), { schema });
  const passwordHash = await hash(adminPassword, 12);

  const [found] = await dba
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, adminEmail))
    .limit(1);
  if (found) {
    await dba
      .update(schema.users)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(schema.users.id, found.id));
    console.log("Compte admin: mot de passe mis à jour.");
  } else {
    const [c] = await dba
      .insert(schema.users)
      .values({
        email: adminEmail,
        passwordHash,
        name: "Administrateur",
      })
      .returning();
    if (c) {
      console.log("Compte admin créé.");
    }
  }
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
