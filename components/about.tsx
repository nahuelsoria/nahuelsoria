"use client"

import { Card } from "@/components/ui/card"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"
import { useLang } from "@/lib/i18n"

export function About() {
  const { t } = useLang()
  const { ref, isVisible } = useInViewAnimation<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className={`${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
              <h2 className="section-title mb-4">{t("Sobre Mí", "About me")}</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t(
                  "Soy Nahuel Soria, socio técnico y CTO fraccional desde Buenos Aires. Ayudo a founders y equipos a construir y lanzar sus productos, siendo el responsable técnico de punta a punta: arquitectura, desarrollo, integraciones y la operación del día a día.",
                  "I'm Nahuel Soria, a technical partner and fractional CTO based in Buenos Aires. I help founders and teams build and ship their products as the end-to-end technical owner: architecture, development, integrations and day-to-day operations.",
                )}
              </p>
              <p className="text-lg text-muted-foreground">
                {t(
                  "Lideré la tecnología de plataformas de pagos donde todo tiene que ser correcto, auditable y funcionar en producción bajo presión. Esa exigencia la traigo a cada proyecto, sea del rubro que sea. Mi enfoque es simple: rapidez, claridad y resultados — transformo ideas en productos reales en semanas, no meses. También creo productos propios con usuarios activos.",
                  "I led the technology of payment platforms where everything has to be correct, auditable and work in production under pressure. I bring that same bar to every project, whatever the industry. My approach is simple: speed, clarity and results — I turn ideas into real products in weeks, not months. I also build my own products with active users.",
                )}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <Card className={`p-6 text-center animate-delay-100 ${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
                <p className="text-3xl font-bold text-primary">4+</p>
                <p className="text-sm text-muted-foreground mt-2">{t("Años de experiencia", "Years of experience")}</p>
              </Card>
              <Card className={`p-6 text-center animate-delay-200 ${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
                <p className="text-3xl font-bold text-primary">10+</p>
                <p className="text-sm text-muted-foreground mt-2">{t("Proyectos completados", "Projects completed")}</p>
              </Card>
              <Card className={`p-6 text-center animate-delay-300 ${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
                <p className="text-3xl font-bold text-primary">{t("Producción", "Production")}</p>
                <p className="text-sm text-muted-foreground mt-2">{t("Sistemas críticos en vivo", "Critical systems, live")}</p>
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
