---
title: timerz, a focus timer with Three.js scenes
description: Pomodoro, countdown and stopwatch over animated scenes with custom shaders and synthesized sounds. No account, no backend, and it works offline.
---

timerz is a timer for studying or working: pomodoro, countdown and stopwatch, over an animated scene you pick, with ambient sounds you can mix. It installs as an app (PWA) and works offline.

I started it in September 2026 with one condition from day one: no account and no subscription.

## A timer that doesn't drift

A timer that subtracts one second per tick falls behind when the browser throttles the tab, and a timer tab spends most of its life in the background. timerz stores when the current segment started and its duration in milliseconds, and the remaining time is always computed against the clock. Close the tab, come back, and the number is right. That logic has its own tests.

## Scenes with shaders

There are 11 scenes: 7 illustrated ones (rain on the window, fireplace, library, snowfall, city at night, under the sea and shoreline) and 4 minimal ones. All of them run on Three.js over a shared base, with shaders written for each effect: the fire and its glow, the caustics under water, the foam on the sand, the drops on the glass.

The 4 minimal scenes are a single shader with four modes and use no image files. Each scene loads only when you pick it, so the first screen doesn't pay for all of them.

## Sounds without files

Rain, fire, wind and the other ambient sounds are synthesized in the browser with Web Audio. They loop seamlessly, because there is no file that ends and starts over, and they add nothing to the download. The only recording is the café chatter, licensed CC0.

## No account, no subscription

Everything lives in the browser: settings, tasks and stats. There is no backend and no login. Anyone who wants to support the project can donate or make a one-time payment that unlocks extras, and the license is verified from the browser itself.
