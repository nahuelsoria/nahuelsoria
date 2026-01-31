import type React from "react"
import type { Metadata } from "next"
import { AnalyticsProvider } from "@/lib/analytics"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL('https://nahuelsoria.com'),
  title: "Nahuel Soria - CTO Fintech | Desarrollo de Software a Medida",
  description:
    "Especialista en apps SaaS, fintech y sistemas enterprise. $1M+ en transacciones procesadas, 10K+ descargas, 1000+ usuarios concurrentes. Consultoría técnica y desarrollo a medida.",
  keywords: [
    "Desarrollador Fullstack Argentina",
    "CTO Fintech",
    "Apps SaaS a medida",
    "Trading Platform Development",
    "Next.js Expert",
    "React Developer",
    "Sistemas Financieros",
    "Desarrollo Fintech",
    "Consultoría Técnica",
    "Software Enterprise",
  ],
  authors: [{ name: "Nahuel Soria", url: "https://nahuelsoria.com" }],
  creator: "Nahuel Soria",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://nahuelsoria.com",
    title: "Nahuel Soria - CTO Fintech | Desarrollo de Software a Medida",
    description:
      "Especialista en apps SaaS, fintech y sistemas enterprise. Proyectos: Numerai ($50K+ transacciones), CondorFX (1000+ usuarios), What I Wish (10K+ descargas).",
    siteName: "Nahuel Soria Portfolio",
    images: [
      {
        url: "/developer-coding-laptop-dark.jpeg",
        width: 1200,
        height: 630,
        alt: "Nahuel Soria - CTO Fintech Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nahuel Soria - CTO Fintech | Software Development",
    description:
      "Apps SaaS, fintech y sistemas enterprise. $1M+ en transacciones, 10K+ descargas, 1000+ usuarios concurrentes.",
    creator: "@nahuelsoria",
    images: [
      {
        url: "/developer-coding-laptop-dark.jpeg",
        width: 1200,
        height: 630,
        alt: "Nahuel Soria - CTO Fintech Developer",
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
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
