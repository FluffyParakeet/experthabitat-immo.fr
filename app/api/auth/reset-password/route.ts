import { hash } from "bcryptjs";
import { logServerError } from "@/lib/dev-log";
import {
  deletePasswordResetTokenId,
  findValidPasswordResetToken,
} from "@/lib/password-reset-tokens";
import { setPasswordHash } from "@/lib/user-repo";
import { resetPasswordSchema } from "@/lib/schemas";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Requête invalide" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Requête invalide" }, { status: 400 });
  }
  const raw = body as Record<string, unknown>;
  if (typeof raw.website === "string" && raw.website.length > 0) {
    return Response.json({ ok: true });
  }
  const parsed = resetPasswordSchema.safeParse({
    token: raw.token,
    password: raw.password,
    confirm: raw.confirm,
  });
  if (!parsed.success) {
    return Response.json(
      { error: "Lien ou mot de passe invalide" },
      { status: 400 },
    );
  }
  const { token, password } = parsed.data;
  const found = await findValidPasswordResetToken(token);
  if (!found) {
    return Response.json(
      { error: "Ce lien a expiré ou n’est plus valide. Demandez un nouvel e-mail." },
      { status: 400 },
    );
  }
  const passwordHash = await hash(password, 12);
  try {
    await setPasswordHash(found.userId, passwordHash);
  } catch (e) {
    logServerError("reset-password", e);
    return Response.json(
      { error: "Impossible d’enregistrer. Réessayez." },
      { status: 500 },
    );
  }
  try {
    await deletePasswordResetTokenId(found.id);
  } catch {
    /* le mot de passe est à jour, le jeton peut rester (nettoyage plus tard) */
  }
  return Response.json({ ok: true });
}
