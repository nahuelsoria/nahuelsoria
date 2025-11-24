import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
                Desarrollador <span className="gradient-text">web</span> fullstack.
              </h1>
            </div>

            <p className="text-xl text-muted-foreground max-w-xl">
              Creo aplicaciones modernas, rápidas y escalables utilizando Next.js, React, Firebase y un enfoque simple y
              orientado al usuario.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Ver proyectos
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Contactarme
              </Button>
            </div>

            <div className="flex gap-6 pt-4">
              <a
                href="https://github.com/nahuelsoria"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/nahuelsoria/"
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

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>
            <div className="relative bg-card border border-border/50 rounded-2xl p-8 backdrop-blur">
              <img src="/developer-coding-laptop-dark.jpg" alt="Developer workspace" className="w-full rounded-lg" />
              <div className="absolute -bottom-4 -right-4 bg-card border border-border/50 rounded-lg p-4 shadow-lg">
                <p className="text-sm font-medium">4+ proyectos</p>
                <p className="text-xs text-muted-foreground">activos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
