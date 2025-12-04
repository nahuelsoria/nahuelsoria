"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppFloat() {
  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hola! Vi tu portfolio y me interesa conocer más sobre tus servicios. ¿Podrías ayudarme?"
    )
    window.open(`https://wa.me/5491158794428?text=${message}`, "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={openWhatsApp}
        size="lg"
        className="rounded-full h-14 w-14 shadow-lg hover:scale-110 transition-transform bg-green-600 hover:bg-green-700"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
    </div>
  )
}

