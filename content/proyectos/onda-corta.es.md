---
title: Onda Corta, un diario de tecnología que se escribe solo
description: Portal de noticias de tecnología en español que escribe y publica un pipeline de agentes. El control de calidad va en código, y la cadencia se decide con datos de Search Console.
---

[Onda Corta](https://ondacorta.news) es un portal de noticias de tecnología en español que opero solo. Salió en julio de 2026 y desde entonces publica todos los días sin que nadie se siente a escribir: un pipeline de agentes lee fuentes, elige temas, redacta, verifica y publica.

El proceso completo lo conté en el blog, en [un diario de tecnología que se publica solo](/es/blog/automated-newsroom). Acá van las decisiones de diseño que más pesaron.

## La calidad se controla en código

Pedirle al modelo en el prompt que no plagie y que no invente no alcanza, porque un día cualquiera lo hace igual. Por eso cada nota pasa por controles que corren después del modelo y pueden rechazarla: detección de plagio por n-gramas contra las fuentes, un fact-check, deduplicación contra lo ya publicado y una lista de patrones de escritura prohibidos.

Esa lista es un archivo JSON que leen tanto el writer en Python como el sitio en JavaScript, así las dos partes aplican la misma regla y no se desincronizan.

## Menos notas, decidido con datos

Al principio el sitio publicaba unas nueve notas por día. A fines de agosto miré qué pasaba en Search Console y Google conocía una parte chica de las URLs e indexaba una fracción todavía menor. Las notas no eran cortas, así que el largo no era la variable.

Cambié el formato a una nota por día y dos explicadores por semana. Los explicadores se arman sobre temas que ya tienen varias notas publicadas en el archivo, con un control de autoplagio para que no repitan lo que ya se dijo. El KPI dejó de ser cuántas notas salen y pasó a ser cuántas indexa Google.

## Un gate humano que no funcionó

Probé un paso de aprobación manual antes de publicar. Duró una semana: el sitio pasó días sin notas porque nadie aprobaba los borradores. Lo saqué y volví a dejar que publique solo, con los controles en código como única puerta.

## Del sitio al video

Las notas también se convierten en reels. El servidor elige qué notas llevan video y el render con Remotion se hace en otra máquina. Los duplicados que quedaron de la primera etapa se consolidaron con redirecciones 308, desde una sola lista que usan tanto la configuración del sitio como el sitemap, cubierta por tests.
