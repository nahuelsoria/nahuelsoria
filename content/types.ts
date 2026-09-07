export type Locale = "es" | "en"

export type Localized = { es: string; en: string }

export type MetricStatus = "confirmed" | "unverified"

export type Metric = {
  value: string
  label: Localized
  status: MetricStatus
}

export type ProjectStatus = "production" | "active" | "mvp"

export type Project = {
  slug: string
  name: string
  index: string // "01".."06"
  category: Localized
  role: Localized
  summary: Localized
  highlights: Localized[]
  stack: string[]
  status: ProjectStatus
  links?: { repo?: string; live?: string }
  metric?: Metric
}

export type Service = {
  id: string
  title: Localized
  description: Localized
  points: Localized[]
  featured?: boolean
}

export type ProcessStep = {
  duration: Localized
  title: Localized
  description: Localized
}

export type FaqItem = {
  q: Localized
  a: Localized
}

/** Price shown per locale (ARS for es, USD for en) plus the numeric value for JSON-LD. */
export type LocalizedPrice = {
  es: { display: string; amount: number; currency: "ARS" }
  en: { display: string; amount: number; currency: "USD" }
}

/** One of the two ways to hire: a web site or custom software. */
export type Channel = {
  id: "web" | "software"
  index: string // "01", "02"
  title: Localized
  description: Localized
  includes: Localized[]
  delivery: Localized
  price: LocalizedPrice
  /** Shown next to the price when the floor is a starting point for a milestone quote. */
  priceNote?: Localized
  cta: Localized
  whatsappMessage: Localized
}

export type MaintenancePlan = {
  price: LocalizedPrice
  includes: Localized[]
}

/** A site delivered to a client, live and public. */
export type ClientSite = {
  name: string
  url: string
  kind: Localized
  summary: Localized
  year: number
}

export type BioLinkKind = "writing" | "project" | "contact"

export type BioLink = {
  label: Localized
  description: Localized
  /** Absolute URL, or a locale-relative path when `internal` is true. */
  href: string
  kind: BioLinkKind
  internal?: boolean
  featured?: boolean
}

/** Copy dictionary: one shape, two languages resolved at build/render time. */
export type Dictionary = {
  nav: {
    projects: string
    services: string
    about: string
    blog: string
    links: string
    contact: string
    cta: string
  }
  hero: {
    eyebrow: string
    role: string
    headline: string // may contain {accent} placeholder around one word
    headlineAccent: string
    lead: string
    // one plain declarative sentence for crawlers/LLMs (GEO)
    statement: string
    // meta description of the home (120-155 chars)
    description: string
    bullets: string[]
    ctaPrimary: string
    ctaSecondary: string
    availability: string
  }
  proof: {
    eyebrow: string
    title: string
    reposLabel: string
  }
  projects: {
    eyebrow: string
    title: string
    subtitle: string
    roleLabel: string
    stackLabel: string
    viewRepo: string
    viewLive: string
    statusLabel: Record<ProjectStatus, string>
  }
  services: {
    eyebrow: string
    title: string
    subtitle: string
    featuredBadge: string
    ctaText: string
    cta: string
  }
  process: {
    eyebrow: string
    title: string
    subtitle: string
  }
  about: {
    eyebrow: string
    title: string
    statement: string
    paragraphs: string[]
    stackTitle: string
    principlesTitle: string
    principles: string[]
    locationLabel: string
    location: string
  }
  faq: {
    eyebrow: string
    title: string
    subtitle: string
  }
  pricing: {
    eyebrow: string
    title: string
    lead: string
    // one plain declarative sentence with the price floors, for crawlers/LLMs (GEO)
    statement: string
    // meta description of /servicios (120-155 chars)
    description: string
    channelsEyebrow: string
    channelsTitle: string
    fromLabel: string
    deliveryLabel: string
    includesLabel: string
    proofEyebrow: string
    proofTitle: string
    proofSubtitle: string
    proofProductsLink: string
    maintenanceEyebrow: string
    maintenanceTitle: string
    maintenanceText: string
    perMonth: string
    processEyebrow: string
    faqEyebrow: string
    faqTitle: string
    faqSubtitle: string
  }
  blog: {
    eyebrow: string
    title: string
    subtitle: string
    readingTime: string
    back: string
  }
  links: {
    eyebrow: string
    title: string
    subtitle: string
    // meta description of /links (120-155 chars)
    description: string
    groups: Record<BioLinkKind, string>
  }
  contact: {
    eyebrow: string
    title: string
    subtitle: string
    emailLabel: string
    whatsappLabel: string
    scheduleLabel: string
    form: {
      name: string
      email: string
      message: string
      messagePlaceholder: string
      submit: string
    }
  }
  footer: {
    tagline: string
    rights: string
    builtWith: string
  }
  theme: { toggle: string }
  language: { toggle: string; label: string }
}
