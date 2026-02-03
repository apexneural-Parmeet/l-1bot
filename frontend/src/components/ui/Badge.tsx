import type { ReactNode } from 'react'

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'human'

export interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-panel border border-border text-text-muted',
  success: 'bg-success/15 text-success border border-success/30',
  warning: 'bg-warning/15 text-warning border border-warning/30',
  error: 'bg-error/15 text-error border border-error/30',
  info: 'bg-ai-bg text-ai-badge border border-ai/30',
  human: 'bg-human-bg text-human-badge border border-human/30',
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium
        ${variantClasses[variant]} ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </span>
  )
}
