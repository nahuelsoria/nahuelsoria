"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Check } from "lucide-react"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"
import { openBooking } from "@/lib/booking"
import { useLang } from "@/lib/i18n"

export function Hero() {
  const { t } = useLang()
  const { ref, isVisible } = useInViewAnimation<HTMLElement>()
  const animationClass = isVisible ? "animate-fade-up" : "reveal-offscreen"

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section ref={ref} className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className={`space-y-6 ${animationClass}`}>
              <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight tracking-tight">
                {t("Construyo tu producto digital, de la idea al ", "I build your digital product, from idea to ")}<span className="bg-gradient-to-r from-[#0EA5E9] to-[#F8C19A] bg-clip-text text-transparent">{t("lanzamiento", "launch")}</span>.
              </h1>
            </div>

              <p className={`text-xl sm:text-2xl text-muted-foreground max-w-xl leading-relaxed animate-delay-100 ${animationClass}`}>
                {t(
                  "Socio técnico y CTO fraccional. Diseño, construyo y lanzo tu producto de punta a punta — con la exigencia de haber liderado la tecnología de plataformas críticas en producción.",
                  "Technical partner & fractional CTO. I design, build and ship your product end to end — with the rigor of having led the technology of critical, production-grade platforms.",
                )}
              </p>

              <p
                className={`text-base sm:text-2xl text-muted-foreground max-w-xl leading-relaxed animate-delay-100 md:block hidden ${animationClass}`}
              >
                {t(
                  "Ayudo a founders y equipos a transformar ideas en productos reales que funcionan. Soy el responsable técnico de principio a fin: decido la arquitectura, lo construyo y lo pongo en producción. Vengo de ",
                  "I help founders and teams turn ideas into real products that work. I'm the technical owner from start to finish: I decide the architecture, build it and ship it to production. I come from ",
                )}
                <strong className="text-foreground">
                  {t("liderar la tecnología en fintech", "leading technology in fintech")}
                </strong>
                {t(
                  " —donde todo tiene que ser correcto y funcionar bajo presión— y esa misma vara la aplico a cada proyecto.",
                  " —where everything has to be correct and work under pressure— and I bring that same bar to every project.",
                )}
              </p>

              <div className={`space-y-4 animate-delay-200 ${animationClass}`}>
                <ul className="hidden md:flex flex-col gap-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0EA5E9] mt-0.5 flex-shrink-0" />
                    <span className="text-base sm:text-lg text-muted-foreground">{t("De la idea al producto lanzado, sin vueltas ni jerga", "From idea to shipped product — no runaround, no jargon")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0EA5E9] mt-0.5 flex-shrink-0" />
                    <span className="text-base sm:text-lg text-muted-foreground">{t("Sitios, apps, dashboards y automatizaciones a medida", "Custom sites, apps, dashboards and automations")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0EA5E9] mt-0.5 flex-shrink-0" />
                    <span className="text-base sm:text-lg text-muted-foreground">{t("Integraciones de pagos y datos que tienen que ser confiables", "Payment and data integrations that have to be reliable")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0EA5E9] mt-0.5 flex-shrink-0" />
                    <span className="text-base sm:text-lg text-muted-foreground">{t("Un solo responsable técnico, de la arquitectura al deploy", "A single technical owner, from architecture to deploy")}</span>
                  </li>
                </ul>

                <ul className="flex md:hidden flex-col gap-2">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#0EA5E9] flex-shrink-0" />
                    <span className="text-base text-muted-foreground">{t("De la idea al producto, sin vueltas", "From idea to product, no runaround")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#0EA5E9] flex-shrink-0" />
                    <span className="text-base text-muted-foreground">{t("Apps, dashboards y automatizaciones a medida", "Custom apps, dashboards and automations")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#0EA5E9] flex-shrink-0" />
                    <span className="text-base text-muted-foreground">{t("Integraciones de pagos y datos confiables", "Reliable payment and data integrations")}</span>
                  </li>
                </ul>
              </div>

            <div className={`flex flex-col sm:flex-row gap-4 animate-delay-300 ${animationClass}`}>
              <Button
                size="lg"
                className="group w-full sm:w-auto justify-center bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white"
                onClick={() => openBooking({ label: "hero" })}
              >
                {t("Agendar reunión gratuita", "Book a free call")}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group w-full sm:w-auto justify-center border-border/50 hover:bg-accent/50 hover:border-border hover:text-foreground"
                onClick={() => scrollToSection("projects")}
              >
                {t("Ver proyectos", "See projects")}
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
