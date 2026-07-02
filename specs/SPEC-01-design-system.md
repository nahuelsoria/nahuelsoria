# SPEC-01 — Design System

> Portfolio de Nahuel Soria. Rediseño 2026. Objetivo: pasar de "plantilla v0/shadcn genérica" a una identidad visual memorable, técnica y confiable que comunique *"ingeniero de infraestructura fintech que piensa como founder"*.

## 1. Dirección estética

**Concepto:** *Financial infrastructure, editorial soul.* Dark-first, cálido, preciso. Referencias: terminales financieras, documentación técnica de calidad, editorial impreso. Restraint sobre ruido: el lujo está en el espaciado, la tipografía y el detalle, no en efectos.

**Principios**
1. **Precisión.** Grilla visible y fina, alineación estricta, datos en monoespaciada.
2. **Jerarquía por contraste,** no por cantidad de color. Un solo acento.
3. **Honestidad.** Cada métrica es verificable o está claramente atribuida. Nada de social proof falso.
4. **Motion con propósito.** Un reveal escalonado por sección; sin animaciones decorativas que distraigan. Respetar `prefers-reduced-motion`.

## 2. Tipografía

Tres voces, cargadas con `next/font` (self-hosted, sin requests externos → sin CSP issues, mejor LCP).

| Rol | Fuente | Uso |
|-----|--------|-----|
| Display / titulares | **Instrument Serif** | H1–H2, statements grandes. Editorial, alto contraste, poco común en portfolios dev. |
| Cuerpo / UI | **Hanken Grotesk** | Párrafos, botones, navegación. Grotesque cálido, alternativa distintiva a Inter. |
| Datos / labels | **JetBrains Mono** | Eyebrows/kickers, métricas, tags, números, "terminal" feel. |

**Escala** (fluida con `clamp`): display 3.5–6rem · h2 2–3rem · h3 1.25–1.5rem · body 1–1.125rem · mono-label 0.75–0.8125rem (uppercase, letter-spacing 0.08em).

**Reglas:** titulares en serif con `text-wrap: balance`; párrafos `max-width: 60ch`; números siempre en mono con `font-variant-numeric: tabular-nums`.

## 3. Color (tokens OKLCH)

Un acento: **verde-señal** (mercados / "up and to the right"). Fondo casi-negro cálido, texto hueso.

### Dark (default)
```
--bg:            oklch(0.16 0.008 120)   /* casi negro, tinte verde cálido */
--bg-elev:       oklch(0.20 0.010 120)   /* cards */
--fg:            oklch(0.94 0.010 90)     /* hueso */
--fg-muted:      oklch(0.70 0.012 110)
--accent:        oklch(0.82 0.19 135)     /* verde señal */
--accent-fg:     oklch(0.18 0.02 140)     /* texto sobre acento */
--line:          oklch(0.30 0.010 120)    /* grillas/bordes */
--danger:        oklch(0.63 0.22 25)
```

### Light (toggle)
```
--bg:            oklch(0.97 0.008 95)     /* papel/hueso */
--bg-elev:       oklch(0.99 0.004 95)
--fg:            oklch(0.22 0.02 140)     /* tinta */
--fg-muted:      oklch(0.45 0.02 140)
--accent:        oklch(0.62 0.16 140)     /* verde oscurecido p/ contraste AA */
--accent-fg:     oklch(0.98 0.01 95)
--line:          oklch(0.86 0.010 120)
```

**Contraste:** todo texto ≥ 4.5:1 (AA). El acento nunca se usa como fondo de texto largo; sólo en botones, subrayados, líneas y highlights de números.

## 4. Layout & espaciado

- Contenedor: `max-width: 72rem` (1152px), padding lateral `clamp(1rem, 5vw, 2rem)`.
- **Grilla de referencia visible:** líneas verticales finas (`--line`) que estructuran sin dominar; motivo recurrente en hero y separadores de sección.
- Escala de espaciado base 4px. Secciones: `padding-block: clamp(5rem, 12vh, 9rem)`.
- Composición: romper la simetría en hero (texto ancho + panel de datos angosto), alineación a grilla en el resto.

## 5. Componentes clave

- **Eyebrow/kicker:** mono, uppercase, con guion o `//` prefix y punto de acento. Ej: `// 01 — Servicios`.
- **Botón primario:** fondo acento, texto oscuro, sin sombra; hover: leve translate + underline animado.
- **Botón secundario:** borde `--line`, texto `--fg`; hover: borde acento.
- **Card de proyecto:** fondo `--bg-elev`, borde `--line`, esquina con índice mono, tags mono, línea de métrica destacada. Hover: borde acento + elevación sutil.
- **Stat/métrica:** número grande en mono con `tabular-nums`, label debajo, y (si aplica) badge de fuente/atribución.
- **Separador de sección:** línea + label mono con número de sección.

## 6. Motion

- Reveal on-scroll: `opacity 0→1`, `translateY(12px→0)`, stagger 60–90ms por hijo. Ya existe `use-in-view-animation`; reutilizar.
- Load del hero: stagger de 4 elementos.
- Hover: transiciones 150–200ms `ease-out`.
- `prefers-reduced-motion: reduce` → sin transform/blur, sólo fade instantáneo.

## 7. Accesibilidad (no negociable)

- Semántica: un solo `<h1>`, jerarquía correcta, landmarks (`header/main/footer/nav`), `section` con `aria-labelledby`.
- Foco visible en todo interactivo (ring de acento).
- Targets ≥ 44px. Labels en formularios. `alt` descriptivo en imágenes.
- Toggle de tema y de idioma accesibles por teclado.

## 8. Anti-objetivos (qué NO hacer)

- Nada de gradientes cian→durazno ni "purple gradient on white".
- Nada de fuentes del sistema/Inter/Roboto como voz principal.
- Nada de cards uniformes shadcn sin personalidad.
- Nada de sombras difusas genéricas; preferir bordes finos y contraste.
