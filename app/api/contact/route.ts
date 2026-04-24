import { Resend } from "resend";
import { devWarn } from "@/lib/dev-log";
import { verifyCsrfToken } from "@/lib/csrf";
import { siteContact } from "@/lib/types";
import { contactFormSchema } from "@/lib/schemas";

const toBool = (v: unknown) => v === true || v === "true" || v === "on" || v === 1;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Requête invalide" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Corps de requête requis" }, { status: 400 });
  }
  const raw = body as Record<string, unknown>;
  if (typeof raw.website === "string" && raw.website.length > 0) {
    return Response.json({ ok: true });
  }
  if (!verifyCsrfToken(String(raw.csrfToken ?? ""))) {
    return Response.json({ error: "Session expirée, rechargez la page." }, { status: 403 });
  }
  const normalized = {
    prenom: String(raw.prenom ?? "").trim(),
    nom: String(raw.nom ?? "").trim(),
    email: String(raw.email ?? "").trim(),
    telephone: String(raw.telephone ?? "").trim(),
    projet: String(raw.projet ?? ""),
    message: String(raw.message ?? "").trim(),
    rgpd: toBool(raw.rgpd),
    csrfToken: String(raw.csrfToken ?? ""),
  };
  const parsed = contactFormSchema.safeParse(normalized);
  if (!parsed.success) {
    return Response.json(
      { error: "Données invalides", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const d = parsed.data;
  const oneLine = (s: string) => s.replace(/[\r\n\0\u202e]/g, " ");
  const text = `Projet: ${d.projet}\n${d.prenom} ${d.nom}\n${d.email}\n${d.telephone}\n\n${d.message || "(pas de message)"}\n`;
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM_EMAIL || "Expert Habitat <onboarding@resend.dev>";
    const subj = oneLine(
      `Contact site · ${d.prenom} ${d.nom} (${d.projet})`.slice(0, 200),
    );
    await resend.emails.send({
      from,
      to: [siteContact.email],
      subject: subj,
      text,
    });
  } else {
    devWarn(
      "contact",
      "RESEND_API_KEY absent — e-mail non envoyé (dév uniquement, contenu du message non loggé).",
    );
  }
  return Response.json({ ok: true });
}
