/**
 * Affichage immédiat pendant le chargement RSC d’une nouvelle page (rétroaction à la navigation).
 * Fond + hauteur : évite un « trou » blanc uniquement 2px entre deux écrans.
 */
export default function GlobalLoading() {
  return (
    <div
      className="relative w-full min-h-[min(65vh,640px)] bg-gradient-to-b from-white to-[#faf9fc]"
      role="status"
      aria-label="Chargement de la page en cours"
    >
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5 overflow-hidden bg-brand-violet/10"
        aria-hidden
      >
        <div className="h-full w-[30%] animate-nav-progress bg-gradient-to-r from-brand-pink via-rose-400 to-brand-violet" />
      </div>
    </div>
  );
}
