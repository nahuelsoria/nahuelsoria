import type { MetadataRoute } from "next"
import { site } from "@/content/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Software developer`,
    short_name: site.name,
    description: "Custom software, SaaS and fintech payment systems — built end to end.",
    start_url: "/es",
    display: "standalone",
    background_color: "#12160f",
    theme_color: "#12160f",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  }
}
