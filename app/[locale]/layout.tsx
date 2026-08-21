import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { Instrument_Serif, Hanken_Grotesk, JetBrains_Mono } from "next/font/google"
import { AnalyticsProvider } from "@/lib/analytics"
import { buildProfileJsonLd } from "@/lib/jsonld"
import { getDictionary, isLocale, locales } from "@/lib/i18n"
import { site } from "@/content/site"
import type { Locale } from "@/content/types"
import "../globals.css"

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
})
// Only the weights used on the portfolio (regular/body + medium CTAs + bold prose).
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
})
// Mono is accent-only (eyebrows/chips); single weight avoids the full variable axis.
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5ef" },
    { media: "(prefers-color-scheme: dark)", color: "#12160f" },
  ],
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const loc: Locale = isLocale(locale) ? locale : "es"
  const dict = getDictionary(loc)

  const title = `${site.name} · ${dict.hero.role}`
  const description = dict.hero.statement

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    keywords:
      loc === "es"
        ? ["Desarrollador de software", "CTO Fintech", "Desarrollo SaaS a medida", "Sistemas de pago", "Next.js", "Buenos Aires", "Automatización", "Consultoría técnica"]
        : ["Software developer", "Fintech CTO", "Custom SaaS development", "Payment systems", "Next.js", "Buenos Aires", "Automation", "Technical consulting"],
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    alternates: {
      canonical: `${site.url}/${loc}`,
      languages: {
        "es-AR": `${site.url}/es`,
        en: `${site.url}/en`,
        "x-default": `${site.url}/es`,
      },
    },
    openGraph: {
      type: "website",
      locale: loc === "es" ? "es_AR" : "en_US",
      alternateLocale: loc === "es" ? "en_US" : "es_AR",
      url: `${site.url}/${loc}`,
      siteName: site.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@nahhwe",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    icons: {
      icon: [
        { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
        { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-icon.png",
    },
  }
}

const themeScript = `document.documentElement.classList.add('js');
try {
  var t = localStorage.getItem('theme');
  if (t === 'light') { document.documentElement.classList.remove('dark'); }
  else { document.documentElement.classList.add('dark'); }
} catch (e) { document.documentElement.classList.add('dark'); }`

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  // FAQPage JSON-LD lives on the home page only: the markup must describe FAQ
  // content that is actually visible on that page (the <Faq> section).
  const profileLd = buildProfileJsonLd(locale)

  return (
    <html
      lang={locale === "es" ? "es-AR" : "en"}
      className={`${instrument.variable} ${hanken.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }}
        />
      </head>
      <body>
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
