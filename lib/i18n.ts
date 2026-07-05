import type { Dictionary, Locale } from "@/content/types"
import { es } from "@/content/es"
import { en } from "@/content/en"
import { locales, defaultLocale } from "@/content/site"

const dictionaries: Record<Locale, Dictionary> = { es, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale]
}

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value)
}

export { locales, defaultLocale }
export type { Locale, Dictionary }
