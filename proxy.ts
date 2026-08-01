import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales, defaultLocale } from "@/content/site"

function resolveLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language")
  if (header) {
    // Honour q-values: "en;q=0.2,es;q=0.9" means Spanish, not English.
    // Equal q keeps the listed order (Array.prototype.sort is stable).
    const preferred = header
      .split(",")
      .map((part) => {
        const [tag, ...params] = part.split(";")
        const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="))
        const quality = q ? Number.parseFloat(q.slice(2)) : 1
        return {
          lang: tag.trim().slice(0, 2).toLowerCase(),
          q: Number.isFinite(quality) ? quality : 0,
        }
      })
      .filter(({ q }) => q > 0)
      .sort((a, b) => b.q - a.q)
    for (const { lang } of preferred) {
      if ((locales as string[]).includes(lang)) return lang
    }
  }
  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocale) return NextResponse.next()

  const locale = resolveLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Skip Next internals, API and static assets (anything with a file extension).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
}
