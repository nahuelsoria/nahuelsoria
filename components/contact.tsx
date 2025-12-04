"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, MessageCircle } from "lucide-react"

export function Contact() {
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
    <section id="contact" className="py-20 md:py-32 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Trabajemos juntos</h2>
          <p className="section-subtitle">
            ¿Tienes un proyecto en mente? <strong className="text-foreground">Consulta gratuita de 30 minutos</strong> para 
            evaluar tu idea y ver cómo puedo ayudarte a hacerla realidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card border border-border/50 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-muted-foreground">jorgenahuelsoria@gmail.com</p>
          </div>

          <div className="bg-card border border-border/50 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-accent" />
              </div>
            </div>
            <h3 className="font-bold mb-2">WhatsApp</h3>
            <p className="text-muted-foreground">+5491158794428</p>
          </div>

          <div className="bg-card border border-border/50 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="font-bold mb-2">Formulario</h3>
            <p className="text-muted-foreground">Envíame un mensaje</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
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
