import type { Locale } from "@/content/types"
import { site } from "@/content/site"
import { projects } from "@/content/projects"
import { faqItems, channels, maintenance, pricingFaq } from "@/content/offerings"
import { getDictionary } from "@/lib/i18n"

const knowsAbout = [
  "Fintech",
  "Payment systems",
  "KYC/KYB compliance",
  "Software architecture",
  "SaaS development",
  "Next.js",
  "React",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Process automation",
]

/** Person + ProfessionalService + WebSite + ItemList, as a single @graph. */
export function buildProfileJsonLd(locale: Locale) {
  const dict = getDictionary(locale)
  const home = `${site.url}/${locale}`
  const personId = `${site.url}/#person`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        alternateName: site.fullName,
        url: site.url,
        jobTitle: dict.hero.role,
        description: dict.hero.statement,
        email: `mailto:${site.email}`,
        image: `${site.url}/${locale}/opengraph-image`,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.city,
          addressRegion: site.location.region,
          addressCountry: site.location.country,
        },
        knowsAbout,
        sameAs: [site.social.github, site.social.linkedin, site.social.x],
      },
      // ProfessionalService es un LocalBusiness (Organization + Place), no un
      // Service: `provider` y `serviceType` no existen para ese tipo y el
      // validador de schema.org los marcaba en las 16 paginas (Ahrefs,
      // 25/08/2026). Lo que ofrece va en knowsAbout y en la descripcion; la
      // relacion con la persona es founder. image y address son los campos que
      // Google recomienda para LocalBusiness y que faltaban.
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#service`,
        name: `${site.name} · ${dict.hero.role}`,
        description: dict.hero.statement,
        url: home,
        image: `${site.url}/${locale}/opengraph-image`,
        founder: { "@id": personId },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.city,
          addressRegion: site.location.region,
          addressCountry: site.location.country,
        },
        areaServed: [
          { "@type": "Country", name: "Argentina" },
          { "@type": "Place", name: "Worldwide (remote)" },
        ],
        knowsAbout,
        sameAs: [site.social.github, site.social.linkedin, site.social.x],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: locale === "es" ? "es-AR" : "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ItemList",
        name: dict.projects.title,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          // CreativeWork y no SoftwareApplication: Google exige offers o
          // aggregateRating para ese tipo y son productos de clientes, no
          // software en venta. additionalType conserva el significado.
          item: {
            "@type": "CreativeWork",
            additionalType: "https://schema.org/SoftwareApplication",
            name: p.name,
            description: p.summary[locale],
            ...(p.links?.repo ? { url: p.links.repo } : {}),
            author: { "@id": personId },
          },
        })),
      },
    ],
  }
}

/** BlogPosting + BreadcrumbList for a blog post page. */
export function buildBlogPostingJsonLd(
  locale: Locale,
  post: { slug: string; title: string; description: string; date: string },
) {
  const dict = getDictionary(locale)
  const personId = `${site.url}/#person`
  const postUrl = `${site.url}/${locale}/blog/${post.slug}`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#post`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        inLanguage: locale === "es" ? "es-AR" : "en",
        url: postUrl,
        mainEntityOfPage: postUrl,
        author: { "@id": personId },
        publisher: { "@id": personId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}/${locale}` },
          { "@type": "ListItem", position: 2, name: dict.blog.title, item: `${site.url}/${locale}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
        ],
      },
    ],
  }
}

/** FAQPage: high value for AI Overviews and rich results. */
export function buildFaqJsonLd(locale: Locale, items = faqItems) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q[locale],
      acceptedAnswer: { "@type": "Answer", text: item.a[locale] },
    })),
  }
}

/**
 * /servicios: one Service per channel with its price floor as an Offer
 * (minPrice, since the shown price is a starting point), the maintenance
 * plan, the pricing FAQ and a breadcrumb. Prices follow the locale: ARS on
 * /es, USD on /en, same as the visible page.
 */
export function buildServicesJsonLd(locale: Locale) {
  const dict = getDictionary(locale)
  const personId = `${site.url}/#person`
  const pageUrl = `${site.url}/${locale}/servicios`
  const areaServed = [
    { "@type": "Country", name: "Argentina" },
    { "@type": "Place", name: "Worldwide (remote)" },
  ]
  const offerFor = (price: { amount: number; currency: string }) => ({
    "@type": "Offer",
    priceCurrency: price.currency,
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: price.amount,
      priceCurrency: price.currency,
    },
    availability: "https://schema.org/InStock",
    url: pageUrl,
  })

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...channels.map((c) => ({
        "@type": "Service",
        "@id": `${pageUrl}#${c.id}`,
        name: c.title[locale],
        description: c.description[locale],
        serviceType: c.id === "web" ? "Web design and development" : "Custom software development",
        provider: { "@id": personId },
        areaServed,
        url: pageUrl,
        offers: offerFor(c.price[locale]),
      })),
      {
        "@type": "Service",
        "@id": `${pageUrl}#maintenance`,
        name: dict.pricing.maintenanceTitle,
        description: dict.pricing.maintenanceText,
        serviceType: "Website maintenance",
        provider: { "@id": personId },
        areaServed,
        url: pageUrl,
        offers: offerFor(maintenance.price[locale]),
      },
      buildFaqJsonLd(locale, pricingFaq),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}/${locale}` },
          { "@type": "ListItem", position: 2, name: dict.nav.services, item: pageUrl },
        ],
      },
    ],
  }
}

/**
 * JSON-LD is injected with dangerouslySetInnerHTML, and JSON.stringify leaves
 * `</script>` intact: a `<` inside any title or description closes the script
 * tag early and the rest of the payload is parsed as markup. Escaping every
 * `<` to its \u003c form is inert for JSON parsers, so what a crawler reads
 * is byte-identical data.
 */
export function jsonLdHtml(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
