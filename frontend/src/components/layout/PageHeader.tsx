import type { ReactNode } from 'react'

export interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  breadcrumb?: ReactNode
  className?: string
}

/**
 * PageHeader: Title + optional description, actions, breadcrumb.
 * Used at top of dashboard pages (inbox, conversations, settings).
 * Role-based: actions can be conditionally rendered by parent based on permissions.
 */
export function PageHeader({
  title,
  description,
  actions,
  breadcrumb,
  className = '',
}: PageHeaderProps) {
  return (
    <header className={`mb-6 ${className}`}>
      {breadcrumb ? <div className="mb-2">{breadcrumb}</div> : null}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text">{title}</h1>
          {description ? (
            <p className="mt-1 text-sm text-text-muted">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex items-center gap-2 shrink-0">{actions}</div> : null}
      </div>
    </header>
  )
}
