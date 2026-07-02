import type { MetadataRoute } from "next"
import { site, locales } from "@/content/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    "es-AR": `${site.url}/es`,
    en: `${site.url}/en`,
    "x-default": `${site.url}/es`,
  }

  return locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === "es" ? 1 : 0.9,
    alternates: { languages },
  }))
}
