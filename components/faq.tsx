"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLang } from "@/lib/i18n"

export function FAQ() {
  const { t } = useLang()

  const faqs = [
    {
      question: t("¿Cuánto tiempo toma desarrollar un proyecto?", "How long does a project take?"),
      answer: t(
        "Depende del alcance, pero típicamente: Landing Pages (1-2 semanas), Web Apps (3-6 semanas), ERPs/sistemas enterprise (6-12 semanas). Trabajo en sprints de 1-2 semanas con entregas parciales para que veas el progreso.",
        "It depends on scope, but typically: Landing pages (1-2 weeks), Web apps (3-6 weeks), ERPs/enterprise systems (6-12 weeks). I work in 1-2 week sprints with partial deliveries so you can see progress.",
      ),
    },
    {
      question: t("¿Trabajás con empresas fuera de Argentina?", "Do you work with companies outside Argentina?"),
      answer: t(
        "Sí, trabajo con clientes de todo el mundo. Tengo experiencia con equipos distribuidos y me adapto a diferentes zonas horarias. Los pagos se pueden hacer en USD o ARS.",
        "Yes, I work with clients worldwide. I have experience with distributed teams and adapt to different time zones. Payments can be made in USD or ARS.",
      ),
    },
    {
      question: t("¿Qué incluye el soporte post-entrega?", "What does post-delivery support include?"),
      answer: t(
        "Todos los proyectos incluyen 30 días de soporte gratuito post-entrega. Cubre corrección de bugs, ajustes menores y consultas técnicas. Después de ese período, ofrezco planes de mantenimiento mensuales opcionales.",
        "Every project includes 30 days of free post-delivery support, covering bug fixes, minor tweaks and technical questions. After that, I offer optional monthly maintenance plans.",
      ),
    },
    {
      question: t("¿Qué pasa si no estoy satisfecho con el resultado?", "What if I'm not satisfied with the result?"),
      answer: t(
        "Tengo una garantía de satisfacción. Si no cumplimos con los objetivos acordados en la propuesta inicial, te devuelvo tu dinero.",
        "I offer a satisfaction guarantee. If we don't meet the goals agreed in the initial proposal, I refund your money.",
      ),
    },
    {
      question: t("¿Puedo ver el progreso del desarrollo?", "Can I see development progress?"),
      answer: t(
        "Absolutamente. Trabajo de forma iterativa con entregas parciales cada 1-2 semanas. Tenés acceso a un entorno de staging donde podés ver y probar el proyecto en tiempo real. También comparto actualizaciones regulares por WhatsApp o email.",
        "Absolutely. I work iteratively with partial deliveries every 1-2 weeks. You get access to a staging environment where you can see and test the project in real time. I also share regular updates via WhatsApp or email.",
      ),
    },
    {
      question: t("¿Qué tecnologías usás?", "What technologies do you use?"),
      answer: t(
        "Elijo las herramientas según los objetivos y la escala del proyecto. Priorizo velocidad, seguridad y capacidad de crecer sin complicaciones, cuidando que la solución sea fácil de mantener.",
        "I pick tools based on the goals and scale of the project. I prioritize speed, security and the ability to grow without friction, keeping the solution easy to maintain.",
      ),
    },
    {
      question: t("¿Ofrecés mantenimiento continuo?", "Do you offer ongoing maintenance?"),
      answer: t(
        "Sí, después del período de soporte inicial ofrezco planes de mantenimiento mensuales que incluyen actualizaciones de seguridad, mejoras menores, monitoreo y soporte técnico. La propuesta se ajusta a las necesidades del proyecto.",
        "Yes, after the initial support period I offer monthly maintenance plans that include security updates, minor improvements, monitoring and technical support. The plan is tailored to the project's needs.",
      ),
    },
    {
      question: t("¿Cómo funciona el pago?", "How does payment work?"),
      answer: t(
        "Típicamente trabajo con un 50% al inicio del proyecto y 50% al finalizar. Para proyectos más grandes, podemos dividirlo en más pagos según hitos. Acepto transferencias bancarias, PayPal o cripto (USDT).",
        "I typically work with 50% upfront and 50% on completion. For larger projects, we can split it into more payments by milestone. I accept bank transfers, PayPal or crypto (USDT).",
      ),
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">{t("Preguntas frecuentes", "Frequently asked questions")}</h2>
          <p className="section-subtitle">
            {t(
              "Todo lo que necesitás saber antes de trabajar conmigo. Si tenés más dudas, podés contactarme directamente.",
              "Everything you need to know before working with me. If you have more questions, reach out directly.",
            )}
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
