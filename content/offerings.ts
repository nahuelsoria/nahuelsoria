import type { Service, ProcessStep, FaqItem, Channel, MaintenancePlan, ClientSite } from "./types"

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
    duration: { es: "24-48 h", en: "24-48 h" },
    title: { es: "Propuesta", en: "Proposal" },
    description: {
      es: "Propuesta detallada con alcance, tiempos y precio.",
      en: "Detailed proposal with scope, timeline and price.",
    },
  },
  {
    duration: { es: "2-6 semanas", en: "2-6 weeks" },
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
      es: "Depende del alcance: una landing 1-2 semanas, una web app 3-6 semanas, y sistemas o ERPs 6-12 semanas. En la propuesta te doy un timeline concreto.",
      en: "It depends on scope: a landing takes 1-2 weeks, a web app 3-6 weeks, and systems or ERPs 6-12 weeks. The proposal includes a concrete timeline.",
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
      es: "Sí. Trabajo con entregas cada 1-2 semanas en un entorno de staging y updates por WhatsApp o email.",
      en: "Yes. I ship every 1-2 weeks to a staging environment, with updates over WhatsApp or email.",
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

/**
 * /servicios: the two ways to hire, with a public price floor. ARS for the
 * Argentine market (es), USD for clients abroad (en); the two markets do not
 * share a price list on purpose. Floors follow the 2026 local market
 * (landing from $250.000, corporate site from $350.000, maintenance
 * $80.000-150.000/month) and the export rates used on Upwork.
 */
export const channels: Channel[] = [
  {
    id: "web",
    index: "01",
    title: { es: "Landing pages y sitios profesionales", en: "Landing pages and professional sites" },
    description: {
      es: "Para negocios que necesitan una web que cargue rápido, se entienda en diez segundos y traiga consultas por WhatsApp.",
      en: "For businesses that need a site that loads fast, is understood in ten seconds and brings inquiries in.",
    },
    includes: [
      { es: "Diseño a medida sobre tu marca, sin plantilla", en: "Custom design on your brand, no template" },
      { es: "Textos escritos para que te escriban", en: "Copy written to get people to reach out" },
      { es: "SEO técnico y lectura por asistentes de IA (schema, llms.txt)", en: "Technical SEO and AI-assistant readability (schema, llms.txt)" },
      { es: "Formularios y botones de WhatsApp con medición", en: "Forms and WhatsApp buttons with click tracking" },
      { es: "Dominio, hosting y deploy resueltos", en: "Domain, hosting and deployment handled" },
      { es: "30 días de ajustes incluidos", en: "30 days of tweaks included" },
    ],
    delivery: { es: "2 a 3 semanas", en: "2 to 3 weeks" },
    price: {
      es: { display: "$250.000", amount: 250000, currency: "ARS" },
      en: { display: "USD 1,500", amount: 1500, currency: "USD" },
    },
    cta: { es: "Quiero una web", en: "I want a website" },
    whatsappMessage: {
      es: "Hola Nahuel, quiero una web para mi negocio. ¿Arrancamos con la charla de 30 minutos?",
      en: "Hi Nahuel, I want a website for my business. Can we start with the 30-minute call?",
    },
  },
  {
    id: "software",
    index: "02",
    title: { es: "Software a medida e integraciones", en: "Custom software and integrations" },
    description: {
      es: "SaaS, sistemas internos, paneles de administración e integraciones de pago, incluido lo regulado con KYC y settlement.",
      en: "SaaS, internal systems, admin panels and payment integrations, including regulated flows with KYC and settlement.",
    },
    includes: [
      { es: "Relevamiento y arquitectura antes de escribir código", en: "Discovery and architecture before any code" },
      { es: "Usuarios, roles y panel de administración", en: "Users, roles and admin panel" },
      { es: "Pagos con Mercado Pago, Stripe o cripto", en: "Payments with Stripe, Mercado Pago or crypto" },
      { es: "Integraciones con las APIs y sistemas que ya usás", en: "Integrations with the APIs and systems you already use" },
      { es: "Entregas cada una o dos semanas en staging", en: "Staging releases every one or two weeks" },
      { es: "30 días de soporte tras el lanzamiento", en: "30 days of post-launch support" },
    ],
    delivery: { es: "4 a 12 semanas", en: "4 to 12 weeks" },
    price: {
      es: { display: "$1.500.000", amount: 1500000, currency: "ARS" },
      en: { display: "USD 3,000", amount: 3000, currency: "USD" },
    },
    priceNote: { es: "cotizado por hitos", en: "quoted by milestones" },
    cta: { es: "Quiero cotizar un sistema", en: "I want a quote for a system" },
    whatsappMessage: {
      es: "Hola Nahuel, necesito un sistema a medida. ¿Arrancamos con la charla de 30 minutos?",
      en: "Hi Nahuel, I need custom software built. Can we start with the 30-minute call?",
    },
  },
]

export const maintenance: MaintenancePlan = {
  price: {
    es: { display: "$80.000", amount: 80000, currency: "ARS" },
    en: { display: "USD 50", amount: 50, currency: "USD" },
  },
  includes: [
    { es: "Hosting, dominio y certificados al día", en: "Hosting, domain and certificates kept current" },
    { es: "Monitoreo y aviso si algo se cae", en: "Monitoring with alerts when something breaks" },
    { es: "Actualizaciones de seguridad y dependencias", en: "Security and dependency updates" },
    { es: "Horas para cambios chicos de texto o diseño", en: "Hours for small copy or design changes" },
  ],
}

/**
 * Sites delivered to clients, live today. Products of my own and the fintech
 * platforms live in projects.ts; this list is only work done for someone else.
 */
export const clientSites: ClientSite[] = [
  {
    name: "Peyote Concept",
    url: "https://peyoteconcept.com",
    kind: { es: "Agencia creativa", en: "Creative agency" },
    summary: {
      es: "One-page con identidad de marca aplicada, CTAs de WhatsApp medidos, SEO técnico y datos estructurados.",
      en: "One-page site with the brand identity applied, tracked WhatsApp CTAs, technical SEO and structured data.",
    },
    year: 2026,
  },
  {
    name: "Manicuría CABA",
    url: "https://manicuriacaba.com.ar",
    kind: { es: "Salón de manicuría", en: "Nail salon" },
    summary: {
      es: "Sitio estático para un negocio local, con turnos por WhatsApp y publicación automática en Instagram.",
      en: "Static site for a local business, with WhatsApp bookings and automated Instagram publishing.",
    },
    year: 2026,
  },
]

/** Questions people ask about price and scope before hiring; rendered on /servicios only. */
export const pricingFaq: FaqItem[] = [
  {
    q: { es: "¿Qué incluye el precio \"desde\"?", en: "What does the \"from\" price include?" },
    a: {
      es: "El piso cubre una landing de una página con diseño propio, textos, SEO técnico, WhatsApp medido y deploy. Más páginas, un blog o un panel se cotizan aparte y quedan por escrito en la propuesta.",
      en: "The floor covers a one-page landing with custom design, copy, technical SEO, tracked WhatsApp and deployment. Extra pages, a blog or an admin panel are quoted separately and put in writing in the proposal.",
    },
  },
  {
    q: { es: "¿El diseño y los textos los tengo que traer yo?", en: "Do I need to bring the design and the copy?" },
    a: {
      es: "No hace falta. Si tenés marca y contenido, los uso. Si no, el diseño lo hago yo y los textos salen de una charla en la que me contás el negocio.",
      en: "Not necessarily. If you have a brand and content, I use them. If not, I do the design and the copy comes out of a call where you tell me about the business.",
    },
  },
  {
    q: { es: "¿Qué pasa con el dominio y el hosting?", en: "What about the domain and hosting?" },
    a: {
      es: "Los registro y configuro a tu nombre. El hosting va en Vercel, que para un sitio de este tamaño no tiene costo mensual. El dominio lo pagás vos directo al registrador, una vez por año.",
      en: "I register and configure them in your name. Hosting runs on Vercel, which has no monthly cost for a site this size. You pay the domain directly to the registrar, once a year.",
    },
  },
  {
    q: { es: "¿Y si ya tengo una web?", en: "What if I already have a website?" },
    a: {
      es: "Primero la reviso. Si lo que hay funciona, lo conservo y mejoro lo que falta. Rehacer de cero se propone cuando tiene sentido para el negocio, y se explica por qué.",
      en: "I review it first. If what is there works, I keep it and improve what is missing. Rebuilding from scratch is proposed when it makes sense for the business, with the reasons spelled out.",
    },
  },
  {
    q: { es: "¿Trabajás con agencias?", en: "Do you work with agencies?" },
    a: {
      es: "Sí. Hago el desarrollo con la agencia como intermediaria y con el diseño de su equipo. Si la agencia lo prefiere, el cliente final trata solo con ella.",
      en: "Yes. I do the development with the agency as the intermediary and their team's design. If the agency prefers, the end client deals only with them.",
    },
  },
]
