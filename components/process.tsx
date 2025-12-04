"use client"

import { Card } from "@/components/ui/card"
import { MessageSquare, FileText, Code2, Rocket } from "lucide-react"

const steps = [
    {
        number: "01",
        title: "Descubrimiento",
        description: "Reunión de 30 min para entender tus objetivos y requerimientos.",
        icon: MessageSquare,
    },
    {
        number: "02",
        title: "Estrategia",
        description: "Propuesta detallada con alcance, tiempos y presupuesto fijo.",
        icon: FileText,
    },
    {
        number: "03",
        title: "Desarrollo",
        description: "Sprints semanales con demos de avance. Ves el progreso real.",
        icon: Code2,
    },
    {
        number: "04",
        title: "Lanzamiento",
        description: "Despliegue a producción, capacitación y soporte post-entrega.",
        icon: Rocket,
    },
]

export function Process() {
    return (
        <section id="process" className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="section-title mb-4">Cómo trabajo</h2>
                    <p className="section-subtitle">
                        Un proceso simple y transparente, sin tecnicismos innecesarios.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative max-w-7xl mx-auto">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="relative pt-8 md:pt-0">
                            <div className="bg-background relative z-10 w-fit mx-auto mb-6">
                                <div className="w-24 h-24 bg-card border-2 border-primary/20 rounded-full flex items-center justify-center mx-auto shadow-lg group hover:border-primary transition-colors">
                                    <step.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                                    {step.number}
                                </div>
                            </div>

                            <div className="text-center px-4">
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-muted-foreground text-sm">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
