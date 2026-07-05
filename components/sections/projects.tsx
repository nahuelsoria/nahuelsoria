import { ArrowUpRight, Github } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { projects } from "@/content/projects"
import type { Dictionary, Locale, Project, ProjectStatus } from "@/content/types"

const statusDot: Record<ProjectStatus, string> = {
  production: "bg-brand",
  active: "bg-brand/60",
  mvp: "bg-fg-muted",
}

function ProjectCard({
  project,
  dict,
  locale,
  featured,
}: {
  project: Project
  dict: Dictionary
  locale: Locale
  featured?: boolean
}) {
  const p = dict.projects
  const repo = project.links?.repo
  const live = project.links?.live

  return (
    <div
      className={`card-surface flex h-full flex-col p-6 md:p-7 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* top row: index + status */}
      <div className="flex items-center justify-between">
        <span className="tnum font-mono text-xs text-fg-muted">{project.index}</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-wide text-fg-muted">
          <span className={`h-1.5 w-1.5 rounded-full ${statusDot[project.status]}`} />
          {p.statusLabel[project.status]}
        </span>
      </div>

      {/* title + category */}
      <h3 className="mt-5 font-serif text-2xl leading-tight text-foreground">
        {project.name}
      </h3>
      <p className="mt-1.5 font-mono text-xs text-muted-foreground">
        {project.category[locale]}
      </p>

      {/* summary */}
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {project.summary[locale]}
      </p>

      {/* role */}
      <div className="mt-5 flex flex-col gap-1">
        <span className="font-mono text-[0.7rem] uppercase tracking-wide text-fg-muted">
          {p.roleLabel}
        </span>
        <span className="text-sm text-foreground">{project.role[locale]}</span>
      </div>

      {/* highlights */}
      <ul className="mt-5 grid gap-2.5">
        {project.highlights.slice(0, 3).map((hl, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-sm leading-snug text-foreground/80"
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
            {hl[locale]}
          </li>
        ))}
      </ul>

      {/* stack */}
      <div className="mt-6 flex flex-col gap-2">
        <span className="font-mono text-[0.7rem] uppercase tracking-wide text-fg-muted">
          {p.stackLabel}
        </span>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {/* links */}
      {(repo || live) && (
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm text-foreground transition-colors hover:border-brand"
            >
              <Github className="h-4 w-4 text-fg-muted transition-colors group-hover:text-brand" />
              {p.viewRepo}
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm text-foreground transition-colors hover:border-brand"
            >
              {p.viewLive}
              <ArrowUpRight className="h-4 w-4 text-fg-muted transition-colors group-hover:text-brand" />
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export function Projects({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const p = dict.projects

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section scroll-mt-24"
    >
      <div className="container-page">
        {/* header */}
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">{p.eyebrow}</span>
          </Reveal>
          <Reveal delay={1}>
            <h2 id="projects-heading" className="heading mt-5">
              {p.title}
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="lede mt-5">{p.subtitle}</p>
          </Reveal>
        </div>

        {/* grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-7">
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              as="article"
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <ProjectCard
                project={project}
                dict={dict}
                locale={locale}
                featured={i === 0}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
