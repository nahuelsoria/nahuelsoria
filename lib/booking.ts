import { trackEvent } from "@/lib/analytics"

const WHATSAPP_NUMBER = "5491158794428"
const DEFAULT_MESSAGE =
  "Hola Nahuel! Quiero agendar una reunión gratuita para hablar de mi proyecto."

/** True when a Calendly URL is configured (build-time inlined). */
export const CALENDLY_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_CALENDLY_URL)

/**
 * Opens the booking flow. Uses Calendly when NEXT_PUBLIC_CALENDLY_URL is set,
 * otherwise falls back to WhatsApp. Fires an analytics event either way so we
 * can measure booking intent.
 */
export function openBooking(opts?: { label?: string; message?: string }) {
  const label = opts?.label ?? "book_call"
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL

  if (calendlyUrl) {
    trackEvent({ action: "cta_click", category: "contact", label: `${label}_calendly` })
    window.open(calendlyUrl, "_blank", "noopener,noreferrer")
    return
  }

  const message = encodeURIComponent(opts?.message ?? DEFAULT_MESSAGE)
  trackEvent({ action: "cta_click", category: "contact", label: `${label}_whatsapp` })
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer")
}
