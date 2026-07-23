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

/** Copy dictionary — one shape, two languages resolved at build/render time. */
export type Dictionary = {
  nav: {
    projects: string
    services: string
    about: string
    blog: string
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
  blog: {
    eyebrow: string
    title: string
    subtitle: string
    readingTime: string
    back: string
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
