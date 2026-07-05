# Portfolio 2026 — Estado de tareas

> Nota: el workspace de Linear alcanzó el límite de issues del plan free, así que este
> archivo hace de tracker. Migrar a Linear cuando se libere cupo (mismo contenido).
> Sitio en producción: https://nahuelsoria.vercel.app

## ✅ Hechas

### Rediseño 2026 — bilingüe ES/EN + SEO/GEO  · `Done`
Rediseño completo (PR #19, en `main`, deployado). Identidad editorial-fintech, `app/[locale]`
Server Components, i18n ES/EN, data de proyectos unificada y honesta, "+$20M USD procesados"
(agregado), SEO/GEO (JSON-LD, hreflang, sitemap bilingüe, `/llms.txt`, OG image, manifest, 404 de marca).
Specs: issues #16/#17/#18 + `/specs`.

### Calendly + API de contacto  · `Done`
Calendly (`https://calendly.com/nahuelsoria/30min`) en header, hero y contacto (`NEXT_PUBLIC_CALENDLY_URL`).
Form hace POST a `app/api/contact` (Resend/webhook) con fallback a mailto y estado de envío.

## ⬜ Pendientes (bloqueadas en el owner)

### 1. Configurar Google Analytics 4  · `Todo` · high
Código ya cableado (`lib/analytics.tsx`). Falta:
- [ ] Crear propiedad GA4 y obtener `G-XXXXXXXXXX`.
- [ ] Setear `NEXT_PUBLIC_GA_ID` en Vercel + `.env.local`.
- [ ] Redeploy y verificar eventos en tiempo real. (Vercel Analytics ya activo.)

### 2. Comprar dominio nahuelsoria.com  · `Todo` · high
Hoy en `nahuelsoria.vercel.app`.
- [ ] Comprar `nahuelsoria.com`, agregarlo en Vercel (DNS/SSL).
- [ ] Setear `NEXT_PUBLIC_SITE_URL=https://nahuelsoria.com` (el código ya lo lee — cero cambios).
- [ ] Verificar canonical/hreflang/sitemap/OG con el dominio nuevo.

### 3. Conectar Resend para el formulario  · `Todo` · medium
`app/api/contact` listo; sin proveedor cae a mailto.
- [ ] Crear cuenta Resend + API key; (opcional) verificar dominio remitente y `CONTACT_FROM`.
- [ ] Setear `RESEND_API_KEY` en Vercel y probar end-to-end.
- Alternativa: `CONTACT_WEBHOOK_URL` (Formspree/Zapier/n8n).

## 🟡 Decisiones abiertas
- **README** del repo (= perfil público de GitHub) dice "fractional CTO"; el sitio dice "dev a medida". Definir si se alinea.
- **Foto de perfil real** para mejorar OG/JSON-LD (hoy usa OG de marca genérica).

## 🗄️ Obsoletas (del plan viejo, ya no aplican)
- ~~Screenshots de CaseStudies (Bruselascambio/CondorFX)~~ — el rediseño no usa esa sección; los proyectos se muestran con data real, sin mockups.
- ~~Actualizar `components/calendly-button.tsx`~~ — componente eliminado; Calendly va por `site.calendly`.
