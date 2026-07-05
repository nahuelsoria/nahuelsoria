"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLang } from "@/lib/i18n"

interface CaseStudy {
  id: string
  title: string
  client: string
  description: string
  results: string[]
  tags: string[]
  link?: string
}

export function CaseStudiesSection() {
  const { t } = useLang()

  const CASE_STUDIES: CaseStudy[] = [
    {
      id: "what-i-wish",
      title: t("What I Wish - App Social Wishlist", "What I Wish - Social Wishlist App"),
      client: t("Proyecto Personal - B2C", "Personal Project - B2C"),
      description: t(
        "App móvil para compartir listas de deseos con enfoque viral en WhatsApp. Diseño minimalista con onboarding de 60 segundos.",
        "Mobile app for sharing wishlists with a WhatsApp-first viral loop. Minimalist design with a 60-second onboarding.",
      ),
      results: [
        t("Descargas orgánicas sin inversión en marketing", "Organic downloads with no marketing spend"),
        t("Alta tasa de viralización (compartidos)", "High virality rate (shares)"),
        t("4.8⭐ rating en App Store", "4.8⭐ rating on the App Store"),
        t("Onboarding completo en <60 segundos", "Full onboarding in <60 seconds"),
      ],
      tags: ["React Native", "Firebase", "WhatsApp API", "UX Design"],
    },
    {
      id: "numerai",
      title: t("Numerai - Finance Tracker Multi-Currency", "Numerai - Multi-Currency Finance Tracker"),
      client: t("Fintech App - B2C/B2B", "Fintech App - B2C/B2B"),
      description: t(
        "Sistema integral de finanzas personales con captura de gastos por AI, soporte multi-divisa y reportes P&L en tiempo real.",
        "End-to-end personal finance system with AI expense capture, multi-currency support and real-time P&L reports.",
      ),
      results: [
        t("Procesamiento de pagos multi-divisa en producción", "Multi-currency payment processing in production"),
        t("Captura de gastos por AI con 85% accuracy", "AI expense capture with 85% accuracy"),
        t("Soporte ARS/USD/EUR con tasas en tiempo real", "ARS/USD/EUR support with real-time rates"),
        t("Dashboard con <100ms latency", "Dashboard with <100ms latency"),
      ],
      tags: ["Next.js", "Firebase", "OpenAI API", "Charts.js"],
    },
    {
      id: "picaday",
      title: t("Picaday - Photo Journal Mosaic", "Picaday - Photo Journal Mosaic"),
      client: t("App Lifestyle - B2C", "Lifestyle App - B2C"),
      description: t(
        "App de diario fotográfico con vista calendario mosaico, múltiples fotos por día y experiencia calmada mobile-first.",
        "Photo journaling app with a mosaic calendar view, multiple photos per day and a calm, mobile-first experience.",
      ),
      results: [
        t("Base de usuarios activos recurrentes", "A base of recurring active users"),
        t("Promedio 8 fotos/día por usuario", "Average of 8 photos/day per user"),
        t("99.9% uptime en storage de fotos", "99.9% uptime on photo storage"),
        t("Experiencia mobile <3s load time", "Mobile experience with <3s load time"),
      ],
      tags: ["React Native", "Cloud Storage", "Mobile-First", "Minimal Design"],
    },
    {
      id: "condorfx",
      title: t("CondorFX - Trading Platform High-Performance", "CondorFX - High-Performance Trading Platform"),
      client: t("Fintech Trading - B2B", "Fintech Trading - B2B"),
      description: t(
        "Plataforma de trading con procesamiento de datos en tiempo real, soporte para alta concurrencia y latency <50ms.",
        "Trading platform with real-time data processing, high-concurrency support and <50ms latency.",
      ),
      results: [
        t("Procesamiento de transacciones en tiempo real", "Real-time transaction processing"),
        t("50ms latency en quotes y órdenes", "50ms latency on quotes and orders"),
        t("Alta concurrencia sostenida sin caídas", "Sustained high concurrency with no downtime"),
        t("Integración con 10+ brokers API", "Integration with 10+ broker APIs"),
      ],
      tags: ["Node.js", "WebSockets", "Redis", "PostgreSQL"],
    },
    {
      id: "bruselascambio",
      title: t("Bruselascambio - Exchange Platform", "Bruselascambio - Exchange Platform"),
      client: t("Casa de Cambio - B2B/B2C", "Currency Exchange - B2B/B2C"),
      description: t(
        "Sistema completo de gestión de casa de cambio con cálculo automático de márgenes, integración bancaria y reporting regulatorio.",
        "Complete exchange-house management system with automatic margin calculation, bank integration and regulatory reporting.",
      ),
      results: [
        t("Operaciones de cambio en producción", "Exchange operations in production"),
        t("Cálculo de márgenes en tiempo real", "Real-time margin calculation"),
        t("Reporting regulatorio automático", "Automatic regulatory reporting"),
        t("Integración con 5 bancos locales", "Integration with 5 local banks"),
      ],
      tags: ["Next.js", "Bank APIs", "Regulatory Compliance", "PostgreSQL"],
    },
  ]

  return (
    <section className="py-16 bg-muted/30" id="casos-de-exito">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-12 text-center">
          <Badge className="mb-4" variant="outline">{t("Experiencia Probada", "Proven Experience")}</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {t("Casos de Éxito Reales", "Real Case Studies")}
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            {t(
              "Proyectos reales en producción, de fintech a productos consumer.",
              "Real projects in production, from fintech to consumer products.",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <Card key={study.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{study.client}</Badge>
                </div>
                <CardTitle className="text-xl mb-2">{study.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {study.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">{t("Resultados Clave:", "Key results:")}</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {study.results.map((result, idx) => (
                      <li key={idx}>{result}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {study.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                {study.link ? (
                  <Button asChild variant="ghost" className="w-full group">
                    <Link href={study.link}>
                      {t("Ver Detalles", "View details")} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                 ) : (
                   <Button
                     variant="ghost"
                     className="w-full group hover:bg-primary/10"
                     onClick={() => {
                       const message = encodeURIComponent(
                         t(
                           `Hola! Vi tu caso de éxito "${study.title}" y me interesa algo similar para mi proyecto. ¿Podemos conversar?`,
                           `Hi! I saw your case study "${study.title}" and I'm interested in something similar for my project. Can we talk?`,
                         )
                       )
                       window.open(`https://wa.me/5491158794428?text=${message}`, "_blank")
                     }}
                   >
                      {t("Consultar sobre este caso", "Ask about this case")} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                   </Button>
                 )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
