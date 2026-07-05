"use client"

import { Card } from "@/components/ui/card"
import { MessageCircle, FileText, Code, CheckCircle } from "lucide-react"
import { useLang } from "@/lib/i18n"

export function Process() {
  const { t } = useLang()

  const steps = [
    {
      number: "01",
      title: t("Consulta gratuita", "Free call"),
      description: t(
        "30 minutos para conocer tu proyecto, aclarar objetivos y definir qué necesitás. Sin compromiso.",
        "30 minutes to get to know your project, clarify goals and define what you need. No commitment.",
      ),
      icon: MessageCircle,
      duration: t("30 min", "30 min"),
    },
    {
      number: "02",
      title: t("Propuesta", "Proposal"),
      description: t(
        "Recibís una propuesta detallada con alcance y tiempos en 24-48 horas.",
        "You get a detailed proposal with scope and timeline in 24-48 hours.",
      ),
      icon: FileText,
      duration: t("24-48h", "24-48h"),
    },
    {
      number: "03",
      title: t("Desarrollo iterativo", "Iterative development"),
      description: t(
        "Trabajo en sprints con entregas parciales. Podés ver el progreso en tiempo real.",
        "I work in sprints with partial deliveries. You can see progress in real time.",
      ),
      icon: Code,
      duration: t("2-6 semanas", "2-6 weeks"),
    },
    {
      number: "04",
      title: t("Entrega y soporte", "Delivery & support"),
      description: t(
        "Lanzamiento del proyecto + 30 días de soporte incluido.",
        "Project launch + 30 days of support included.",
      ),
      icon: CheckCircle,
      duration: t("30 días", "30 days"),
    },
  ]

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">{t("El proceso", "The process")}</h2>
          <p className="section-subtitle">
            {t(
              "Un proceso claro y transparente para garantizar resultados. Te acompaño en cada etapa para que siempre sepas qué se está construyendo y cuándo estará listo.",
              "A clear, transparent process to guarantee results. I walk you through every stage so you always know what's being built and when it will be ready.",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border -z-10">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                )}
                <Card className="p-6 space-y-4 h-full hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-2xl font-bold text-muted-foreground/30">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {step.duration}
                    </span>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            <strong className="text-foreground">{t("Transparencia total:", "Full transparency:")}</strong>{" "}
            {t(
              "siempre sabrás qué se construye, con qué alcance y cuándo estará listo.",
              "you'll always know what's being built, with what scope, and when it will be ready.",
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
