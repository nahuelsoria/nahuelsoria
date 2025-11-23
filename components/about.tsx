import { Card } from "@/components/ui/card"

export function About() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="section-title mb-4">Sobre mí</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Soy Jorge Nahuel Soria, desarrollador web de Buenos Aires. Trabajo en una empresa financiera
                construyendo sistemas reales y también creo mis propios productos como Picaday, Numerai y What I Wish.
              </p>
              <p className="text-lg text-muted-foreground">
                Me enfoco en hacer productos rápidos, simples y eficientes utilizando Next.js, React, Firebase y diseño
                moderno. Mi objetivo es transformar ideas en aplicaciones funcionales que resuelvan problemas reales y
                ofrezcan experiencias excepcionales a los usuarios.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <Card className="p-6 text-center">
                <p className="text-3xl font-bold text-primary">4+</p>
                <p className="text-sm text-muted-foreground mt-2">Años de experiencia</p>
              </Card>
              <Card className="p-6 text-center">
                <p className="text-3xl font-bold text-primary">10+</p>
                <p className="text-sm text-muted-foreground mt-2">Proyectos completados</p>
              </Card>
              <Card className="p-6 text-center">
                <p className="text-3xl font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground mt-2">Clientes satisfechos</p>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>
            <div className="relative bg-card border border-border/50 rounded-2xl p-8 backdrop-blur">
              <img src="/developer-workspace-dual-monitors-coding.jpg" alt="Workspace" className="w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
