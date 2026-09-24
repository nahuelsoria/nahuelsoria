---
title: timerz, un timer para enfocarse con escenas en Three.js
description: Pomodoro, cuenta regresiva y cronómetro sobre escenas animadas con shaders propios y sonidos sintetizados. Sin cuenta, sin backend y funciona sin conexión.
---

timerz es un timer para estudiar o trabajar: pomodoro, cuenta regresiva y cronómetro, sobre una escena animada que elegís vos, con sonidos ambiente que se pueden mezclar. Se instala como app (PWA) y funciona sin conexión.

Lo empecé en septiembre de 2026 con una condición desde el primer día: nada de cuenta ni de suscripción.

## Un timer que no se atrasa

Un timer que descuenta un segundo por tick se atrasa cuando el navegador duerme la pestaña, y la pestaña de un timer pasa la mayor parte del tiempo en segundo plano. timerz guarda el momento en que arrancó el segmento y la duración en milisegundos, y el tiempo restante se calcula siempre contra el reloj. Si cerrás la pestaña y volvés, el número es el correcto. Esa lógica tiene tests propios.

## Escenas con shaders

Hay 11 escenas: 7 ilustradas (lluvia en la ventana, chimenea, biblioteca, nieve, ciudad de noche, fondo del mar y orilla) y 4 minimalistas. Todas corren en Three.js sobre una base compartida, con shaders escritos para cada efecto: el fuego y su resplandor, las cáusticas bajo el agua, la espuma sobre la arena, las gotas en el vidrio.

Las 4 minimalistas son un solo shader con cuatro modos y no usan ningún archivo de imagen. Cada escena se carga recién cuando la elegís, así la primera pantalla no paga el peso de todas.

## Sonidos sin archivos

La lluvia, el fuego, el viento y el resto de los sonidos ambiente se sintetizan en el navegador con Web Audio. Se repiten sin cortes, porque no hay un archivo que termine y vuelva a empezar, y no suman peso a la descarga. La única grabación es el murmullo de café, con licencia CC0.

## Sin cuenta, sin suscripción

Todo vive en el navegador: configuración, tareas y estadísticas. No hay backend ni login. Quien quiera apoyar el proyecto puede hacer una donación o un pago único que desbloquea extras, y la licencia se verifica desde el mismo navegador.
