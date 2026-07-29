import type { Project } from "./types"
import { site } from "./site"

/**
 * Canonical project list — replaces the old FeaturedProjects + CaseStudies
 * (which described the same projects with contradictory metrics).
 * Sourced from real GitHub repos + README. Order == hierarchy.
 */
export const projects: Project[] = [
  {
    slug: "bridgewater-payments",
    name: "Bridgewater Payments",
    index: "01",
    category: { es: "Infraestructura fintech B2B", en: "B2B fintech infrastructure" },
    role: { es: "Único dueño técnico — arquitectura a producción", en: "Sole technical owner — architecture to production" },
    summary: {
      es: "Plataforma de pagos end-to-end para clientes empresa: onboarding, movimiento de dinero y operaciones, con correctitud y auditabilidad como prioridad.",
      en: "End-to-end payments platform for business clients: onboarding, money movement and operations, with correctness and auditability as first-class concerns.",
    },
    highlights: [
      { es: "Onboarding KYC/KYB con verificación de identidad y audit trails", en: "KYC/KYB onboarding with identity verification and audit trails" },
      { es: "Cuentas virtuales, off-ramps fiat y motor de reglas de settlement", en: "Virtual accounts, fiat off-ramps and a settlement rules engine" },
      { es: "Backoffice operativo para revisión y resolución de casos", en: "Operational backoffice for case review and resolution" },
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Firebase", "Vercel", "Cloudflare"],
    status: "production",
    links: { repo: `${site.social.github}/bridgewater-payments`, live: "https://www.bridgewaterpayments.com" },
  },
  {
    slug: "condor-otc",
    name: "Condor OTC",
    index: "02",
    category: { es: "Pagos cross-border & exchange", en: "Cross-border payments & exchange" },
    role: { es: "CTO / Technical Lead", en: "CTO / Technical Lead" },
    summary: {
      es: "Plataforma de pagos y cambio para operaciones internacionales. Construí las integraciones con proveedores financieros y el tooling interno que usa la mesa a diario.",
      en: "Payments and exchange platform for international operations. Built the financial-provider integrations and the internal desk tooling used day to day.",
    },
    highlights: [
      { es: "Integraciones multi-proveedor aisladas tras una interfaz común", en: "Multi-provider integrations isolated behind a common interface" },
      { es: "Operaciones multi-moneda y flujos OTC/exchange", en: "Multi-currency operations and OTC/exchange flows" },
      { es: "Herramientas internas para la operación de la mesa", en: "Internal tooling for desk operations" },
    ],
    stack: ["TypeScript", "Next.js", "Node.js", "PostgreSQL"],
    status: "production",
    links: { repo: `${site.social.github}/condor-otc`, live: "https://www.condorotc.com.ar" },
  },
  {
    slug: "llm-audit",
    name: "LLM Audit",
    index: "03",
    category: { es: "Auditoría de código con IA", en: "AI-powered code auditing" },
    role: { es: "Creador", en: "Creator" },
    summary: {
      es: "Herramienta que orquesta agentes LLM —cada uno cubre una dimensión (seguridad, calidad, UX, arquitectura)— y consolida un reporte priorizado.",
      en: "A tool that orchestrates LLM agents — each covering one dimension (security, code quality, UX, architecture) — into a single prioritized report.",
    },
    highlights: [
      { es: "Agentes especializados por dimensión de revisión", en: "Specialized agents per review dimension" },
      { es: "Consolidación en un reporte único priorizado", en: "Consolidation into a single prioritized report" },
    ],
    stack: ["Python", "TypeScript", "LLM APIs"],
    status: "active",
    links: { repo: `${site.social.github}/llm-audit`, live: "https://llmaudit.app" },
  },
  {
    slug: "picaday",
    name: "Picaday",
    index: "04",
    category: { es: "Producto propio — diario fotográfico", en: "Own product — photo journal" },
    role: { es: "Founder & desarrollador", en: "Founder & developer" },
    summary: {
      es: "App de diario fotográfico con foco en performance y experiencia. MVP listo para producción.",
      en: "Photo-journal app focused on performance and experience. Production-ready MVP.",
    },
    highlights: [
      { es: "LCP < 2.5s garantizado; testing E2E con Playwright", en: "Guaranteed LCP < 2.5s; E2E testing with Playwright" },
      { es: "Web Workers para compresión de imágenes y virtualización", en: "Web Workers for image compression and virtualization" },
    ],
    stack: ["Next.js", "Firebase", "Tailwind", "Playwright"],
    status: "mvp",
  },
  {
    slug: "numerai",
    name: "Numerai",
    index: "05",
    category: { es: "Producto propio — finanzas personales", en: "Own product — personal finance" },
    role: { es: "Founder & desarrollador", en: "Founder & developer" },
    summary: {
      es: "Tracker de finanzas personales multi-moneda con captura de gastos por IA vía WhatsApp e integración de pagos.",
      en: "Multi-currency personal-finance tracker with AI expense capture over WhatsApp and payment integration.",
    },
    highlights: [
      { es: "Categorización de gastos por IA vía WhatsApp", en: "AI expense categorization over WhatsApp" },
      { es: "Multi-moneda (ARS/USD/EUR) y pagos Dodo + MercadoPago", en: "Multi-currency (ARS/USD/EUR) and Dodo + MercadoPago payments" },
    ],
    stack: ["Next.js", "Firebase", "WhatsApp API", "MercadoPago"],
    status: "mvp",
  },
  {
    slug: "what-i-wish",
    name: "What I Wish",
    index: "06",
    category: { es: "Producto propio — wishlist social", en: "Own product — social wishlist" },
    role: { es: "Founder & desarrollador", en: "Founder & developer" },
    summary: {
      es: "App para compartir listas de deseos con viralización vía WhatsApp y onboarding en menos de 60 segundos.",
      en: "App to share wishlists with WhatsApp-driven virality and sub-60-second onboarding.",
    },
    highlights: [
      { es: "Onboarding en menos de 60 segundos", en: "Onboarding in under 60 seconds" },
      { es: "Diseño minimalista con foco en compartir", en: "Minimal design focused on sharing" },
    ],
    stack: ["React Native", "Firebase", "WhatsApp API"],
    status: "production",
    links: { live: "https://whatiwish.app" },
  },
]
