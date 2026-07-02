import type { Locale, Metric } from "./types"

export const locales: Locale[] = ["es", "en"]
export const defaultLocale: Locale = "es"

/**
 * Single source of truth for identity, contact and canonical URLs.
 * Change the domain, phone or email here — nowhere else.
 */
export const site = {
  url: "https://nahuelsoria.com",
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
} as const

export const whatsappHref = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`

/**
 * Headline metrics. Only `confirmed` metrics are rendered as hard numbers.
 * `unverified` values wait for the owner to ratify them (see SPEC-03 §4).
 */
export const metrics: Metric[] = [
  {
    value: "+$2M",
    label: { es: "Procesados en producción", en: "Processed in production" },
    status: "unverified",
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
