"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Clock, Users, DollarSign } from "lucide-react"

const results = [
    {
        icon: Clock,
        value: "40%",
        label: "Ahorro de tiempo operativo",
        description: "Automatizando procesos manuales repetitivos",
    },
    {
        icon: DollarSign,
        value: "$2M+",
        label: "Procesados mensualmente",
        description: "En sistemas financieros seguros y escalables",
    },
    {
        icon: Users,
        value: "50k+",
        label: "Usuarios activos",
        description: "En aplicaciones web y móviles desarrolladas",
    },
    {
        icon: TrendingUp,
        value: "3x",
        label: "Retorno de inversión",
        description: "Promedio en el primer año de implementación",
    },
]

export function Results() {
    return (
        <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="section-title mb-4">Resultados que importan</h2>
                    <p className="section-subtitle">
                        No solo escribo código, genero valor real para tu negocio.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {results.map((item, index) => (
                        <Card key={index} className="p-6 text-center hover:scale-105 transition-transform duration-300 border-primary/20 bg-card/50 backdrop-blur-sm">
                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <item.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-4xl font-bold text-primary mb-2">{item.value}</h3>
                            <p className="font-semibold mb-2">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
