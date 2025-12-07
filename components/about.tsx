"use client"

import { Card } from "@/components/ui/card"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"

export function About() {
  const { ref, isVisible } = useInViewAnimation<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className={`${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
              <h2 className="section-title mb-4">Sobre Mí</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Soy Nahuel Soria, desarrollador web de Buenos Aires. Construyo plataformas, sitios web y sistemas que
                ayudan a negocios y startups a crecer, automatizar procesos y mejorar su operación. Como CTO en una
                fintech, desarrollé sistemas que procesan millones en transacciones y gestionan operaciones críticas
                diariamente.
              </p>
              <p className="text-lg text-muted-foreground">
                Mi enfoque es simple: rapidez + claridad + resultados. Transformo ideas en productos reales en semanas,
                no meses, priorizando experiencias fáciles de usar y enfocadas en impacto de negocio. Creo productos
                propios como Picaday, Numerai y What I Wish, que ya cuentan con usuarios activos. Mi objetivo es crear
                tecnología que genere valor real y solucione problemas concretos.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <Card className={`p-6 text-center animate-delay-100 ${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
                <p className="text-3xl font-bold text-primary">4+</p>
                <p className="text-sm text-muted-foreground mt-2">Años de experiencia</p>
              </Card>
              <Card className={`p-6 text-center animate-delay-200 ${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
                <p className="text-3xl font-bold text-primary">10+</p>
                <p className="text-sm text-muted-foreground mt-2">Proyectos completados</p>
              </Card>
              <Card className={`p-6 text-center animate-delay-300 ${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
                <p className="text-3xl font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground mt-2">Clientes satisfechos</p>
              </Card>
            </div>
          </div>

          <div className={`relative animate-delay-200 ${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl animate-[pulse_4s_ease-in-out_infinite]"></div>
            <div className="relative bg-card border border-border/50 rounded-2xl p-8 backdrop-blur">
              <img src="/developer-workspace-dual-monitors-coding.jpg" alt="Workspace" className="w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
