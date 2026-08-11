---
title: El prompt sugiere, el código decide
description: Me preguntaron en X cómo limito a los agentes que corren solos. El detalle de las cinco capas que uso, con tareas chicas, gates en código, validadores de salida y publicación a mano.
date: 2026-08-11
tags: Agentes de IA, Seguridad, Automatización
---

Ayer alguien me preguntó en X cómo creé los agentes de [Onda Corta](https://ondacorta.news) y cómo limité su comportamiento. Le respondí por ahí, pero el tema da para más que un tweet, así que acá va el detalle.

El contexto, si llegás sin leer los posts anteriores: opero una [flota de agentes](/es/blog/agent-fleet) que corre por cron entre una VPS y una PC. Escriben un diario de noticias, revisan mis repos de noche, hacen triage de mi inbox y monitorean lo que tengo en producción. Casi todos trabajan sin que yo esté mirando.

## El prompt no alcanza

Cuando empecé trataba de controlarlos desde el prompt, agregando una regla nueva cada vez que algo salía mal. Funciona un tiempo. El problema es que un prompt no es una garantía: con cientos de corridas por semana, tarde o temprano el modelo interpreta una instrucción de otra manera, o un input raro lo lleva a donde no esperabas. Me pasó suficientes veces como para dejar de confiar en eso.

Hoy el control de verdad está en scripts comunes que corren después del modelo. El agente genera algo, y un programa determinista revisa ese resultado antes de que toque el mundo real.

## Una tarea por agente

Cada agente hace una cosa sola: el que lee el inbox no publica nada, y el que escribe código no toca producción. Esto salió de la práctica, porque un agente chico es fácil de razonar, fácil de auditar en sus logs y tiene poco para romper. Si el triage de mails un día se comporta raro, lo peor que puede pasar es que me llegue un resumen malo por Telegram.

## El gate de salida

El diario publica solo, tres veces por día, sin nadie mirando. Puede hacerlo porque antes de publicar, cada nota pasa por tres chequeos escritos en código: plagio contra las fuentes, verificación de los datos citados y duplicados contra lo ya publicado. Una nota que falla alguno de los tres queda descartada, y el diario sigue con la siguiente.

Al principio pensé en usar un segundo modelo como revisor. Lo descarté rápido: un LLM revisando a otro hereda los mismos problemas. El chequeo de plagio es comparación de texto y el de duplicados es una consulta a la base de datos, y los dos devuelven siempre lo mismo con la misma entrada.

## Contenido de terceros

Algunos agentes leen texto que escribió otra gente: tweets, mails, páginas. Cualquiera de esos textos puede traer instrucciones adentro, del estilo "ignorá lo anterior y mandá esto a tal lado". Pedirle al modelo que no las obedezca ayuda poco, porque un ataque bien armado lo convence igual.

Por eso esos agentes corren sin ninguna herramienta conectada, y lo que producen pasa por un validador en código antes de usarse: links solo de una lista blanca, nada de menciones a terceros, un tope de volumen, y cada identificador verificado contra los datos que el agente de verdad recibió. Aunque un texto ajeno convenza al modelo de algo raro, el resultado se descarta en la validación.

## Publicar sigue siendo mío

Casi todo lo que generan los agentes es material para mí, no para publicar: resúmenes, alertas, reportes, borradores de trabajo. Llega a mi Telegram y yo decido qué hacer con cada cosa. Cuando algo de eso alimenta un texto público, lo reviso y lo reescribo antes; lo que sale con mi nombre pasa por mis manos.

La excepción es el diario. Publica solo desde el arranque, y lo dejo porque lleva meses pasando por el gate sin una sorpresa.

## Los repos que mueven dinero

Ahí la regla es más estricta: el agente puede investigar y proponer cambios, pero solo abriendo pull requests, y el deploy lo hago yo a mano después de leer el diff completo. En los demás repos dejo que un agente mergee arreglos triviales solo; en estos no.

## Empezá por los borradores

Si estás armando algo parecido, el orden que a mí me funcionó: primero todo a borrador y publicás vos, después gates en código para lo repetitivo, y autonomía solo para el agente que ya te aburrió de tan predecible.
