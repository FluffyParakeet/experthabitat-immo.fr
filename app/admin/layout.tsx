import { auth } from "@/auth";
import { logout } from "./logout";
import { AdminNav } from "@/components/admin/admin-nav";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <div className="min-h-[65vh] bg-gradient-to-b from-gray-soft/30 via-white/40 to-gray-soft/20">
      <header className="sticky top-0 z-30 border-b border-brand-violet/10 bg-white/85 shadow-sm backdrop-blur-md">
        <div className="page-container flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-4">
          <div className="flex flex-col gap-0.5 sm:min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-pink/80">
              Expert Habitat
            </span>
            <p className="font-display text-lg font-bold text-brand-violet sm:text-xl">
              Administration
            </p>
          </div>
          <AdminNav />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100/80 pt-3 sm:justify-end sm:border-0 sm:pt-0">
            {session?.user?.email && (
              <span
                className="max-w-[200px] truncate text-xs text-text-muted-custom sm:max-w-xs sm:text-sm"
                title={session.user.email}
              >
                {session.user.email}
              </span>
            )}
            <form action={logout}>
              <Button
                type="submit"
                variant="outline"
                className="h-9 rounded-full border-brand-violet/20 px-4 text-sm text-brand-violet hover:bg-brand-light/60"
              >
                Déconnexion
              </Button>
            </form>
          </div>
        </div>
      </header>
      <div className="page-container pb-20 pt-8 sm:pb-24 sm:pt-10 lg:pt-12">{children}</div>
    </div>
  );
}
