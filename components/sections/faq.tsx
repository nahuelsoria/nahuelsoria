import { Plus } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { faqItems } from "@/content/offerings"
import type { Dictionary, Locale } from "@/content/types"

export function Faq({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const f = dict.faq

  return (
    <section id="faq" className="section scroll-mt-24" aria-labelledby="faq-title">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* ---- Left: sticky header ---- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="eyebrow">{f.eyebrow}</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 id="faq-title" className="heading mt-6">
                {f.title}
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="lede mt-5">{f.subtitle}</p>
            </Reveal>
          </div>

          {/* ---- Right: accordion (native details for zero-JS SEO/GEO) ---- */}
          <Reveal delay={2}>
            <div className="border-t border-line">
              {faqItems.map((item) => (
                <details
                  key={item.q[locale]}
                  className="group border-b border-line"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium text-foreground marker:content-none transition-colors group-open:text-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-details-marker]:hidden">
                    {item.q[locale]}
                    <Plus
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-fg-muted transition-transform duration-200 group-open:rotate-45 group-open:text-brand"
                    />
                  </summary>
                  <p className="pb-5 pr-8 text-sm leading-relaxed text-muted-foreground">
                    {item.a[locale]}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
