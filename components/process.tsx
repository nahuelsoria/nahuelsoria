import { Card } from "@/components/ui/card"
import { MessageCircle, FileText, Code, CheckCircle } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Consulta Gratuita",
    description: "30 minutos para entender tu proyecto, objetivos y necesidades. Sin compromiso.",
    icon: MessageCircle,
    duration: "30 min",
  },
  {
    number: "02",
    title: "Propuesta y Presupuesto",
    description: "Recibes una propuesta detallada con alcance, timeline y precio en 24-48 horas.",
    icon: FileText,
    duration: "24-48h",
  },
  {
    number: "03",
    title: "Desarrollo Iterativo",
    description: "Trabajamos en sprints con entregas parciales. Tú ves el progreso en tiempo real.",
    icon: Code,
    duration: "2-6 semanas",
  },
  {
    number: "04",
    title: "Entrega y Soporte",
    description: "Lanzamiento del proyecto + 30 días de soporte incluido. Garantía de satisfacción.",
    icon: CheckCircle,
    duration: "30 días",
  },
]

export function Process() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Cómo trabajo</h2>
          <p className="section-subtitle">
            Un proceso probado que garantiza resultados. Transparente, iterativo y orientado a resultados.
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
            <strong className="text-foreground">Transparencia total:</strong> Sabrás exactamente qué se está construyendo, 
            cuándo estará listo y cuánto costará. Sin sorpresas.
          </p>
        </div>
      </div>
    </section>
  )
}
