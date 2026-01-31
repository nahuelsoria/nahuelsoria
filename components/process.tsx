import { Card } from "@/components/ui/card"
import { MessageCircle, FileText, Code, CheckCircle } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Consulta gratuita",
    description: "30 minutos para conocer tu proyecto, aclarar objetivos y definir que necesitas. Sin compromiso.",
    icon: MessageCircle,
    duration: "30 min",
  },
  {
    number: "02",
    title: "Propuesta",
    description: "Recibis una propuesta detallada con alcance y tiempos en 24-48 horas.",
    icon: FileText,
    duration: "24-48h",
  },
  {
    number: "03",
    title: "Desarrollo iterativo",
    description: "Trabajo en sprints con entregas parciales. Podes ver el progreso en tiempo real.",
    icon: Code,
    duration: "2-6 semanas",
  },
  {
    number: "04",
    title: "Entrega y soporte",
    description: "Lanzamiento del proyecto + 30 dias de soporte incluido.",
    icon: CheckCircle,
    duration: "30 dias",
  },
]

export function Process() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Como trabajo</h2>
          <p className="section-subtitle">
            Un proceso claro y transparente para garantizar resultados. Te acompano en cada etapa para que siempre sepas que se esta construyendo y cuando estara listo.
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
            <strong className="text-foreground">Transparencia total:</strong> siempre sabras que se construye, con que alcance y cuando estara listo.
          </p>
        </div>
      </div>
    </section>
  )
}
