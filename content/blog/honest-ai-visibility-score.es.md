---
title: Un score honesto de visibilidad en IA es más difícil de lo que parece
description: Construí una herramienta que mide si ChatGPT, Gemini y Claude recomiendan una marca. Cuatro problemas de medición que encontré con datos, y qué hice con cada uno.
date: 2026-08-15
tags: IA, SaaS, Medición
---

Construí [LLM Audit](https://llmaudit.app), una herramienta que responde una pregunta que hoy se hacen todas las marcas: cuando alguien le pide una recomendación a ChatGPT, Gemini o Claude, ¿aparezco?

La versión ingenua es fácil: le preguntás a cada modelo, le pedís un puntaje de 0 a 100 y lo mostrás grande en una tarjeta. La versión honesta es un problema de medición, y me lo encontré de a pedazos, siempre de la misma forma: un número que parecía razonable hasta que lo contrasté con datos. Estos son los cuatro pedazos.

## 1. El mismo audit corrido tres veces da tres números

Corrí el mismo audit de la misma marca tres veces seguidas, sin cambiar nada. Los scores: 45, 30 y 29.

No es un bug: los modelos no son deterministas, y una sola corrida es una moneda al aire. Si tu herramienta reporta una corrida como si fuera una medición, el cliente que compara el score de hoy contra el del mes pasado está mirando ruido.

Lo que hice: cada proveedor se consulta N veces (hoy N=3) y el reporte muestra frecuencia de aparición con su intervalo de confianza (Wilson al 95%), no un número suelto. "Apareciste en 2 de 3 corridas" es menos marketinero que "67/100", pero es verdad.

## 2. Cada modelo puntúa en una escala distinta

Sobre el mismo conjunto de marcas, el puntaje promedio que da cada proveedor: OpenAI 11.6, Anthropic 34.9, Gemini 65.1. Mismas marcas, mismos prompts.

La consecuencia práctica es peor de lo que parece: si el score final es el promedio de los proveedores y uno se cae (rate limit, timeout), el número se mueve aunque la marca no haya cambiado. Lo medí sobre más de 130 audits de 45 días: los audits donde Gemini contestó promediaron 32.6, y donde no contestó, 19.5. Trece puntos de diferencia que no miden visibilidad, miden qué proveedor estaba de buen humor.

Lo que hice: reglas de canasta completa para el dataset comparativo (una observación con proveedores faltantes no entra al benchmark), reintentos ante errores transitorios, y salir del free tier del proveedor que más se caía.

## 3. Los modelos estimándose a sí mismos mienten justo donde importa

El primer diseño le pedía al modelo que estimara si nombraría a la marca. Salía barato y parecía funcionar. Lo contrasté con la realidad: para 31 marcas hice además la pregunta del comprador de verdad, en vivo, y leí la respuesta.

El resultado fue incómodo: la estimación acierta con las marcas desconocidas (20 de 22 efectivamente ausentes) y falla justo con las que tienen presencia real. Una marca a la que la estimación le daba 8 sobre 100 salía quinta en la respuesta en vivo. Es el peor tipo de error posible: le decís "sos invisible" al que sí aparece.

Lo que hice: cada audit hace además la consulta en vivo por proveedor y la respuesta cruda queda como evidencia visible. La posición que se guarda sale solo de esa consulta real; hay un test que prohíbe persistir posiciones estimadas.

## 4. La rúbrica de scoring se rompe con una frase

La lección más rara: agregué una frase al system prompt que definía el formato de un campo que no tenía nada que ver con el puntaje. OpenAI pasó de una media histórica de 7 a corridas de 44, 65 y 65, dos por encima de su máximo histórico. Una frase.

Lo que hice: la rúbrica de scoring vive aislada en el system prompt y no se toca para nada más; todo lo que describe formatos de campos va en el mensaje de usuario. Y cualquier cambio de prompt se verifica contra la banda histórica de cada proveedor antes de deployar.

## Qué me llevo

Medir lo que dicen los LLMs es un problema estadístico disfrazado de feature. Si estás evaluando herramientas de este rubro (o construyendo la tuya), las preguntas que separan una medición de un número decorativo son: cuántas corridas hay detrás del score, qué pasa cuando un proveedor no contesta, y si la posición que te muestran salió de una respuesta real o de un modelo estimándose a sí mismo.

Todo lo de esta nota salió de medir mi propia herramienta con usuarios reales. Si querés ver cómo quedó, el audit es gratis en [llmaudit.app](https://llmaudit.app).
