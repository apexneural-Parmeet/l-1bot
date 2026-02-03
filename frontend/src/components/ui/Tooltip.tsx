import type { ReactNode } from 'react'
import { useState } from 'react'

export interface TooltipProps {
  content: ReactNode
  children: ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

export function Tooltip({ content, children, placement = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const placementClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }
  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible ? (
        <div
          role="tooltip"
          className={`absolute z-50 px-2 py-1 text-xs text-text bg-surface border border-border rounded shadow-lg whitespace-nowrap ${placementClasses[placement]}`}
        >
          {content}
        </div>
      ) : null}
    </div>
  )
}
