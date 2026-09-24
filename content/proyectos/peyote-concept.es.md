---
title: Peyote Concept, el sitio de una agencia creativa
description: Una sola página con scroll horizontal por habitaciones, la marca de la agencia aplicada al detalle y un objetivo medible, que el visitante escriba por WhatsApp.
---

Peyote Concept es una agencia que hace Google Ads, marca y diseño. Cuando empezamos no tenía sitio ni ninguna presencia que se pudiera encontrar en Google. El encargo tenía dos condiciones. El sitio tenía que sentirse como el trabajo de una agencia creativa, porque es su carta de presentación, y cada visita tenía que terminar en una conversación por WhatsApp.

## Cómo está armado

La página se recorre como cuatro habitaciones una al lado de la otra. En la compu, la rueda del mouse avanza de costado con inercia y cada habitación encaja sola cuando soltás. En el celular es un swipe con `scroll-snap`, que es lo que la gente ya sabe usar.

El paso de una habitación a otra dura según la distancia: 950 ms más 380 ms por cada panel de distancia, con un techo de 2,2 segundos. Lo calculé por tiempo y no por cuadros para que el encaje quede exacto en cualquier pantalla, sea de 60 o de 144 Hz.

Está hecho sin framework: un `index.html` con el CSS y el JavaScript adentro, un canvas animado de fondo y cero pasos de build. Para una página así, cualquier dependencia sumaba peso sin aportar nada.

## La marca, al pie de la letra

La agencia me pasó su manual de marca y sus logos, y el sitio los sigue sin adaptaciones: los cuatro colores de la paleta, el isotipo sin rotar ni deformar, y los titulares en Widescreen, la tipografía de la marca.

Widescreen es extremadamente ancha, y un titular grande se salía de la pantalla en cualquier ventana angosta. Lo resolví con un script que mide el ancho real del titular y achica la letra hasta que entra. Así el hero se ve igual de lleno en un celular que en un monitor de 27 pulgadas.

## QA con números

La propia agencia reportó un bug: en ventanas apaisadas bajas, o con el zoom del navegador alto, el subtítulo tapaba la indicación de "deslizá". El hero se centraba en toda la altura de la pantalla sin descontar el header ni la franja de abajo.

Después de corregirlo lo verifiqué midiendo las posiciones con Playwright en 11 tamaños de pantalla, de 390x844 a 1920x1080. Se superponen en cero de ellos. Mirarlo en mi monitor no alcanzaba, porque el bug solo aparecía en tamaños que yo no uso.

## Dónde está hoy

El sitio está en producción en su dominio desde el 31 de agosto de 2026, con SEO técnico completo: canonical, sitemap, `robots.txt` y datos estructurados de la organización. Los dos botones de contacto abren el WhatsApp de la agencia con un mensaje ya escrito, y se respeta `prefers-reduced-motion` para quien prefiere menos movimiento.
