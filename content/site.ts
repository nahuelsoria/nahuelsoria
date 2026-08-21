import type { Locale, Metric } from "./types"

export const locales: Locale[] = ["es", "en"]
export const defaultLocale: Locale = "es"

/**
 * Single source of truth for identity, contact and canonical URLs.
 * Change the domain, phone or email here, nowhere else.
 */
export const site = {
  // Canonical URL. Set as NEXT_PUBLIC_SITE_URL in Vercel; the fallback keeps local/CI
  // builds on the same canonical host.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nahuelsoria.com",
  name: "Nahuel Soria",
  fullName: "Jorge Nahuel Soria",
  email: "jorgenahuelsoria@gmail.com",
  whatsapp: "5491158794428", // E.164 without '+'
  whatsappDisplay: "+54 9 11 5879-4428",
  location: { city: "Buenos Aires", region: "Ciudad Autónoma de Buenos Aires", country: "AR" },
  social: {
    github: "https://github.com/nahuelsoria",
    linkedin: "https://www.linkedin.com/in/nahuelsoria/",
    x: "https://twitter.com/nahhwe",
  },
  githubUser: "nahuelsoria",
  // Public booking link. Override via NEXT_PUBLIC_CALENDLY_URL if it ever changes.
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/nahuelsoria/30min",
} as const

export const whatsappHref = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`

/**
 * Headline metrics. Only `confirmed` metrics are rendered as hard numbers.
 * `unverified` values wait for the owner to ratify them (see SPEC-03 §4).
 */
export const metrics: Metric[] = [
  {
    // Aggregate portfolio figure, not attributed to any single client (privacy-safe).
    value: "+$20M",
    label: { es: "USD procesados en plataformas que construí", en: "USD processed across platforms I built" },
    status: "confirmed",
  },
  {
    value: "6",
    label: { es: "Productos en producción / activos", en: "Products in production / active" },
    status: "confirmed",
  },
  {
    value: "4+",
    label: { es: "Años construyendo software", en: "Years building software" },
    status: "confirmed",
  },
  {
    value: "100%",
    label: { es: "Ownership técnico end-to-end", en: "End-to-end technical ownership" },
    status: "confirmed",
  },
]
