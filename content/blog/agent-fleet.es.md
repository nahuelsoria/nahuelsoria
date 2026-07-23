---
title: Una flota de agentes opera mi infraestructura mientras duermo
description: Cómo diseñé una flota de ~20 agentes de IA que monitorea, diagnostica y repara mi infraestructura en producción, y por qué ninguno puede tocar plata.
date: 2026-07-23
tags: Agentes de IA, DevOps, Automatización
---

Soy un dev solo operando varios productos propios y la infraestructura de dos plataformas fintech. Hace unos meses el trabajo de operaciones (revisar logs, vigilar producción, perseguir alertas de seguridad, armar reportes) se comía las horas que necesitaba para construir y vender.

Hoy ese trabajo lo hace una flota de unos 20 agentes que corren por cron en una VPS. Ninguno puede tocar plata. Este es el diseño.

## La arquitectura es aburrida a propósito

Nada de frameworks de orquestación: cron, bash y agentes de IA headless (Claude Code como primario, con fallback a otros proveedores). Cada agente es una carpeta con su script, sus logs y sus prompts. Tres piezas compartidas:

- `env.sh`: secretos con permisos 600, jamás commiteados.
- `notify.sh`: todo reporta a Telegram, con topics por área.
- `log.sh`: log diario por agente.

La convención más importante: casi todos son alert-only. Silencio significa que todo está bien. Un sistema que te habla todo el tiempo es un sistema que aprendés a ignorar.

## Qué hace la flota

Tres niveles, según cuánta autonomía se ganaron:

**Monitores (cada 5 minutos, solo observan).** Salud de los sitios en producción, errores en logs de deploy, fallos de login del pooler de la base de datos, eventos de out-of-memory del servidor, verificación del backup diario de Postgres. Detectan y avisan; no deciden nada.

**Workers con IA (leen y diagnostican, no escriben).** Cuando un monitor detecta un error en producción, encola un job. Un worker lo toma, junta contexto (logs recientes, checkout local del repo) y corre un agente headless restringido a herramientas de solo lectura que manda el diagnóstico a Telegram: qué se rompió, dónde, y qué haría para arreglarlo. Yo decido si se aplica.

**El bug hunter nocturno (escribe, con permisos ganados).** A las 02:00 recorre mis repos, busca bugs, los arregla en una branch y abre un PR que me espera a la mañana. Es el único agente con permiso de escritura, y es el que más guardrails tiene.

Alrededor de eso, la capa de rutina: digest diario de unos 46 feeds RSS, follow-ups de leads comerciales (genera borradores, jamás envía un mail solo), digest semanal de alertas de seguridad de GitHub, y una revisión semanal que me lista los pendientes manuales que están frenando revenue.

## Los guardrails son el producto

Cualquiera puede poner un LLM en un cron. Lo que hace que esto funcione en producción, con clientes fintech reales, es todo lo que los agentes NO pueden hacer:

- **Fintech nunca auto-mergea.** Un guard explícito por nombre de repo: cualquier repo de clientes fintech solo puede recibir PRs. Sin excepciones, sin flag para saltarlo.
- **Solo lectura por defecto.** El triage de errores corre con una lista blanca de herramientas de lectura y una lista negra de escritura. Un agente se gana la escritura recién cuando meses de corridas de solo lectura demostraron buen criterio.
- **Caps de costo y de recursos.** Tope diario de corridas de IA (hoy: 8 para el triage), gate de RAM que difiere el trabajo si el servidor está bajo presión (aprendido de un crash real), timeout duro por corrida, lock con flock para que nunca corran dos instancias.
- **Salud del proveedor antes de usarlo.** Smoke test al modelo antes de confiarle un job; si falla, se cae al siguiente proveedor de la cadena.
- **Cómputo oportunista.** El trabajo nocturno pesado intenta correr primero en mi PC de casa vía Tailscale; si la PC no responde, cae a la VPS. El cron sigue siendo la fuente de verdad.

## Resultados

Sin números inventados; lo que cambió en la práctica:

- Los incidentes de producción me llegan diagnosticados a Telegram, muchas veces antes de que un usuario los note.
- Varias mañanas arrancan con un PR nocturno listo para revisar en vez de con un bug por encontrar.
- Cero incidentes causados por un agente. Los guardrails no son decoración: cada uno existe por algo que pasó o que no puede permitirse pasar.
- Mi tiempo de operaciones manuales se redujo a revisar mensajes de Telegram y aprobar o rechazar.

## Lo que aprendí

1. **La autonomía se gana por niveles.** Observar, después diagnosticar, después escribir. Nunca al revés.
2. **Alert-only o muerte.** El valor de un sistema de monitoreo se mide por lo poco que habla cuando todo está bien.
3. **El humano elige los problemas; los agentes ejecutan.** Mi trabajo dejó de ser tipear código y pasó a ser decidir qué merece atención y con qué límites.
4. **Los guardrails baratos evitan los incidentes caros.** flock, un tope diario y un regex de repos prohibidos son 20 líneas de bash que hacen posible todo lo demás.

Voy a ir desarmando la flota agente por agente en próximos posts: el bug hunter nocturno, el triage de errores de solo lectura, el watchdog de fintech. Si estás construyendo algo parecido, [escribime](mailto:jorgenahuelsoria@gmail.com).
