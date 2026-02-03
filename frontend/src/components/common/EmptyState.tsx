import type { ReactNode } from 'react'

export interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

/**
 * EmptyState: Shown when a list or view has no data.
 * Used in conversation list, inbox, reports, etc.
 * Connects: No state; receives icon, title, description, optional CTA.
 */
export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center py-12 px-6 text-center
        text-text-muted ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {icon ? (
        <div className="mb-4 opacity-50 flex items-center justify-center [&>svg]:w-12 [&>svg]:h-12">
          {icon}
        </div>
      ) : null}
      <h3 className="text-base font-medium text-text mb-1">{title}</h3>
      {description ? <p className="text-sm max-w-sm mb-4">{description}</p> : null}
      {action ? <div>{action}</div> : null}
    </div>
  )
}
