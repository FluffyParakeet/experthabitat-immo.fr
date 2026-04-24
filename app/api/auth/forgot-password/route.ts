import { Resend } from "resend";
import { devWarn, logServerError } from "@/lib/dev-log";
import { siteUrl } from "@/lib/metadata";
import { verifyCsrfToken } from "@/lib/csrf";
import { forgotPasswordSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/lib/user-repo";
import {
  generateResetToken,
  getResetTokenExpiry,
  savePasswordResetToken,
} from "@/lib/password-reset-tokens";

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
  const parsed = forgotPasswordSchema.safeParse({
    email: raw.email,
    csrfToken: raw.csrfToken,
  });
  if (!parsed.success) {
    return Response.json(
      { error: "E-mail ou formulaire invalide" },
      { status: 400 },
    );
  }
  if (!verifyCsrfToken(String(parsed.data.csrfToken))) {
    return Response.json(
      { error: "Session expirée, rechargez la page." },
      { status: 403 },
    );
  }
  const user = await getUserByEmail(parsed.data.email);
  if (!user) {
    return Response.json({ ok: true });
  }
  const { plain, hash } = generateResetToken();
  const expires = getResetTokenExpiry();
  try {
    await savePasswordResetToken(user.id, hash, expires);
  } catch (e) {
    logServerError("forgot-password", e);
    return Response.json(
      { error: "Impossible d’enregistrer la demande. Réessayez plus tard." },
      { status: 500 },
    );
  }
  const link = new URL("/auth/reset-password", siteUrl);
  link.searchParams.set("token", plain);
  const text = `Bonjour,

Vous avez demandé la réinitialisation du mot de passe de l’espace d’administration.

Ouvrez ce lien (valide 1 h) :
${link.toString()}

Si vous n’êtes pas à l’origine de cette demande, ignorez ce message.`;
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM_EMAIL || "Expert Habitat <onboarding@resend.dev>";
    await resend.emails.send({
      from,
      to: [user.email],
      subject: "Réinitialisation du mot de passe — Expert Habitat",
      text,
    });
  } else {
    // Ne jamais logger le jeton (même en dev) — fuite possible via journaux d’hébergeur
    devWarn("forgot-password", "RESEND_API_KEY absent — e-mail de reset non envoyé (dév).");
  }
  return Response.json({ ok: true });
}
