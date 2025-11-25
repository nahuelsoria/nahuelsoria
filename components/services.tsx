"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useExchangeRate } from "@/hooks/use-exchange-rate"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"

const services = [
  {
    id: 1,
    title: "Landing Page",
    priceUSD: 150,
    popular: false,
    features: [
      "Diseño moderno y responsive",
      "Secciones básicas",
      "Formulario de contacto",
      "Optimización de performance",
      "SEO básico",
    ],
  },
  {
    id: 2,
    title: "Web Profesional",
    priceUSD: 300,
    popular: false,
    features: [
      "Multisecciones personalizadas",
      "Blog integrado",
      "Diseño responsive completo",
      "SEO avanzado",
      "Panel de administración",
    ],
  },
  {
    id: 3,
    title: "Web App con Login",
    priceUSD: 600,
    popular: true,
    features: [
      "Autenticación de usuarios",
      "Base de datos en tiempo real",
      "Panel de control",
      "Dashboards interactivos",
      "Integración de APIs",
    ],
  },
  {
    id: 4,
    title: "Sistemas a Medida / ERP",
    priceUSD: 1000,
    popular: false,
    features: [
      "Gestión de cuentas y clientes",
      "Operaciones complejas",
      "APIs personalizadas",
      "Dashboards avanzados",
      "Reportes y analytics",
    ],
  },
  {
    id: 5,
    title: "Consultoría Técnica",
    priceUSD: null,
    hourlyUSD: true,
    hourlyRange: { min: 20, max: 30 },
    popular: false,
    features: [
      "Asesoramiento técnico",
      "Revisión de código",
      "Arquitectura de proyectos",
      "Optimización de performance",
      "Sesiones 1 a 1",
    ],
  },
]

type HourlyRange = {
  min: number
  max: number
}

type PriceDisplayProps = {
  priceUSD: number | null
  hourlyUSD?: boolean
  hourlyRange?: HourlyRange
}

function PriceDisplay({ priceUSD, hourlyUSD, hourlyRange }: PriceDisplayProps) {
  const { rate, isLoading } = useExchangeRate()

  if (hourlyUSD && hourlyRange) {
    const minARS = Math.round(hourlyRange.min * rate)
    const maxARS = Math.round(hourlyRange.max * rate)
    return (
      <div className="space-y-1">
        <p className="text-2xl font-bold text-primary">
          USD {hourlyRange.min}-{hourlyRange.max}/hora
        </p>
        <p className="text-sm text-muted-foreground">
          ARS ${minARS}-{maxARS}/hora
        </p>
      </div>
    )
  }

  if (!priceUSD) return null

  const priceARS = Math.round(priceUSD * rate)
  return (
    <div className="space-y-1">
      <p className="text-2xl font-bold text-primary">Desde USD {priceUSD}</p>
      <p className="text-sm text-muted-foreground">Desde ARS ${isLoading ? "..." : priceARS.toLocaleString("es-AR")}</p>
    </div>
  )
}

export function Services() {
  const { ref, isVisible } = useInViewAnimation<HTMLDivElement>({ threshold: 0.2 })
  const delayClasses = ["", "animate-delay-100", "animate-delay-200", "animate-delay-300"]

  return (
    <section id="services" className="py-20 md:py-32 bg-card/50" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-16 animate-delay-100 ${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
          <h2 className="section-title mb-4">Servicios & pricing</h2>
          <p className="section-subtitle">Soluciones adaptadas a tus necesidades con precios transparentes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className={`relative overflow-hidden transition-all ${
                isVisible ? `animate-fade-up ${delayClasses[index % delayClasses.length]}` : "reveal-offscreen"
              } ${service.popular ? "lg:scale-105 border-primary/50 ring-2 ring-primary/20" : ""}`}
            >
              {service.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg">
                  Más popular
                </div>
              )}

              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <PriceDisplay
                    priceUSD={service.priceUSD}
                    hourlyUSD={service.hourlyUSD}
                    hourlyRange={service.hourlyRange}
                  />
                </div>

                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    service.popular
                      ? "bg-gray-800 hover:bg-gray-700 text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-white border border-gray-700"
                  }`}
                  variant={service.popular ? "default" : "outline"}
                >
                  Solicitar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
