"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "¿Cuánto tiempo toma desarrollar un proyecto?",
        answer: "Depende de la complejidad. Una Landing Page toma 1-2 semanas, una Web Profesional 3-4 semanas, y una Web App o MVP entre 6-10 semanas. Siempre establecemos un cronograma claro antes de empezar.",
    },
    {
        question: "¿Trabajas con clientes fuera de Argentina?",
        answer: "Sí, trabajo con clientes de todo el mundo (España, USA, Latam). La comunicación es fluida a través de Google Meet, Slack o WhatsApp, y los pagos se pueden realizar vía transferencia internacional o cripto.",
    },
    {
        question: "¿Qué incluye el soporte post-entrega?",
        answer: "Todos los proyectos incluyen 30 días de soporte gratuito para corregir cualquier error o duda. Después, ofrezco planes de mantenimiento mensual para actualizaciones, seguridad y mejoras continuas.",
    },
    {
        question: "¿Cómo es la forma de pago?",
        answer: "Generalmente trabajo con un 50% de anticipo para reservar la fecha y comenzar, y el 50% restante contra entrega del proyecto funcionando. Para proyectos grandes, podemos dividirlo en hitos.",
    },
    {
        question: "¿Entregas el código fuente?",
        answer: "Sí, el código es 100% tuyo. Al finalizar el proyecto te entrego acceso al repositorio de GitHub y todas las credenciales necesarias. No hay 'vendor lock-in'.",
    },
]

export function FAQ() {
    return (
        <section className="py-20 bg-card/30">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="section-title mb-4">Preguntas Frecuentes</h2>
                    <p className="section-subtitle">
                        Todo lo que necesitas saber antes de empezar.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
