import { createHash, randomBytes } from "crypto";
import { and, eq, gt } from "drizzle-orm";
import { getDb } from "./db";
import { passwordResetTokens } from "./db/schema";

const RESET_TTL_MS = 60 * 60 * 1000;

function hashToken(token: string) {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

export function generateResetToken(): { plain: string; hash: string } {
  const plain = randomBytes(32).toString("hex");
  return { plain, hash: hashToken(plain) };
}

export async function savePasswordResetToken(
  userId: string,
  tokenHash: string,
  expiresAt: Date,
) {
  const db = getDb();
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.userId, userId));
  const [t] = await db
    .insert(passwordResetTokens)
    .values({ userId, tokenHash, expiresAt })
    .returning();
  return t;
}

export async function findValidPasswordResetToken(plain: string) {
  const h = hashToken(plain);
  const db = getDb();
  const [row] = await db
    .select()
    .from(passwordResetTokens)
    .where(
      and(
        eq(passwordResetTokens.tokenHash, h),
        gt(passwordResetTokens.expiresAt, new Date()),
      ),
    )
    .limit(1);
  if (!row) return null;
  return { id: row.id, userId: row.userId };
}

export async function deletePasswordResetTokenId(id: string) {
  const db = getDb();
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.id, id));
}

export function getResetTokenExpiry() {
  return new Date(Date.now() + RESET_TTL_MS);
}
