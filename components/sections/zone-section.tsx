import { MapPinned } from "lucide-react";
import { SECTEURS, legal, siteContact } from "@/lib/types";
import { SectionHeader } from "@/components/ui/section-header";

export function ZoneSection() {
  return (
    <section className="border-t border-white/50 section-padding-y">
      <div className="page-container">
        <SectionHeader
          eyebrow="Lille & alentours"
          title="Notre secteur d’intervention"
          description="Gares, écoles, axes, quartiers : on suit le terrain au quotidien, sur toute la métropole lilloise."
        />
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <p className="text-base font-medium text-text-primary/90 sm:text-lg">
              Villes & quartiers qu’on accompagne souvent
            </p>
            <div className="flex flex-wrap gap-2">
              {SECTEURS.map((c) => (
                <span
                  key={c}
                  className="inline-flex max-w-full items-center rounded-full border border-brand-violet/15 bg-white px-3.5 py-1.5 text-sm font-medium text-brand-violet/90 shadow-sm sm:px-4"
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="pt-1 text-base text-text-muted-custom sm:text-lg">
              Autres secteurs de la Métropole sur demande.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=52+rue+Gabriel+P%C3%A9ri+Marcq"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-base font-semibold text-brand-pink transition hover:underline"
            >
              <MapPinned className="h-4 w-4" />
              {siteContact.address}
            </a>
          </div>
          <div className="relative h-72 overflow-hidden rounded-3xl border border-brand-violet/10 bg-gradient-to-br from-brand-light to-white shadow-card sm:h-80">
            <svg
              className="h-full w-full"
              viewBox="0 0 400 220"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Repères schématiques Métropole de Lille"
            >
              <defs>
                <linearGradient id="m" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F7F5FF" />
                  <stop offset="100%" stopColor="#ede8fb" />
                </linearGradient>
                <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#1A1035" floodOpacity="0.1" />
                </filter>
              </defs>
              <rect width="400" height="220" fill="url(#m)" />
              <path
                d="M30 120 C80 50 200 30 360 100"
                fill="none"
                stroke="#3D2B8E"
                strokeOpacity="0.25"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {(
                [
                  [100, 95, "M"],
                  [200, 75, "C"],
                  [280, 105, "L"],
                  [150, 135, "W"],
                ] as const
              ).map(([x, y, l], i) => (
                <g key={i} filter="url(#s)">
                  <circle cx={x} cy={y} r="10" fill="#E5305B" fillOpacity="0.95" />
                  <text
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    fill="white"
                    fontSize="8"
                    fontWeight="bold"
                    fontFamily="system-ui, sans-serif"
                  >
                    {l}
                  </text>
                </g>
              ))}
            </svg>
            <p className="absolute bottom-3 right-3 rounded-full bg-white/80 px-2.5 py-1.5 text-xs text-text-muted-custom shadow-sm sm:text-sm">
              Repères illustratifs · {siteContact.address}
            </p>
          </div>
        </div>
        <p className="mt-10 text-sm leading-relaxed text-text-muted-custom sm:text-base">
          Mandataire immobilier, RSAC {legal.rsac} · réseau Expertimo · site informatif, non
          contractuel. Références sur demande.
        </p>
      </div>
    </section>
  );
}
