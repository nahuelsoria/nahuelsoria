import type { Locale } from "@/content/types"
import { site } from "@/content/site"
import { projects } from "@/content/projects"
import { faqItems } from "@/content/offerings"
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
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#service`,
        name: `${site.name} — ${dict.hero.role}`,
        description: dict.hero.statement,
        url: home,
        provider: { "@id": personId },
        areaServed: [
          { "@type": "Country", name: "Argentina" },
          { "@type": "Place", name: "Worldwide (remote)" },
        ],
        serviceType: ["Software development", "Fintech", "SaaS", "Automation"],
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
          item: {
            "@type": "SoftwareApplication",
            name: p.name,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
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

/** FAQPage — high value for AI Overviews and rich results. */
export function buildFaqJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q[locale],
      acceptedAnswer: { "@type": "Answer", text: item.a[locale] },
    })),
  }
}
