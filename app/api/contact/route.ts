import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

type Lead = { name: string; email: string; message: string }

const CONTACT_TO = "jorgenahuelsoria@gmail.com"

function isValidLead(body: unknown): body is Lead {
  if (!body || typeof body !== "object") return false
  const b = body as Record<string, unknown>
  const str = (v: unknown, max: number) =>
    typeof v === "string" && v.trim().length > 0 && v.length <= max
  return (
    str(b.name, 120) &&
    str(b.email, 200) &&
    /.+@.+\..+/.test(String(b.email)) &&
    str(b.message, 5000)
  )
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 })
  }

  if (!isValidLead(body)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 })
  }

  const lead = body as Lead

  try {
    // Option 1 — SendGrid (set SENDGRID_API_KEY). Plain REST v3, no SDK dependency.
    // CONTACT_FROM must be a verified sender/domain in SendGrid; defaults to CONTACT_TO.
    if (process.env.SENDGRID_API_KEY) {
      const from = process.env.CONTACT_FROM || CONTACT_TO
      const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: CONTACT_TO }] }],
          from: { email: from, name: "Portfolio" },
          reply_to: { email: lead.email, name: lead.name },
          subject: `Nuevo contacto desde el sitio: ${lead.name}`,
          content: [
            {
              type: "text/plain",
              value: `Nombre: ${lead.name}\nEmail: ${lead.email}\n\nMensaje:\n${lead.message}`,
            },
          ],
        }),
      })
      // SendGrid returns 202 Accepted on success.
      if (!res.ok) throw new Error(`sendgrid_${res.status}`)
      return NextResponse.json({ ok: true })
    }

    // Option 2 — generic webhook (Formspree / Zapier / n8n). Set CONTACT_WEBHOOK_URL.
    if (process.env.CONTACT_WEBHOOK_URL) {
      const res = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      })
      if (!res.ok) throw new Error(`webhook_${res.status}`)
      return NextResponse.json({ ok: true })
    }

    // No provider configured yet: log the lead (lands in Vercel logs) and signal
    // the client to fall back to mailto so the lead is never silently lost.
    console.warn("[contact] no SENDGRID_API_KEY / CONTACT_WEBHOOK_URL set — lead not delivered:", {
      name: lead.name,
      email: lead.email,
    })
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 501 })
  } catch (error) {
    console.error("[contact] delivery failed:", error)
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 })
  }
}
