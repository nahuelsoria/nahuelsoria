import type { Project } from "./types"
import { site } from "./site"

/**
 * Canonical project list. Replaces the old FeaturedProjects + CaseStudies
 * (which described the same projects with contradictory metrics).
 * Sourced from real GitHub repos + README. Order == hierarchy.
 */
export const projects: Project[] = [
  {
    slug: "bridgewater-payments",
    name: "Bridgewater Payments",
    index: "01",
    category: { es: "Infraestructura fintech B2B", en: "B2B fintech infrastructure" },
    role: { es: "Único dueño técnico: arquitectura a producción", en: "Sole technical owner: architecture to production" },
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
    slug: "asked-thrice",
    name: "Asked Thrice",
    index: "03",
    category: { es: "Producto propio: visibilidad de marcas en IA", en: "Own product: brand visibility in AI" },
    role: { es: "Founder & desarrollador", en: "Founder & developer" },
    summary: {
      es: "Mide si ChatGPT, Gemini y Claude recomiendan una marca cuando alguien pregunta por su categoría, con varias corridas por modelo y las respuestas crudas como evidencia.",
      en: "Measures whether ChatGPT, Gemini and Claude recommend a brand when someone asks about its category, with several runs per model and the raw answers as evidence.",
    },
    highlights: [
      { es: "Frecuencia con intervalo de confianza en lugar de un puntaje suelto", en: "Frequency with a confidence interval instead of a single score" },
      { es: "Servidor MCP publicado y CLI para que lo usen agentes", en: "Published MCP server and CLI so agents can use it" },
      { es: "Cobro en pesos y en dólares, reporte entregado por mail", en: "Payments in pesos and dollars, report delivered by email" },
    ],
    stack: ["Next.js", "Supabase", "OpenAI", "Gemini", "Anthropic", "Vercel"],
    status: "production",
    links: { live: "https://askedthrice.com" },
  },
  {
    slug: "onda-corta",
    name: "Onda Corta",
    index: "04",
    category: { es: "Producto propio: medio automatizado", en: "Own product: automated newsroom" },
    role: { es: "Founder & desarrollador", en: "Founder & developer" },
    summary: {
      es: "Portal de noticias de tecnología en español que escribe y publica un pipeline de agentes, con el control de calidad en código y no en el prompt.",
      en: "Spanish-language tech news site written and published by an agent pipeline, with quality control in code rather than in the prompt.",
    },
    highlights: [
      { es: "Anti-plagio, fact-check y deduplicación después del modelo", en: "Plagiarism, fact-check and dedup checks after the model" },
      { es: "Cadencia ajustada según lo que Google indexa", en: "Publishing cadence tuned to what Google indexes" },
      { es: "Reels generados con Remotion a partir de las notas", en: "Reels generated with Remotion from the articles" },
    ],
    stack: ["Python", "PostgreSQL", "Next.js", "Remotion", "Vercel"],
    status: "production",
    links: { live: "https://ondacorta.news" },
  },
  {
    slug: "llm-audit",
    name: "LLM Audit",
    index: "05",
    category: { es: "Auditoría de código con IA", en: "AI-powered code auditing" },
    role: { es: "Creador", en: "Creator" },
    summary: {
      es: "Herramienta que orquesta agentes LLM, cada uno sobre una dimensión (seguridad, calidad, UX, arquitectura), y consolida un reporte priorizado.",
      en: "A tool that orchestrates LLM agents, each covering one dimension (security, code quality, UX, architecture), into a single prioritized report.",
    },
    highlights: [
      { es: "Agentes especializados por dimensión de revisión", en: "Specialized agents per review dimension" },
      { es: "Consolidación en un reporte único priorizado", en: "Consolidation into a single prioritized report" },
    ],
    stack: ["Python", "TypeScript", "LLM APIs"],
    status: "active",
    links: { repo: `${site.social.github}/llm-audit` },
  },
  {
    slug: "picaday",
    name: "Picaday",
    index: "06",
    category: { es: "Producto propio: diario fotográfico", en: "Own product: photo journal" },
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
    slug: "timerz",
    name: "timerz",
    index: "07",
    category: { es: "Producto propio: timer para enfocarse", en: "Own product: focus timer" },
    role: { es: "Founder & desarrollador", en: "Founder & developer" },
    summary: {
      es: "Pomodoro y cuenta regresiva sobre escenas animadas en Three.js, con sonidos ambiente mezclables. Funciona sin cuenta y sin conexión.",
      en: "Pomodoro and countdown timer over animated Three.js scenes, with mixable ambient sounds. Works without an account and offline.",
    },
    highlights: [
      { es: "Timer calculado desde el reloj: no se atrasa en segundo plano", en: "Timer derived from the clock: no drift in background tabs" },
      { es: "Escenas con shaders propios, cargadas solo al elegirlas", en: "Scenes with custom shaders, loaded only when picked" },
      { es: "Sonidos sintetizados con Web Audio, sin archivos", en: "Sounds synthesized with Web Audio, no audio files" },
    ],
    stack: ["React", "TypeScript", "Three.js", "Web Audio", "Vite", "PWA"],
    status: "active",
    links: { live: "https://timerz-app.vercel.app" },
  },
  {
    slug: "numerai",
    name: "Numerai",
    index: "08",
    category: { es: "Producto propio: finanzas personales", en: "Own product: personal finance" },
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
    index: "09",
    category: { es: "Producto propio: wishlist social", en: "Own product: social wishlist" },
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
