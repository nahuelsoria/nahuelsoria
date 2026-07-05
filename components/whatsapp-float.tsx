"use client"

import { MessageCircle } from "lucide-react"
import { site, whatsappHref } from "@/content/site"
import { trackEvent } from "@/lib/analytics"
import type { Locale } from "@/content/types"

export function WhatsAppFloat({ locale }: { locale: Locale }) {
  const label = locale === "es" ? "Contactar por WhatsApp" : "Contact on WhatsApp"
  const message =
    locale === "es"
      ? "Hola Nahuel! Vi tu portfolio y me interesa hablar sobre un proyecto."
      : "Hi Nahuel! I saw your portfolio and I'd like to talk about a project."

  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={() => trackEvent({ action: "cta_click", category: "contact", label: "float_whatsapp" })}
      data-phone={site.whatsapp}
      className="group fixed bottom-6 right-6 z-40 inline-flex h-13 w-13 items-center justify-center rounded-full border border-brand/40 bg-brand text-brand-foreground shadow-lg transition-transform hover:-translate-y-1 hover:scale-105"
      style={{ height: "3.25rem", width: "3.25rem" }}
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-brand ring-2 ring-background">
        <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-75" />
      </span>
    </a>
  )
}
