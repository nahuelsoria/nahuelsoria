import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">Jorge Nahuel Soria</h3>
            <p className="text-sm text-muted-foreground">Desarrollador web fullstack</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sobre mí
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Web Apps
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  ERP Systems
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Consultoría
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Redes sociales</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/nahuelsoria"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/nahuelsoria/"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:jorgenahuelsoria@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>Desarrollado por Jorge Nahuel Soria - 2025</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
