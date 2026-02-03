import { X } from 'lucide-react'

export interface WidgetHeaderProps {
  title: string
  onClose: () => void
  className?: string
}

export function WidgetHeader({ title, onClose, className = '' }: WidgetHeaderProps) {
  return (
    <header
      className={`
        flex items-center justify-between px-4 py-3 bg-primary text-white shrink-0
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <h2 className="text-base font-semibold truncate">{title}</h2>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="p-1 rounded hover:bg-white/20"
      >
        <X className="w-5 h-5" />
      </button>
    </header>
  )
}
