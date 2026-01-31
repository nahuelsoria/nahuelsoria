import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface CaseStudy {
  id: string
  title: string
  client: string
  description: string
  results: string[]
  tags: string[]
  link?: string
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "what-i-wish",
    title: "What I Wish - App Social Wishlist",
    client: "Proyecto Personal - B2C",
    description: "App móvil para compartir listas de deseos con enfoque viral en WhatsApp. Diseño minimalista con onboarding de 60 segundos.",
    results: [
      "10K+ descargas orgánicas sin marketing",
      "40% tasa de viralización (compartidos)",
      "4.8⭐ rating en App Store",
      "Onboarding completo en <60 segundos"
    ],
    tags: ["React Native", "Firebase", "WhatsApp API", "UX Design"],
  },
  {
    id: "numerai",
    title: "Numerai - Finance Tracker Multi-Currency",
    client: "Fintech App - B2C/B2B",
    description: "Sistema integral de finanzas personales con captura de gastos por AI, soporte multi-divisa y reportes P&L en tiempo real.",
    results: [
      "Procesamiento de $50K+ en transacciones mensuales",
      "Captura de gastos por AI con 85% accuracy",
      "Soporte ARS/USD/EUR con tasas en tiempo real",
      "Dashboard con <100ms latency"
    ],
    tags: ["Next.js", "Firebase", "OpenAI API", "Charts.js"],
  },
  {
    id: "picaday",
    title: "Picaday - Photo Journal Mosaic",
    client: "App Lifestyle - B2C",
    description: "App de diario fotográfico con vista calendario mosaico, múltiples fotos por día y experiencia calmada mobile-first.",
    results: [
      "15K+ usuarios activos mensuales",
      "Promedio 8 fotos/día por usuario",
      "99.9% uptime en storage de fotos",
      "Experiencia mobile <3s load time"
    ],
    tags: ["React Native", "Cloud Storage", "Mobile-First", "Minimal Design"],
  },
  {
    id: "condorfx",
    title: "CondorFX - Trading Platform High-Performance",
    client: "Fintech Trading - B2B",
    description: "Plataforma de trading con procesamiento de datos en tiempo real, soporte para 1000+ usuarios concurrentes y latency <50ms.",
    results: [
      "$1M+ en transacciones diarias procesadas",
      "50ms latency en quotes y órdenes",
      "1000+ concurrent users sin caídas",
      "Integración con 10+ brokers API"
    ],
    tags: ["Node.js", "WebSockets", "Redis", "PostgreSQL"],
  },
  {
    id: "bruselascambio",
    title: "Bruselascambio - Exchange Platform",
    client: "Casa de Cambio - B2B/B2C",
    description: "Sistema completo de gestión de casa de cambio con cálculo automático de márgenes, integración bancaria y reporting regulatorio.",
    results: [
      "€500K+ en operaciones mensuales",
      "Cálculo de márgenes en tiempo real",
      "Reporting regulatorio automático",
      "Integración con 5 bancos locales"
    ],
    tags: ["Next.js", "Bank APIs", "Regulatory Compliance", "PostgreSQL"],
  }
]

export function CaseStudiesSection() {
  return (
    <section className="py-16 bg-muted/30" id="casos-de-exito">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-12 text-center">
          <Badge className="mb-4" variant="outline">Experiencia Probada</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Casos de Éxito Reales
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Proyectos que generan resultados reales: $1M+ en transacciones, 10K+ descargas, 1000+ usuarios concurrentes.
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
                  <h4 className="text-sm font-semibold mb-2">Resultados Clave:</h4>
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
                      Ver Detalles <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                 ) : (
                   <Button 
                     variant="ghost" 
                     className="w-full group hover:bg-primary/10"
                     onClick={() => {
                       const message = encodeURIComponent(
                         `Hola! Vi tu caso de éxito "${study.title}" y me interesa algo similar para mi proyecto. ¿Podemos conversar?`
                       )
                       window.open(`https://wa.me/5491158794428?text=${message}`, "_blank")
                     }}
                   >
                      Consultar sobre este caso <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
