import type { ReactNode } from 'react'

export interface LoadingSkeletonProps {
  className?: string
  lines?: number
  children?: ReactNode
}

/**
 * LoadingSkeleton: Placeholder while data loads.
 * Used in conversation list, message list, contact list, etc.
 * No business logic; purely presentational.
 */
export function LoadingSkeleton({ className = '', lines = 3, children }: LoadingSkeletonProps) {
  if (children) {
    return (
      <div className={`animate-pulse ${className}`} role="status" aria-label="Loading">
        {children}
      </div>
    )
  }
  return (
    <div className={`space-y-3 ${className}`} role="status" aria-label="Loading">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded bg-surface border border-border"
          style={{ width: i === lines - 1 && lines > 1 ? '70%' : '100%' }}
        />
      ))}
    </div>
  )
}

export function SkeletonLine({ className = '' }: { className?: string }) {
  return <div className={`h-4 rounded bg-surface border border-border animate-pulse ${className}`} />
}

export function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const s = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'
  return <div className={`${s} rounded-full bg-surface border border-border animate-pulse`} />
}
