"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useExchangeRate } from "@/hooks/use-exchange-rate"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"

const services = [
  {
    id: 1,
    title: "Landing Page Premium",
    priceUSD: 800,
    popular: false,
    features: [
      "Como What I Wish, pero para tu marca",
      "Diseño premium con 40%+ tasa de conversión",
      "Onboarding <60s y experiencia viral",
      "Velocidad optimizada (95+ en Lighthouse)",
      "SEO técnico inicial y Schema markup",
      "Entrega en 2 semanas, lista para publicar",
    ],
  },
  {
    id: 2,
    title: "Web App SaaS",
    priceUSD: 3000,
    popular: false,
    features: [
      "Como Numerai, con tu lógica de negocio",
      "Dashboard real-time <100ms latency",
      "Base de datos escalable + seguridad empresarial",
      "AI features y automatización inteligente",
      "Reportes P&L y métricas avanzadas",
      "Integración con pagos y APIs externas",
    ],
  },
  {
    id: 3,
    title: "Platform Trading / FinTech",
    priceUSD: 5000,
    popular: true,
    features: [
      "Como CondorFX, adaptada a tu industria",
      "1000+ usuarios concurrentes soportados",
      "Latency <50ms en tiempo real",
      "Integración con brokers y APIs financieras",
      "Dashboard con métricas y alertas",
      "Ideal para startups Fintech y trading systems",
    ],
  },
  {
    id: 4,
    title: "Sistema Enterprise / ERP",
    priceUSD: 8000,
    popular: false,
    features: [
      "Como Bruselascambio, para tu industria",
      "Procesamiento €1M+ en operaciones diarias",
      "Arquitectura escalable y reporting regulatorio",
      "Integraciones bancarias y compliance",
      "Roles avanzados y auditoría completa",
      "Soporte prioritario y SLA garantizado",
    ],
  },
  {
    id: 5,
    title: "CTO as a Service",
    priceUSD: null,
    hourlyUSD: true,
    hourlyRange: { min: 80, max: 120 },
    popular: false,
    features: [
      "Auditoría técnica como CondorFX/Bruselas",
      "Arquitectura de sistemas escalables",
      "Estrategia tecnológica y roadmap",
      "Optimización de costos y performance",
      "Mentoría para equipos de desarrollo",
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
  const delayClasses = ["animate-delay-100", "animate-delay-200", "animate-delay-300"]

  return (
    <section id="services" className="py-20 md:py-32 bg-card/50 scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
          <h2 className="section-title mb-4">Servicios y pricing</h2>
          <p className="section-subtitle">
            Soluciones probadas con resultados reales: $1M+ en transacciones, 10K+ usuarios, 1000+ concurrentes.
            <strong className="text-foreground"> Incluye una consulta gratuita de 30 minutos</strong> para evaluar tu proyecto.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>🔥 3 proyectos en desarrollo este mes</span>
          </div>
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
                  onClick={() => {
                    const message = encodeURIComponent(
                      `Hola! Me interesa el servicio: ${service.title}. ¿Podrías darme más información?`
                    )
                    window.open(`https://wa.me/5491158794428?text=${message}`, "_blank")
                  }}
                >
                  Solicitar ahora
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            <strong className="text-foreground">Garantía de calidad:</strong> Todos los proyectos incluyen 30 días de soporte post-entrega y garantía de satisfacción.
            <br />
            Si no cumplimos con los objetivos acordados, te devolvemos tu dinero.
          </p>
        </div>
      </div>
    </section>
  )
}
