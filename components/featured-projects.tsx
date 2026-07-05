"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"
import { trackEvent } from "@/lib/analytics"
import { useLang } from "@/lib/i18n"

export function FeaturedProjects() {
  const { t } = useLang()
  const { ref, isVisible } = useInViewAnimation<HTMLDivElement>({ threshold: 0.2 })
  const delayClasses = ["animate-delay-100", "animate-delay-200", "animate-delay-300"]

  const projects = [
    {
      id: 1,
      title: "Bot Trading Binance",
      description: t(
        "Sistema de trading algorítmico con enfoque científico. v0.7.0 estable con 34% cobertura de tests. Paper trading validation activo. Risk management avanzado con Sharpe 0.47 y Max DD 0.62%.",
        "Algorithmic trading system with a scientific approach. v0.7.0 stable with 34% test coverage. Paper-trading validation active. Advanced risk management with Sharpe 0.47 and Max DD 0.62%.",
      ),
      image: "/bot-trading-algorithmic-dashboard.jpg",
      tags: ["Python 3.11", "CCXT", "Streamlit", "TA-Lib", "Docker", "Optuna"],
      status: t("v0.7.0 Stable", "v0.7.0 Stable"),
      metrics: t(
        "Risk Management: Avanzado • Paper Trading: Activo • Test Coverage: 34%",
        "Risk Management: Advanced • Paper Trading: Active • Test Coverage: 34%",
      ),
    },
    {
      id: 2,
      title: "Numerai",
      description: t(
        "App de finanzas personales MVP 85% completado. Sistema de pagos Dodo + MercadoPago implementado. WhatsApp integration con IA para categorización automática de gastos.",
        "Personal finance app, MVP 85% complete. Dodo + MercadoPago payments implemented. WhatsApp integration with AI for automatic expense categorization.",
      ),
      image: "/finance-app-dashboard-charts.jpg",
      tags: ["Next.js 14", "Firebase", "Dodo Payments", "WhatsApp API", "MercadoPago", "AI"],
      status: t("MVP 85%", "MVP 85%"),
      metrics: t(
        "Pagos: Dodo + MercadoPago • IA: categorización de gastos • Estado: MVP",
        "Payments: Dodo + MercadoPago • AI: expense categorization • Status: MVP",
      ),
    },
    {
      id: 3,
      title: "Picaday",
      description: t(
        "Diario fotográfico MVP 100% completado. Performance optimizada con LCP < 2.5s garantizado. E2E testing completo con Playwright. Web Workers para compresión de imágenes y virtualización avanzada.",
        "Photo journal, MVP 100% complete. Optimized performance with guaranteed LCP < 2.5s. Full E2E testing with Playwright. Web Workers for image compression and advanced virtualization.",
      ),
      image: "/photo-diary-calendar-app.jpg",
      tags: ["Next.js 14", "React 18", "Firebase", "Tailwind 4", "Playwright E2E", "Web Workers"],
      status: t("MVP 100% - Production Ready", "MVP 100% - Production Ready"),
      metrics: t(
        "Performance: LCP < 2.5s • E2E Tests: Full Coverage • Web Workers: compresión de imágenes",
        "Performance: LCP < 2.5s • E2E Tests: Full Coverage • Web Workers: image compression",
      ),
    },
    {
      id: 4,
      title: "CondorFX / ERP Financiero",
      description: t(
        "Sistema completo para financiera: clientes, cuentas corrientes, cheques, cambio de moneda. Desarrollado en 1 mes con Next.js 15 y Firebase. Multi-currency y FX operations en producción.",
        "Complete system for a financial company: clients, current accounts, checks, currency exchange. Built in 1 month with Next.js 15 and Firebase. Multi-currency and FX operations in production.",
      ),
      image: "/erp-dashboard-financial-system.jpg",
      tags: ["Next.js 15", "Firebase", "Tailwind", "FX Operations", "Multi-currency"],
      status: t("Production Deployed", "Production Deployed"),
      metrics: t(
        "Development Time: 1 mes • Features: Full ERP • Status: Live Production",
        "Development Time: 1 month • Features: Full ERP • Status: Live Production",
      ),
    },
  ]

  return (
    <section id="projects" className="py-20 md:py-32 scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
          <h2 className="section-title mb-4">{t("Proyectos destacados", "Featured projects")}</h2>
          <p className="section-subtitle">
            {t("Algunos de mis trabajos más recientes y significativos", "Some of my most recent and significant work")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={`group overflow-hidden hover:border-primary/50 transition-colors ${
                isVisible ? `animate-fade-up ${delayClasses[index % delayClasses.length]}` : "reveal-offscreen"
              }`}
            >
              <div className="relative h-64 overflow-hidden bg-muted aspect-[4/3]">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  {project.status && (
                    <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
                      {project.status}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{project.description}</p>
                {project.metrics && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-foreground">{project.metrics}</p>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-center"
                  onClick={() => {
                    const message = encodeURIComponent(
                      t(
                        `Hola! Me interesa conocer más sobre el proyecto: ${project.title}`,
                        `Hi! I'd like to know more about the project: ${project.title}`,
                      ),
                    )
                    trackEvent({ action: "cta_click", category: "projects", label: project.title })
                    window.open(`https://wa.me/5491158794428?text=${message}`, "_blank")
                  }}
                >
                  {t("Ver más detalles", "See more details")}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
