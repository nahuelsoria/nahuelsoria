"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"

const projects = [
  {
    id: 1,
    title: "Picaday",
    description:
      "Diario fotográfico con calendario tipo mosaico. Aplicación para registrar recuerdos diarios con fotos de forma simple y visual.",
    image: "/photo-diary-calendar-app.jpg",
    tags: ["Next.js", "Firebase", "Auth", "Firestore", "Storage", "Tailwind"],
  },
  {
    id: 2,
    title: "Numerai",
    description:
      "App de finanzas personales con carga de gastos por WhatsApp usando IA. Categorías inteligentes, reportes y automatización.",
    image: "/finance-app-dashboard-charts.jpg",
    tags: ["Next.js", "Firestore", "AI", "WhatsApp API"],
  },
  {
    id: 3,
    title: "Condor OTC / ERP",
    description:
      "Sistema completo para una financiera: clientes, cuentas corrientes, cheques, cambio de moneda. Desarrollado en 1 mes.",
    image: "/erp-dashboard-financial-system.jpg",
    tags: ["Next.js 15", "Firebase", "Tailwind"],
  },
  {
    id: 4,
    title: "What I Wish",
    description:
      "Aplicación para listas de regalos para cumpleaños. Plataforma simple y elegante para crear y compartir listas de deseos.",
    image: "/wishlist-app-gifts-birthday.jpg",
    tags: ["Next.js", "Firebase"],
  },
]

export function FeaturedProjects() {
  const { ref, isVisible } = useInViewAnimation<HTMLDivElement>({ threshold: 0.2 })
  const delayClasses = ["animate-delay-100", "animate-delay-200", "animate-delay-300"]

  return (
    <section id="projects" className="py-20 md:py-32" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
          <h2 className="section-title mb-4">Proyectos destacados</h2>
          <p className="section-subtitle">Algunos de mis trabajos más recientes y significativos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={`group overflow-hidden hover:border-primary/50 transition-colors ${
                isVisible ? `animate-fade-up ${delayClasses[index % delayClasses.length]}` : "reveal-offscreen"
              }`}
            >
              <div className="relative h-64 overflow-hidden bg-muted">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="ghost" className="w-full justify-center">
                  Ver más
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
