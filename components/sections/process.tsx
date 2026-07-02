import { Reveal } from "@/components/reveal"
import { processSteps } from "@/content/offerings"
import type { Dictionary, Locale } from "@/content/types"

export function Process({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const p = dict.process

  return (
    <section className="section" aria-labelledby="process-title">
      <div className="container-page">
        {/* ---- Header ---- */}
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">{p.eyebrow}</span>
          </Reveal>
          <Reveal delay={1}>
            <h2 id="process-title" className="heading mt-6">
              {p.title}
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="lede mt-5">{p.subtitle}</p>
          </Reveal>
        </div>

        {/* ---- Timeline ---- */}
        <div className="relative mt-16">
          {/* connecting line: horizontal on desktop, vertical on mobile */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[0.5rem] top-3 bottom-3 w-px bg-line md:left-0 md:right-0 md:top-3 md:bottom-auto md:h-px md:w-auto"
          />

          <ol className="grid gap-y-12 md:grid-cols-4 md:gap-x-8 md:gap-y-0">
            {processSteps.map((step, i) => {
              const n = String(i + 1).padStart(2, "0")
              const delay = (Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5)

              return (
                <Reveal key={step.title[locale]} as="li" delay={delay}>
                  <div className="relative pl-9 md:pl-0 md:pt-9">
                    {/* brand tick mark on the rule */}
                    <span
                      aria-hidden
                      className="absolute left-[0.30rem] top-1.5 h-2.5 w-2.5 rounded-full border border-brand bg-background md:left-0 md:top-2"
                    >
                      <span className="absolute inset-[3px] rounded-full bg-brand" />
                    </span>

                    <div className="flex items-baseline gap-3">
                      <span className="tnum font-mono text-3xl leading-none text-foreground">
                        {n}
                      </span>
                      <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.7rem] tracking-wide text-brand">
                        {step.duration[locale]}
                      </span>
                    </div>

                    <h3 className="mt-4 font-serif text-xl text-foreground">
                      {step.title[locale]}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description[locale]}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
