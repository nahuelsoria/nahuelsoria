import type { MetadataRoute } from "next"
import { site, locales } from "@/content/site"
import { getPosts, getSlugs } from "@/lib/blog"

export default function sitemap(): MetadataRoute.Sitemap {
  const alternatesFor = (path: string) => ({
    languages: {
      "es-AR": `${site.url}/es${path}`,
      en: `${site.url}/en${path}`,
      "x-default": `${site.url}/es${path}`,
    },
  })

  const home: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === "es" ? 1 : 0.9,
    alternates: alternatesFor(""),
  }))

  const blogIndex: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${site.url}/${locale}/blog`,
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: alternatesFor("/blog"),
  }))

  const links: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${site.url}/${locale}/links`,
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: alternatesFor("/links"),
  }))

  const posts: MetadataRoute.Sitemap = getSlugs().flatMap((slug) =>
    locales.map((locale) => {
      const post = getPosts(locale).find((p) => p.slug === slug)
      // A broken `date:` in frontmatter parses to an Invalid Date, and Next calls
      // .toISOString() on it while serializing the sitemap, which throws and takes
      // the whole build down. Same guard as formatPostDate: drop the field instead.
      const parsed = post?.date ? new Date(`${post.date}T00:00:00Z`) : undefined
      return {
        url: `${site.url}/${locale}/blog/${slug}`,
        lastModified: parsed && !Number.isNaN(parsed.getTime()) ? parsed : undefined,
        changeFrequency: "yearly" as const,
        priority: 0.7,
        alternates: alternatesFor(`/blog/${slug}`),
      }
    }),
  )

  return [...home, ...blogIndex, ...links, ...posts]
}
