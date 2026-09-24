"use client"

import { useEffect, useRef } from "react"

// Half-width katakana plus digits: the classic "digital rain" glyph set.
const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789"
const CELL = 18 // px per column and row
const FPS = 18

/**
 * Background canvas of falling glyphs in the brand color, kept faint so the
 * hero copy stays the focus. Plain 2D canvas: no WebGL, no dependency.
 * Stops when off screen or in a hidden tab, and renders nothing at all
 * under prefers-reduced-motion.
 */
export function CodeRain({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let drops: number[] = []
    let width = 0
    let height = 0
    let color = "#7bd66b"
    let bg = "#0f110d"

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement)
      color = styles.getPropertyValue("--brand").trim() || color
      bg = styles.getPropertyValue("--bg").trim() || bg
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const columns = Math.ceil(width / CELL)
      // Start each column at a random height so the first frame isn't a flat line.
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -(height / CELL)))
      ctx.clearRect(0, 0, width, height)
    }

    const draw = () => {
      // Translucent wash over the previous frame leaves the fading trails.
      ctx.globalAlpha = 0.12
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, width, height)
      ctx.globalAlpha = 1
      ctx.fillStyle = color
      ctx.font = `${CELL - 4}px ui-monospace, monospace`
      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * CELL
        if (y > 0) ctx.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], i * CELL, y)
        if (y > height && Math.random() > 0.975) drops[i] = 0
        else drops[i]++
      }
    }

    let raf = 0
    let last = 0
    let visible = true
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden || t - last < 1000 / FPS) return
      last = t
      draw()
    }

    readColors()
    resize()
    raf = requestAnimationFrame(loop)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)
    // The theme toggle swaps the tokens on <html>; repaint with the new ones.
    const mo = new MutationObserver(() => {
      readColors()
      ctx.clearRect(0, 0, width, height)
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={className} />
}
