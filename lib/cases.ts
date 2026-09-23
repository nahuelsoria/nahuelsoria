import fs from "node:fs"
import path from "node:path"
import type { Locale, Localized } from "@/content/types"
import { locales } from "@/content/site"
import { projects } from "@/content/projects"
import { clientSites } from "@/content/offerings"
import { parseFrontmatter } from "@/lib/blog"

/**
 * Case studies: one page per project at /{locale}/proyectos/{slug}.
 * The structured data (name, stack, live URL) stays in projects.ts and
 * offerings.ts; the markdown file only carries the narrative. A slug routes
 * when it has a file in every locale and an entry in one of those lists.
 */

export type CaseSubject = {
  slug: string
  name: string
  kind: "project" | "client"
  category: Localized
  role?: Localized
  year?: number
  stack: string[]
  live?: string
}

export type CaseStudy = CaseSubject & {
  title: string
  description: string
  body: string
}

const CASES_DIR = path.join(process.cwd(), "content", "proyectos")

function subjects(): CaseSubject[] {
  return [
    ...projects.map((p) => ({
      slug: p.slug,
      name: p.name,
      kind: "project" as const,
      category: p.category,
      role: p.role,
      stack: p.stack,
      live: p.links?.live,
    })),
    ...clientSites.map((c) => ({
      slug: c.slug,
      name: c.name,
      kind: "client" as const,
      category: c.kind,
      year: c.year,
      stack: c.stack,
      live: c.url,
    })),
  ]
}

function hasFile(slug: string, locale: Locale): boolean {
  return fs.existsSync(path.join(CASES_DIR, `${slug}.${locale}.md`))
}

export function getCaseSlugs(): string[] {
  return subjects()
    .map((s) => s.slug)
    .filter((slug) => locales.every((l) => hasFile(slug, l)))
}

export function hasCase(slug: string): boolean {
  return getCaseSlugs().includes(slug)
}

export function getCase(slug: string, locale: Locale): CaseStudy | null {
  const subject = subjects().find((s) => s.slug === slug)
  if (!subject || !hasCase(slug)) return null

  const raw = fs.readFileSync(path.join(CASES_DIR, `${slug}.${locale}.md`), "utf8")
  const { meta, body } = parseFrontmatter(raw)
  return {
    ...subject,
    title: meta.title ?? subject.name,
    description: meta.description ?? "",
    body,
  }
}

export function caseHref(locale: Locale, slug: string): string {
  return `/${locale}/proyectos/${slug}`
}
