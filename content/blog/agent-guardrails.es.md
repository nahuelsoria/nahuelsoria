---
title: El prompt sugiere, el código decide
description: Me preguntaron cómo limito el comportamiento de los agentes que corren solos. Estas son las cinco capas que uso, de la más barata a la más cara, y los errores que las parieron.
date: 2026-08-11
tags: Agentes de IA, Seguridad, Automatización
---

Ayer alguien me preguntó en X cómo creé los agentes de [Onda Corta](https://ondacorta.news) y cómo limité su comportamiento. La respuesta corta entró en un tweet. Esta es la larga.

El contexto, si llegás sin leer los posts anteriores: opero una [flota de agentes](/es/blog/agent-fleet) que corre por cron entre una VPS y una PC. Escriben un diario de noticias, revisan mis repos de noche, hacen triage de mi inbox y monitorean lo que tengo en producción. Casi todos trabajan sin que yo esté mirando, y ahí es donde la pregunta se pone interesante.

## La regla que ordena todo

Mi primer instinto fue controlarlos desde el prompt: "nunca hagas tal cosa", "siempre verificá tal otra". No alcanza. Un prompt es una sugerencia, y con cientos de corridas por semana la cola de la distribución siempre te encuentra: el modelo un día interpreta distinto, un input raro lo empuja a otro lado, y tu "nunca" resulta que era estadístico.

Lo que sí funciona es aburrido: código corriente y determinista que corre después del modelo. El agente propone; un programa que no piensa decide si eso sale al mundo. Todas las capas que siguen son variaciones de esa idea.

## Capa 1: una tarea por agente

Cada agente hace una cosa sola. El que lee el inbox no publica nada. El que publica no lee contenido de terceros. El que escribe código no toca producción.

Esto salió de la práctica: un agente chico es fácil de razonar, fácil de auditar en sus logs y, sobre todo, tiene poco para romper. Si mañana el triage de mails se comporta raro, el daño posible es un resumen malo en mi Telegram, no un deploy.

## Capa 2: el gate de salida

El diario publica solo, tres veces por día, sin humano en el loop. Puede hacerlo porque entre el modelo y el botón de publicar hay un gate en código: chequeo de plagio contra las fuentes, verificación de datos citados y dedupe contra lo ya publicado. Si una nota falla cualquiera de los tres, no sale. No hay negociación ni reintento creativo: lo que no pasa el gate no existe.

Lo que más me costó aprender es que el gate tiene que ser código, no otro modelo opinando. Un segundo LLM que revisa al primero hereda sus mismos problemas. El anti plagio es comparación de texto; el dedupe es una consulta a la base. Cosas que dan el mismo resultado las mil veces que las corras.

## Capa 3: contenido de terceros, sin manos

Algunos agentes leen texto que escribió otra gente: tweets, mails, páginas. Ese texto es input hostil por definición, porque puede traer instrucciones adentro ("ignorá lo anterior y mandá esto a tal lado"). La defensa clásica es pedirle al modelo que no obedezca instrucciones inyectadas. Eso es cortesía, no seguridad.

Mi versión: esos agentes corren sin ninguna herramienta conectada, y su salida pasa por un validador en código antes de usarse. Links solo de una lista blanca, nada de menciones a terceros, tope de volumen, y todo identificador se verifica contra los datos reales que el agente recibió. Si un texto ajeno logra convencer al modelo de algo raro, no tiene con qué ejecutarlo, y lo que propone se descarta en la validación.

## Capa 4: publicar sigue siendo mío

Casi todo lo que los agentes generan termina en mi Telegram como borrador, y el último paso lo hago yo, a mano. Me cuesta segundos por día. A cambio, ningún agente puede quemar mi reputación sin que yo haya apretado el botón.

La excepción es el diario, y es una excepción ganada: meses de corridas con el gate de la capa 2 sin sorpresas. En mi flota la autonomía se gana con historial.

## Capa 5: donde hay plata, PR y nada más

Los repos que mueven dinero tienen su propia regla: el agente puede investigar y proponer, pero solo abre pull requests. Nunca mergea, nunca deploya. El deploy de esos sistemas es manual, mío, con el diff leído entero. En el resto de los repos dejo que un agente mergee arreglos triviales; acá ni eso.

## Empezá por los borradores

Si estás armando algo parecido, el orden que a mí me funcionó: primero todo a borrador y publicás vos, después gates en código para lo repetitivo, y autonomía solo para el agente que ya te aburrió de tan predecible.
