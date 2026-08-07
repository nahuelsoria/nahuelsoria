"use client"

import { Analytics } from "@vercel/analytics/react"

/** Thin client wrapper so layout can code-split Vercel Analytics. */
export function VercelAnalytics() {
  return <Analytics />
}
