"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Martin G.",
    role: "CEO - Fintech Latam",
    content:
      "Nahuel transformo nuestra operacion manual en un sistema automatizado en solo 4 semanas. El ERP que construyo maneja ahora mas de 1000 transacciones diarias sin errores. El ROI fue inmediato.",
    rating: 5,
    result: "Ahorro de 40hs semanales de trabajo manual",
  },
  {
    id: 2,
    name: "Sofia L.",
    role: "Founder - E-commerce Startup",
    content:
      "La Web App que desarrollo Nahuel no solo es rapida, sino que la experiencia de usuario es impecable. Desde el lanzamiento, nuestra tasa de retencion subio un 25%. Entiende de negocio, no solo de codigo.",
    rating: 5,
    result: "+25% retencion de usuarios en 3 meses",
  },
  {
    id: 3,
    name: "Carlos R.",
    role: "Director - Agencia de Marketing",
    content:
      "Necesitabamos landing pages de alta conversion para nuestros clientes. El trabajo de Nahuel supero las expectativas: carga instantanea y diseno premium. Nuestros costos de publicidad bajaron gracias a la mejor calidad de pagina.",
    rating: 5,
    result: "-30% costo por lead (CPL)",
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = testimonials.length
  const active = testimonials[activeIndex]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % total)
    }, 7000)

    return () => clearInterval(interval)
  }, [total])

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + total) % total)
  }

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % total)
  }

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Lo que dicen mis clientes</h2>
          <p className="section-subtitle">
            Resultados reales de proyectos reales. Historias de clientes que confiaron en mi para escalar sus negocios.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-8 md:p-10 space-y-6 relative">
            <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />

            <div className="flex gap-1">
              {Array.from({ length: active.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <p className="text-muted-foreground italic text-lg leading-relaxed">"{active.content}"</p>

            <div className="pt-4 border-t border-border/50">
              <p className="font-semibold text-lg">{active.name}</p>
              <p className="text-sm text-muted-foreground">{active.role}</p>
              <p className="text-sm text-primary font-medium mt-2">Resultado: {active.result}</p>
            </div>
          </Card>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Button variant="outline" size="icon" onClick={goPrev} aria-label="Testimonio anterior">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Ver testimonio ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    index === activeIndex ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={goNext} aria-label="Testimonio siguiente">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            100% de clientes satisfechos y proyectos entregados a tiempo.
          </p>
        </div>
      </div>
    </section>
  )
}
