import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { site, metrics } from "@/content/site"
import { projects } from "@/content/projects"
import type { Dictionary, Locale } from "@/content/types"

/** Preferred display order for the "where my work runs" stack line. */
const STACK_ORDER = [
  "Next.js",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Firebase",
  "Vercel",
  "Python",
  "React Native",
]

/** Union of every project stack, deduped and ordered, capped at 8. */
const trustedStack = Array.from(new Set(projects.flatMap((p) => p.stack)))
  .sort((a, b) => {
    const ia = STACK_ORDER.indexOf(a)
    const ib = STACK_ORDER.indexOf(b)
    return (ia === -1 ? Infinity : ia) - (ib === -1 ? Infinity : ib)
  })
  .slice(0, 8)

export function Proof({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const p = dict.proof
  const confirmed = metrics.filter((m) => m.status === "confirmed")

  return (
    <section className="section border-y border-line">
      <div className="container-page">
        <Reveal>
          <span className="eyebrow">{p.eyebrow}</span>
          <h2 className="heading mt-5">{p.title}</h2>
        </Reveal>

        {/* ---- Confirmed metrics ---- */}
        <Reveal delay={1}>
          <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            {confirmed.map((m) => (
              <div key={m.label[locale]} className="bg-card px-6 py-8">
                <dd className="tnum font-mono text-4xl text-foreground md:text-5xl">
                  {m.value}
                </dd>
                <dt className="mt-3 text-sm leading-snug text-muted-foreground">
                  {m.label[locale]}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <hr className="rule mt-12" />

        {/* ---- Trusted stack ---- */}
        <Reveal delay={2}>
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <ul className="flex flex-wrap items-center gap-2">
              {trustedStack.map((tech) => (
                <li key={tech}>
                  <span className="chip">{tech}</span>
                </li>
              ))}
            </ul>

            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-fg-muted transition-colors hover:text-brand"
            >
              {p.reposLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
