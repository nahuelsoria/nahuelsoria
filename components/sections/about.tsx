import { Check, MapPin } from "lucide-react"
import { Reveal } from "@/components/reveal"
import type { Dictionary, Locale } from "@/content/types"

const CORE_STACK = [
  "TypeScript",
  "Next.js",
  "Node.js",
  "React",
  "PostgreSQL",
  "Firebase",
  "Vercel",
  "Tailwind",
]

export function About({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const a = dict.about

  return (
    <section
      id="about"
      className="section scroll-mt-24"
      aria-labelledby="about-title"
    >
      <div className="container-page">
        <div className="grid items-start gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          {/* ---- Main column: statement + narrative ---- */}
          <div>
            <Reveal>
              <span className="eyebrow">{a.eyebrow}</span>
            </Reveal>

            <Reveal delay={1}>
              <h2 id="about-title" className="heading mt-6">
                {a.title}
              </h2>
            </Reveal>

            <Reveal delay={2}>
              <p className="lede mt-7 text-xl text-foreground md:text-2xl">
                {a.statement}
              </p>
            </Reveal>

            <Reveal delay={3}>
              <hr className="rule mt-8" />
            </Reveal>

            <Reveal delay={3}>
              <div className="mt-8 space-y-5">
                {a.paragraphs.map((p) => (
                  <p
                    key={p}
                    className="max-w-[60ch] leading-relaxed text-muted-foreground"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ---- Side column: stack, principles, location ---- */}
          <Reveal delay={2} className="lg:pt-2">
            <div className="card-surface p-6">
              {/* Stack */}
              <h3 className="font-mono text-xs uppercase tracking-[0.06em] text-fg-muted">
                {a.stackTitle}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {CORE_STACK.map((tech) => (
                  <li key={tech}>
                    <span className="chip">{tech}</span>
                  </li>
                ))}
              </ul>

              <hr className="rule my-6" />

              {/* Principles */}
              <h3 className="font-mono text-xs uppercase tracking-[0.06em] text-fg-muted">
                {a.principlesTitle}
              </h3>
              <ul className="mt-4 space-y-3">
                {a.principles.map((principle) => (
                  <li
                    key={principle}
                    className="flex items-start gap-2.5 text-sm text-foreground/85"
                  >
                    <Check
                      aria-hidden
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                    />
                    {principle}
                  </li>
                ))}
              </ul>

              <hr className="rule my-6" />

              {/* Location */}
              <h3 className="font-mono text-xs uppercase tracking-[0.06em] text-fg-muted">
                {a.locationLabel}
              </h3>
              <p className="mt-3 flex items-start gap-2.5 text-sm text-foreground">
                <MapPin
                  aria-hidden
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                />
                {a.location}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
