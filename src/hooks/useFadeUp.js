import { useRef, useState, useEffect } from 'react'

/**
 * Returns [ref, isVisible].
 * Attach ref to a DOM element — isVisible becomes true once it enters the viewport.
 * Fires once and disconnects the observer (same behaviour as the vanilla JS version).
 */
export function useFadeUp() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}
