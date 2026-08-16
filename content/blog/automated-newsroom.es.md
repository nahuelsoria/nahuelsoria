---
title: Construí un diario de tecnología que se publica solo (la parte difícil no fue escribir)
description: Onda Corta publica notas todos los días sin nadie apretando botones. El case study: por qué el control de calidad va en código y no en el prompt, y qué hace el humano.
date: 2026-08-15
tags: Agentes de IA, Medios, Automatización
---

[Onda Corta](https://ondacorta.news) es un portal de noticias de tecnología en español que opero solo. Publica una selección corta de notas todos los días, cada una sintetizando dos o más fuentes que se citan y enlazan siempre. Desde el lanzamiento a principios de julio de 2026 lleva más de 400 notas publicadas, y ningún día de esos me senté a escribir una.

Lo cuento como case study porque la lección principal no es la que esperaba. Hacer que un modelo escriba una nota decente es la parte fácil. La parte difícil es todo lo que rodea a eso: que el sistema no publique basura cuando el modelo tiene un mal día, que el tono no se degrade con el tiempo, y que yo pueda dormir mientras publica.

## El pipeline en una línea

Ingesta de fuentes, selección de qué merece nota, síntesis con citas, control de calidad, publicación, y distribución (X e Instagram automatizados, reels renderizados con Remotion). Cron, scripts y agentes de IA headless. Nada de frameworks de orquestación: es la misma filosofía de [mi flota de agentes de infraestructura](/es/blog/agent-fleet), aplicada a un producto editorial.

## La regla que sostiene todo: el filtro va en código, no en el prompt

La tentación con los LLMs es arreglar todo con instrucciones: "no uses clichés", "no exageres", "citá las fuentes". Funciona hasta que no funciona, y cuando no funciona nadie se entera, porque el output igual parece razonable.

En Onda Corta el control de calidad es una tabla de patrones prohibidos que vive en un JSON y se aplica EN CÓDIGO, después de la generación: muletillas de IA, puntuación tipográfica que delata texto generado, construcciones que en español rioplatense suenan a traducción. La lee el pipeline de Python y también el de JavaScript, así ninguna superficie publica sin pasar por ella. Si un texto no pasa, no sale. El prompt pide el tono; el código lo garantiza.

Es la misma lección que me dejó mi otra herramienta ([el case study de LLM Audit](/es/blog/honest-ai-visibility-score) va de eso): lo que importa no se le pide al modelo, se verifica después del modelo.

## Qué hace el humano

Yo no escribo ni apruebo cada nota, pero el sistema no es "sin humano": es humano fuera del camino crítico. Reviso los fixes editoriales que la revisión semanal me propone, decido la línea editorial, y las cuentas sociales nunca responden solas a nadie. La transparencia es parte del producto: la política editorial del sitio dice de frente cómo se hace, algo que pocos medios generados con IA se animan a publicar.

Hay una distinción que me importa sostener en todo lo que automatizo: los agentes pueden producir y publicar contenido dentro de reglas duras, pero las interacciones con personas (responder, invitar, opinar) quedan del lado humano. Un medio automatizado que conversa solo es un incidente esperando fecha.

## Números honestos

Más de 400 notas en seis semanas con un operador que dedica minutos por día, no horas. El costo marginal de cada nota es centavos. El tráfico todavía es chico (el medio tiene semanas de vida y la autoridad de dominio se construye lenta), así que este case study no es "mirá cuánto tráfico": es "mirá cuánta operación editorial sostiene una persona sola con el sistema correcto".

Si tu negocio tiene un flujo editorial repetitivo (resúmenes, fichas, newsletters, catálogos) y te interesa esta arquitectura, [hablemos](https://nahuelsoria.vercel.app/es#contact).
