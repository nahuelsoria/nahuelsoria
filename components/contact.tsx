"use client"

import { useState } from "react"
import { Mail, MessageCircle, CalendarClock, ArrowUpRight, Send } from "lucide-react"
import { site, whatsappHref } from "@/content/site"
import { trackEvent } from "@/lib/analytics"
import type { Dictionary, Locale } from "@/content/types"

export function Contact({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const c = dict.contact
  const calendlyUrl = site.calendly
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const wa = whatsappHref(
    locale === "es"
      ? "Hola Nahuel! Me interesa hablar sobre un proyecto."
      : "Hi Nahuel! I'd like to talk about a project.",
  )

  const mailtoFallback = () => {
    const subject = encodeURIComponent(
      (locale === "es" ? "Consulta desde el portfolio: " : "Portfolio inquiry: ") + form.name,
    )
    const body = encodeURIComponent(
      `${dict.contact.form.name}: ${form.name}\n${dict.contact.form.email}: ${form.email}\n\n${form.message}`,
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    trackEvent({ action: "form_submit", category: "contact", label: "contact_form" })
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("sent")
        setForm({ name: "", email: "", message: "" })
        return
      }
    } catch {
      // network error, fall through to mailto
    }
    // No email provider configured (501) or delivery failed (502): never lose the lead.
    setStatus("idle")
    mailtoFallback()
  }

  const statusText: Record<typeof status, string> = {
    idle: c.form.submit,
    sending: locale === "es" ? "Enviando…" : "Sending…",
    sent: locale === "es" ? "¡Mensaje enviado!" : "Message sent!",
    error: locale === "es" ? "Reintentar" : "Retry",
  }

  const methods = [
    {
      label: c.emailLabel,
      value: site.email,
      href: `mailto:${site.email}`,
      Icon: Mail,
      external: false,
    },
    {
      label: c.whatsappLabel,
      value: site.whatsappDisplay,
      href: wa,
      Icon: MessageCircle,
      external: true,
    },
    ...(calendlyUrl
      ? [{ label: c.scheduleLabel, value: "Calendly", href: calendlyUrl, Icon: CalendarClock, external: true }]
      : []),
  ]

  const field =
    "w-full rounded-md border border-line bg-background px-4 py-3 text-sm text-foreground placeholder:text-fg-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"

  return (
    <section id="contact" className="section scroll-mt-24 border-t border-line" aria-labelledby="contact-title">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left: pitch + methods */}
          <div>
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 id="contact-title" className="heading mt-5">
              {c.title}
            </h2>
            <p className="lede mt-5">{c.subtitle}</p>

            <ul className="mt-10 space-y-3">
              {methods.map(({ label, value, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    onClick={() => trackEvent({ action: "cta_click", category: "contact", label })}
                    className="group flex items-center justify-between rounded-md border border-line bg-card px-4 py-3.5 transition-colors hover:border-brand"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-md border border-line text-brand">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block font-mono text-xs uppercase tracking-wide text-fg-muted">
                          {label}
                        </span>
                        <span className="block text-sm text-foreground">{value}</span>
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-fg-muted transition-colors group-hover:text-brand" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <form onSubmit={onSubmit} className="card-surface space-y-5 p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                  {c.form.name}
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                  {c.form.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className={field}
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                {c.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className={`${field} resize-none`}
                placeholder={c.form.messagePlaceholder}
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              aria-live="polite"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {statusText[status]}
              {status !== "sent" && (
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
