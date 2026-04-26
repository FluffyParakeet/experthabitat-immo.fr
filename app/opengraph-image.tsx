import { ImageResponse } from "next/og";

const defaultSite = "https://expert-habitat-marcq.vercel.app";

export const runtime = "edge";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Expert Habitat — Aurélien Sabé, agent immobilier, Marcq-en-Barœul";

/**
 * Aperçu de lien (SMS, iMessage, WhatsApp, réseaux sociaux) — Open Graph 1200×630.
 */
export default function OpenGraphImage() {
  const site =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || defaultSite;
  const host = (() => {
    try {
      return new URL(site).host;
    } catch {
      return "expert-habitat-marcq.vercel.app";
    }
  })();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          background: "linear-gradient(130deg, #0a0518 0%, #1a1035 42%, #2d1f4a 72%, #3d2b8e 100%)",
          padding: 64,
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -100,
            width: 480,
            height: 480,
            background: "radial-gradient(circle, rgba(229, 48, 91, 0.35) 0%, rgba(26, 16, 53, 0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -40,
            bottom: -40,
            width: 360,
            height: 360,
            background: "radial-gradient(circle, rgba(200, 190, 255, 0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            maxWidth: 920,
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 600,
              textTransform: "uppercase" as const,
              letterSpacing: "0.28em",
              color: "rgba(255, 255, 255, 0.55)",
              marginBottom: 20,
            }}
          >
            Expert immobilier
          </span>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              textShadow: "0 2px 40px rgba(0,0,0,0.35)",
            }}
          >
            Expert Habitat
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              lineHeight: 1.35,
              marginTop: 24,
              color: "rgba(255, 255, 255, 0.88)",
            }}
          >
            Aurélien Sabé · Vente, achat, estimation
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              marginTop: 12,
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            Marcq-en-Barœul, métropole lilloise
          </div>
          <div
            style={{
              marginTop: 36,
              width: 140,
              height: 5,
              borderRadius: 2,
              background: "linear-gradient(90deg, #e5305b, #3d2b8e)",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 64,
            fontSize: 22,
            color: "rgba(255, 255, 255, 0.45)",
            letterSpacing: 1,
          }}
        >
          {host}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
