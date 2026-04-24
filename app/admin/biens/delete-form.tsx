"use client";

import { useActionState } from "react";
import { Trash2 } from "lucide-react";
import { deleteProperty } from "./actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DeleteForm({
  id,
  slug,
  className,
}: {
  id: string;
  slug: string;
  className?: string;
}) {
  const [state, formAction, isPending] = useActionState(deleteProperty, null);
  return (
    <form action={formAction} className={cn("inline w-full sm:w-auto", className)}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="slug" value={slug} />
      <Button
        type="submit"
        variant="outline"
        className="h-10 w-full rounded-full border-red-200/80 bg-white/80 px-4 text-xs font-medium text-red-700 hover:border-red-300 hover:bg-red-50 sm:h-9 sm:min-w-[6.5rem]"
        disabled={isPending}
      >
        <Trash2 className="mr-1.5 h-3.5 w-3.5" aria-hidden />
        {isPending ? "…" : "Supprimer"}
      </Button>
      {state && "error" in state && state.error && (
        <span className="sr-only" aria-live="polite">
          {state.error}
        </span>
      )}
    </form>
  );
}
