import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/sections/footer"
import { getDictionary, isLocale } from "@/lib/i18n"
import { getPosts, formatPostDate } from "@/lib/blog"
import { site } from "@/content/site"
import type { Locale } from "@/content/types"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const loc: Locale = isLocale(locale) ? locale : "es"
  const dict = getDictionary(loc)

  const title = `${dict.blog.title} — ${site.name}`
  const description = dict.blog.subtitle

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: {
      canonical: `${site.url}/${loc}/blog`,
      languages: {
        "es-AR": `${site.url}/es/blog`,
        en: `${site.url}/en/blog`,
        "x-default": `${site.url}/es/blog`,
      },
    },
    openGraph: {
      type: "website",
      locale: loc === "es" ? "es_AR" : "en_US",
      alternateLocale: loc === "es" ? "en_US" : "es_AR",
      url: `${site.url}/${loc}/blog`,
      siteName: site.name,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description, creator: "@nahhwe" },
  }
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const posts = getPosts(locale)

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main>
        <section className="section pt-32 md:pt-40">
          <div className="container-page">
            <span className="eyebrow">{dict.blog.eyebrow}</span>
            <h1 className="heading mt-5">{dict.blog.title}</h1>
            <p className="lede mt-6">{dict.blog.subtitle}</p>

            <div className="mt-14 flex flex-col gap-5">
              {posts.map((post) => (
                <article key={post.slug}>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="card-surface group block p-6 md:p-8"
                  >
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                      <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
                      <span aria-hidden>·</span>
                      <span className="tnum">
                        {post.readingMinutes} {dict.blog.readingTime}
                      </span>
                    </div>
                    <h2 className="mt-4 text-2xl leading-snug md:text-3xl">
                      <span className="transition-colors group-hover:text-brand">{post.title}</span>
                      <ArrowUpRight className="ml-2 inline h-5 w-5 align-baseline text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                    </h2>
                    <p className="mt-3 max-w-[65ch] leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <li key={tag}>
                          <span className="chip">{tag}</span>
                        </li>
                      ))}
                    </ul>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  )
}
