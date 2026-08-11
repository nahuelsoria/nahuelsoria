---
title: El único agente al que le dejo escribir código
description: Mi bug hunter nocturno corre a las 2am sobre seis repos, arregla lo que puede demostrar y abre un PR. Este es el diseño, los números reales y las cuatro fallas que escribieron cada guardrail.
date: 2026-08-01
tags: Agentes de IA, DevOps, Automatización
---

En el [primer post de esta serie](/es/blog/agent-fleet) describí una flota de unos 20 agentes que opera mi infraestructura. Casi todos solo observan. Uno escribe código y lo pushea a mis repositorios.

Este es ese: el bug hunter nocturno. Es el agente con más autonomía y también el que tiene más guardrails. Acá está el diseño completo, incluidas las partes que se rompieron.

## Cómo es una noche

A las 2am hora de Buenos Aires, cron dispara un script de bash. El script recorre un archivo de texto plano con una línea por repositorio:

```
https://github.com/nahuelsoria/whatiwish.git   main  auto-merge-trivial
<el repo de una plataforma fintech>            main  pr-only
```

Por cada repo resetea un workspace local persistente a `origin/main`, le pasa el prompt de caza a un agente de IA headless y le da un presupuesto duro de 10 minutos. El agente lee, caza, arregla y corre la verificación más angosta que cubra lo que tocó. Su última línea es un único objeto JSON:

```json
{"bugs_found":2,"bugs_fixed":2,"tests_pass":true,"summary":"...","recommendation":"needs-review"}
```

El script parsea ese objeto y decide qué pasa con el código. Después sigue con el repo siguiente, y cuando termina, un mensaje de Telegram por repo me cuenta qué pasó; a la mañana tengo los seis veredictos juntos.

El detalle estructural importante es que el agente no decide si su trabajo sale: reporta, y la política la aplica un script de bash al que no se lo puede convencer de nada.

## El prompt es una lista de negativas

Casi toda la seguridad vive en dos archivos: el script lanzador y el prompt. El prompt está escrito como una lista de negativas.

Caza solo lo que puede demostrar: crashes, auth rota, pérdida de datos, contratos de API mal implementados, jobs que fallan. Estilo, refactors, bumps de dependencias y mejoras especulativas están explícitamente fuera de alcance, y notar una no es motivo para tocarla. La instrucción que más me importa es esta: ante la duda, nombrá el bug en el resumen y no toques el código. Un hallazgo escrito en una frase me cuesta 30 segundos, y un parche equivocado con seguridad me cuesta una tarde.

El scan está acotado a propósito. Si la branch está limpia, mira la superficie riesgosa (handlers de API, jobs de cron, helpers de auth, helpers de base de datos y de estado, webhooks, y los tests que están al lado) y nunca hace una auditoría de repo completo, porque eso solo multiplica el ruido.

Y una regla chica que existe por una falla real: antes de filear algo, revisa sus propios pull requests abiertos. Sobre eso vuelvo más abajo.

## Tres modos y un guard que no se puede pisar

Cada repo declara hasta dónde puede viajar un fix:

- **`pr-only`**: commitea a una branch, abre un PR, un humano mergea. Es el techo de todo lo que toca plata.
- **`auto-merge-trivial`**: el agente puede recomendar auto-merge, pero solo para lo trivialmente seguro.
- **`auto-merge`**: el script mergea si la verificación pasó, y al agente se le avisa que por eso verifique con más rigor.

Arriba de los tres hay un guard que no lee la configuración. Cualquier repositorio cuyo nombre matchee un patrón fintech es forzado a `pr-only` y me llega una alerta avisando que la config estaba mal. Si me equivoco escribiendo `repos.txt` a la medianoche, el error no puede llegar a producción. El guard son cuatro líneas de bash y es lo más valioso del archivo, porque hace que el camino seguro no dependa de mi memoria.

Hay además una regla de identidad fácil de pasar por alto: el bot commitea con el email atado a mi cuenta de GitHub, porque mi proveedor de hosting matchea commits con cuentas por el email del autor y si no coincide se saltea el deploy sin decir nada. Un agente que commitea con el email equivocado produce pull requests verdes que nunca deployan.

## Los números

De los logs de la máquina que hoy lo corre, sobre 15 noches consecutivas y 6 repos (89 noches-repo):

- **122 bugs reportados como encontrados, 81 arreglados.** La diferencia es el agente nombrando algo y no tocándolo, que es exactamente el comportamiento que quiero.
- **23 de esas 89 noches-repo no encontraron nada.** Un cuarto de las veces la respuesta honesta es "limpio", y el agente tiene permitido decirlo.
- En toda la vida de los repos que van por PR, **34 de sus pull requests están mergeados** y 3 se cerraron sin mergear (duplicados o bugs ya arreglados en main).

Entre esos 34 hay cosas reales: un bug de auth que afectaba 24 endpoints de un backoffice, un cache de sesión keyeado por una cookie truncada, una paginación que cortaba en silencio en una página parcial, una regla de Firestore que permitía suplantación. Ninguno lo encontré yo.

## Cuatro fallas que escribieron los guardrails

**Escaneó un repo de seis durante once días.** Después de expandir de un repositorio a seis, cada corrida siguió procesando solo el primero. La causa es un clásico: el loop leía la lista de repos por entrada estándar, y el CLI de IA, lanzado adentro del loop, también lee entrada estándar, así que se tragó las cinco líneas restantes. Todas las noches el reporte decía éxito, porque para el único repo que procesaba, era un éxito. El fix es una línea (leer la lista por un file descriptor dedicado y redirigir los CLIs desde `/dev/null`), pero lo caro es la lección: un agente que falla ruidosamente es una molestia menor, y uno que tiene éxito parcial y en silencio te puede quemar semanas.

**Se rompió su propio entorno.** Una noche el agente corrió un install de dependencias adentro de su workspace. Ese install activó los git hooks del repositorio, y desde entonces cada push corría la suite completa de verificación, que estaba fallando por un test roto en main desde hacía días. Cuatro noches de fixes buenos quedaron varadas en branches locales. El workspace donde vive un agente es estado mutable, y el agente lo muta.

**Encontró el mismo bug dos veces.** Dos noches seguidas fileó el mismo fix como dos pull requests distintos, porque el primero seguía abierto y él no tenía forma de saberlo. Los agentes no tienen memoria de ayer salvo que se la des. El fix fue agregar un paso cero al prompt: revisar tus propios PRs abiertos y el estado de la branch base antes de filear nada.

**Me tapó.** Con seis repos en modo PR, abre alrededor de cinco pull requests por semana que necesitan un humano. Dejé de revisar unos días y volví a 17 PRs abiertos en tres repos. Los 17 eran bugs reales y distintos, y ninguno estaba todavía en producción. Ese modo de falla no me lo esperaba: el cuello de botella se corre de encontrar bugs a consumir el output, y el trabajo sin revisar se acumula como deuda.

## Qué le diría a alguien que arma uno

1. El gate de merge va en el harness: el agente reporta y decide código determinístico.
2. Que abstenerse salga barato: "nombralo y no lo toques" tiene que ser un final fácil, y el silencio en una noche limpia tiene que ser normal.
3. Acotá el alcance antes de mejorar el modelo: diez minutos y una lista de superficie riesgosa le ganan a un modelo más inteligente mirando el repo entero.
4. Protegé por nombre de repo, que es lo único que sobrevive a tu propio error de tipeo.
5. Dimensioná la flota a tu capacidad de revisión.

El próximo de la serie: el agente de error triage, el que diagnostica incidentes de producción y no tiene permitido tocar un solo archivo. Si estás armando algo parecido, o querés esto corriendo sobre tus repositorios, [escribime](mailto:jorgenahuelsoria@gmail.com).
