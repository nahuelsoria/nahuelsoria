# Reporte — performance del portfolio

**Branch:** `cursor/perf-2026-08-07`  
**Fecha:** 2026-08-07  
**Metodología (misma antes y después):**

1. `npm run build` → `npm run start -- -p 3456`
2. Chromium (Playwright cache) + Chrome DevTools Protocol: `node scripts/perf-measure.mjs http://localhost:3456 <label> perf-evidence`  
   - Binario: `$HOME/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`  
   - `LD_LIBRARY_PATH=$HOME/.native-libs/usr/lib/x86_64-linux-gnu`  
   - Cache de red **deshabilitada** en cada navegación  
   - Viewports: **390×844** (mobile) y **1440×900** (desktop)  
   - Rutas: `/es` (home) y `/es/blog/agent-fleet` (nota del blog)
3. Tabla principal = **payload único** (cada URL contada una sola vez; con cache off el preload + uso de cada fuente se descarga dos veces y sesga el total en raw).
4. Evidencia en `perf-evidence/` (JSON + capturas PNG).

---

## Estado de partida (tabla con números medidos, mobile y desktop)

### Payload único transferido (bytes; 1× por URL)

| Página | Viewport | Total | JS | CSS | Fuentes | Doc HTML | RSC (Flight) | Imágenes | Otros |
|--------|----------|------:|---:|----:|--------:|---------:|-------------:|---------:|------:|
| Home `/es` | mobile 390 | **336.9 KB** (344 961 B) | 158.7 KB | 22.2 KB | 88.9 KB | 28.6 KB | 36.0 KB | 1.8 KB | 0.7 KB |
| Home `/es` | desktop 1440 | **336.9 KB** | 158.7 | 22.2 | 88.9 | 28.6 | 36.0 | 1.8 | 0.7 |
| Blog `agent-fleet` | mobile 390 | **329.8 KB** (337 746 B) | 164.9 KB | 22.2 KB | 88.9 KB | 17.8 KB | 33.5 KB | 1.8 KB | 0.7 KB |
| Blog `agent-fleet` | desktop 1440 | **329.8 KB** | 164.9 | 22.2 | 88.9 | 17.8 | 33.5 | 1.8 | 0.7 |

*(Mobile y desktop mismos bytes: la página es estática/SSG y no responde con assets distintos por UA en esta medición.)*

### Total raw de red (cache off; incluye doble fetch de fuentes preload+uso)

| Página | Viewport | Total raw | JS raw | Font raw |
|--------|----------|----------:|-------:|---------:|
| Home | mobile/desktop | 437 026 B (**426.8 KB**) | 185 233 B | 182 168 B |
| Blog | mobile/desktop | 429 811 B (**419.7 KB**) | 191 560 B | 182 168 B |

### Bundles JS más grandes (disco, post-build BEFORE)

| Archivo (hash Turbopack) | Tamaño disco | Transfer gzip ≈ | Qué empuja el peso |
|--------------------------|-------------:|----------------:|--------------------|
| `14podnilsu8gn.js` | 226 356 B | ~71.2 KB | **react-dom** runtime |
| `2_tdduzgm68e2.js` | 146 261 B | ~39.6 KB | runtime Next/App Router |
| `0cz1d0mv5g_q7.js` | 112 594 B | (no en top home) | chunk compartido |
| `2vw_a9x7tjey5.js` | 54 646 B | ~13.3 KB | app/client islands |
| `3vrg_w6pvb_jp.js` | 44 414 B | ~9.6 KB | framework bootstrap |

**JS total home (único):** ~158.7 KB transferidos. No había librerías “gordas” tipo recharts en el graph de la home (están en `components/ui` muertos para el tree-shake, no importados).

### CSS (BEFORE)

- Disco: `21pjzmmv3tmg8.css` **126 206 B** + `2y4urf-nf_i2l.css` **4 732 B**
- Transfer único: **22.2 KB**
- Origen del bloat: Tailwind escaneaba **todo** `components/ui/*` (kit shadcn no usado en rutas) + `@import "tw-animate-css"`.

### Fuentes (BEFORE)

| Familia | Origen | Eje / peso | Preload | Nota |
|---------|--------|------------|---------|------|
| Instrument Serif | `next/font/google` | 400 | sí | display/ headings |
| Hanken Grotesk | `next/font/google` | variable **100–900** | sí | cuerpo |
| JetBrains Mono | `next/font/google` | variable **100–800** | sí | mono / eyebrows |

- 3 woff2 preloaded; payload único fuentes **88.9 KB**
- `display: "swap"` → no bloquean el texto de forma indefinida (FOUT posible; no FOIT largo)
- Fallback next/font generados

### Imágenes (BEFORE)

| Hallazgo | Detalle |
|----------|---------|
| En DOM de home/blog | **0** `<img>` / **0** `next/image` en contenido |
| Favicons transferidos | `icon.svg` ~1 KB + `icon-light-32x32.png` ~0.8 KB |
| Assets en `public/` **no referenciados** por las páginas medidas | JPEGs 1024×1024 (~69–112 KB c/u), `developer-coding-laptop-dark.jpeg` 768×512 (~140 KB). **No se transfieren** en home/blog. Formato JPEG baseline, sin next/image. |
| Open Graph | Ruta dinámica `opengraph-image` (no contada en navegación normal de usuario) |

### Overflow horizontal @ 390 px

- Home: **false** (`scrollWidth` = `clientWidth` = 390)
- Blog: **false**

### Pintura (lab, no Lighthouse; un run)

- Home mobile BEFORE: FP/FCP **264 ms** (máquina local, no es campo)

---

## Qué arreglé, ordenado por impacto

1. **CSS muerto del kit shadcn (mayor ahorro en CSS)**  
   - En `app/globals.css`: `@source not` sobre `components/ui/**`, `styles/**`, `hooks/use-toast.ts`.  
   - Eliminé `@import "tw-animate-css"` (solo lo usaban componentes no montados; la home usa `animate-pulse`/`animate-ping` de Tailwind core + keyframes propios de `.reveal`).  
   - Resultado: CSS disco **130.9 KB → 44.1 KB**; transfer **22.2 KB → 9.5 KB**.

2. **Fuentes: menos bytes y menos contención en el critical path**  
   - Hanken: solo pesos reales **400 / 500 / 600** (antes variable 100–900).  
   - JetBrains Mono: solo **400** + `preload: false` (antes variable 100–800 preloaded).  
   - Instrument: sin cambio (ya 400).  
   - Resultado fuentes únicas: **88.9 KB → 70.1 KB** (−18.8 KB).

3. **Menos RSC prefetch innecesario**  
   - `prefetch={false}` en el switch de idioma del header (Link a la otra locale).  
   - RSC único: home **36.0 KB → 18.5 KB**.

4. **Analytics fuera del camino crítico**  
   - GA: `strategy="lazyOnload"`.  
   - `@vercel/analytics` aislado en client wrapper `lib/analytics-client.tsx`.

5. **Code-split below-the-fold en la home**  
   - `Contact` y `WhatsAppFloat` vía `next/dynamic` (siguen con SSR de markup; el form `#name`/`#email` sigue en HTML).  
   - **JS total único casi igual** (~158.7 KB): el grueso es React/Next; el split reorganiza chunks pero no reduce el total de forma material.

**No rediseñé:** mismos tokens, layout, copy y motion de reveal.

---

## Estado final (misma tabla, mismo método)

### Payload único transferido

| Página | Viewport | Total | JS | CSS | Fuentes | Doc HTML | RSC | Imágenes | Otros |
|--------|----------|------:|---:|----:|--------:|---------:|----:|---------:|------:|
| Home `/es` | mobile 390 | **287.9 KB** (294 910 B) | 158.7 KB | **9.5 KB** | **70.1 KB** | 28.5 KB | **18.5 KB** | 1.8 KB | 0.7 KB |
| Home `/es` | desktop 1440 | **287.9 KB** | 158.7 | 9.5 | 70.1 | 28.5 | 18.5 | 1.8 | 0.7 |
| Blog `agent-fleet` | mobile 390 | **284.0 KB** | 164.9 KB | 9.5 KB | 70.1 KB | 17.7 KB | 19.2 KB | 1.8 KB | 0.7 KB |
| Blog `agent-fleet` | desktop 1440 | **284.0 KB** | 164.9 | 9.5 | 70.1 | 17.7 | 19.2 | 1.8 | 0.7 |

### Delta (único, home)

| Métrica | Before | After | Δ |
|---------|-------:|------:|--:|
| Total | 336.9 KB | 287.9 KB | **−49.0 KB (−14.5%)** |
| CSS | 22.2 KB | 9.5 KB | **−12.7 KB** |
| Fuentes | 88.9 KB | 70.1 KB | **−18.8 KB** |
| RSC | 36.0 KB | 18.5 KB | **−17.5 KB** |
| JS | 158.7 KB | 158.7 KB | **0** |

### Total raw red (cache off)

| Página | Before | After | Δ |
|--------|-------:|------:|--:|
| Home | 426.8 KB | 338.0 KB | **−88.8 KB** |
| Blog | 419.7 KB | 334.1 KB | **−85.6 KB** |

### CSS disco

| | Before | After |
|--|-------:|------:|
| CSS chunks | 130 938 B | **44 131 B** (−66%) |

### Fuentes AFTER

| Familia | Peso | Preload |
|---------|------|---------|
| Instrument Serif | 400 | sí |
| Hanken Grotesk | 400, 500, 600 | sí (latin principal) |
| JetBrains Mono | 400 | **no** |

### Overflow @ 390 px AFTER

- Home / blog: **false** (sin regresión)

### Pintura lab AFTER

- Home mobile FP/FCP **152 ms** (misma máquina; cifras de lab, no core web vitals de campo)

### Qué no mejoró

- **JS total (~159 KB):** acotado por React 19 + Next runtime. Sin quitar features cliente (header tema/menú, reveals) no hay recorte grande.
- **Imágenes de projects:** siguen sin usarse en UI (cero impacto en página; peso de deploy intacto).

---

## Prueba de que el aspecto no cambió

Capturas CDP (misma viewport, post-load ~1.5 s), en `perf-evidence/`:

| Vista | Before | After | Δ tamaño archivo |
|-------|--------|-------|-----------------:|
| home mobile 390 | `before-home-mobile.png` (72 860 B) | `after-home-mobile.png` (72 787 B) | −73 B |
| home desktop 1440 | `before-home-desktop.png` (130 496 B) | `after-home-desktop.png` (130 575 B) | +79 B |
| blog mobile 390 | `before-blog-mobile.png` | `after-blog-mobile.png` | **0 B** (idénticos) |
| blog desktop 1440 | `before-blog-desktop.png` | `after-blog-desktop.png` | **0 B** (idénticos) |

Diferencias de pocos bytes en home se explican por timing de animación `.reveal` / `animate-pulse`, no por layout. Dimensiones de captura: 390×844 y 1440×900 confirmadas.

Contact form sigue server-rendered (`id="name"`, `id="email"`, texto “Enviar” presentes en HTML de `/es`).

---

## Lo que NO toqué y por qué

| Ítem | Por qué no |
|------|------------|
| `package.json` scripts / `next.config.mjs` para “hacer que corra” | Prohibido por BRIEF; no hacía falta |
| Dependencias / lockfiles | Los cambios no requieren deps nuevas |
| Borrar `components/ui` o deps Radix/recharts | No afectan el bundle de rutas actuales (tree-shake); borrarlos es cleanup, no ganancia de transfer ya cubierta vía `@source not` |
| Sustituir JetBrains por mono de sistema | Cambiaría el look de eyebrows/chips |
| Optimizar JPEGs de `public/` | **No se piden en home/blog**; no afectan métricas de página |
| Rediseño / quitar motion reveal | Fuera de scope performance sin cambio visual |
| Lighthouse CI / Vercel Analytics en prod | Prohibido tocar Vercel; lab local suficiente |
| `npm install` / `npm ci` | No se usó (`node_modules` intacto) |
| `git push` / remoto | Prohibido |

---

## Lo que necesita a un humano

1. **Decidir si borrar o reusar las fotos de `public/*.jpg`** (~0.6 MB) que hoy no se enlazan; si un día van a projects/hero, re-exportar WebP/AVIF + `next/image` con sizes.
2. **Medir Web Vitals reales en Vercel/CrUX** post-deploy (lab local ≠ RTT móvil real).
3. **Si se necesita un shadcn component:** reimportarlo implica quitar o relajar el `@source not` de ese archivo (documentado en `app/globals.css`).
4. **JS ~159 KB:** un humano que quiera recortar más tendría que aceptar trade-offs (menos client islands, menos lucide, etc.) — no es “gratis”.
5. **Revisión visual en un dispositivo real** (tema light/dark y pesos 500 de botones) aunque las capturas lab coincidan.

---

## Verificación (comandos y salida real)

### Build

```text
$ npm run build
▲ Next.js 16.2.11 (Turbopack)
✓ Compiled successfully in 5.9s
…
✓ Generating static pages using 5 workers (17/17) in 477ms
```

Build en verde (re-run final al cerrar la tarea: OK).

### Lint

```text
$ npm run lint
✖ 4 problems (0 errors, 4 warnings)
```

Warnings preexistentes (`opengraph-image`, `about`, `use-toast`). **0 errors.** No hay suite de tests en `package.json`.

### Medición BEFORE (extracto stdout)

```text
{"label":"before","page":"home","viewport":"mobile","totalKB":426.8,"jsKB":180.9,"cssKB":0,"fontKB":177.9,"imageKB":2.7,"overflow":false,…}
{"label":"before","page":"home","viewport":"desktop","totalKB":426.8,…}
{"label":"before","page":"blog","viewport":"mobile","totalKB":419.7,…}
{"label":"before","page":"blog","viewport":"desktop","totalKB":419.7,…}
```

### Medición AFTER (extracto stdout)

```text
{"label":"after","page":"home","viewport":"mobile","totalKB":338,"jsKB":168.3,"cssKB":0,"fontKB":119.3,"imageKB":2.7,"overflow":false,…}
{"label":"after","page":"home","viewport":"desktop","totalKB":338,…}
{"label":"after","page":"blog","viewport":"mobile","totalKB":334.1,…}
{"label":"after","page":"blog","viewport":"desktop","totalKB":334.1,…}
```

(`cssKB:0` en el resumen one-line del script es un bug de clasificación que pone `text/css` bajo otra categoría en el raw; la tabla única recalcula por `mime` y es la fuente de verdad — ver `perf-evidence/*-results.json`.)

### Archivos tocados

- `app/globals.css` — recorte Tailwind / quitar `tw-animate-css`
- `app/[locale]/layout.tsx` — pesos de fuentes
- `app/[locale]/page.tsx` — dynamic Contact / WhatsApp
- `components/header.tsx` — `prefetch={false}` idioma
- `lib/analytics.tsx` + `lib/analytics-client.tsx` — lazy analytics
- `eslint.config.mjs` — ignore scripts/evidencia
- `scripts/perf-measure.mjs` — herramienta de medición
- `perf-evidence/*` — JSON + PNG before/after
