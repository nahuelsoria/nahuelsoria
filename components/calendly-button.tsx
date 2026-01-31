"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { useState } from "react"

interface CalendlyButtonProps {
  type?: "default" | "outline"
  size?: "default" | "lg"
  className?: string
  text?: string
}

export function CalendlyButton({ 
  type = "default", 
  size = "default", 
  className = "",
  text = "Agendar Consulta Gratuita"
}: CalendlyButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCalendlyClick = () => {
    setIsLoading(true)
    // Por ahora, abre WhatsApp. Reemplazar con Calendly cuando esté configurado
    const message = encodeURIComponent(
      "Hola! Me gustaría agendar una consulta gratuita para evaluar mi proyecto."
    )
    window.open(`https://wa.me/5491158794428?text=${message}`, "_blank")
    
    // TODO: Reemplazar con Calendly cuando tengas la URL
    // const calendlyUrl = "https://calendly.com/tu-usuario/tipo-de-reunion"
    // window.open(calendlyUrl, "_blank")
    
    setIsLoading(false)
  }

  return (
    <Button
      onClick={handleCalendlyClick}
      disabled={isLoading}
      variant={type}
      size={size}
      className={`${className} group`}
    >
      <Calendar className={`w-4 h-4 mr-2 ${size === 'lg' ? 'w-5 h-5' : ''}`} />
      {isLoading ? "Abriendo..." : text}
      {!isLoading && <Calendar className={`w-4 h-4 ml-2 group-hover:rotate-12 transition-transform ${size === 'lg' ? 'w-5 h-5' : ''}`} />}
    </Button>
  )
}

// Componente flotante para Calendly
export function CalendlyFloatButton() {
  const [isVisible, setIsVisible] = useState(false)

  // Mostrar después de 3 segundos en la página
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-24 right-4 z-50 animate-fade-up">
      <Button
        size="lg"
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full px-4"
        onClick={() => {
          const message = encodeURIComponent(
            "Hola! Me gustaría agendar una consulta gratuita."
          )
          window.open(`https://wa.me/5491158794428?text=${message}`, "_blank")
        }}
      >
        <Calendar className="w-5 h-5 mr-2" />
        <span className="hidden sm:inline">Agendar ahora</span>
      </Button>
    </div>
  )
}