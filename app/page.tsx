"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Results } from "@/components/results"
import { FeaturedProjects } from "@/components/featured-projects"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { Testimonials } from "@/components/testimonials"
import { About } from "@/components/about"
import { FAQ } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Results />
      <FeaturedProjects />
      <Services />
      <Process />
      <Testimonials />
      <About />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
