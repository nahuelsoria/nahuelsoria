---
title: Asked Thrice, medir si la IA recomienda tu marca
description: Un audit que le hace a ChatGPT, Gemini y Claude las preguntas de un comprador y muestra si nombran a tu marca o a la competencia, con las respuestas como evidencia.
---

[Asked Thrice](https://askedthrice.com) mide si los asistentes de IA recomiendan una marca. Le hace a OpenAI, Gemini y Anthropic las preguntas que haría un comprador de la categoría, varias veces a cada uno, y muestra quién aparece en las respuestas: la marca o sus competidores. Las respuestas crudas van en el informe, para que cualquiera las pueda leer.

Empezó a medir en mayo de 2026 con el nombre LLM Audit y a fines de agosto pasó a llamarse Asked Thrice. Los problemas de medición que encontré en el camino los conté en el blog, en [un score honesto de visibilidad en IA](/es/blog/honest-ai-visibility-score).

## Tres corridas por modelo

Corrí el mismo audit de la misma marca tres veces seguidas, sin cambiar nada, y dio 45, 30 y 29. Con esa variación, un número suelto no dice nada. Cada proveedor se consulta tres veces y el informe muestra con qué frecuencia apareció la marca, con su intervalo de confianza de Wilson al 95%. "Apareciste en 2 de 3 corridas" es menos vistoso que un puntaje, pero se puede defender.

## Sin puntaje en pantalla

El producto muestra un veredicto por bandas en lugar de un número del 0 al 100. Para que nadie lo vuelva a agregar por descuido, hay un test que falla si un puntaje aparece en la interfaz.

## Solo respuestas en vivo

La primera versión le pedía al modelo que estimara si nombraría a la marca. Salía barato, y contrastado contra respuestas reales en 31 marcas fallaba justo con las que sí tenían presencia. Hoy toda posición sale de hacer la pregunta en vivo, y otro test impide guardar posiciones estimadas.

## Un número que no dependa de quién contestó

Cada proveedor puntúa distinto las mismas marcas, así que si uno se caía el promedio se movía sin que la marca cambiara. En más de 130 audits, los que incluían a Gemini promediaban 13 puntos más que los que no. Ahora una medición a la que le falta un proveedor no entra en las comparaciones, y los errores transitorios se reintentan.

## Para personas y para agentes

El audit se usa desde la web, con cobro en pesos por Mercado Pago o en dólares por Polar. También está publicado como servidor MCP en el registro oficial y en npm, y como CLI, para que un agente lo pueda correr sin pasar por el navegador.

El cambio de nombre se hizo con redirecciones 308 que conservan cada ruta, salvo las de `/api`: los webhooks de pago no siguen redirecciones y se habrían perdido.
