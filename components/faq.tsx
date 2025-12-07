"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "¿Cuánto tiempo toma desarrollar un proyecto?",
    answer:
      "Depende del alcance, pero típicamente: Landing Pages (1-2 semanas), Web Apps (3-6 semanas), ERPs/sistemas enterprise (6-12 semanas). Trabajo en sprints de 1-2 semanas con entregas parciales para que veas el progreso.",
  },
  {
    question: "¿Trabajas con empresas fuera de Argentina?",
    answer:
      "Sí, trabajo con clientes de todo el mundo. Tengo experiencia trabajando con equipos distribuidos y puedo adaptarme a diferentes zonas horarias. Los pagos se pueden hacer en USD o ARS.",
  },
  {
    question: "¿Qué incluye el soporte post-entrega?",
    answer:
      "Todos los proyectos incluyen 30 días de soporte gratuito post-entrega. Esto cubre corrección de bugs, ajustes menores y consultas técnicas. Después de ese período, ofrezco planes de mantenimiento mensuales opcionales.",
  },
  {
    question: "¿Qué pasa si no estoy satisfecho con el resultado?",
    answer:
      "Tengo una garantía de satisfacción. Si no cumplimos con los objetivos acordados en la propuesta inicial, te devuelvo tu dinero. Hasta ahora, el 100% de mis clientes han quedado satisfechos.",
  },
  {
    question: "¿Puedo ver el progreso del desarrollo?",
    answer:
      "Absolutamente. Trabajo de forma iterativa con entregas parciales cada 1-2 semanas. Tienes acceso a un entorno de staging donde puedes ver y probar el proyecto en tiempo real. También comparto actualizaciones regulares por WhatsApp o email.",
  },
  {
    question: "¿Qué tecnologías usas?",
    answer:
      "Principalmente Next.js, React, TypeScript, Firebase (Firestore, Auth, Functions), Tailwind CSS. Para bases de datos más complejas uso PostgreSQL. También tengo experiencia con integraciones de APIs, pagos (Stripe, MercadoPago), y automatizaciones con IA.",
  },
  {
    question: "¿Ofreces mantenimiento continuo?",
    answer:
      "Sí, después del período de soporte inicial, ofrezco planes de mantenimiento mensuales que incluyen actualizaciones de seguridad, mejoras menores, monitoreo y soporte técnico. Los precios varían según las necesidades del proyecto.",
  },
  {
    question: "¿Cómo funciona el pago?",
    answer:
      "Típicamente trabajo con un 50% al inicio del proyecto y 50% al finalizar. Para proyectos más grandes, podemos dividirlo en más pagos según hitos. Acepto transferencias bancarias, PayPal, o cripto (USDT).",
  },
]

export function FAQ() {
  return (
    <section className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Preguntas frecuentes</h2>
          <p className="section-subtitle">
            Todo lo que necesitas saber antes de trabajar conmigo. Si tienes más dudas, 
            <a href="#contact" className="text-primary hover:underline ml-1">
              contáctame directamente
            </a>
            .
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
