import type { ReactNode } from 'react'

export interface AvatarProps {
  src?: string | null
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  children?: ReactNode
}

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function Avatar({ src, alt, name, size = 'md', className = '', children }: AvatarProps) {
  const sizeClass = sizeClasses[size]
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? name ?? 'Avatar'}
        className={`rounded-full object-cover ${sizeClass} ${className}`}
      />
    )
  }
  if (children) {
    return (
      <span
        className={`
          inline-flex items-center justify-center rounded-full bg-surface border border-border text-text-muted
          ${sizeClass} ${className}
        `.trim().replace(/\s+/g, ' ')}
      >
        {children}
      </span>
    )
  }
  const initials = name ? getInitials(name) : '?'
  return (
    <span
      className={`
        inline-flex items-center justify-center rounded-full bg-primary/30 text-primary font-medium
        ${sizeClass} ${className}
      `.trim().replace(/\s+/g, ' ')}
      role="img"
      aria-label={alt ?? name ?? 'Avatar'}
    >
      {initials}
    </span>
  )
}
