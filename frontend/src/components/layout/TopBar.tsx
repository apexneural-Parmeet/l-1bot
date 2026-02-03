import type { ReactNode } from 'react'

export interface TopBarProps {
  title?: string
  left?: ReactNode
  right?: ReactNode
  search?: ReactNode
  className?: string
}

/**
 * TopBar: Global app bar (search, notifications, user menu).
 * Role-based: right slot can show different actions for agent vs admin.
 * Connects: Auth store for user, notification store for badges.
 */
export function TopBar({ title, left, right, search, className = '' }: TopBarProps) {
  return (
    <header
      className={`
        h-14 flex items-center justify-between gap-4 px-5 border-b border-border bg-surface shrink-0
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      role="banner"
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {left}
        {title ? <h1 className="text-lg font-semibold text-text truncate">{title}</h1> : null}
        {search ? <div className="flex-1 max-w-md">{search}</div> : null}
      </div>
      <div className="flex items-center gap-2 shrink-0">{right}</div>
    </header>
  )
}
