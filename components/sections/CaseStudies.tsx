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
    id: "fintech-core",
    title: "Core Bancario High-Performance",
    client: "Fintech Startup",
    description: "Diseño e implementación de un core bancario capaz de procesar 1000+ TPS con latencia sub-segundo.",
    results: [
      "Latencia reducida en un 400%",
      "Cero downtime en migración",
      "Escalabilidad horizontal automática"
    ],
    tags: ["Go", "Microservices", "PostgreSQL", "AWS"],
  },
  {
    id: "ecommerce-scale",
    title: "Escalado de E-commerce Regional",
    client: "Retail Leader",
    description: "Optimización de plataforma legacy y migración a arquitectura headless para soportar Black Friday.",
    results: [
      "2.5M de usuarios concurrentes soportados",
      "Incremento del 35% en conversión móvil",
      "Reducción de costos de infraestructura en un 20%"
    ],
    tags: ["Next.js", "Shopify Plus", "Redis"],
  },
  {
    id: "ai-analytics",
    title: "Dashboard de Analytics con IA",
    client: "SaaS B2B",
    description: "Integración de modelos predictivos para análisis de churn y comportamiento de usuarios en tiempo real.",
    results: [
      "Predicción de churn con 85% de accuracy",
      "Dashboard en tiempo real con latencia < 50ms"
    ],
    tags: ["Python", "TensorFlow", "React", "BigQuery"],
  }
]

export function CaseStudiesSection() {
  return (
    <section className="py-16 bg-muted/30" id="casos-de-exito">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-12 text-center">
          <Badge className="mb-4" variant="outline">Experiencia Probada</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Casos de Éxito
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Resultados reales en proyectos complejos. No solo código, sino soluciones de negocio escalables.
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
                   <Button variant="ghost" className="w-full group cursor-default">
                      Consultar sobre este caso
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
