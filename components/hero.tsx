"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"

export function Hero() {
  const { ref, isVisible } = useInViewAnimation<HTMLElement>()
  const animationClass = isVisible ? "animate-fade-up" : "reveal-offscreen"

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola! Me interesa conocer más sobre tus servicios de desarrollo web.")
    window.open(`https://wa.me/5491158794428?text=${message}`, "_blank")
  }

  return (
    <section ref={ref} className="relative pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className={`space-y-3 ${animationClass}`}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-balance leading-tight">
                Desarrollo Software de <span className="gradient-text">Alto Impacto</span> para Empresas que Quieren Escalar.
              </h1>
            </div>

            <p className={`text-xl text-muted-foreground max-w-xl animate-delay-100 ${animationClass}`}>
              Ayudo a fundadores y empresas a construir tecnología escalable. Especialista en React, Next.js y Arquitectura Cloud.
              <strong> +$2M procesados</strong> en sistemas desarrollados.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 animate-delay-200 ${animationClass}`}>
              <Button
                size="lg"
                className="group w-full sm:w-auto justify-center"
                onClick={() => scrollToSection("projects")}
              >
                Ver proyectos
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto justify-center"
                onClick={openWhatsApp}
              >
                Consulta gratuita
              </Button>
            </div>

            <div className={`flex gap-6 pt-4 animate-delay-300 ${animationClass}`}>
              <a
                href="https://github.com/nahuelsoria"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/nahuelsoria/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:jorgenahuelsoria@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className={`relative animate-delay-200 ${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl animate-[pulse_4s_ease-in-out_infinite]"></div>
            <div className="relative bg-card border border-border/50 rounded-2xl p-6 sm:p-8 backdrop-blur">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3] sm:aspect-square">
                <img
                  src="/developer-coding-laptop-dark.jpg"
                  alt="Developer workspace"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card border border-border/50 rounded-lg p-4 shadow-lg min-w-[180px] text-left">
                <p className="text-sm font-medium">Más de 10 proyectos</p>
                <p className="text-xs text-muted-foreground">activos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
