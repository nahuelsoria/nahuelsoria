"use client"

import { Card } from "@/components/ui/card"
import { Rocket, Code, ShieldCheck, Zap } from "lucide-react"
import { useLang } from "@/lib/i18n"

export function Results() {
  const { t } = useLang()

  const results = [
    {
      icon: Rocket,
      value: t("4 semanas", "4 weeks"),
      label: t("De idea a producto", "From idea to product"),
      description: t("Tiempo típico para tener un MVP funcional en la calle", "Typical time to get a working MVP out the door"),
    },
    {
      icon: Code,
      value: t("End-to-end", "End-to-end"),
      label: t("Un solo responsable técnico", "A single technical owner"),
      description: t("De la arquitectura al deploy, sin traspasos", "From architecture to deploy, no handoffs"),
    },
    {
      icon: ShieldCheck,
      value: t("Producción", "Production"),
      label: t("Sistemas críticos en vivo", "Critical systems, live"),
      description: t("Plataformas que funcionan bajo presión real", "Platforms that work under real pressure"),
    },
    {
      icon: Zap,
      value: t("Sin jerga", "No jargon"),
      label: t("Claridad para founders", "Clarity for founders"),
      description: t("Decisiones técnicas explicadas simple", "Technical decisions explained simply"),
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">{t("Cómo trabajo", "How I work")}</h2>
          <p className="section-subtitle">
            {t(
              "Sin métricas infladas. Así entrego: rápido, claro y a estándar de producción.",
              "No inflated metrics. This is how I deliver: fast, clear and to production standard.",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {results.map((result, index) => {
            const Icon = result.icon
            return (
              <Card key={index} className="p-6 text-center space-y-3 hover:border-primary/50 transition-colors">
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-primary">{result.value}</p>
                <p className="text-sm font-semibold">{result.label}</p>
                <p className="text-xs text-muted-foreground">{result.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
