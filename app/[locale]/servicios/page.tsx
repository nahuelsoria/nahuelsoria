import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowUpRight, Check } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/sections/footer"
import { Process } from "@/components/sections/process"
import { Faq } from "@/components/sections/faq"
import { Reveal } from "@/components/reveal"
import { TrackedLink } from "@/components/tracked-link"
import { getDictionary, isLocale } from "@/lib/i18n"
import { buildServicesJsonLd, jsonLdHtml } from "@/lib/jsonld"
import { channels, maintenance, clientSites, pricingFaq } from "@/content/offerings"
import { site, whatsappHref } from "@/content/site"
import type { Locale } from "@/content/types"

const Contact = dynamic(() => import("@/components/contact").then((m) => m.Contact))

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const loc: Locale = isLocale(locale) ? locale : "es"
  const dict = getDictionary(loc)

  const title =
    loc === "es"
      ? `Servicios y precios: web y software a medida · ${site.name}`
      : `Services and pricing: web and custom software · ${site.name}`
  const description = dict.pricing.description
  const url = `${site.url}/${loc}/servicios`
  // openGraph/twitter are shallow-merged: declaring them here drops the
  // file-based image from app/[locale]/opengraph-image, so re-attach it.
  const ogImage = `${site.url}/${loc}/opengraph-image`

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "es-AR": `${site.url}/es/servicios`,
        en: `${site.url}/en/servicios`,
        "x-default": `${site.url}/es/servicios`,
      },
    },
    openGraph: {
      type: "website",
      locale: loc === "es" ? "es_AR" : "en_US",
      alternateLocale: loc === "es" ? "en_US" : "es_AR",
      url,
      siteName: site.name,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, creator: "@nahhwe", images: [ogImage] },
  }
}

export default async function ServiciosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const t = dict.pricing
  const servicesLd = buildServicesJsonLd(locale)
  const faqCopy = { eyebrow: t.faqEyebrow, title: t.faqTitle, subtitle: t.faqSubtitle }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(servicesLd) }}
      />
      <Header dict={dict} locale={locale} />
      <main>
        {/* ---- Hero: no button on purpose; the two channel cards below carry the CTAs ---- */}
        <section className="section pt-32 md:pt-40" aria-labelledby="pricing-title">
          <div className="container-page">
            <div className="max-w-3xl">
              <Reveal>
                <span className="eyebrow">{t.eyebrow}</span>
              </Reveal>
              <Reveal delay={1}>
                <h1 id="pricing-title" className="display mt-6">
                  {t.title}
                </h1>
              </Reveal>
              <Reveal delay={2}>
                <p className="lede mt-6">{t.lead}</p>
              </Reveal>
              {/* Plain declarative sentence for crawlers and LLMs (SPEC-02 §5). */}
              <p className="sr-only">{t.statement}</p>
            </div>
          </div>
        </section>

        {/* ---- 01 · Channels ---- */}
        <section id="canales" className="section scroll-mt-24 pt-0" aria-labelledby="channels-title">
          <div className="container-page">
            <Reveal>
              <span className="eyebrow">{t.channelsEyebrow}</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 id="channels-title" className="heading mt-6">
                {t.channelsTitle}
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {channels.map((c, i) => {
                const price = c.price[locale]
                const delay = (i + 2) as 2 | 3
                return (
                  <Reveal key={c.id} delay={delay} as="article" className="h-full">
                    <div className="card-surface flex h-full flex-col p-6 md:p-8">
                      <div className="flex items-center justify-between gap-3">
                        <span className="tnum font-mono text-sm text-fg-muted">{c.index}</span>
                        <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.7rem] tracking-wide text-brand">
                          {t.deliveryLabel} · {c.delivery[locale]}
                        </span>
                      </div>

                      <h3 className="mt-5 font-serif text-2xl leading-tight text-foreground md:text-3xl">
                        {c.title[locale]}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {c.description[locale]}
                      </p>

                      <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-mono text-xs uppercase tracking-wide text-fg-muted">
                          {t.fromLabel}
                        </span>
                        <span className="tnum font-mono text-3xl text-foreground md:text-4xl">
                          {price.display}
                        </span>
                        {c.priceNote && (
                          <span className="font-mono text-xs text-fg-muted">{c.priceNote[locale]}</span>
                        )}
                      </div>

                      <hr className="rule my-6" />

                      <span className="font-mono text-xs uppercase tracking-wide text-fg-muted">
                        {t.includesLabel}
                      </span>
                      <ul className="mt-3 flex flex-col gap-2.5">
                        {c.includes.map((point) => (
                          <li key={point.en} className="flex items-start gap-2.5 text-sm text-foreground/85">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
                            {point[locale]}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 pt-2">
                        <TrackedLink
                          href={whatsappHref(c.whatsappMessage[locale])}
                          label={`servicios_${c.id}_whatsapp`}
                          external
                          className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-transform hover:-translate-y-0.5"
                        >
                          {c.cta[locale]}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                        </TrackedLink>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ---- 02 · Client sites ---- */}
        <section className="section" aria-labelledby="proof-title">
          <div className="container-page">
            <div className="max-w-2xl">
              <Reveal>
                <span className="eyebrow">{t.proofEyebrow}</span>
              </Reveal>
              <Reveal delay={1}>
                <h2 id="proof-title" className="heading mt-6">
                  {t.proofTitle}
                </h2>
              </Reveal>
              <Reveal delay={2}>
                <p className="lede mt-5">{t.proofSubtitle}</p>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {clientSites.map((c, i) => {
                const delay = (i + 2) as 2 | 3
                const host = c.url.replace(/^https?:\/\//, "")
                return (
                  <Reveal key={c.url} delay={delay} as="article">
                    <TrackedLink
                      href={c.url}
                      label={`servicios_site_${host}`}
                      external
                      className="card-surface group block h-full p-6"
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-mono text-xs uppercase tracking-wide text-fg-muted">
                          {c.kind[locale]} · {c.year}
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                          aria-hidden
                        />
                      </span>
                      <span className="mt-4 block font-serif text-2xl text-foreground transition-colors group-hover:text-brand">
                        {c.name}
                      </span>
                      <span className="mt-1 block font-mono text-xs text-fg-muted">{host}</span>
                      <span className="mt-3 block text-sm leading-relaxed text-muted-foreground">
                        {c.summary[locale]}
                      </span>
                    </TrackedLink>
                  </Reveal>
                )
              })}
            </div>

            <Reveal delay={4}>
              <Link
                href={`/${locale}#projects`}
                className="group mt-8 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-foreground"
              >
                {t.proofProductsLink}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ---- 03 · Maintenance ---- */}
        <section className="section pt-0" aria-labelledby="maintenance-title">
          <div className="container-page">
            <Reveal>
              <div className="card-surface grid gap-8 p-6 md:grid-cols-[1.2fr_1fr] md:p-8">
                <div>
                  <span className="eyebrow">{t.maintenanceEyebrow}</span>
                  <h2 id="maintenance-title" className="heading mt-6">
                    {t.maintenanceTitle}
                  </h2>
                  <p className="lede mt-4 text-base">{t.maintenanceText}</p>
                  <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-xs uppercase tracking-wide text-fg-muted">
                      {t.fromLabel}
                    </span>
                    <span className="tnum font-mono text-3xl text-foreground">
                      {maintenance.price[locale].display}
                    </span>
                    <span className="font-mono text-xs text-fg-muted">{t.perMonth}</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-2.5 self-center">
                  {maintenance.includes.map((point) => (
                    <li key={point.en} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
                      {point[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <Process dict={dict} locale={locale} eyebrow={t.processEyebrow} />
        <Faq dict={dict} locale={locale} items={pricingFaq} copy={faqCopy} />
        <Contact dict={dict} locale={locale} />
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
