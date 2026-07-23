import type { ReactNode } from "react"

/**
 * Minimal markdown-to-JSX renderer for blog posts (zero dependencies).
 * Supported subset: ## / ### headings, paragraphs, - and 1. lists,
 * > blockquotes, ``` code fences, and inline **bold**, `code`, [links](url).
 * Posts are authored in-repo and reviewed, so this is not a general parser.
 */

const INLINE_TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g

function renderInline(text: string): ReactNode[] {
  return text.split(INLINE_TOKEN).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i}>{part.slice(1, -1)}</code>
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const external = /^https?:\/\//.test(link[2])
      return (
        <a key={i} href={link[2]} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {link[1]}
        </a>
      )
    }
    return part
  })
}

type Block =
  | { type: "h2" | "h3" | "p" | "blockquote"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "code"; text: string }

function parseBlocks(md: string): Block[] {
  const lines = md.split("\n")
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === "") {
      i++
      continue
    }

    if (line.startsWith("```")) {
      const code: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++])
      i++ // closing fence
      blocks.push({ type: "code", text: code.join("\n") })
      continue
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4) })
      i++
      continue
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3) })
      i++
      continue
    }

    if (line.startsWith("> ")) {
      const quote: string[] = []
      while (i < lines.length && lines[i].startsWith("> ")) quote.push(lines[i++].slice(2))
      blocks.push({ type: "blockquote", text: quote.join(" ") })
      continue
    }

    if (/^- /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^- /.test(lines[i])) items.push(lines[i++].slice(2))
      blocks.push({ type: "ul", items })
      continue
    }

    if (/^\d+\. /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i++].replace(/^\d+\. /, ""))
      }
      blocks.push({ type: "ol", items })
      continue
    }

    const para: string[] = []
    while (i < lines.length && lines[i].trim() !== "" && !/^(#{2,3} |```|> |- |\d+\. )/.test(lines[i])) {
      para.push(lines[i++])
    }
    blocks.push({ type: "p", text: para.join(" ") })
  }

  return blocks
}

export function Markdown({ source }: { source: string }) {
  return (
    <>
      {parseBlocks(source).map((block, i) => {
        switch (block.type) {
          case "h2":
            return <h2 key={i}>{renderInline(block.text)}</h2>
          case "h3":
            return <h3 key={i}>{renderInline(block.text)}</h3>
          case "blockquote":
            return <blockquote key={i}>{renderInline(block.text)}</blockquote>
          case "code":
            return (
              <pre key={i}>
                <code>{block.text}</code>
              </pre>
            )
          case "ul":
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            )
          case "ol":
            return (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ol>
            )
          case "p":
            return <p key={i}>{renderInline(block.text)}</p>
        }
      })}
    </>
  )
}
