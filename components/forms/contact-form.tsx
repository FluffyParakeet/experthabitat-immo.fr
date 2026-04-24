"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export function ContactForm({
  csrfToken,
  defaultProjet = "acheter",
}: {
  csrfToken: string;
  defaultProjet?: ContactFormValues["projet"];
}) {
  const [ok, setOk] = useState(false);
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
      projet: defaultProjet,
      message: "",
      rgpd: false,
      csrfToken,
    },
  });

  useEffect(() => {
    setValue("csrfToken", csrfToken);
  }, [csrfToken, setValue]);

  const onValid = async (data: ContactFormValues) => {
    const r = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        website: (document.getElementById("website") as HTMLInputElement | null)?.value ?? "",
      }),
    });
    if (r.ok) {
      setOk(true);
    }
  };

  if (ok) {
    return (
      <div className="rounded-2xl border border-brand-pink/25 bg-gradient-to-br from-brand-light to-white p-7 text-center shadow-soft">
        <p className="font-display text-lg font-bold text-brand-violet">Merci pour votre confiance</p>
        <p className="mt-2 text-base leading-relaxed text-text-muted-custom">
          Votre message est bien arrivé. Je reviens vers vous très vite, en général le jour même
          (hors week-end et jours fériés).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onValid)} className="space-y-5" noValidate>
      <input type="hidden" {...register("csrfToken")} />
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="prenom">Prénom *</Label>
          <Input id="prenom" {...register("prenom")} autoComplete="given-name" />
          {errors.prenom && (
            <p className="mt-1 text-xs text-brand-pink">{errors.prenom.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="nom">Nom *</Label>
          <Input id="nom" {...register("nom")} autoComplete="family-name" />
          {errors.nom && <p className="mt-1 text-xs text-brand-pink">{errors.nom.message}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="email">E-mail *</Label>
        <Input id="email" type="email" {...register("email")} autoComplete="email" />
        {errors.email && <p className="mt-1 text-xs text-brand-pink">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="tel">Téléphone *</Label>
        <Input id="tel" type="tel" {...register("telephone")} autoComplete="tel" />
        {errors.telephone && (
          <p className="mt-1 text-xs text-brand-pink">{errors.telephone.message}</p>
        )}
      </div>
      <div>
        <Label>Projet *</Label>
        <Controller
          name="projet"
          control={control}
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="mt-2 flex flex-wrap gap-3"
            >
              {(
                [
                  ["vendre", "Vendre"],
                  ["acheter", "Acheter"],
                  ["estimer", "Estimer"],
                  ["autre", "Autre"],
                ] as const
              ).map(([v, lab]) => (
                <div key={v} className="flex items-center gap-2">
                  <RadioGroupItem value={v} id={`p-${v}`} />
                  <Label htmlFor={`p-${v}`} className="font-normal">
                    {lab}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
        {errors.projet && <p className="mt-1 text-xs text-brand-pink">{errors.projet.message}</p>}
      </div>
      <div>
        <Label htmlFor="msg">Message</Label>
        <Textarea id="msg" rows={4} {...register("message")} />
      </div>
      <div className="sr-only" aria-hidden>
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <div className="flex items-start gap-2">
        <Controller
          name="rgpd"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="rgpd"
              checked={field.value}
              onCheckedChange={(c) => field.onChange(c === true)}
            />
          )}
        />
        <Label htmlFor="rgpd" className="text-sm font-normal leading-relaxed text-text-muted sm:text-base">
          J’accepte que mes données soient utilisées pour traiter ma demande (conformité RGPD).
        </Label>
      </div>
      {errors.rgpd && <p className="text-xs text-brand-pink">{errors.rgpd.message}</p>}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-full bg-gradient-to-r from-brand-pink to-rose-500 text-base font-semibold text-white shadow-md transition hover:from-brand-pink/95 hover:shadow-glow-pink sm:w-auto sm:px-8"
      >
        {isSubmitting ? "Envoi…" : "Envoyer ma demande"}
      </Button>
    </form>
  );
}
