# SPEC-03 — Arquitectura i18n + Modelo de contenido

> Reestructura a Server Components + bilingüe ES/EN, y **resuelve la duplicación/contradicción de datos** actual (los proyectos aparecen en dos secciones con métricas incompatibles; los testimonios son placeholder).

## 1. Estructura de carpetas objetivo

```
app/
  layout.tsx              # root: <html>, fonts, tema, analytics
  [locale]/
    layout.tsx            # setea lang, valida locale, JSON-LD
    page.tsx              # home (Server Component) — compone secciones
  sitemap.ts
  robots.ts
  opengraph-image.tsx     # OG dinámico (opcional)
content/
  site.ts                 # config única: url, contacto, redes, métricas
  es.ts / en.ts           # diccionarios de copy por idioma
  projects.ts             # datos canónicos de proyectos (neutral + i18n)
  types.ts                # tipos compartidos (contrato para componentes)
lib/
  i18n.ts                 # getDictionary(locale), locales, defaultLocale
components/
  sections/*              # Server Components (contenido)
  ui/*                    # islas cliente mínimas (header, form, floats)
middleware.ts             # redirect '/' → '/es', negociación de idioma
```

## 2. i18n

- `locales = ['es', 'en']`, `defaultLocale = 'es'`.
- `middleware.ts`: si la ruta no tiene locale, redirigir según `Accept-Language` (fallback `es`).
- `getDictionary(locale)` importa `content/{locale}.ts` (tipado con `Dictionary`).
- Toggle de idioma en el header preserva la sección (hash) y conmuta el prefijo de ruta.
- Todo texto visible sale del diccionario. Los **datos** (proyectos, contacto, métricas) viven en `projects.ts`/`site.ts` con campos localizados donde corresponde (`{ es, en }`).

## 3. Config única — `content/site.ts`

```ts
export const site = {
  url: 'https://nahuelsoria.com',
  name: 'Nahuel Soria',
  email: 'jorgenahuelsoria@gmail.com',
  whatsapp: '5491158794428',
  location: { city: 'Buenos Aires', country: 'AR' },
  social: {
    github: 'https://github.com/nahuelsoria',
    linkedin: 'https://www.linkedin.com/in/nahuelsoria/',
    x: 'https://twitter.com/nahhwe',
  },
  calendlyEnv: 'NEXT_PUBLIC_CALENDLY_URL', // opcional
}
```
> Cambiar dominio/contacto = editar **un** archivo.

## 4. Métricas — política de honestidad

Cada métrica lleva `status: 'confirmed' | 'unverified'`. Las `unverified` **no** se muestran como cifras duras hasta que el owner las confirme; se muestran cualitativamente o se ocultan. Nada de social proof inventado.

| Métrica | Valor actual en el sitio | Status | Acción |
|---------|--------------------------|--------|--------|
| USD procesados | "+$2M" | unverified (auto-reportado, agregado) | Confirmar cifra y periodo. Mostrar como "+$2M procesados" sólo si el owner lo ratifica. |
| Usuarios activos | "1000+" | unverified | Confirmar de qué producto. |
| Descargas | "10K+" | unverified/placeholder | Confirmar o reemplazar por cualitativo. |
| Años exp. | "4+" | confirmed (trayectoria GitHub 2024→2026) | OK. |
| Proyectos | "10+" | confirmed (14 repos públicos) | OK. |
| Testimonios | 3 quotes | **placeholder** | **No publicar.** Ocultos hasta tener reales con nombre/empresa verificables. |

> ⚠️ Los números marcados `unverified` quedan en `site.ts` con el flag; el owner los ratifica. El componente sólo renderiza `confirmed` como cifra dura.

## 5. Modelo canónico de proyectos — `content/projects.ts`

**Un solo array** (reemplaza `FeaturedProjects` + `CaseStudies`, hoy contradictorios). Fuente: repos reales de GitHub + README.

```ts
type Project = {
  slug: string
  name: string
  category: { es: string; en: string }
  role: { es: string; en: string }
  summary: { es: string; en: string }
  highlights: { es: string; en: string }[]   // 2–3 bullets técnicos
  stack: string[]
  status: 'production' | 'active' | 'mvp'
  links?: { repo?: string; live?: string }
  metric?: { value: string; label: {es;en}; status: 'confirmed'|'unverified' }
}
```

Proyectos canónicos (orden = jerarquía):

1. **bridgewater-payments** — *B2B fintech infrastructure*. Rol: sole technical owner. Highlights: KYC/KYB onboarding con audit trails · virtual accounts + fiat off-ramps · settlement rules engine · backoffice operativo. Stack: Next.js, Node.js, PostgreSQL/Firebase, Vercel, Cloudflare. Status: production. Repo pinned.
2. **condor-otc** — *Cross-border payments & exchange* (empresa propia, CondorOTC). Rol: CTO/Technical Lead. Highlights: integraciones multi-provider tras interfaz común · operaciones multi-moneda · tooling interno del desk. Stack: TS, Next.js, Node.js, PostgreSQL. Status: production.
3. **llm-audit** — *AI code/security auditing*. Highlights: orquestación de agentes LLM (seguridad, calidad, UX, arquitectura) → reporte priorizado. Stack: Python, TS, LLM APIs. Status: active.
4. **picaday** — *Photo journal (producto propio)*. Highlights: LCP < 2.5s · E2E con Playwright · Web Workers para compresión de imágenes. Stack: Next.js, Firebase, Tailwind. Status: mvp/production-ready.
5. **numerai** — *Personal finance tracker (producto propio)*. Highlights: categorización de gastos por IA vía WhatsApp · multi-moneda (ARS/USD/EUR) · pagos Dodo + MercadoPago. Stack: Next.js, Firebase, WhatsApp API. Status: mvp.
6. **what-i-wish** — *Social wishlist (producto propio)*. Highlights: onboarding < 60s · viralización vía WhatsApp. Stack: React Native, Firebase. Métrica de descargas `unverified`.

> Se descartan del render las métricas contradictorias previas ($1M/día, €500K/mes, 15K MAU, etc.) por no ser consistentes ni verificables. Si el owner las confirma, se agregan con `status: 'confirmed'`.

## 6. Secciones de la home (orden final)

1. **Header** (isla cliente): logo, nav, toggle idioma, toggle tema.
2. **Hero**: propuesta de valor + oración GEO-friendly + 2 CTAs + panel de datos/stats.
3. **Proof strip**: stats confirmadas + links a proyectos reales (reemplaza testimonios falsos).
4. **Projects** (unificado): grilla de 6 case studies canónicos.
5. **Services**: 5 servicios (Landing/Web, SaaS/Web App, ERP/sistemas, Fintech/pagos, Consultoría CTO).
6. **Process**: 4 pasos (consulta → propuesta → build iterativo → entrega+soporte).
7. **About**: bio GEO-friendly, stack, ubicación, principios de trabajo.
8. **FAQ**: 8 preguntas (insumo de FAQPage JSON-LD).
9. **Contact**: email, WhatsApp, form (mailto), Calendly si hay env.
10. **Footer**: navegación, redes, legal.
11. Floats: WhatsApp.
12. **Testimonials**: componente existe pero **oculto** hasta tener datos reales.

## 7. Contrato para desarrollo en paralelo

- `content/types.ts` define `Dictionary`, `Project`, `SiteConfig`. Congelado antes de repartir secciones.
- Cada sección: **Server Component** que recibe `{ dict, locale }` (y datos de `content/*`). Sin estado.
- Islas cliente (header, form, floats): `"use client"`, importadas puntualmente.
- Tokens/utilidades de estilo definidos en `globals.css` **antes** de repartir; los componentes sólo consumen clases/vars.
- `Hero` es la referencia visual; el resto sigue su lenguaje (eyebrow mono, serif en títulos, grilla, acento único).
