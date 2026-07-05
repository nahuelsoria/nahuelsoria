import { Card } from "@/components/ui/card"
import { Rocket, Code, ShieldCheck, Zap } from "lucide-react"

const results = [
  {
    icon: Rocket,
    value: "4 semanas",
    label: "De idea a producto",
    description: "Tiempo típico para tener un MVP funcional en la calle",
  },
  {
    icon: Code,
    value: "End-to-end",
    label: "Un solo responsable técnico",
    description: "De la arquitectura al deploy, sin traspasos",
  },
  {
    icon: ShieldCheck,
    value: "Producción",
    label: "Sistemas críticos en vivo",
    description: "Plataformas que funcionan bajo presión real",
  },
  {
    icon: Zap,
    value: "Sin jerga",
    label: "Claridad para founders",
    description: "Decisiones técnicas explicadas simple",
  },
]

export function Results() {
  return (
    <section className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Cómo trabajo</h2>
          <p className="section-subtitle">
            Sin métricas infladas. Así entrego: rápido, claro y a estándar de producción.
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
