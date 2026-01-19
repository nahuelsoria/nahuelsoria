"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Cuanto tiempo toma desarrollar un proyecto?",
    answer:
      "Depende del alcance, pero tipicamente: Landing Pages (1-2 semanas), Web Apps (3-6 semanas), ERPs/sistemas enterprise (6-12 semanas). Trabajo en sprints de 1-2 semanas con entregas parciales para que veas el progreso.",
  },
  {
    question: "Trabajas con empresas fuera de Argentina?",
    answer:
      "Si, trabajo con clientes de todo el mundo. Tengo experiencia trabajando con equipos distribuidos y puedo adaptarme a diferentes zonas horarias. Los pagos se pueden hacer en USD o ARS.",
  },
  {
    question: "Que incluye el soporte post-entrega?",
    answer:
      "Todos los proyectos incluyen 30 dias de soporte gratuito post-entrega. Esto cubre correccion de bugs, ajustes menores y consultas tecnicas. Despues de ese periodo, ofrezco planes de mantenimiento mensuales opcionales.",
  },
  {
    question: "Que pasa si no estoy satisfecho con el resultado?",
    answer:
      "Tengo una garantia de satisfaccion. Si no cumplimos con los objetivos acordados en la propuesta inicial, te devuelvo tu dinero. Hasta ahora, el 100% de mis clientes han quedado satisfechos.",
  },
  {
    question: "Puedo ver el progreso del desarrollo?",
    answer:
      "Absolutamente. Trabajo de forma iterativa con entregas parciales cada 1-2 semanas. Tienes acceso a un entorno de staging donde puedes ver y probar el proyecto en tiempo real. Tambien comparto actualizaciones regulares por WhatsApp o email.",
  },
  {
    question: "Que tecnologias usas?",
    answer:
      "Elijo las herramientas segun los objetivos y la escala del proyecto. Priorizo velocidad, seguridad y capacidad de crecer sin complicaciones, cuidando que la solucion sea facil de mantener.",
  },
  {
    question: "Ofreces mantenimiento continuo?",
    answer:
      "Si, despues del periodo de soporte inicial, ofrezco planes de mantenimiento mensuales que incluyen actualizaciones de seguridad, mejoras menores, monitoreo y soporte tecnico. La propuesta se ajusta a las necesidades del proyecto.",
  },
  {
    question: "Como funciona el pago?",
    answer:
      "Tipicamente trabajo con un 50% al inicio del proyecto y 50% al finalizar. Para proyectos mas grandes, podemos dividirlo en mas pagos segun hitos. Acepto transferencias bancarias, PayPal, o cripto (USDT).",
  },
]

export function FAQ() {
  return (
    <section className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Preguntas frecuentes</h2>
          <p className="section-subtitle">
            Todo lo que necesitas saber antes de trabajar conmigo. Si tienes mas dudas, puedes contactarme directamente.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
