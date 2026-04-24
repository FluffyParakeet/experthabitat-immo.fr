import { z } from "zod";

const frPhone = z
  .string()
  .min(1, "Veuillez saisir votre numéro")
  .regex(
    /^(?:(?:\+|00)33|0)\s*[1-9](?:\s*\d{2}){4}$/,
    "Format français attendu (ex. 06 12 34 56 78)",
  );

export const contactFormSchema = z.object({
  prenom: z
    .string()
    .min(1, "Veuillez saisir votre prénom")
    .max(80, "Trop long"),
  nom: z
    .string()
    .min(1, "Veuillez saisir votre nom")
    .max(80, "Trop long"),
  email: z.string().email("Adresse e-mail invalide"),
  telephone: frPhone,
  projet: z.enum(["vendre", "acheter", "estimer", "autre"], {
    message: "Sélectionnez un type de projet",
  }),
  message: z.string().max(5000, "Message trop long"),
  rgpd: z.boolean().refine((v) => v, {
    message: "L’acceptation des conditions est obligatoire",
  }),
  csrfToken: z.string().min(1, "Session invalide, rechargez la page"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

const propertyTypeSchema = z.enum([
  "Maison",
  "Appartement",
  "Studio",
  "Terrain",
  "Local professionnel",
  "Autre",
]);
const propertyListingSchema = z.enum(["vente", "location"]);
const propertyBadgeSchema = z.enum(["exclusivite", "nouveau"]);

export const propertyFormSchema = z.object({
  slug: z
    .string()
    .min(1, "Le slug est requis")
    .max(200)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug : minuscules, chiffres et tirets uniquement",
    ),
  ref: z
    .string()
    .max(40, "Réf. trop longue")
    .transform((s) => s.trim() || undefined),
  title: z.string().min(1, "Titre requis").max(500),
  type: propertyTypeSchema,
  price: z.coerce.number().int().min(0).max(500_000_000),
  listing: propertyListingSchema,
  surface: z.coerce.number().int().min(0).max(1_000_000),
  rooms: z.coerce.number().int().min(0).max(100),
  city: z.string().min(1, "Ville requise").max(120),
  badge: propertyBadgeSchema,
  description: z.string().min(1, "Description requise").max(20_000),
  features: z.string().max(50_000),
  image: z
    .string()
    .url("URL d’image principale invalide")
    .max(2000)
    .refine(
      (u) => u.startsWith("https://"),
      { message: "L’image principale doit être en HTTPS" },
    ),
  images: z.string().max(100_000),
  published: z.coerce.boolean(),
})
  .superRefine((data, ctx) => {
    for (const line of data.images.split("\n")) {
      const t = line.trim();
      if (!t) continue;
      try {
        const u = new URL(t);
        if (u.protocol !== "https:") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Chaque URL de galerie doit être en HTTPS",
            path: ["images"],
          });
          return;
        }
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "URL de galerie invalide",
          path: ["images"],
        });
        return;
      }
    }
  });

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
  csrfToken: z.string().min(1, "Session invalide, rechargez la page"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(20, "Lien invalide"),
  password: z
    .string()
    .min(10, "Au moins 10 caractères")
    .max(200, "Mot de passe trop long"),
  confirm: z.string().min(1, "Confirmez le mot de passe"),
}).refine((d) => d.password === d.confirm, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirm"],
});

export const changeEmailSchema = z.object({
  email: z.string().min(1, "Saisissez l’e-mail").email("Adresse e-mail invalide").max(254, "E-mail trop long"),
  password: z.string().min(1, "Saisissez votre mot de passe actuel").max(500, "Trop long"),
  csrfToken: z.string().min(1, "Session invalide, rechargez la page"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Saisissez votre mot de passe actuel")
      .max(500, "Trop long"),
    password: z
      .string()
      .min(10, "Au moins 10 caractères")
      .max(200, "Mot de passe trop long"),
    confirm: z.string().min(1, "Confirmez le mot de passe"),
    csrfToken: z.string().min(1, "Session invalide, rechargez la page"),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm"],
  })
  .refine((d) => d.password !== d.currentPassword, {
    message: "Le nouveau mot de passe doit être différent de l’actuel",
    path: ["password"],
  });
