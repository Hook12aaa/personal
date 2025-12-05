import { useEffect, useRef, useState } from 'react'

export default function useImpactPopover() {
  const detailsRef = useRef(null)
  const popoverRef = useRef(null)
  const isClosingRef = useRef(false)
  const [outcomesOpen, setOutcomesOpen] = useState(false)

  const openPopover = () => {
    const d = detailsRef.current
    if (!d || outcomesOpen) return
    d.classList.remove('is-closing')
    d.open = true
    setOutcomesOpen(true)
  }

  const smoothClose = () => {
    if (isClosingRef.current) return
    const d = detailsRef.current
    if (!d || !d.open) return
    isClosingRef.current = true
    d.classList.add('is-closing')
    setOutcomesOpen(false)
    window.setTimeout(() => {
      d.open = false
      d.classList.remove('is-closing')
      isClosingRef.current = false
    }, 450)
  }

  useEffect(() => {
    if (!outcomesOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault()
        smoothClose()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [outcomesOpen])

  return { detailsRef, popoverRef, outcomesOpen, openPopover, smoothClose }
}

