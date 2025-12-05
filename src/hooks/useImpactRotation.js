import { useEffect, useMemo, useState } from 'react'

export default function useImpactRotation(outcomes, outcomesOpen, initialIndex = 0) {
  const safeInitial = useMemo(() => {
    if (!Array.isArray(outcomes) || outcomes.length === 0) return 0
    return Math.min(Math.max(initialIndex, 0), outcomes.length - 1)
  }, [outcomes, initialIndex])

  const [rollingIndex, setRollingIndex] = useState(safeInitial)
  const [fading, setFading] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(!!mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    if (reduceMotion || outcomesOpen) return
    const id = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setRollingIndex((i) => (i + 1) % outcomes.length)
        setFading(false)
      }, 320)
    }, 3000)
    return () => clearInterval(id)
  }, [reduceMotion, outcomesOpen, outcomes])

  return { rollingIndex, fading }
}

