import type React from "react"
import type { Metadata } from "next"
import { AnalyticsProvider } from "@/lib/analytics"
import { ConsoleEasterEgg } from "@/components/console-easter-egg"
import { LanguageProvider } from "@/lib/i18n"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL('https://nahuelsoria.com'),
  title: "Nahuel Soria — Socio técnico & CTO fraccional | De la idea al producto",
  description:
    "Socio técnico y CTO fraccional: diseño, construyo y lanzo tu producto digital de punta a punta. Con la exigencia de haber liderado la tecnología de plataformas críticas en producción — aplicada a cualquier rubro.",
  keywords: [
    "CTO fraccional",
    "Fractional CTO",
    "Socio técnico",
    "Desarrollo de producto a medida",
    "MVP",
    "Next.js",
    "React Developer",
    "Consultoría técnica",
    "Product engineer",
    "Desarrollo de software Argentina",
  ],
  authors: [{ name: "Nahuel Soria", url: "https://nahuelsoria.com" }],
  creator: "Nahuel Soria",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://nahuelsoria.com",
    title: "Nahuel Soria — Socio técnico & CTO fraccional | De la idea al producto",
    description:
      "Diseño, construyo y lanzo tu producto digital de punta a punta. Un solo responsable técnico, de la arquitectura al deploy, con experiencia en sistemas críticos que funcionan en producción.",
    siteName: "Nahuel Soria Portfolio",
    images: [
      {
        url: "/developer-coding-laptop-dark.jpeg",
        width: 1200,
        height: 630,
        alt: "Nahuel Soria — Socio técnico & CTO fraccional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nahuel Soria — Socio técnico & CTO fraccional",
    description:
      "Diseño, construyo y lanzo tu producto digital de punta a punta. De la arquitectura al deploy, con experiencia en sistemas críticos en producción.",
    creator: "@nahuelsoria",
    images: [
      {
        url: "/developer-coding-laptop-dark.jpeg",
        width: 1200,
        height: 630,
        alt: "Nahuel Soria — Socio técnico & CTO fraccional",
      },
    ],
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <AnalyticsProvider />
        <ConsoleEasterEgg />
      </body>
    </html>
  )
}
