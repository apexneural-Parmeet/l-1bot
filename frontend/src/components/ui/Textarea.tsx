import type { TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export function Textarea({
  label,
  error,
  hint,
  id,
  className = '',
  ...props
}: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-')
  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-muted mb-1">
          {label}
        </label>
      ) : null}
      <textarea
        id={inputId}
        className={`
          w-full rounded-lg border border-border bg-bg px-4 py-2 text-text placeholder:text-text-muted/70
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
          resize-y min-h-[80px]
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      />
      {error ? <p className="mt-1 text-sm text-error">{error}</p> : null}
      {hint && !error ? <p className="mt-1 text-sm text-text-muted">{hint}</p> : null}
    </div>
  )
}
