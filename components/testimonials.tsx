"use client"

import { Card } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Martín G.",
    role: "CEO - Fintech Latam",
    content:
      "Nahuel transformó nuestra operación manual en un sistema automatizado en solo 4 semanas. El ERP que construyó maneja ahora más de 1000 transacciones diarias sin errores. El ROI fue inmediato.",
    rating: 5,
    result: "Ahorro de 40hs semanales de trabajo manual",
  },
  {
    id: 2,
    name: "Sofía L.",
    role: "Founder - E-commerce Startup",
    content:
      "La Web App que desarrolló Nahuel no solo es rápida, sino que la experiencia de usuario es impecable. Desde el lanzamiento, nuestra tasa de retención subió un 25%. Entiende de negocio, no solo de código.",
    rating: 5,
    result: "+25% Retención de usuarios en 3 meses",
  },
  {
    id: 3,
    name: "Carlos R.",
    role: "Director - Agencia de Marketing",
    content:
      "Necesitábamos landing pages de alta conversión para nuestros clientes. El trabajo de Nahuel superó las expectativas: carga instantánea y diseño premium. Nuestros costos de publicidad bajaron gracias a la mejor calidad de página.",
    rating: 5,
    result: "-30% Costo por Lead (CPL)",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Lo que dicen mis clientes</h2>
          <p className="section-subtitle">
            Resultados reales de proyectos reales. Historias de clientes que confiaron en mí para escalar sus negocios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 space-y-4 relative">
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />

              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-muted-foreground italic relative z-10">
                "{testimonial.content}"
              </p>

              <div className="pt-4 border-t border-border/50">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                <p className="text-sm text-primary font-medium mt-2">✓ {testimonial.result}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            100% de clientes satisfechos — proyectos entregados a tiempo y dentro del presupuesto.
          </p>
        </div>
      </div>
    </section>
  )
}
