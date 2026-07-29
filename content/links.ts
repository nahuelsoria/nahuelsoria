import type { BioLink, BioLinkKind } from "./types"
import { site } from "./site"

/** Render order for the /links page groups. */
export const bioLinkGroups: BioLinkKind[] = ["writing", "project", "contact"]

/**
 * Link-in-bio list for /links: every URL here is public and verified live.
 * Separate from projects.ts on purpose: this page also lists things that
 * are not portfolio case studies (Onda Corta, VeloxRead, Mise, the blog).
 */
export const bioLinks: BioLink[] = [
  {
    label: { es: "Blog", en: "Blog" },
    description: {
      es: "Notas de ingeniería: agentes de IA, fintech y automatización en producción.",
      en: "Engineering notes: AI agents, fintech and automation in production.",
    },
    href: "/blog",
    kind: "writing",
    internal: true,
    featured: true,
  },
  {
    label: { es: "Onda Corta", en: "Onda Corta" },
    description: {
      es: "Portal de noticias de tecnología en español.",
      en: "Tech news portal in Spanish.",
    },
    href: "https://ondacorta.news",
    kind: "project",
  },
  {
    label: { es: "LLM Audit", en: "LLM Audit" },
    description: {
      es: "Auditoría de código con agentes de IA: seguridad, calidad y arquitectura en un solo reporte.",
      en: "AI code auditing: security, quality and architecture in a single report.",
    },
    href: "https://llmaudit.app",
    kind: "project",
  },
  {
    label: { es: "What I Wish", en: "What I Wish" },
    description: {
      es: "Listas de deseos para compartir en segundos.",
      en: "Wishlists you can share in seconds.",
    },
    href: "https://whatiwish.app",
    kind: "project",
  },
  {
    label: { es: "VeloxRead", en: "VeloxRead" },
    description: {
      es: "Lector de lectura rápida RSVP en el navegador.",
      en: "RSVP speed reader in the browser.",
    },
    href: "https://veloxread.vercel.app",
    kind: "project",
  },
  {
    label: { es: "Mise", en: "Mise" },
    description: {
      es: "Planificador semanal de comidas altas en proteína.",
      en: "The high-protein weekly meal planner.",
    },
    href: "https://misekit-planner.vercel.app",
    kind: "project",
  },
  {
    label: { es: "Condor OTC", en: "Condor OTC" },
    description: {
      es: "Pagos internacionales y cambio de divisas.",
      en: "Cross-border payments and currency exchange.",
    },
    href: "https://www.condorotc.com.ar",
    kind: "project",
  },
  {
    label: { es: "Bridgewater Payments", en: "Bridgewater Payments" },
    description: {
      es: "Infraestructura de pagos para empresas.",
      en: "Payments infrastructure for business clients.",
    },
    href: "https://www.bridgewaterpayments.com",
    kind: "project",
  },
  {
    label: { es: "Agendar una llamada", en: "Book a call" },
    description: {
      es: "Consulta inicial gratuita de 30 minutos.",
      en: "Free 30-minute intro consultation.",
    },
    href: site.calendly,
    kind: "contact",
  },
]
