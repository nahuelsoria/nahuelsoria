"use client"

import { useEffect } from "react"

/**
 * Hidden message for the technically-curious who open DevTools.
 * A small signal that speaks to devs/technical founders specifically.
 */
export function ConsoleEasterEgg() {
  useEffect(() => {
    const title =
      "background:#0EA5E9;color:#0b1120;font-size:14px;font-weight:800;padding:4px 12px;border-radius:4px"
    const dim = "color:#8b9bb0;font-size:12px;line-height:1.6"

    // eslint-disable-next-line no-console
    console.log("%c¿Sos dev? · Dev in the house?", title)
    // eslint-disable-next-line no-console
    console.log(
      "%cSi estás leyendo esto, hablamos el mismo idioma. Escribime y poné la palabra “console” — " +
        "a quien abre las devtools le respondo distinto.\n" +
        "If you're reading this, we speak the same language. Reach out and mention “console”.\n" +
        "→ https://wa.me/5491158794428",
      dim,
    )
  }, [])

  return null
}
