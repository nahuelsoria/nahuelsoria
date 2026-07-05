"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { useLang } from "@/lib/i18n"

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-border/40 py-12 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">Jorge Nahuel Soria</h3>
            <p className="text-sm text-muted-foreground">
              {t("Socio técnico & CTO fraccional", "Technical partner & fractional CTO")}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">{t("Navegación", "Navigation")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("Proyectos", "Projects")}
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("Servicios", "Services")}
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("Sobre Mí", "About")}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("Contacto", "Contact")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">{t("Servicios", "Services")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("Web apps", "Web apps")}
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("Sistemas / ERP", "ERP systems")}
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("Consultoría", "Consulting")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">{t("Redes sociales", "Social")}</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/nahuelsoria"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/nahuelsoria/"
                target="_blank"
                rel="noopener noreferrer"
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
          <p>{t("Desarrollado por Jorge Nahuel Soria", "Built by Jorge Nahuel Soria")} · 2026</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">
              {t("Privacidad", "Privacy")}
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              {t("Términos", "Terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
