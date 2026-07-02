import type { Service, ProcessStep, FaqItem } from "./types"

export const services: Service[] = [
  {
    id: "web",
    title: { es: "Landing pages & sitios que convierten", en: "Landing pages & sites that convert" },
    description: {
      es: "Claridad del mensaje, prueba social y performance para captar clientes.",
      en: "Clear message, social proof and performance to capture customers.",
    },
    points: [
      { es: "Propuesta de valor y copy orientado a conversión", en: "Value proposition and conversion-oriented copy" },
      { es: "90+ en Lighthouse y SEO técnico de base", en: "90+ Lighthouse and baseline technical SEO" },
      { es: "Formularios, tracking y analítica", en: "Forms, tracking and analytics" },
    ],
  },
  {
    id: "saas",
    title: { es: "Web App / SaaS a medida", en: "Custom Web App / SaaS" },
    description: {
      es: "Producto digital escalable con datos, autenticación y pagos.",
      en: "Scalable digital product with data, auth and payments.",
    },
    points: [
      { es: "Auth, base de datos y panel de administración", en: "Auth, database and admin panel" },
      { es: "Pagos (Stripe / MercadoPago / cripto)", en: "Payments (Stripe / MercadoPago / crypto)" },
      { es: "Dashboards con métricas, roles y reportes", en: "Dashboards with metrics, roles and reports" },
    ],
    featured: true,
  },
  {
    id: "fintech",
    title: { es: "Fintech & integraciones de pago", en: "Fintech & payment integrations" },
    description: {
      es: "Onboarding, movimiento de dinero y operaciones con foco en correctitud y auditabilidad.",
      en: "Onboarding, money movement and operations focused on correctness and auditability.",
    },
    points: [
      { es: "KYC/KYB y compliance operativo", en: "KYC/KYB and operational compliance" },
      { es: "Integraciones multi-proveedor y multi-moneda", en: "Multi-provider and multi-currency integrations" },
      { es: "Motores de settlement y backoffice", en: "Settlement engines and backoffice" },
    ],
  },
  {
    id: "erp",
    title: { es: "Sistemas internos & automatización", en: "Internal systems & automation" },
    description: {
      es: "Automatizá procesos manuales, ganá control y trazabilidad.",
      en: "Automate manual processes, gain control and traceability.",
    },
    points: [
      { es: "Relevamiento de procesos y arquitectura", en: "Process mapping and architecture" },
      { es: "Roles, permisos y reportería/exportación", en: "Roles, permissions and reporting/export" },
      { es: "Integraciones con APIs y sistemas legacy", en: "Integrations with APIs and legacy systems" },
    ],
  },
  {
    id: "cto",
    title: { es: "Consultoría CTO / Product", en: "CTO / Product consulting" },
    description: {
      es: "Dirección técnica, auditorías y un plan de acción concreto.",
      en: "Technical direction, audits and a concrete action plan.",
    },
    points: [
      { es: "Auditoría de código, seguridad y performance", en: "Code, security and performance audit" },
      { es: "Arquitectura y roadmap tecnológico", en: "Architecture and technology roadmap" },
      { es: "Mentoría de equipos", en: "Team mentoring" },
    ],
  },
]

export const processSteps: ProcessStep[] = [
  {
    duration: { es: "30 min", en: "30 min" },
    title: { es: "Consulta gratuita", en: "Free consultation" },
    description: {
      es: "Conocemos tu proyecto, objetivos y alcance. Sin compromiso.",
      en: "We go over your project, goals and scope. No strings attached.",
    },
  },
  {
    duration: { es: "24–48 h", en: "24–48 h" },
    title: { es: "Propuesta", en: "Proposal" },
    description: {
      es: "Propuesta detallada con alcance, tiempos y precio.",
      en: "Detailed proposal with scope, timeline and price.",
    },
  },
  {
    duration: { es: "2–6 semanas", en: "2–6 weeks" },
    title: { es: "Build iterativo", en: "Iterative build" },
    description: {
      es: "Sprints con entregas parciales y demos en staging.",
      en: "Sprints with incremental delivery and staging demos.",
    },
  },
  {
    duration: { es: "30 días", en: "30 days" },
    title: { es: "Entrega & soporte", en: "Delivery & support" },
    description: {
      es: "Lanzamiento, medición y 30 días de soporte incluido.",
      en: "Launch, measurement and 30 days of included support.",
    },
  },
]

export const faqItems: FaqItem[] = [
  {
    q: { es: "¿Cuánto tarda un proyecto?", en: "How long does a project take?" },
    a: {
      es: "Depende del alcance: una landing 1–2 semanas, una web app 3–6 semanas, y sistemas o ERPs 6–12 semanas. En la propuesta te doy un timeline concreto.",
      en: "It depends on scope: a landing takes 1–2 weeks, a web app 3–6 weeks, and systems or ERPs 6–12 weeks. The proposal includes a concrete timeline.",
    },
  },
  {
    q: { es: "¿Trabajás con empresas fuera de Argentina?", en: "Do you work with companies outside Argentina?" },
    a: {
      es: "Sí. Trabajo de forma remota con founders y equipos de cualquier país, y facturo en USD o ARS.",
      en: "Yes. I work remotely with founders and teams anywhere, and invoice in USD or ARS.",
    },
  },
  {
    q: { es: "¿Qué stack usás?", en: "What stack do you use?" },
    a: {
      es: "Principalmente TypeScript, Next.js y Node.js, con PostgreSQL o Firebase, desplegado en Vercel/Cloudflare. Elijo según los objetivos y la escala del proyecto.",
      en: "Mostly TypeScript, Next.js and Node.js, with PostgreSQL or Firebase, deployed on Vercel/Cloudflare. I pick based on the project's goals and scale.",
    },
  },
  {
    q: { es: "¿Cómo funciona el pago?", en: "How does payment work?" },
    a: {
      es: "Habitualmente 50% al inicio y 50% al finalizar. Acepto transferencia, PayPal o cripto (USDT), en USD o ARS.",
      en: "Usually 50% upfront and 50% on delivery. I accept bank transfer, PayPal or crypto (USDT), in USD or ARS.",
    },
  },
  {
    q: { es: "¿Qué incluye el soporte post-entrega?", en: "What does post-delivery support include?" },
    a: {
      es: "30 días de soporte incluido para ajustes y correcciones. Después podés contratar un plan de mantenimiento mensual.",
      en: "30 days of included support for tweaks and fixes. After that you can take a monthly maintenance plan.",
    },
  },
  {
    q: { es: "¿Puedo ver el progreso durante el desarrollo?", en: "Can I follow progress during development?" },
    a: {
      es: "Sí. Trabajo con entregas cada 1–2 semanas en un entorno de staging y updates por WhatsApp o email.",
      en: "Yes. I ship every 1–2 weeks to a staging environment, with updates over WhatsApp or email.",
    },
  },
  {
    q: { es: "¿Ofrecés mantenimiento continuo?", en: "Do you offer ongoing maintenance?" },
    a: {
      es: "Sí, con planes mensuales que cubren soporte, mejoras y monitoreo.",
      en: "Yes, with monthly plans covering support, improvements and monitoring.",
    },
  },
  {
    q: { es: "¿Trabajás en proyectos fintech regulados?", en: "Do you work on regulated fintech projects?" },
    a: {
      es: "Sí. Construí plataformas de pagos con KYC/KYB, settlement y backoffice operativo, con foco en correctitud y auditabilidad.",
      en: "Yes. I've built payment platforms with KYC/KYB, settlement and operational backoffice, focused on correctness and auditability.",
    },
  },
]
