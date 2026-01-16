# Roadmap - Portfolio Nahuel Soria

## 🎯 Objetivo Q1 2026: Conversión y Autoridad
Transformar el portfolio de una vitrina estática a una herramienta de generación de leads cualificados.

---

## 📅 Hitos Q1 (Ene - Mar)

### ✅ Enero: Fundamentos de Medición (Completado)
- [x] Implementar Google Analytics 4 + Vercel Analytics (`lib/analytics.ts`)
- [x] Estructura de Casos de Éxito (`components/sections/CaseStudies.tsx`)
- [x] Estandarización de Agentes (`AGENTS.md`, `GEMINI.md`)

### 🚧 Febrero: Contenido y Conversión (Prioridad Actual)
- [ ] **Integrar sección Casos de Éxito**: Conectar el componente creado en la Home.
- [ ] **Tracking de Eventos**: Configurar eventos de conversión (Click en "Contactar", "Ver Proyecto").
- [ ] **Calendly**: Integrar botón de agendamiento flotante o en sección de contacto.
- [ ] **Pricing Tier Refinement**: Ajustar visualización de precios según `RECOMENDACIONES_CONVERSION.md`.

### 🔮 Marzo: SEO y Alcance
- [ ] **Blog Técnico**: Implementar MDX para artículos técnicos (SEO Long-tail).
- [ ] **Social Proof**: Agregar testimonios reales rotativos.
- [ ] **Performance**: Alcanzar 100/100 en Core Web Vitals (Mobile).

---

## 📅 Hitos Q2 (Abr - Jun)

### Automatización de Ventas
- [ ] **Lead Magnet**: Ofrecer "Checklist de Auditoría Técnica" a cambio de email.
- [ ] **Email Marketing**: Secuencia de bienvenida automática (ConvertKit/Resend).
- [ ] **CRM Lite**: Integración básica para seguimiento de leads (Notion/Airtable).

---

## 🛠️ Acciones Manuales Requeridas (Tareas del Usuario)
1. **Google Analytics**:
   - Crear propiedad en GA4.
   - Obtener `NEXT_PUBLIC_GA_ID`.
   - Agregarlo a `.env.local` y Vercel Environment Variables.
2. **Contenido Real**:
   - Reemplazar los mocks en `CaseStudies.tsx` con datos reales de clientes.
   - Redactar los textos finales de los casos de éxito.
3. **Calendly**:
   - Crear cuenta y configurar tipo de evento "Consulta Inicial".
   - Obtener link de agendamiento.

---

## 📊 Backlog Priorizado
1. **Integración UI Casos de Éxito** (High Impact)
2. **Configuración de Eventos GA4** (High Impact)
3. **Refactor Sección Servicios** (Medium Impact)
4. **Blog System (MDX)** (Long-term Value)
