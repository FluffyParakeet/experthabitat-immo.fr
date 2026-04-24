"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { PROPERTY_TYPE_OPTIONS } from "@/lib/biens-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TYPE_LABELS = PROPERTY_TYPE_OPTIONS;
const PIECE_OPTIONS = ["1 (studio / T1)", "2", "3", "4", "5 ou plus"] as const;

const ETAT = [
  { v: "refait", label: "Neuf ou entièrement refait" },
  { v: "bon", label: "Bon état général" },
  { v: "rafraichir", label: "Rafraîchissement / petits travaux" },
  { v: "lourd", label: "Gros travaux / mise aux normes" },
] as const;

const DELAI = [
  { v: "3m", label: "Sous 3 mois" },
  { v: "6m", label: "3 à 6 mois" },
  { v: "1a", label: "Plus d’un an" },
  { v: "inconnu", label: "Pas d’échéance, je cherche d’abord une fourchette" },
] as const;

type Draft = {
  typeBien: string;
  localisation: string;
  surface: string;
  surfaceInconnue: boolean;
  pieces: string;
  etat: (typeof ETAT)[number]["v"] | "";
  delai: (typeof DELAI)[number]["v"] | "";
  precisions: string;
};

const defaultDraft: Draft = {
  typeBien: "",
  localisation: "",
  surface: "",
  surfaceInconnue: false,
  pieces: "",
  etat: "",
  delai: "",
  precisions: "",
};

const QUESTION_STEPS = 5;
const TOTAL_STEPS = 6; /* 5 questions + contact */

function formatEstimationMessage(d: Draft) {
  const typeLabel = d.typeBien || "—";
  const surf = d.surfaceInconnue ? "Non renseignée" : d.surface ? `${d.surface} m²` : "—";
  const p = d.pieces || "—";
  const etatLabel = ETAT.find((x) => x.v === d.etat)?.label ?? d.etat;
  const delaiLabel = DELAI.find((x) => x.v === d.delai)?.label ?? d.delai;
  const pre = d.precisions.trim();
  return [
    "— Demande d’estimation —",
    `Type de bien : ${typeLabel}`,
    `Localisation : ${d.localisation.trim() || "—"}`,
    `Surface (hors cave / non carrez) : ${surf}`,
    `Nombre de pièces (hors sdb, cuisine) : ${p}`,
    `État ressenti : ${etatLabel || "—"}`,
    `Délai / objectif : ${delaiLabel || "—"}`,
    pre ? `Précisions : ${pre}` : "Précisions : —",
  ].join("\n");
}

export function EstimationWizard({ csrfToken }: { csrfToken: string }) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(defaultDraft);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [qError, setQError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      prenom: "",
      nom: "",
      email: "",
      telephone: "",
      projet: "estimer",
      message: "",
      rgpd: false,
      csrfToken,
    },
  });

  useEffect(() => {
    setValue("csrfToken", csrfToken);
  }, [csrfToken, setValue]);

  if (ok) {
    return (
      <div className="rounded-2xl border border-brand-pink/25 bg-gradient-to-br from-brand-light to-white p-7 text-center shadow-soft">
        <p className="font-display text-lg font-bold text-brand-violet">Demande bien reçue</p>
        <p className="mt-2 text-base leading-relaxed text-text-muted-custom">
          Je regarde ce que vous avez indiqué et je reviens vers vous, en règle général le jour même
          (hors week-end et jours fériés).
        </p>
      </div>
    );
  }

  const progressPct = ((step + 1) / TOTAL_STEPS) * 100;
  const isContact = step === QUESTION_STEPS;

  function setDraftK<K extends keyof Draft>(k: K, v: Draft[K]) {
    setDraft((d) => ({ ...d, [k]: v }));
  }

  function validateCurrent(): boolean {
    setQError(null);
    if (step === 0) {
      if (!draft.typeBien) {
        setQError("Sélectionnez un type de bien.");
        return false;
      }
      return true;
    }
    if (step === 1) {
      if (draft.localisation.trim().length < 2) {
        setQError("Indiquez au moins la commune ou le code postal.");
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!draft.surfaceInconnue) {
        const n = Number.parseInt(draft.surface, 10);
        if (Number.isNaN(n) || n < 9) {
          setQError("Indiquez la surface (en m²) ou cochez « Je ne l’ai pas en tête ».");
          return false;
        }
        if (n > 20_000) {
          setQError("Vérifiez la surface (m²) saisie.");
          return false;
        }
      }
      if (!draft.pieces) {
        setQError("Indiquez le nombre de pièces.");
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (!draft.etat) {
        setQError("Sélectionnez l’état ressenti du bien.");
        return false;
      }
      return true;
    }
    if (step === 4) {
      if (!draft.delai) {
        setQError("Sélectionnez un délai ou une intention.");
        return false;
      }
      return true;
    }
    return true;
  }

  function goNext() {
    if (validateCurrent()) {
      if (step < QUESTION_STEPS) setStep((s) => s + 1);
    }
  }

  function goBack() {
    setQError(null);
    if (step > 0) setStep((s) => s - 1);
  }

  const onValid = async (data: ContactFormValues) => {
    setErr(null);
    const r = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        projet: "estimer" as const,
        message: [formatEstimationMessage(draft), data.message?.trim() ? `Message complémentaire : ${data.message.trim()}` : ""]
          .filter(Boolean)
          .join("\n\n"),
        website: (document.getElementById("estim-website") as HTMLInputElement | null)?.value ?? "",
      }),
    });
    if (r.ok) {
      setOk(true);
    } else {
      setErr("L’envoi a échoué. Vérifiez les champs et réessayez, ou appelez le numéro en pied de page.");
    }
  };

  return (
    <div>
      <div
        className="mb-6 sm:mb-8"
        role="status"
        aria-label={`Étape ${step + 1} sur ${TOTAL_STEPS}`}
      >
        <div className="mb-2 flex justify-between text-xs font-medium text-text-muted-custom sm:text-sm">
          <span>
            {isContact ? "Comment vous joindre" : `Question ${step + 1} / ${QUESTION_STEPS}`}
          </span>
          <span>{Math.round(progressPct)} %</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-brand-violet/10" aria-hidden>
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-pink/90 to-brand-violet/90 transition-[width] duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {qError && !isContact && (
        <p className="mb-4 text-sm text-brand-pink" role="alert">
          {qError}
        </p>
      )}

      {step === 0 && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-brand-violet sm:text-xl">
            Quel type de bien souhaitez-vous estimer ?
          </h2>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {TYPE_LABELS.map((t) => {
              const sel = draft.typeBien === t;
              return (
                <li key={t}>
                  <button
                    type="button"
                    onClick={() => setDraftK("typeBien", t)}
                    className={cn(
                      "w-full rounded-2xl border px-4 py-3.5 text-left text-base font-medium transition",
                      sel
                        ? "border-brand-pink/50 bg-gradient-to-r from-brand-pink/8 to-brand-violet/5 text-brand-violet shadow-sm"
                        : "border-border bg-white/90 text-text-primary hover:border-brand-pink/25",
                    )}
                  >
                    {t}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-brand-violet sm:text-xl">
            Où se situe le bien à estimer ?
          </h2>
          <p className="text-sm text-text-muted-custom sm:text-base">
            Commune, code postal, quartier : une indication localisée suffit.
          </p>
          <div>
            <Label htmlFor="estim-loc">Ville, code postal ou secteur *</Label>
            <Input
              id="estim-loc"
              value={draft.localisation}
              onChange={(e) => setDraftK("localisation", e.target.value)}
              className="mt-1.5 h-12 rounded-xl"
              autoComplete="address-line2"
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-brand-violet sm:text-xl">
            Taille du bien
          </h2>
          <div>
            <Label htmlFor="estim-surface">Surface habitable (hors cave, en m²) *</Label>
            <Input
              id="estim-surface"
              type="number"
              inputMode="numeric"
              min={9}
              max={20_000}
              disabled={draft.surfaceInconnue}
              value={draft.surfaceInconnue ? "" : draft.surface}
              onChange={(e) => setDraftK("surface", e.target.value.replace(/\D/g, ""))}
              className="mt-1.5 h-12 rounded-xl"
              placeholder="Ex. 78"
            />
            <div className="mt-2 flex items-start gap-2">
              <Checkbox
                id="estim-surface-skip"
                checked={draft.surfaceInconnue}
                onCheckedChange={(c) => {
                  setDraftK("surfaceInconnue", c === true);
                  if (c === true) setDraftK("surface", "");
                }}
              />
              <Label
                htmlFor="estim-surface-skip"
                className="text-sm font-normal leading-relaxed text-text-muted-custom"
              >
                Je n’ai pas le chiffrage exact, je l’indiquerai plus tard
              </Label>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-text-primary">Nombre de pièces *</p>
            <div className="flex flex-wrap gap-2">
              {PIECE_OPTIONS.map((p) => {
                const sel = draft.pieces === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setDraftK("pieces", p)}
                    className={cn(
                      "min-w-[2.5rem] rounded-full border px-3.5 py-2 text-sm font-medium transition",
                      sel
                        ? "border-brand-pink/50 bg-brand-pink/10 text-brand-violet"
                        : "border-border bg-white/90 hover:border-brand-pink/25",
                    )}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-brand-violet sm:text-xl">
            État ressenti du logement
          </h2>
          <p className="text-sm text-text-muted-custom sm:text-base">
            Une vue d’ensemble, même approximative, aider l’analyse.
          </p>
          <ul className="space-y-2">
            {ETAT.map(({ v, label }) => {
              const sel = draft.etat === v;
              return (
                <li key={v}>
                  <button
                    type="button"
                    onClick={() => setDraftK("etat", v)}
                    className={cn(
                      "w-full rounded-2xl border px-4 py-3.5 text-left text-base font-medium leading-snug transition",
                      sel
                        ? "border-brand-pink/50 bg-gradient-to-r from-brand-pink/8 to-brand-violet/5 text-brand-violet"
                        : "border-border bg-white/90 text-text-primary hover:border-brand-pink/25",
                    )}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-brand-violet sm:text-xl">
            Votre échéance
          </h2>
          <p className="text-sm text-text-muted-custom sm:text-base">
            Pour comprendre le degré d’urgence d’une reprise de contact.
          </p>
          <ul className="space-y-2">
            {DELAI.map(({ v, label }) => {
              const sel = draft.delai === v;
              return (
                <li key={v}>
                  <button
                    type="button"
                    onClick={() => setDraftK("delai", v)}
                    className={cn(
                      "w-full rounded-2xl border px-4 py-3.5 text-left text-base font-medium leading-snug transition",
                      sel
                        ? "border-brand-pink/50 bg-gradient-to-r from-brand-pink/8 to-brand-violet/5 text-brand-violet"
                        : "border-border bg-white/90 text-text-primary hover:border-brand-pink/25",
                    )}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
          <div>
            <Label htmlFor="estim-precis">Détails utiles (travaux, DPE, étage, vis-à-vis…)</Label>
            <Textarea
              id="estim-precis"
              value={draft.precisions}
              onChange={(e) => setDraftK("precisions", e.target.value)}
              className="mt-1.5 min-h-[7rem] rounded-2xl"
              placeholder="Optionnel"
            />
          </div>
        </div>
      )}

      {isContact && (
        <form onSubmit={handleSubmit(onValid)} className="space-y-5" noValidate>
          <h2 className="font-display text-lg font-bold text-brand-violet sm:text-xl">
            Pour vous envoyer l’analyse, j’ai besoin de vous joindre
          </h2>
          <p className="text-sm text-text-muted-custom sm:text-base">
            Vos réponses sur le bien sont enregistrées. Indiquez comment vous recontacter.
          </p>
          <input type="hidden" {...register("csrfToken")} />
          <input type="hidden" {...register("projet")} />
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="e-prenom">Prénom *</Label>
              <Input id="e-prenom" {...register("prenom")} autoComplete="given-name" className="h-12" />
              {errors.prenom && (
                <p className="mt-1 text-xs text-brand-pink">{errors.prenom.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="e-nom">Nom *</Label>
              <Input id="e-nom" {...register("nom")} autoComplete="family-name" className="h-12" />
              {errors.nom && <p className="mt-1 text-xs text-brand-pink">{errors.nom.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="e-email">E-mail *</Label>
            <Input
              id="e-email"
              type="email"
              {...register("email")}
              autoComplete="email"
              className="h-12"
            />
            {errors.email && <p className="mt-1 text-xs text-brand-pink">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="e-tel">Téléphone *</Label>
            <Input
              id="e-tel"
              type="tel"
              {...register("telephone")}
              autoComplete="tel"
              className="h-12"
            />
            {errors.telephone && (
              <p className="mt-1 text-xs text-brand-pink">{errors.telephone.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="e-msg">Message optionnel</Label>
            <Textarea id="e-msg" rows={3} className="rounded-2xl" {...register("message")} />
          </div>
          <div className="sr-only" aria-hidden>
            <label htmlFor="estim-website">Ne pas remplir</label>
            <input
              id="estim-website"
              name="estim-website"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>
          <div className="flex items-start gap-2">
            <Controller
              name="rgpd"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="e-rgpd"
                  checked={field.value}
                  onCheckedChange={(c) => field.onChange(c === true)}
                />
              )}
            />
            <Label
              htmlFor="e-rgpd"
              className="text-sm font-normal leading-relaxed text-text-muted sm:text-base"
            >
              J’accepte que mes données soient utilisées pour traiter ma demande d’estimation
              (conformité RGPD).
            </Label>
          </div>
          {errors.rgpd && <p className="text-xs text-brand-pink">{errors.rgpd.message}</p>}
          {err && (
            <p className="text-sm text-brand-pink" role="alert">
              {err}
            </p>
          )}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              className="h-12 w-full sm:w-auto"
              onClick={goBack}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Retour
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-full bg-gradient-to-r from-brand-pink to-rose-500 text-base font-semibold text-white shadow-md sm:min-w-[12rem] sm:px-8"
            >
              {isSubmitting ? "Envoi…" : "Recevoir l’estimation"}
            </Button>
          </div>
        </form>
      )}

      {!isContact && (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full sm:order-1 sm:w-auto"
            onClick={goBack}
            disabled={step === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Retour
          </Button>
          <Button
            type="button"
            onClick={goNext}
            className="h-12 w-full rounded-full bg-gradient-to-r from-brand-pink to-rose-500 text-base font-semibold text-white shadow-md sm:order-2 sm:ml-auto sm:w-auto sm:min-w-[14rem] sm:px-8"
          >
            {step === QUESTION_STEPS - 1 ? "Indiquer mes contacts" : "Continuer"}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
