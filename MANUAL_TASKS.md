# Manual Tasks

Items that require your input or external setup.

> ⚠️ **URGENTE — por esto NO ves los cambios nuevos en producción:** el sitio está
> deployado y live en **https://nahuelsoria.vercel.app** (con todo lo nuevo: re-niche
> CTO fraccional, bilingüe ES/EN, booking, sin montos, etc.), pero **`nahuelsoria.com`
> NO está conectado a este proyecto de Vercel** (no figura en tu cuenta de Vercel y no
> resuelve en DNS). Hasta que conectes el dominio, tu URL no muestra nada nuevo.

0) Conectar el dominio nahuelsoria.com (URGENTE)
- En Vercel: proyecto `nahuelsoria` → Settings → Domains → Add → `nahuelsoria.com` (y `www.nahuelsoria.com`).
- Vercel te da los registros DNS. En tu registrador (donde compraste el dominio) configurá:
  - Apex `nahuelsoria.com`: registro **A** → `76.76.21.21`
  - `www`: registro **CNAME** → `cname.vercel-dns.com`
- Esperá propagación (minutos–horas) y verificá "Valid Configuration" en Vercel.
- Si el dominio ya está en otro proveedor/proyecto, primero desvinculalo de ahí.

1) Google Analytics
- Create GA4 property.
- Get NEXT_PUBLIC_GA_ID.
- Add it to .env.local and Vercel Environment Variables.

2) Case Studies Content
- Replace mock data in components/sections/CaseStudies.tsx with real clients.
- Write final case study copy.

3) Calendly (activa el botón "Agendar reunión gratuita")
- Create account and set up "Consulta Inicial" event.
- Get the scheduling link.
- Add NEXT_PUBLIC_CALENDLY_URL to .env.local and Vercel Environment Variables.
- Sin esto, el botón "Agendar" cae a WhatsApp (funciona igual, pero sin calendario).

4) Resend (captura de leads del formulario de contacto)
- Crear cuenta en resend.com (free 3k/mes); verificar un dominio o usar `onboarding@resend.dev`.
- Get RESEND_API_KEY.
- Add RESEND_API_KEY to Vercel Environment Variables.
- Sin esto, el form de contacto cae a `mailto` (el lead no se pierde, pero no llega solo a tu inbox).
- Alternativa: `CONTACT_WEBHOOK_URL` (Formspree/Zapier) en vez de Resend.
