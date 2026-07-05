"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Lang = "es" | "en"

type I18nContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  /** Return the string for the current language. Usage: t("Hola", "Hello") */
  t: (es: string, en: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es")

  // Resolve saved / browser preference on mount (client-only).
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang")
      if (saved === "es" || saved === "en") {
        setLangState(saved)
        document.documentElement.lang = saved
        return
      }
    } catch {}
    if (typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("en")) {
      setLangState("en")
      document.documentElement.lang = "en"
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem("lang", l)
    } catch {}
    if (typeof document !== "undefined") document.documentElement.lang = l
  }

  const t = (es: string, en: string) => (lang === "en" ? en : es)

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
}

/**
 * Access the current language + translator. Falls back to Spanish if used
 * outside the provider, so a component never crashes.
 */
export function useLang(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    return { lang: "es", setLang: () => {}, t: (es: string) => es }
  }
  return ctx
}

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang()
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      className={className}
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
      title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      {lang === "es" ? "EN" : "ES"}
    </button>
  )
}
