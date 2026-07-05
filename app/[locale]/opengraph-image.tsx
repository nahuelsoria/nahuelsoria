import { ImageResponse } from "next/og"
import { getDictionary, isLocale } from "@/lib/i18n"
import { site } from "@/content/site"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Nahuel Soria — Software developer"

// Branded social preview (dark, warm near-black + signal green), one per locale.
export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = isLocale(locale) ? locale : "es"
  const dict = getDictionary(loc)
  const bg = "#12160f"
  const fg = "#f0efe6"
  const muted = "#9aa08f"
  const brand = "#8fe388"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: bg,
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top row: monogram + availability */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 12,
              border: `1px solid #2c3327`,
              color: fg,
              fontSize: 28,
              fontFamily: "monospace",
            }}
          >
            NS
          </div>
          <div style={{ display: "flex", alignItems: "center", color: brand, fontSize: 22, fontFamily: "monospace" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: brand, marginRight: 12 }} />
            {loc === "es" ? "Disponible para proyectos" : "Available for projects"}
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: muted, fontSize: 24, fontFamily: "monospace", marginBottom: 20 }}>
            {loc === "es" ? "// Nahuel Soria — Desarrollador de software" : "// Nahuel Soria — Software developer"}
          </div>
          <div style={{ display: "flex", color: fg, fontSize: 68, lineHeight: 1.05, letterSpacing: -1, maxWidth: 900 }}>
            {loc === "es"
              ? "Software a medida que hace crecer tu negocio."
              : "Custom software that grows your business."}
          </div>
          <div style={{ display: "flex", width: 220, height: 8, background: brand, marginTop: 28 }} />
        </div>

        {/* bottom row: proof + url */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", color: muted, fontSize: 26 }}>
            {loc === "es"
              ? "Fintech · SaaS · Automatización · +$20M procesados"
              : "Fintech · SaaS · Automation · +$20M processed"}
          </div>
          <div style={{ display: "flex", color: fg, fontSize: 26, fontFamily: "monospace" }}>
            {site.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
