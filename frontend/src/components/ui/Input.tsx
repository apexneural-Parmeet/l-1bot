import type { InputHTMLAttributes, ReactNode } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftAddon?: ReactNode
  rightAddon?: ReactNode
}

export function Input({
  label,
  error,
  hint,
  leftAddon,
  rightAddon,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-')
  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={inputId} className="block text-sm font-medium text-text-muted mb-1">
          {label}
        </label>
      ) : null}
      <div className="relative flex rounded-lg border border-border bg-bg focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary">
        {leftAddon ? (
          <div className="pl-3 flex items-center text-text-muted">{leftAddon}</div>
        ) : null}
        <input
          id={inputId}
          className={`
            w-full bg-transparent px-4 py-2 text-text placeholder:text-text-muted/70
            focus:outline-none
            ${leftAddon ? 'pl-0' : ''} ${rightAddon ? 'pr-0' : ''}
            ${className}
          `.trim().replace(/\s+/g, ' ')}
          {...props}
        />
        {rightAddon ? (
          <div className="pr-3 flex items-center text-text-muted">{rightAddon}</div>
        ) : null}
      </div>
      {error ? <p className="mt-1 text-sm text-error">{error}</p> : null}
      {hint && !error ? <p className="mt-1 text-sm text-text-muted">{hint}</p> : null}
    </div>
  )
}
