import { compare } from "bcryptjs";
import { auth } from "@/auth";
import { logServerError } from "@/lib/dev-log";
import { verifyCsrfToken } from "@/lib/csrf";
import { changeEmailSchema } from "@/lib/schemas";
import { getUserById, updateUserEmail } from "@/lib/user-repo";

const genericError = "Données invalides ou requête impossible.";

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: genericError }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return Response.json({ error: genericError }, { status: 400 });
  }
  const raw = body as Record<string, unknown>;
  if (typeof raw.website === "string" && raw.website.length > 0) {
    return Response.json({ ok: true });
  }

  const parsed = changeEmailSchema.safeParse({
    email: raw.email,
    password: raw.password,
    csrfToken: raw.csrfToken,
  });
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.email?.[0] || first.password?.[0] || first.csrfToken?.[0] || genericError;
    return Response.json({ error: msg }, { status: 400 });
  }
  if (!verifyCsrfToken(String(parsed.data.csrfToken))) {
    return Response.json(
      { error: "Session expirée, rechargez la page." },
      { status: 403 },
    );
  }

  const { email: newEmail, password: currentPassword } = parsed.data;
  const user = await getUserById(userId);
  if (!user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  let currentOk: boolean;
  try {
    currentOk = await compare(currentPassword, user.passwordHash);
  } catch {
    return Response.json(
      { error: "Impossible de vérifier le mot de passe. Réessayez." },
      { status: 500 },
    );
  }
  if (!currentOk) {
    return Response.json(
      { error: "Mot de passe incorrect." },
      { status: 400 },
    );
  }

  try {
    const res = await updateUserEmail(userId, newEmail);
    if (res === "taken") {
      return Response.json(
        { error: "Cette adresse e-mail est déjà utilisée par un autre compte." },
        { status: 409 },
      );
    }
    if (res === "unchanged") {
      return Response.json({ ok: true, email: user.email });
    }
  } catch (e) {
    logServerError("change-email", e);
    return Response.json(
      { error: "Enregistrement impossible. Réessayez." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true, email: newEmail.trim().toLowerCase() });
}
