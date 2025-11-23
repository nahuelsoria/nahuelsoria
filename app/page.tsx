"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedProjects } from "@/components/featured-projects"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturedProjects />
      <Services />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
