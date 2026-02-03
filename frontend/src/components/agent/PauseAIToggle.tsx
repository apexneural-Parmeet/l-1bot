import { useState } from 'react'

export interface PauseAIToggleProps {
  paused?: boolean
  onToggle?: (paused: boolean) => void
  className?: string
}

/**
 * PauseAIToggle: Simple toggle to pause AI. UI only.
 */
export function PauseAIToggle({ paused = false, onToggle, className = '' }: PauseAIToggleProps) {
  const [localPaused, setLocalPaused] = useState(paused)
  const isPaused = onToggle ? paused : localPaused

  const handleClick = () => {
    const next = !isPaused
    if (onToggle) onToggle(next)
    else setLocalPaused(next)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      role="switch"
      aria-checked={isPaused}
      className={`
        relative w-10 h-5 rounded-full transition-colors shrink-0
        ${isPaused ? 'bg-warning/50' : 'bg-primary'}
        ${className}
      `}
    >
      <span
        className={`
          absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform
          ${isPaused ? 'left-0.5' : 'left-5'}
        `}
      />
    </button>
  )
}
