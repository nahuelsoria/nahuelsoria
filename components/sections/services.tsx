import { ArrowRight, Check, Compass, Globe, Landmark, LayoutDashboard, Workflow } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { services } from "@/content/offerings"
import type { Dictionary, Locale } from "@/content/types"

const icons: Record<string, LucideIcon> = {
  web: Globe,
  saas: LayoutDashboard,
  fintech: Landmark,
  erp: Workflow,
  cto: Compass,
}

export function Services({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const s = dict.services

  return (
    <section
      id="services"
      className="section scroll-mt-24"
      aria-labelledby="services-title"
    >
      <div className="container-page">
        {/* ---- Header ---- */}
        <Reveal>
          <span className="eyebrow">{s.eyebrow}</span>
        </Reveal>
        <Reveal delay={1}>
          <h2 id="services-title" className="heading mt-6">
            {s.title}
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="lede mt-5">{s.subtitle}</p>
        </Reveal>

        {/* ---- Cards ---- */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.id] ?? Compass
            const featured = Boolean(service.featured)
            const delay = (Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5)

            return (
              <Reveal key={service.id} delay={delay} as="article" className="h-full">
                <div
                  className={`card-surface flex h-full flex-col p-6 ${
                    featured ? "border-brand" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    {featured && (
                      <span className="font-mono text-[0.7rem] uppercase tracking-wide text-brand">
                        {s.featuredBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 font-serif text-xl text-foreground">
                    {service.title[locale]}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {service.description[locale]}
                  </p>

                  <hr className="rule my-5" />

                  <ul className="flex flex-col gap-2.5">
                    {service.points.map((point) => (
                      <li
                        key={point[locale]}
                        className="flex items-start gap-2.5 text-sm text-foreground/85"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                        {point[locale]}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* ---- Footer CTA ---- */}
        <Reveal delay={2}>
          <div className="mt-14 flex flex-col items-center gap-5 text-center">
            <p className="text-sm text-fg-muted">{s.ctaText}</p>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-transform hover:-translate-y-0.5"
            >
              {s.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
