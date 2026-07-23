"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, X, Moon, Sun, Languages } from "lucide-react"
import { site } from "@/content/site"
import type { Dictionary, Locale } from "@/content/types"

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toggleTheme = () => {
    const el = document.documentElement
    const next = !el.classList.contains("dark")
    el.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
    setDark(next)
  }

  const otherLocale: Locale = locale === "es" ? "en" : "es"
  const otherHref = (pathname || `/${locale}`).replace(`/${locale}`, `/${otherLocale}`)

  // Locale-absolute hrefs so section links also work from /blog pages.
  const nav = [
    { label: dict.nav.projects, href: `/${locale}#projects` },
    { label: dict.nav.services, href: `/${locale}#services` },
    { label: dict.nav.about, href: `/${locale}#about` },
    { label: dict.nav.blog, href: `/${locale}/blog` },
    { label: dict.nav.contact, href: `/${locale}#contact` },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled ? "border-line bg-background/80 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="group flex items-center gap-2.5" aria-label="Nahuel Soria — home">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-line font-mono text-sm text-foreground transition-colors group-hover:border-brand">
            NS
          </span>
          <span className="hidden font-mono text-sm tracking-tight text-foreground sm:inline">
            nahuel<span className="text-brand">.</span>soria
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href={otherHref}
            className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-brand hover:text-foreground"
            aria-label={dict.language.toggle}
          >
            <Languages className="h-3.5 w-3.5" />
            {otherLocale.toUpperCase()}
          </Link>

          <button
            onClick={toggleTheme}
            aria-label={dict.theme.toggle}
            className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>

          <a
            href={site.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            {dict.nav.cta}
          </a>

          <button
            className="grid h-9 w-9 place-items-center rounded-md text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-background/95 backdrop-blur-md md:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-brand px-4 py-2.5 text-center text-sm font-medium text-brand-foreground"
            >
              {dict.nav.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
