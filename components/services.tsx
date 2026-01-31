"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"
import { trackEvent } from "@/lib/analytics"

const services = [
  {
    id: 1,
    title: "Landing pages con foco en conversion",
    summary: "Claridad del mensaje, prueba social y performance.",
    popular: false,
    features: [
      "Brief + propuesta de valor alineada a tu publico",
      "Diseno UI con enfoque en confianza y claridad",
      "Formularios y tracking listos para medir resultados",
      "Velocidad optimizada (90+ en Lighthouse)",
      "SEO tecnico inicial",
      "Entrega rapida y lista para publicar",
    ],
  },
  {
    id: 2,
    title: "Sitio corporativo con SEO y CMS",
    summary: "Contenido editable, autoridad de marca y visibilidad.",
    popular: false,
    features: [
      "Discovery + arquitectura de informacion",
      "Blog / Noticias integrado",
      "Diseno UX/UI alineado a marca",
      "SEO avanzado y marcado Schema",
      "Integracion con CRM o Email marketing",
      "Ideal para negocios y emprendimientos que necesitan presencia solida",
    ],
  },
  {
    id: 3,
    title: "Web App / SaaS",
    summary: "Producto digital escalable con datos y pagos.",
    popular: true,
    features: [
      "Discovery tecnico + roadmap funcional",
      "Autenticacion segura y base de datos",
      "Panel de administracion completo",
      "Integracion de pagos (Stripe / MercadoPago)",
      "Dashboard con metricas, roles y reportes",
      "Ideal para startups y productos digitales escalables",
    ],
  },
  {
    id: 4,
    title: "Sistemas enterprise / ERP",
    summary: "Automatizacion de procesos, control y trazabilidad.",
    popular: false,
    features: [
      "Relevamiento de procesos + definicion de alcance",
      "Arquitectura escalable para grandes volumenes de datos",
      "Roles y permisos avanzados",
      "Reportes, metricas y exportacion de datos",
      "Integraciones con APIs y sistemas legacy",
      "Soporte prioritario 24/7",
      "Ideal para empresas que quieren automatizar operaciones",
    ],
  },
  {
    id: 5,
    title: "Consultoria CTO / Product",
    summary: "Direccion tecnica, auditorias y plan de accion.",
    popular: false,
    features: [
      "Auditoria de codigo, seguridad y performance",
      "Diagnostico + plan de mejoras priorizadas",
      "Diseno y arquitectura de sistemas",
      "Mentoria para equipos tecnicos",
      "Estrategia y roadmap tecnologico",
    ],
  },
]

export function Services() {
  const { ref, isVisible } = useInViewAnimation<HTMLDivElement>({ threshold: 0.2 })
  const delayClasses = ["animate-delay-100", "animate-delay-200", "animate-delay-300"]

  return (
    <section id="services" className="py-20 md:py-32 bg-card/50 scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
          <h2 className="section-title mb-4">Servicios y soluciones</h2>
          <p className="section-subtitle">
            Soluciones claras y efectivas para impulsar tu negocio.
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
                  Mas elegido
                </div>
              )}

              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground">{service.summary}</p>
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
                      `Hola! Me interesa el servicio: ${service.title}. Podrias darme mas informacion?`
                    )
                    trackEvent({
                      action: "cta_click",
                      category: "services",
                      label: service.title,
                    })
                    window.open(`https://wa.me/5491158794428?text=${message}`, "_blank")
                  }}
                >
                  Pedir propuesta
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[
            {
              title: "Discovery",
              detail: "Brief, objetivos y alcance claro.",
            },
            {
              title: "Build",
              detail: "Sprints con entregas y feedback.",
            },
            {
              title: "Launch",
              detail: "Publicacion, medicion y soporte.",
            },
          ].map((step) => (
            <div key={step.title} className="rounded-xl border border-border/50 bg-card/60 px-5 py-4">
              <p className="text-sm text-muted-foreground">Proceso</p>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            <strong className="text-foreground">Garantia de calidad:</strong> Todos los proyectos incluyen 30 dias de soporte post-entrega y garantia de satisfaccion.
            <br />
            Si no cumplimos con los objetivos acordados, te devolvemos tu dinero.
          </p>
        </div>
      </div>
    </section>
  )
}
