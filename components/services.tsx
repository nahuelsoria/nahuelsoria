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
    priceUSD: 500,
    popular: false,
    features: [
      "Diseño premium y animaciones modernas",
      "Textos optimizados para convertir visitantes en clientes",
      "Formularios integrados y alta conversión",
      "Velocidad optimizada (90+ en Lighthouse)",
      "SEO técnico inicial",
      "Entrega rápida y lista para publicar",
    ],
  },
  {
    id: 2,
    title: "Web Profesional",
    priceUSD: 1200,
    popular: false,
    features: [
      "CMS autoadministrable (podés editar contenido sin depender de mí)",
      "Blog / Noticias integrado",
      "Diseño UX/UI personalizado",
      "SEO avanzado y marcado Schema",
      "Integración con CRM/Email marketing",
      "Ideal para negocios y emprendimientos que necesitan presencia sólida",
    ],
  },
  {
    id: 3,
    title: "Web App / SaaS",
    priceUSD: 2500,
    popular: true,
    features: [
      "Autenticación segura para usuarios",
      "Base de datos en tiempo real",
      "Panel de administración completo",
      "Integración de pagos (Stripe / MercadoPago)",
      "Dashboard con métricas y reportes",
      "Ideal para startups y productos digitales escalables",
    ],
  },
  {
    id: 4,
    title: "Sistemas Enterprise / ERP",
    priceUSD: 5000,
    popular: false,
    features: [
      "Arquitectura escalable para grandes volúmenes de datos",
      "Roles y permisos avanzados",
      "Reportes, métricas y exportación de datos",
      "Integraciones con APIs de terceros",
      "Soporte prioritario 24/7",
      "Ideal para empresas que quieren automatizar operaciones",
    ],
  },
  {
    id: 5,
    title: "Consultoría CTO",
    priceUSD: null,
    hourlyUSD: true,
    hourlyRange: { min: 50, max: 80 },
    popular: false,
    features: [
      "Auditoría de código, seguridad y performance",
      "Diseño y arquitectura de sistemas",
      "Optimización de costos cloud",
      "Mentoría para equipos técnicos",
      "Estrategia y roadmap tecnológico",
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
            Soluciones claras y efectivas para impulsar tu negocio. Precios transparentes y sin sorpresas.
            <strong className="text-foreground"> Incluye una consulta gratuita de 30 minutos</strong> para evaluar tu proyecto.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Disponible para nuevos proyectos este mes</span>
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
