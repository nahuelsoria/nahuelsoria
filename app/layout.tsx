import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Nahuel Soria | Desarrollo Web & Consultoría CTO",
  description:
    "Ayudo a empresas y startups a construir sistemas escalables y productos digitales de alto impacto. Especialista en Next.js, React y arquitectura cloud.",
  keywords: [
    "Desarrollador Fullstack Argentina",
    "Consultoría CTO",
    "Desarrollo Web Premium",
    "Next.js Expert",
    "React Developer",
    "Sistemas ERP a medida",
    "Desarrollo Fintech",
  ],
  authors: [{ name: "Nahuel Soria", url: "https://nahuelsoria.com" }],
  creator: "Nahuel Soria",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://nahuelsoria.com",
    title: "Nahuel Soria | Desarrollo Web & Consultoría CTO",
    description:
      "Ayudo a empresas y startups a construir sistemas escalables y productos digitales de alto impacto.",
    siteName: "Nahuel Soria Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nahuel Soria | Desarrollo Web & Consultoría CTO",
    description:
      "Ayudo a empresas y startups a construir sistemas escalables y productos digitales de alto impacto.",
    creator: "@nahuelsoria",
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
        <Analytics />
      </body>
    </html>
  )
}
