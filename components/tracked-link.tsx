"use client"

import { track } from "@vercel/analytics"
import { trackEvent } from "@/lib/analytics"

type TrackedLinkProps = {
  href: string
  label: string
  external?: boolean
  className?: string
  children: React.ReactNode
}

/**
 * Anchor that reports clicks to Vercel Analytics (custom event) and,
 * when NEXT_PUBLIC_GA_ID is configured, to gtag. Used on /links to know
 * which bio links get clicked without any tracking of the visitor.
 */
export function TrackedLink({ href, label, external, className, children }: TrackedLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
      onClick={() => {
        track("links_click", { label })
        trackEvent({ action: "links_click", category: "links", label })
      }}
    >
      {children}
    </a>
  )
}
