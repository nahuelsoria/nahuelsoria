"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Check } from "lucide-react"
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
    <section ref={ref} className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className={`space-y-6 ${animationClass}`}>
              <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight tracking-tight">
                Desarrollo de software que hace crecer tu <span className="bg-gradient-to-r from-[#0EA5E9] to-[#F8C19A] bg-clip-text text-transparent">negocio</span>.
              </h1>
            </div>

              <p className={`text-xl sm:text-2xl text-muted-foreground max-w-xl leading-relaxed animate-delay-100 ${animationClass}`}>
                Construyo productos digitales a medida para que tu negocio venda más y ahorre tiempo.
              </p>

              <p
                className={`text-base sm:text-2xl text-muted-foreground max-w-xl leading-relaxed animate-delay-100 md:block hidden ${animationClass}`}
              >
                Ayudo a founders y equipos a transformar ideas en productos reales, modernos y fáciles de usar. Trabajo con tecnologías como React y Next.js para crear soluciones rápidas, seguras y listas para escalar. Más de <strong className="text-foreground">+$2M procesados</strong> por sistemas que desarrollé para diversas empresas.
              </p>

              <div className={`space-y-4 animate-delay-200 ${animationClass}`}>
                <ul className="hidden md:flex flex-col gap-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0EA5E9] mt-0.5 flex-shrink-0" />
                    <span className="text-base sm:text-lg text-muted-foreground">Desarrollo de páginas web profesionales y landings que convierten</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0EA5E9] mt-0.5 flex-shrink-0" />
                    <span className="text-base sm:text-lg text-muted-foreground">Creación de sistemas internos, dashboards o plataformas completas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0EA5E9] mt-0.5 flex-shrink-0" />
                    <span className="text-base sm:text-lg text-muted-foreground">Automatización de tareas y procesos para ahorrar tiempo y dinero</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0EA5E9] mt-0.5 flex-shrink-0" />
                    <span className="text-base sm:text-lg text-muted-foreground">Experiencia en fintech, integraciones de pago y soluciones a medida</span>
                  </li>
                </ul>

                <ul className="flex md:hidden flex-col gap-2">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#0EA5E9] flex-shrink-0" />
                    <span className="text-base text-muted-foreground">Sitios web y landings que convierten</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#0EA5E9] flex-shrink-0" />
                    <span className="text-base text-muted-foreground">Sistemas y automatizaciones a medida</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#0EA5E9] flex-shrink-0" />
                    <span className="text-base text-muted-foreground">Integraciones seguras con pagos y datos</span>
                  </li>
                </ul>
              </div>

            <div className={`flex flex-col sm:flex-row gap-4 animate-delay-300 ${animationClass}`}>
              <Button
                size="lg"
                className="group w-full sm:w-auto justify-center bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white"
                onClick={() => scrollToSection("projects")}
              >
                Ver proyectos
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group w-full sm:w-auto justify-center border-border/50 hover:bg-accent/50 hover:border-border hover:text-foreground"
                onClick={openWhatsApp}
              >
                Agendar reunión gratuita
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] sm:aspect-square shadow-lg">
                <img
                  src="/developer-coding-laptop-dark.jpeg"
                  alt="Nahuel Soria desarrollando software"
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
