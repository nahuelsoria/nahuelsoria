import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/sections/footer"
import { Markdown } from "@/lib/markdown"
import { getDictionary, isLocale } from "@/lib/i18n"
import { getPost, getSlugs, formatPostDate } from "@/lib/blog"
import { buildBlogPostingJsonLd } from "@/lib/jsonld"
import { site } from "@/content/site"
import type { Locale } from "@/content/types"

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const loc: Locale = isLocale(locale) ? locale : "es"
  const post = getPost(slug, loc)
  if (!post) return {}

  const title = `${post.title} · ${site.name}`
  const url = `${site.url}/${loc}/blog/${slug}`
  // openGraph/twitter are shallow-merged: declaring them here drops the
  // file-based image from app/[locale]/opengraph-image, so re-attach it.
  const ogImage = `${site.url}/${loc}/opengraph-image`

  return {
    metadataBase: new URL(site.url),
    title,
    description: post.description,
    authors: [{ name: site.name, url: site.url }],
    alternates: {
      canonical: url,
      languages: {
        "es-AR": `${site.url}/es/blog/${slug}`,
        en: `${site.url}/en/blog/${slug}`,
        "x-default": `${site.url}/es/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      locale: loc === "es" ? "es_AR" : "en_US",
      alternateLocale: loc === "es" ? "en_US" : "es_AR",
      url,
      siteName: site.name,
      title,
      description: post.description,
      publishedTime: post.date,
      authors: [site.name],
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      creator: "@nahhwe",
      images: [ogImage],
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const post = getPost(slug, locale)
  if (!post) notFound()

  const postLd = buildBlogPostingJsonLd(locale, post)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postLd) }}
      />
      <Header dict={dict} locale={locale} />
      <main>
        <article className="section pt-32 md:pt-40">
          <div className="container-page">
            <header className="max-w-[46rem]">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
                <span aria-hidden>·</span>
                <span className="tnum">
                  {post.readingMinutes} {dict.blog.readingTime}
                </span>
              </div>
              <h1 className="heading mt-5">{post.title}</h1>
              <p className="lede mt-6">{post.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <span className="chip">{tag}</span>
                  </li>
                ))}
              </ul>
            </header>

            <hr className="rule mt-12" />

            <div className="prose-blog mt-12">
              <Markdown source={post.body} />
            </div>

            <hr className="rule mt-16" />

            <Link
              href={`/${locale}/blog`}
              className="group mt-8 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              {dict.blog.back}
            </Link>
          </div>
        </article>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
