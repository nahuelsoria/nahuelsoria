import { notFound } from "next/navigation"
import { getDictionary, isLocale } from "@/lib/i18n"
import { buildFaqJsonLd } from "@/lib/jsonld"
import { Header } from "@/components/header"
import { Hero } from "@/components/sections/hero"
import { Proof } from "@/components/sections/proof"
import { Projects } from "@/components/sections/projects"
import { Services } from "@/components/sections/services"
import { Process } from "@/components/sections/process"
import { About } from "@/components/sections/about"
import { Faq } from "@/components/sections/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/sections/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const faqLd = buildFaqJsonLd(locale)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Header dict={dict} locale={locale} />
      <main>
        <Hero dict={dict} locale={locale} />
        <Proof dict={dict} locale={locale} />
        <Projects dict={dict} locale={locale} />
        <Services dict={dict} locale={locale} />
        <Process dict={dict} locale={locale} />
        <About dict={dict} locale={locale} />
        <Faq dict={dict} locale={locale} />
        <Contact dict={dict} locale={locale} />
      </main>
      <Footer dict={dict} locale={locale} />
      <WhatsAppFloat locale={locale} />
    </>
  )
}
