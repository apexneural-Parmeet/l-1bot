import type { ReactNode } from 'react'

export interface WidgetContainerProps {
  children: ReactNode
  className?: string
  width?: string
  height?: string
}

/**
 * WidgetContainer: Bounded box for the chat UI (e.g. 380px width, 520px max height).
 * Styled in isolation; mobile-first.
 */
export function WidgetContainer({
  children,
  className = '',
  width = '380px',
  height = 'min(520px, 80vh)',
}: WidgetContainerProps) {
  return (
    <div
      className={`
        flex flex-col rounded-xl border border-slate-300 bg-white text-slate-900 shadow-xl
        overflow-hidden
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      style={{ width, height, maxHeight: height }}
    >
      {children}
    </div>
  )
}
