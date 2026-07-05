"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"
import { trackEvent } from "@/lib/analytics"
import { useLang } from "@/lib/i18n"

export function Services() {
  const { t } = useLang()
  const { ref, isVisible } = useInViewAnimation<HTMLDivElement>({ threshold: 0.2 })
  const delayClasses = ["animate-delay-100", "animate-delay-200", "animate-delay-300"]

  const services = [
    {
      id: 1,
      title: t("Landing pages con foco en conversión", "Conversion-focused landing pages"),
      summary: t("Claridad del mensaje, prueba social y performance.", "Clear messaging, social proof and performance."),
      popular: false,
      features: [
        t("Brief + propuesta de valor alineada a tu público", "Brief + value proposition aligned to your audience"),
        t("Diseño UI con enfoque en confianza y claridad", "UI design focused on trust and clarity"),
        t("Formularios y tracking listos para medir resultados", "Forms and tracking ready to measure results"),
        t("Velocidad optimizada (90+ en Lighthouse)", "Optimized speed (90+ on Lighthouse)"),
        t("SEO técnico inicial", "Initial technical SEO"),
        t("Entrega rápida y lista para publicar", "Fast delivery, ready to publish"),
      ],
    },
    {
      id: 2,
      title: t("Sitio corporativo con SEO y CMS", "Corporate site with SEO & CMS"),
      summary: t("Contenido editable, autoridad de marca y visibilidad.", "Editable content, brand authority and visibility."),
      popular: false,
      features: [
        t("Discovery + arquitectura de información", "Discovery + information architecture"),
        t("Blog / Noticias integrado", "Integrated blog / news"),
        t("Diseño UX/UI alineado a marca", "UX/UI design aligned to your brand"),
        t("SEO avanzado y marcado Schema", "Advanced SEO and Schema markup"),
        t("Integración con CRM o Email marketing", "CRM or email-marketing integration"),
        t("Ideal para negocios que necesitan presencia sólida", "Ideal for businesses that need a solid presence"),
      ],
    },
    {
      id: 3,
      title: t("Web App / SaaS", "Web App / SaaS"),
      summary: t("Producto digital escalable con datos y pagos.", "A scalable digital product with data and payments."),
      popular: true,
      features: [
        t("Discovery técnico + roadmap funcional", "Technical discovery + functional roadmap"),
        t("Autenticación segura y base de datos", "Secure authentication and database"),
        t("Panel de administración completo", "Full admin panel"),
        t("Integración de pagos (Stripe / MercadoPago)", "Payment integration (Stripe / MercadoPago)"),
        t("Dashboard con métricas, roles y reportes", "Dashboard with metrics, roles and reports"),
        t("Ideal para startups y productos digitales escalables", "Ideal for startups and scalable digital products"),
      ],
    },
    {
      id: 4,
      title: t("Sistemas enterprise / ERP", "Enterprise systems / ERP"),
      summary: t("Automatización de procesos, control y trazabilidad.", "Process automation, control and traceability."),
      popular: false,
      features: [
        t("Relevamiento de procesos + definición de alcance", "Process mapping + scope definition"),
        t("Arquitectura escalable para grandes volúmenes de datos", "Scalable architecture for large data volumes"),
        t("Roles y permisos avanzados", "Advanced roles and permissions"),
        t("Reportes, métricas y exportación de datos", "Reports, metrics and data export"),
        t("Integraciones con APIs y sistemas legacy", "Integrations with APIs and legacy systems"),
        t("Soporte prioritario 24/7", "Priority 24/7 support"),
        t("Ideal para empresas que quieren automatizar operaciones", "Ideal for companies looking to automate operations"),
      ],
    },
    {
      id: 5,
      title: t("Consultoría CTO / Product", "CTO / Product consulting"),
      summary: t("Dirección técnica, auditorías y plan de acción.", "Technical direction, audits and an action plan."),
      popular: false,
      features: [
        t("Auditoría de código, seguridad y performance", "Code, security and performance audit"),
        t("Diagnóstico + plan de mejoras priorizadas", "Diagnosis + prioritized improvement plan"),
        t("Diseño y arquitectura de sistemas", "Systems design and architecture"),
        t("Mentoría para equipos técnicos", "Mentoring for technical teams"),
        t("Estrategia y roadmap tecnológico", "Technology strategy and roadmap"),
      ],
    },
  ]

  const processMini = [
    { title: t("Discovery", "Discovery"), detail: t("Brief, objetivos y alcance claro.", "Brief, goals and clear scope.") },
    { title: t("Build", "Build"), detail: t("Sprints con entregas y feedback.", "Sprints with deliveries and feedback.") },
    { title: t("Launch", "Launch"), detail: t("Publicación, medición y soporte.", "Launch, measurement and support.") },
  ]

  return (
    <section id="services" className="py-20 md:py-32 bg-card/50 scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
          <h2 className="section-title mb-4">{t("Servicios y soluciones", "Services & solutions")}</h2>
          <p className="section-subtitle">
            {t("Soluciones claras y efectivas para impulsar tu negocio.", "Clear, effective solutions to move your business forward.")}
            <strong className="text-foreground">
              {" "}
              {t("Incluye una consulta gratuita de 30 minutos", "Includes a free 30-minute call")}
            </strong>{" "}
            {t("para evaluar tu proyecto.", "to evaluate your project.")}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>{t("Disponible para nuevos proyectos este mes", "Available for new projects this month")}</span>
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
                  {t("Más elegido", "Most popular")}
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
                      t(
                        `Hola! Me interesa el servicio: ${service.title}. ¿Podrías darme más información?`,
                        `Hi! I'm interested in the service: ${service.title}. Could you tell me more?`,
                      ),
                    )
                    trackEvent({ action: "cta_click", category: "services", label: service.title })
                    window.open(`https://wa.me/5491158794428?text=${message}`, "_blank")
                  }}
                >
                  {t("Pedir propuesta", "Request a proposal")}
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {processMini.map((step) => (
            <div key={step.title} className="rounded-xl border border-border/50 bg-card/60 px-5 py-4">
              <p className="text-sm text-muted-foreground">{t("Proceso", "Process")}</p>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            <strong className="text-foreground">{t("Garantía de calidad:", "Quality guarantee:")}</strong>{" "}
            {t(
              "Todos los proyectos incluyen 30 días de soporte post-entrega y garantía de satisfacción.",
              "Every project includes 30 days of post-delivery support and a satisfaction guarantee.",
            )}
            <br />
            {t(
              "Si no cumplimos con los objetivos acordados, te devolvemos tu dinero.",
              "If we don't meet the agreed goals, we refund your money.",
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
