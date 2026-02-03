import type { ReactNode } from 'react'
import { useState, useRef, useEffect } from 'react'

export interface DropdownItem {
  id: string
  label: string
  onClick?: () => void
  disabled?: boolean
  icon?: ReactNode
}

export interface DropdownProps {
  trigger: ReactNode
  items: DropdownItem[]
  align?: 'left' | 'right'
  className?: string
}

export function Dropdown({ trigger, items, align = 'right', className = '' }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [open])

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <div role="button" tabIndex={0} onClick={() => setOpen(!open)} onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}>
        {trigger}
      </div>
      {open ? (
        <ul
          className={`
            absolute z-50 mt-1 min-w-[160px] py-1 rounded-lg border border-border bg-surface shadow-lg
            ${align === 'right' ? 'right-0' : 'left-0'}
          `}
          role="menu"
        >
          {items.map((item) => (
            <li key={item.id} role="none">
              <button
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className="w-full px-4 py-2 text-left text-sm text-text hover:bg-white/5 flex items-center gap-2 disabled:opacity-50"
                onClick={() => {
                  item.onClick?.()
                  setOpen(false)
                }}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
