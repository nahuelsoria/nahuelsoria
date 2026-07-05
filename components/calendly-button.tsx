"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { useState } from "react"
import { openBooking } from "@/lib/booking"

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
    // Calendly si está configurado (NEXT_PUBLIC_CALENDLY_URL), si no WhatsApp.
    openBooking({
      label: "calendly_button",
      message: "Hola! Me gustaría agendar una consulta gratuita para evaluar mi proyecto.",
    })
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
        onClick={() =>
          openBooking({
            label: "calendly_float",
            message: "Hola! Me gustaría agendar una consulta gratuita.",
          })
        }
      >
        <Calendar className="w-5 h-5 mr-2" />
        <span className="hidden sm:inline">Agendar ahora</span>
      </Button>
    </div>
  )
}