import { notFound } from "next/navigation"

// Any unknown path under a valid locale renders the branded not-found
// boundary (app/[locale]/not-found.tsx), inside the locale layout.
export default function CatchAll() {
  notFound()
}
