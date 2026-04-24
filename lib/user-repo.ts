import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { users } from "./db/schema";

export async function getUserByEmail(email: string) {
  const db = getDb();
  const normalized = email.trim().toLowerCase();
  const [u] = await db
    .select()
    .from(users)
    .where(eq(users.email, normalized))
    .limit(1);
  return u ?? null;
}

export async function getUserById(id: string) {
  const db = getDb();
  const [u] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  return u ?? null;
}

export async function createUser(data: {
  email: string;
  passwordHash: string;
  name?: string;
}) {
  const db = getDb();
  const [row] = await db
    .insert(users)
    .values({
      email: data.email.trim().toLowerCase(),
      passwordHash: data.passwordHash,
      name: data.name,
    })
    .returning();
  return row;
}

export async function setPasswordHash(userId: string, passwordHash: string) {
  const db = getDb();
  await db
    .update(users)
    .set({ passwordHash, updatedAt: new Date() })
    .where(eq(users.id, userId));
}

/**
 * @returns `null` si l’e-mail a été mis à jour, une raison d’échec sinon.
 */
export async function updateUserEmail(
  userId: string,
  newEmail: string,
): Promise<null | "taken" | "unchanged"> {
  const normalized = newEmail.trim().toLowerCase();
  const existing = await getUserByEmail(normalized);
  if (existing) {
    if (existing.id === userId) {
      return "unchanged";
    }
    return "taken";
  }
  const db = getDb();
  await db
    .update(users)
    .set({ email: normalized, updatedAt: new Date() })
    .where(eq(users.id, userId));
  return null;
}

export type { UserRow } from "./db/schema";
