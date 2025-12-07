"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { LucideIcon } from "lucide-react"
import { Mail, MessageCircle } from "lucide-react"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"

type ContactMethod = {
  title: string
  description: string
  icon: LucideIcon
  accent: "primary" | "accent"
}

export function Contact() {
  const contactMethods: ContactMethod[] = [
    {
      title: "Email",
      description: "jorgenahuelsoria@gmail.com",
      icon: Mail,
      accent: "primary",
    },
    {
      title: "WhatsApp",
      description: "+5491158794428",
      icon: MessageCircle,
      accent: "accent",
    },
    {
      title: "Formulario",
      description: "Envíame un mensaje",
      icon: Mail,
      accent: "primary",
    },
  ]

  const delayClasses = ["animate-delay-100", "animate-delay-200", "animate-delay-300"]
  const { ref, isVisible } = useInViewAnimation<HTMLDivElement>({ threshold: 0.2 })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Abrir cliente de email con los datos prellenados
    const subject = encodeURIComponent(`Consulta desde portfolio: ${formData.name}`)
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`
    )
    
    window.location.href = `mailto:jorgenahuelsoria@gmail.com?subject=${subject}&body=${body}`
    
    // También mostrar opción de WhatsApp
    const whatsappMessage = encodeURIComponent(
      `Hola Nahuel! Soy ${formData.name} (${formData.email}).\n\n${formData.message}`
    )
    
    // Opcional: abrir WhatsApp también
    setTimeout(() => {
      if (confirm("¿Prefieres contactar por WhatsApp? Es más rápido para responder.")) {
        window.open(`https://wa.me/5491158794428?text=${whatsappMessage}`, "_blank")
      }
    }, 500)
    
    // Reset form
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-card/50 scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
          <h2 className="section-title mb-4">Trabajemos juntos</h2>
          <p className="section-subtitle">
            ¿Tienes un proyecto en mente? Agenda una consulta gratuita de 30 minutos para evaluar tu idea y ver cómo puedo
            ayudarte a convertirla en realidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon

            return (
              <div
                key={method.title}
                className={`bg-card border border-border/50 rounded-lg p-8 text-center ${
                  isVisible ? `animate-fade-up ${delayClasses[index % delayClasses.length]}` : "reveal-offscreen"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      method.accent === "primary" ? "bg-primary/20" : "bg-accent/20"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${method.accent === "primary" ? "text-primary" : "text-accent"}`} />
                  </div>
                </div>
                <h3 className="font-bold mb-2">{method.title}</h3>
                <p className="text-muted-foreground">{method.description}</p>
              </div>
            )
          })}
        </div>

        <div className={`max-w-2xl mx-auto animate-delay-200 ${isVisible ? "animate-fade-up" : "reveal-offscreen"}`}>
          <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border/50 rounded-lg p-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nombre
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Cuéntame sobre tu proyecto..."
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Enviar mensaje
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
