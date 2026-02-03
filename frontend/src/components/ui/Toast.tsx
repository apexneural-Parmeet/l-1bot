import type { ReactNode } from 'react'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps {
  message: string
  variant?: ToastVariant
  title?: string
  action?: ReactNode
}

const variantClasses: Record<ToastVariant, string> = {
  success: 'border-success/50 bg-success/10',
  error: 'border-error/50 bg-error/10',
  warning: 'border-warning/50 bg-warning/10',
  info: 'border-primary/50 bg-primary/10',
}

export function Toast({ message, variant = 'info', title, action }: ToastProps) {
  return (
    <div
      role="alert"
      className={`
        flex items-start gap-3 p-4 rounded-lg border
        ${variantClasses[variant]}
      `}
    >
      <div className="flex-1 min-w-0">
        {title ? <p className="font-medium text-text">{title}</p> : null}
        <p className="text-sm text-text-muted">{message}</p>
      </div>
      {action ? <div className="flex-shrink-0">{action}</div> : null}
    </div>
  )
}
