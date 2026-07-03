import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { site, whatsappHref, metrics } from "@/content/site"
import type { Dictionary, Locale } from "@/content/types"

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const h = dict.hero
  const confirmed = metrics.filter((m) => m.status === "confirmed").slice(0, 3)
  const wa = whatsappHref(
    locale === "es"
      ? "Hola Nahuel! Me interesa hablar sobre un proyecto."
      : "Hi Nahuel! I'd like to talk about a project.",
  )
  // Prefer Calendly for the "book a meeting" CTA when configured; fall back to WhatsApp.
  const scheduleHref = process.env.NEXT_PUBLIC_CALENDLY_URL || wa

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* faint vertical grid motif */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-lines opacity-[0.5] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div className="container-page relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          {/* ---- Left: statement ---- */}
          <div>
            <Reveal>
              <span className="eyebrow">{h.eyebrow}</span>
            </Reveal>

            <Reveal delay={1}>
              <h1 className="display mt-6">
                {h.headline}{" "}
                <span className="accent-underline italic">{h.headlineAccent}</span>.
              </h1>
            </Reveal>

            <Reveal delay={2}>
              <p className="lede mt-7">{h.lead}</p>
            </Reveal>

            <Reveal delay={3}>
              <ul className="mt-8 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {h.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={4}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#projects"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-transform hover:-translate-y-0.5"
                >
                  {h.ctaPrimary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href={scheduleHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-md border border-line px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-brand"
                >
                  {h.ctaSecondary}
                  <ArrowUpRight className="h-4 w-4 text-fg-muted transition-colors group-hover:text-brand" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={5}>
              <div className="mt-8 flex items-center gap-5">
                {[
                  { href: site.social.github, label: "GitHub", Icon: Github },
                  { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
                  { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-fg-muted transition-colors hover:text-foreground"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ---- Right: data panel ---- */}
          <Reveal delay={2} className="lg:pt-2">
            <div className="card-surface p-1">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <span className="font-mono text-xs text-fg-muted">~/nahuel-soria</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-brand">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
                  {h.availability}
                </span>
              </div>

              <p className="px-4 pt-4 font-mono text-[0.7rem] leading-relaxed text-fg-muted">
                <span className="text-brand">const</span> soria = {"{"}
                <br />
                &nbsp;&nbsp;role:{" "}
                <span className="text-foreground">&quot;{dict.hero.role}&quot;</span>,
                <br />
                &nbsp;&nbsp;based: <span className="text-foreground">&quot;Buenos Aires, AR&quot;</span>,
                <br />
                &nbsp;&nbsp;remote: <span className="text-brand">true</span>
                <br />
                {"}"}
              </p>

              <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-line bg-line m-4 mt-4">
                {confirmed.map((m) => (
                  <div key={m.label[locale]} className="bg-card px-3 py-4 text-center">
                    <dt className="sr-only">{m.label[locale]}</dt>
                    <dd className="tnum font-mono text-2xl text-foreground">{m.value}</dd>
                    <p className="mt-1.5 text-[0.65rem] leading-tight text-fg-muted">
                      {m.label[locale]}
                    </p>
                  </div>
                ))}
              </dl>

              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group mx-4 mb-4 flex items-center justify-between rounded-md border border-line px-4 py-3 text-sm transition-colors hover:border-brand"
              >
                <span className="inline-flex items-center gap-2 text-foreground">
                  <Github className="h-4 w-4" /> @{site.githubUser}
                </span>
                <ArrowUpRight className="h-4 w-4 text-fg-muted transition-colors group-hover:text-brand" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
