import { useEffect, useRef, useState } from "react"

export function useInViewAnimation<T extends HTMLElement>(options?: { threshold?: number; rootMargin?: string }) {
  const { threshold = 0.15, rootMargin = "0px 0px -10%" } = options ?? {}
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element || typeof IntersectionObserver === "undefined") {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [rootMargin, threshold])

  return { ref, isVisible }
}
