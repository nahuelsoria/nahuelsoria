"use client"

import { useEffect, useRef, useState } from "react"

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** stagger delay bucket 1..5 */
  delay?: 1 | 2 | 3 | 4 | 5
  as?: "div" | "li" | "article" | "section"
}

/**
 * Minimal client island: reveals children on scroll-in.
 * Keeps parent sections as Server Components (content is server-rendered).
 */
export function Reveal({ children, className = "", delay, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const delayClass = delay ? `delay-${delay}` : ""
  const Tag = as as React.ElementType
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? `reveal-in ${delayClass}` : ""} ${className}`}
    >
      {children}
    </Tag>
  )
}
