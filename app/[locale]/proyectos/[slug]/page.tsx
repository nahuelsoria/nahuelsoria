import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/sections/footer"
import { TrackedLink } from "@/components/tracked-link"
import { Markdown } from "@/lib/markdown"
import { getDictionary, isLocale } from "@/lib/i18n"
import { caseHref, getCase, getCaseSlugs } from "@/lib/cases"
import { buildCaseStudyJsonLd, jsonLdHtml } from "@/lib/jsonld"
import { site } from "@/content/site"
import type { Locale } from "@/content/types"

export function generateStaticParams() {
  return getCaseSlugs().map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const loc: Locale = isLocale(locale) ? locale : "es"
  const study = getCase(slug, loc)
  if (!study) return {}

  const title = `${study.title} · ${site.name}`
  const url = `${site.url}${caseHref(loc, slug)}`
  // openGraph/twitter are shallow-merged: declaring them here drops the
  // file-based image from app/[locale]/opengraph-image, so re-attach it.
  const ogImage = `${site.url}/${loc}/opengraph-image`

  return {
    metadataBase: new URL(site.url),
    title,
    description: study.description,
    alternates: {
      canonical: url,
      languages: {
        "es-AR": `${site.url}${caseHref("es", slug)}`,
        en: `${site.url}${caseHref("en", slug)}`,
        "x-default": `${site.url}${caseHref("es", slug)}`,
      },
    },
    openGraph: {
      type: "article",
      locale: loc === "es" ? "es_AR" : "en_US",
      alternateLocale: loc === "es" ? "en_US" : "es_AR",
      url,
      siteName: site.name,
      title,
      description: study.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: study.description,
      creator: "@nahhwe",
      images: [ogImage],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const study = getCase(slug, locale)
  if (!study) notFound()

  const t = dict.caseStudy
  const ld = buildCaseStudyJsonLd(locale, study)
  const back =
    study.kind === "client"
      ? { href: `/${locale}/servicios`, label: t.backToClients }
      : { href: `/${locale}#projects`, label: t.backToProjects }
  const host = study.live?.replace(/^https?:\/\//, "")

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(ld) }} />
      <Header dict={dict} locale={locale} />
      <main>
        <article className="section pt-32 md:pt-40">
          <div className="container-page">
            <header className="max-w-[46rem]">
              <span className="eyebrow">
                {study.kind === "client" ? `${t.clientLabel} · ` : ""}
                {study.category[locale]}
              </span>
              <h1 className="heading mt-5">{study.title}</h1>
              <p className="lede mt-6">{study.description}</p>
            </header>

            <dl className="mt-10 grid max-w-[46rem] gap-6 border-t border-line pt-6 sm:grid-cols-[auto_1fr] sm:gap-x-12">
              {(study.role || study.year) && (
                <div className="flex flex-col gap-1.5">
                  <dt className="font-mono text-[0.7rem] uppercase tracking-wide text-fg-muted">
                    {study.role ? t.roleLabel : t.yearLabel}
                  </dt>
                  <dd className="tnum text-sm text-foreground">
                    {study.role ? study.role[locale] : study.year}
                  </dd>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <dt className="font-mono text-[0.7rem] uppercase tracking-wide text-fg-muted">
                  {t.stackLabel}
                </dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {study.stack.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            {study.live && host && (
              <TrackedLink
                href={study.live}
                label={`case_visit_${host}`}
                external
                className="group mt-8 inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm text-foreground transition-colors hover:border-brand"
              >
                {t.visit}
                <span className="font-mono text-xs text-fg-muted">{host}</span>
                <ArrowUpRight className="h-4 w-4 text-fg-muted transition-colors group-hover:text-brand" />
              </TrackedLink>
            )}

            <hr className="rule mt-12" />

            <div className="prose-blog mt-12">
              <Markdown source={study.body} />
            </div>

            <hr className="rule mt-16" />

            <Link
              href={back.href}
              className="group mt-8 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              {back.label}
            </Link>
          </div>
        </article>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
