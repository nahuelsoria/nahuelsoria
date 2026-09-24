---
title: Manicuría CABA, un negocio a domicilio que se encuentra en Google
description: Sitio estático sin build para un servicio de manicuría a domicilio, con páginas por barrio, comentarios moderados desde Telegram y un agente que publica en Instagram.
---

Manicuría CABA es un servicio de manicuría y pedicuría a domicilio en la Ciudad de Buenos Aires. No tiene local, así que no aparece en Google Maps como un salón, y la única forma de reservar es escribir por WhatsApp.

El trabajo era que la encuentre quien busca "manicura a domicilio" en su barrio y que de ahí escriba. El resto de las decisiones salió de una condición: que nada dependa de que alguien entre a actualizar el sitio.

## Estático y sin build

El sitio es HTML y CSS planos, y el repo se sube a Vercel tal cual está, sin framework ni compilación. Para un negocio de este tamaño es lo que menos se rompe.

Hay una página por barrio (Palermo, Belgrano, Recoleta, Caballito y Villa Urquiza) con contenido propio de cada zona. Son las búsquedas que hace una clienta real, y cada página responde a una. Cada página tiene además una versión en markdown enlazada con `rel="alternate"`, y el sitio publica un `llms.txt`. Así un asistente como ChatGPT puede leer los servicios y la zona de cobertura sin pelearse con el HTML.

## Comentarios sin panel de administración

Las clientas pueden dejar un comentario. Se guarda en Vercel Blob y una función serverless lo muestra renderizado en el servidor, sin JavaScript del lado del cliente.

La moderación llega por Telegram: cada comentario nuevo trae links firmados con HMAC para publicarlo, ocultarlo o borrarlo. El link abre una página que pide confirmar, porque un previsualizador de links hace un GET y no puede ser que eso publique algo por error. El negocio no tiene que entrar a ningún panel.

## Instagram en piloto automático

Un agente publica todos los días: posts al feed tres días por semana y stories el resto. Los textos salen de un archivo curado a mano, sin que un modelo los invente, porque el sitio tiene una regla de cero datos inventados. Las piezas que llevan fotos de trabajos reales esperan una aprobación antes de salir. La API de Instagram no permite borrar lo publicado, así que el error se frena antes.

## Medir lo que importa

La analítica es PostHog, servido desde el mismo dominio a través de un proxy para que los bloqueadores no lo corten. La única conversión que se mide es el click al WhatsApp.
