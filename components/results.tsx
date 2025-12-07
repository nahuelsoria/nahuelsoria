import { Card } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Zap } from "lucide-react"

const results = [
  {
    icon: DollarSign,
    value: "+$2M",
    label: "Procesados en sistemas desarrollados",
    description: "Más de 2 millones de USD en transacciones manejadas por sistemas que construí",
  },
  {
    icon: Users,
    value: "1000+",
    label: "Usuarios activos",
    description: "En aplicaciones que desarrollé y lancé",
  },
  {
    icon: Zap,
    value: "4 semanas",
    label: "Tiempo promedio de entrega",
    description: "De la idea al producto funcional",
  },
  {
    icon: TrendingUp,
    value: "100%",
    label: "Clientes satisfechos",
    description: "Todos los proyectos entregados a tiempo",
  },
]

export function Results() {
  return (
    <section className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Resultados reales</h2>
          <p className="section-subtitle">
            Números reales de proyectos reales. Cada métrica representa valor entregado a clientes.
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
