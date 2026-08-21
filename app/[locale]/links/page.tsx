import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/sections/footer"
import { Reveal } from "@/components/reveal"
import { TrackedLink } from "@/components/tracked-link"
import { getDictionary, isLocale } from "@/lib/i18n"
import { bioLinks, bioLinkGroups } from "@/content/links"
import { site, whatsappHref } from "@/content/site"
import type { Locale } from "@/content/types"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const loc: Locale = isLocale(locale) ? locale : "es"
  const dict = getDictionary(loc)

  const title = `${dict.links.title} · ${site.name}`
  const description = dict.links.subtitle
  // openGraph/twitter are shallow-merged: declaring them here drops the
  // file-based image from app/[locale]/opengraph-image, so re-attach it.
  const ogImage = `${site.url}/${loc}/opengraph-image`

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: {
      canonical: `${site.url}/${loc}/links`,
      languages: {
        "es-AR": `${site.url}/es/links`,
        en: `${site.url}/en/links`,
        "x-default": `${site.url}/es/links`,
      },
    },
    openGraph: {
      type: "website",
      locale: loc === "es" ? "es_AR" : "en_US",
      alternateLocale: loc === "es" ? "en_US" : "es_AR",
      url: `${site.url}/${loc}/links`,
      siteName: site.name,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, creator: "@nahhwe", images: [ogImage] },
  }
}

export default async function LinksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)

  const wa = whatsappHref(
    locale === "es"
      ? "Hola Nahuel! Me gustaría contactarte."
      : "Hi Nahuel! I'd like to get in touch.",
  )

  const socialLinks = [
    { href: `mailto:${site.email}`, label: "Email", Icon: Mail, external: false },
    { href: wa, label: "WhatsApp", Icon: MessageCircle, external: true },
    { href: site.social.github, label: "GitHub", Icon: Github, external: true },
    { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin, external: true },
    { href: site.social.x, label: "X", Icon: ArrowUpRight, external: true },
  ]

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main>
        <section className="section pt-32 md:pt-40">
          <div className="container-page">
            <div className="mx-auto max-w-xl">
              <Reveal>
                <span className="eyebrow">{dict.links.eyebrow}</span>
                <h1 className="heading mt-5">{dict.links.title}</h1>
                <p className="lede mt-4">{dict.links.subtitle}</p>
              </Reveal>

              <Reveal delay={1}>
                <ul className="mt-8 flex flex-wrap gap-3">
                  {socialLinks.map(({ href, label, Icon, external }) => (
                    <li key={label}>
                      <TrackedLink
                        href={href}
                        label={label}
                        external={external}
                        className="grid h-11 w-11 place-items-center rounded-md border border-line text-fg-muted transition-colors hover:border-brand hover:text-foreground"
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                        <span className="sr-only">{label}</span>
                      </TrackedLink>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {bioLinkGroups.map((kind, groupIndex) => {
                const group = bioLinks.filter((link) => link.kind === kind)
                if (group.length === 0) return null
                const delay = Math.min(groupIndex + 2, 5) as 2 | 3 | 4 | 5
                return (
                  <Reveal key={kind} delay={delay}>
                    <section aria-label={dict.links.groups[kind]} className="mt-12">
                      <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                        {dict.links.groups[kind]}
                      </span>
                      <ul className="mt-4 flex flex-col gap-4">
                        {group.map((link) => {
                          const href = link.internal ? `/${locale}${link.href}` : link.href
                          return (
                            <li key={href}>
                              <TrackedLink
                                href={href}
                                label={link.label.en}
                                external={!link.internal}
                                className={`card-surface group block p-5 md:p-6 ${
                                  link.featured ? "ring-1 ring-brand" : ""
                                }`}
                              >
                                <span className="flex items-baseline justify-between gap-3">
                                  <span className="text-lg font-medium transition-colors group-hover:text-brand">
                                    {link.label[locale]}
                                  </span>
                                  <ArrowUpRight className="h-4 w-4 shrink-0 self-center text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                                </span>
                                <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
                                  {link.description[locale]}
                                </span>
                              </TrackedLink>
                            </li>
                          )
                        })}
                      </ul>
                    </section>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
