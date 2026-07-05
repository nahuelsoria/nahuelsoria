import Link from "next/link"
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle } from "lucide-react"
import { site, whatsappHref } from "@/content/site"
import type { Dictionary, Locale } from "@/content/types"

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const year = 2026

  const wa = whatsappHref(
    locale === "es"
      ? "Hola Nahuel! Me gustaría contactarte."
      : "Hi Nahuel! I'd like to get in touch.",
  )

  const navLinks = [
    { href: "#projects", label: dict.nav.projects },
    { href: "#services", label: dict.nav.services },
    { href: "#about", label: dict.nav.about },
    { href: "#contact", label: dict.nav.contact },
  ]

  const connectLinks = [
    { href: `mailto:${site.email}`, label: "Email", Icon: Mail, external: false },
    { href: wa, label: "WhatsApp", Icon: MessageCircle, external: true },
    { href: site.social.github, label: "GitHub", Icon: Github, external: true },
    { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin, external: true },
    { href: site.social.x, label: "X", Icon: ArrowUpRight, external: true },
  ]

  return (
    <footer className="border-t border-line bg-card">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">
          {/* ---- Brand ---- */}
          <div>
            <Link
              href={`/${locale}`}
              className="group inline-flex items-center gap-3 text-foreground"
            >
              <span className="grid h-9 w-9 place-items-center rounded-md border border-line font-mono text-sm text-brand transition-colors group-hover:border-brand">
                NS
              </span>
              <span className="font-medium">{site.name}</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {dict.footer.tagline}
            </p>
          </div>

          {/* ---- Nav ---- */}
          <nav aria-label={locale === "es" ? "Navegación del pie de página" : "Footer navigation"}>
            <span className="eyebrow">{dict.nav.projects}</span>
            <ul className="mt-5 flex flex-col gap-2.5">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-fg-muted transition-colors hover:text-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- Connect ---- */}
          <div>
            <span className="eyebrow">{dict.nav.cta}</span>
            <ul className="mt-5 flex flex-col gap-2.5">
              {connectLinks.map(({ href, label, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="group inline-flex items-center gap-2.5 text-sm text-fg-muted transition-colors hover:text-foreground"
                  >
                    <Icon className="h-4 w-4 text-fg-muted transition-colors group-hover:text-brand" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="rule my-10" />

        <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.fullName}. {dict.footer.rights}
          </p>
          <p className="font-mono text-fg-muted">{dict.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  )
}
