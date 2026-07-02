# SPEC-02 — SEO & GEO (Generative Engine Optimization)

> Objetivo doble: rankear en Google (SEO clásico) **y** ser citado por motores generativos —ChatGPT, Perplexity, Google AI Overviews, Claude— cuando alguien pregunta *"¿quién puede construir un sistema de pagos / un SaaS a medida en Argentina?"* (GEO).

## 1. Estado actual (problemas)

- `app/page.tsx` es `"use client"` → toda la home se hidrata en cliente; el contenido llega pobre al crawler y a los scrapers de LLMs. **Bloqueante.**
- Sin datos estructurados (JSON-LD). Los motores generativos dependen de contenido semántico + schema para entender y citar.
- Sitemap/robots mínimos; sin `hreflang` (el sitio será bilingüe ES/EN).
- OG apunta a una foto genérica; sin OG dinámico por idioma.

## 2. Arquitectura de renderizado

- **Server Components por defecto.** Sólo islas cliente donde haga falta interacción (header/toggle, formulario, floats). El contenido textual (hero, proyectos, servicios, FAQ, about) se renderiza en el servidor.
- Rutas por idioma: `app/[locale]/…` con `locale ∈ {es, en}`, `generateStaticParams`. `es` es el default.
- `generateMetadata` por locale: title, description, canonical, `alternates.languages` (hreflang), OG/Twitter localizados.

## 3. Metadata (por página y locale)

- `metadataBase` = dominio canónico.
- Title pattern: `Nahuel Soria — {rol localizado}` (~55–60 chars).
- Description 150–160 chars, con propuesta de valor + prueba (métrica) + ubicación.
- `alternates`: `canonical` + `languages: { 'es-AR', 'en', 'x-default' }`.
- OpenGraph `type: profile`/`website`, `locale` + `alternateLocale`, imagen 1200×630 por idioma.
- Twitter `summary_large_image`.
- `robots`: index/follow, `max-image-preview:large`.

## 4. Datos estructurados (JSON-LD) — núcleo del GEO

Inyectar `<script type="application/ld+json">` desde Server Components. Grafo mínimo:

1. **Person** — `name`, `jobTitle`, `url`, `image`, `sameAs` (GitHub, LinkedIn, X), `knowsAbout` (fintech, payments, KYC/KYB, Next.js, Node.js, SaaS…), `address` (Buenos Aires, AR), `email`.
2. **ProfessionalService** / **Organization** — el servicio de desarrollo: `name`, `provider` (→ Person), `areaServed` (AR + Worldwide/remote), `serviceType` (Software development, Fintech, SaaS), `knowsAbout`, `sameAs`.
3. **WebSite** — con `inLanguage` y potencialmente `SearchAction`.
4. **FAQPage** — todas las preguntas/respuestas del FAQ (alto valor para AI Overviews y rich results).
5. **BreadcrumbList** — si se agregan páginas de caso de estudio.
6. **ItemList de CreativeWork/SoftwareApplication** — un item por proyecto (Bridgewater, Condor OTC, LLM Audit, Picaday, Numerai, What I Wish) con `name`, `description`, `applicationCategory`, `url`.

Cada bloque validado contra schema.org y Rich Results Test.

## 5. Optimización para motores generativos (GEO)

Los LLMs citan contenido que es **claro, estructurado, atribuible y auto-contenido**:

- **Respuestas directas en prosa.** Cada sección abre con una oración declarativa que responde "qué/quién/cómo" sin depender del contexto visual. Ej: *"Nahuel Soria es un desarrollador de software fintech basado en Buenos Aires que construye sistemas de pagos, SaaS y automatizaciones a medida."*
- **Entidades explícitas:** nombrar tecnologías, dominios y ubicaciones en texto (no sólo en íconos/tags visuales).
- **Q&A semántico:** el FAQ cubre las preguntas reales que un prospecto le haría a un LLM ("cuánto cuesta", "cuánto tarda", "trabaja con empresas fuera de Argentina", "qué stack usa"). Esto es lo que se cita.
- **Cifras atribuidas:** cada número acompañado de contexto/fuente. Nada de métricas huérfanas.
- **`llms.txt`** en la raíz (`/public/llms.txt` o route) resumiendo quién es, qué ofrece, proyectos y contacto en markdown plano — formato pensado para ingestión por LLMs.
- **Contenido crawleable sin JS** (ver §2) para que los scrapers de LLM lo lean.

## 6. Sitemap & robots

- `sitemap.ts` dinámico: una entrada por locale (`/es`, `/en`) con `alternates.languages`. Si se agregan case studies, incluirlos.
- `robots.ts`: allow all, apuntar al sitemap, host canónico. Permitir explícitamente bots de IA relevantes (GPTBot, PerplexityBot, ClaudeBot, Google-Extended) — decisión del owner; por defecto **permitir** (queremos ser citados).

## 7. Performance (Core Web Vitals — insumo de ranking)

- LCP < 2.5s: hero sin imagen pesada bloqueante; `next/font` con `display: swap`; imágenes `next/image` con `priority` sólo en el hero.
- CLS ~0: dimensiones explícitas en media, fuentes con fallback métrico.
- JS mínimo en cliente (Server Components). Objetivo Lighthouse ≥ 95 en las 4 categorías, mobile.

## 8. Checklist de aceptación

- [ ] Home renderiza contenido completo con JS deshabilitado.
- [ ] `hreflang` es/en/x-default correctos y recíprocos.
- [ ] JSON-LD: Person, ProfessionalService, WebSite, FAQPage válidos (Rich Results Test).
- [ ] Sitemap y robots correctos, con altern.
- [ ] OG por idioma renderiza en el validador de LinkedIn/X.
- [ ] `llms.txt` accesible.
- [ ] Lighthouse mobile ≥ 95 en Performance, A11y, Best Practices, SEO.
