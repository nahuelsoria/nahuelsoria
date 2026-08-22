import fs from "node:fs"
import path from "node:path"
import type { Locale } from "@/content/types"
import { locales } from "@/content/site"

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string // ISO yyyy-mm-dd
  tags: string[]
  readingMinutes: number
}

export type Post = PostMeta & { body: string }

const BLOG_DIR = path.join(process.cwd(), "content", "blog")
const WORDS_PER_MINUTE = 200

/** Parses the `---` frontmatter block. Values are plain strings; tags are comma-separated. */
function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!match) return { meta: {}, body: raw }

  const meta: Record<string, string> = {}
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":")
    if (idx === -1) continue
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
  }
  return { meta, body: raw.slice(match[0].length) }
}

function readPost(slug: string, locale: Locale): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.${locale}.md`)
  if (!fs.existsSync(file)) return null

  const { meta, body } = parseFrontmatter(fs.readFileSync(file, "utf8"))
  const words = body.split(/\s+/).filter(Boolean).length

  return {
    slug,
    title: meta.title ?? slug,
    description: meta.description ?? "",
    date: meta.date ?? "",
    tags: meta.tags ? meta.tags.split(",").map((t) => t.trim()) : [],
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    body,
  }
}

/** Slugs that exist in every locale, so hreflang alternates are always reciprocal. */
export function getSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const bySlug = new Map<string, Set<string>>()

  for (const file of fs.readdirSync(BLOG_DIR)) {
    const match = file.match(/^(.+)\.([a-z]{2})\.md$/)
    if (!match) continue
    const [, slug, loc] = match
    if (!bySlug.has(slug)) bySlug.set(slug, new Set())
    bySlug.get(slug)!.add(loc)
  }

  return [...bySlug.entries()]
    .filter(([, locs]) => locales.every((l) => locs.has(l)))
    .map(([slug]) => slug)
}

export function getPosts(locale: Locale): Post[] {
  return getSlugs()
    .map((slug) => readPost(slug, locale))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string, locale: Locale): Post | null {
  // Only slugs available in every locale are routable (see getSlugs).
  if (!getSlugs().includes(slug)) return null
  return readPost(slug, locale)
}

export function formatPostDate(date: string, locale: Locale): string {
  // readPost defaults a missing `date:` to "", and Intl throws RangeError on an
  // invalid Date. Without this guard one post with broken frontmatter takes the
  // whole blog down at build time, not just its own page.
  const parsed = new Date(`${date}T00:00:00Z`)
  if (Number.isNaN(parsed.getTime())) return date

  return new Intl.DateTimeFormat(locale === "es" ? "es-AR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed)
}
