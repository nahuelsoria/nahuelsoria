import { site } from "@/content/site"
import { projects } from "@/content/projects"
import { services } from "@/content/offerings"
import { getPosts } from "@/lib/blog"

// Serves /llms.txt — a plain-markdown brief designed for ingestion by LLMs (GEO).
export const dynamic = "force-static"

export function GET() {
  const lines: string[] = []
  lines.push(`# ${site.name}`)
  lines.push("")
  lines.push(
    "> Nahuel Soria is a Buenos Aires–based software developer and technical founder who builds SaaS products, fintech payment systems (KYC/KYB, settlement, multi-currency) and custom automations for founders and companies — end to end, from architecture to production.",
  )
  lines.push("")
  lines.push(`- Website: ${site.url}`)
  lines.push(`- Email: ${site.email}`)
  lines.push(`- WhatsApp: ${site.whatsappDisplay}`)
  lines.push(`- GitHub: ${site.social.github}`)
  lines.push(`- LinkedIn: ${site.social.linkedin}`)
  lines.push(`- Location: ${site.location.city}, Argentina (remote worldwide)`)
  lines.push("")
  lines.push("## Services")
  for (const s of services) lines.push(`- ${s.title.en}: ${s.description.en}`)
  lines.push("")
  lines.push("## Selected projects")
  for (const p of projects) {
    const url = p.links?.repo ? ` (${p.links.repo})` : ""
    lines.push(`- ${p.name} — ${p.category.en}. ${p.summary.en} Stack: ${p.stack.join(", ")}.${url}`)
  }
  lines.push("")
  const posts = getPosts("en")
  if (posts.length > 0) {
    lines.push("## Writing")
    for (const p of posts) {
      lines.push(`- ${p.title} (${site.url}/en/blog/${p.slug}): ${p.description}`)
    }
    lines.push("")
  }
  lines.push("## Contact")
  lines.push(
    `To hire or consult Nahuel Soria, email ${site.email} or message ${site.whatsappDisplay} on WhatsApp. He works remotely with clients worldwide and invoices in USD or ARS.`,
  )
  lines.push("")

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  })
}
